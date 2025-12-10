import { useState, useEffect, useCallback, useMemo } from "react";
import { Music, ExternalLink, AlertCircle } from "lucide-react";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
}

interface SpotifyNowPlayingProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  refreshInterval?: number;
  apiUrl?: string;
  showProgress?: boolean;
  compactMode?: boolean;
}

interface LoadingStateProps {
  position: string;
}

interface ErrorStateProps {
  position: string;
  message: string;
  onRetry: () => void;
}

interface CollapsedViewProps {
  isActive: boolean;
  nowPlaying: NowPlayingData | null;
}

interface ExpandedViewProps {
  isActive: boolean;
  nowPlaying: NowPlayingData | null;
  localProgress: number;
  formatTime: (ms: number) => string;
  showProgress: boolean;
}

// Constants
const POSITION_CLASSES = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
};

const DEFAULT_REFRESH_INTERVAL = 30000; // 30 seconds
const PROGRESS_UPDATE_INTERVAL = 100; // 100ms
const MAX_RETRY_ATTEMPTS = 3;

// Utility Functions
const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Sub-components
const LoadingState = ({ position }: LoadingStateProps) => (
  <div className={`fixed ${position} z-50`}>
    <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-muted flex items-center justify-center rounded animate-pulse">
          <Music className="w-5 h-5 text-muted-foreground" />
        </div>
        <span className="text-sm text-muted-foreground">Načítání...</span>
      </div>
    </div>
  </div>
);

const ErrorState = ({ position, message, onRetry }: ErrorStateProps) => (
  <div className={`fixed ${position} z-50`}>
    <div className="bg-card/95 backdrop-blur-sm border border-destructive/50 rounded-lg p-3 shadow-lg">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-destructive" />
        <div className="flex-1">
          <p className="text-sm text-foreground font-medium">Chyba načítání</p>
          <p className="text-xs text-muted-foreground">{message}</p>
        </div>
        <button
          onClick={onRetry}
          className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          Zkusit znovu
        </button>
      </div>
    </div>
  </div>
);

const StatusIndicator = ({ isActive }: { isActive: boolean }) => (
  <div
    className={`w-2 h-2 rounded-full ${
      isActive ? "bg-primary animate-pulse" : "bg-muted-foreground"
    }`}
    aria-label={isActive ? "Přehrává se" : "Offline"}
  />
);

const AlbumArt = ({ 
  albumImageUrl, 
  isHovered, 
  isActive 
}: { 
  albumImageUrl?: string; 
  isHovered: boolean; 
  isActive: boolean;
}) => {
  if (isActive && albumImageUrl) {
    return (
      <div className="relative flex-shrink-0">
        <img
          src={albumImageUrl}
          alt="Album cover"
          className={`object-cover rounded transition-all duration-300 ${
            isHovered ? "w-12 h-12" : "w-10 h-10"
          }`}
          loading="lazy"
        />
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-muted flex items-center justify-center rounded transition-all duration-300 ${
        isHovered ? "w-12 h-12" : "w-10 h-10"
      }`}
    >
      <Music
        className={`text-muted-foreground transition-all duration-300 ${
          isHovered ? "w-6 h-6" : "w-5 h-5"
        }`}
      />
    </div>
  );
};

const ProgressBar = ({
  progress,
  duration,
  formatTime,
}: {
  progress: number;
  duration: number;
  formatTime: (ms: number) => string;
}) => {
  const percentage = Math.min((progress / duration) * 100, 100);

  return (
    <div className="mt-2 space-y-1">
      <div 
        className="h-1 bg-muted rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Pozice přehrávání"
      >
        <div
          className="h-full bg-primary rounded-full transition-all duration-100"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-[10px] text-muted-foreground font-mono">
          {formatTime(progress)}
        </span>
        <span className="text-[10px] text-muted-foreground font-mono">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

const CollapsedView = ({ isActive, nowPlaying }: CollapsedViewProps) => (
  <div className="flex items-center gap-2">
    <StatusIndicator isActive={isActive} />
    <div className="min-w-0">
      <span className="text-sm font-medium block truncate max-w-[120px]">
        {isActive ? nowPlaying?.title || "Spotify" : "Spotify"}
      </span>
      {isActive && nowPlaying?.artist && (
        <span className="text-xs text-muted-foreground block truncate max-w-[120px]">
          {nowPlaying.artist}
        </span>
      )}
    </div>
  </div>
);

const ExpandedView = ({ 
  isActive, 
  nowPlaying, 
  localProgress, 
  formatTime,
  showProgress 
}: ExpandedViewProps) => (
  <div className="flex-1 min-w-0">
    <div className="flex items-center gap-2 mb-1">
      <StatusIndicator isActive={isActive} />
      <span className="text-xs font-medium text-primary uppercase tracking-wider">
        {isActive ? "Hraje" : "Offline"}
      </span>
    </div>

    {isActive && nowPlaying ? (
      <div className="space-y-1">
        <a
          href={nowPlaying.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-sm truncate block hover:text-primary transition-colors flex items-center gap-1.5 group/link"
        >
          <span className="truncate">{nowPlaying.title}</span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
        </a>
        <p className="text-xs text-muted-foreground truncate">{nowPlaying.artist}</p>

        {showProgress && nowPlaying.duration && (
          <ProgressBar
            progress={localProgress}
            duration={nowPlaying.duration}
            formatTime={formatTime}
          />
        )}
      </div>
    ) : (
      <div>
        <p className="text-sm font-medium text-muted-foreground">Spotify</p>
        <p className="text-xs text-muted-foreground/60">Nehraje</p>
      </div>
    )}
  </div>
);

// Main Component
const SpotifyNowPlaying = ({
  position = "bottom-right",
  refreshInterval = DEFAULT_REFRESH_INTERVAL,
  apiUrl,
  showProgress = true,
  compactMode = false,
}: SpotifyNowPlayingProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localProgress, setLocalProgress] = useState<number>(0);
  const [lastFetchTime, setLastFetchTime] = useState<number>(Date.now());
  const [retryCount, setRetryCount] = useState(0);

  const positionClass = POSITION_CLASSES[position];
  const isActive = nowPlaying?.isPlaying || false;

  const fetchNowPlaying = useCallback(async () => {
    try {
      const supabaseUrl = apiUrl || import.meta.env.VITE_SUPABASE_URL;

      if (!supabaseUrl) {
        throw new Error("API URL není nakonfigurována");
      }

      const response = await fetch(
        `${supabaseUrl}/functions/v1/spotify?action=now-playing`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setNowPlaying(data);
      setError(null);
      setRetryCount(0);

      if (data.progress !== undefined) {
        setLocalProgress(data.progress);
        setLastFetchTime(Date.now());
      }
    } catch (err) {
      console.error("Spotify fetch error:", err);
      
      if (retryCount < MAX_RETRY_ATTEMPTS) {
        setRetryCount((prev) => prev + 1);
      } else {
        setError(err instanceof Error ? err.message : "Nepodařilo se načíst data");
        setNowPlaying({ isPlaying: false });
      }
    } finally {
      setLoading(false);
    }
  }, [apiUrl, retryCount]);

  const handleRetry = useCallback(() => {
    setError(null);
    setRetryCount(0);
    setLoading(true);
    fetchNowPlaying();
  }, [fetchNowPlaying]);

  // Initial fetch and periodic refresh
  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchNowPlaying, refreshInterval]);

  // Update local progress
  useEffect(() => {
    if (!isActive || nowPlaying?.progress === undefined) {
      return;
    }

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - lastFetchTime;
      const newProgress = (nowPlaying.progress || 0) + elapsed;

      if (nowPlaying.duration && newProgress <= nowPlaying.duration) {
        setLocalProgress(newProgress);
      }
    }, PROGRESS_UPDATE_INTERVAL);

    return () => clearInterval(progressInterval);
  }, [isActive, nowPlaying, lastFetchTime]);

  if (loading) {
    return <LoadingState position={positionClass} />;
  }

  if (error) {
    return <ErrorState position={positionClass} message={error} onRetry={handleRetry} />;
  }

  const shouldExpand = isHovered && !compactMode;

  return (
    <div
      className={`fixed ${positionClass} z-50`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="complementary"
      aria-label="Spotify aktuálně přehrává"
    >
      <div
        className={`bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg transition-all duration-300 ${
          shouldExpand && isActive ? "p-4 min-w-[280px]" : "p-3"
        }`}
      >
        <div className="flex items-center gap-3">
          <AlbumArt
            albumImageUrl={nowPlaying?.albumImageUrl}
            isHovered={shouldExpand}
            isActive={isActive}
          />

          {shouldExpand ? (
            <ExpandedView
              isActive={isActive}
              nowPlaying={nowPlaying}
              localProgress={localProgress}
              formatTime={formatTime}
              showProgress={showProgress}
            />
          ) : (
            <CollapsedView isActive={isActive} nowPlaying={nowPlaying} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotifyNowPlaying;
