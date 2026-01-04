import { useState, useEffect, useCallback } from "react";
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

const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const SpotifyNowPlaying = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localProgress, setLocalProgress] = useState<number>(0);
  const [lastFetchTime, setLastFetchTime] = useState<number>(Date.now());

  const isActive = nowPlaying?.isPlaying || false;

  const fetchNowPlaying = useCallback(async () => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

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

      if (data.progress !== undefined) {
        setLocalProgress(data.progress);
        setLastFetchTime(Date.now());
      }
    } catch (err) {
      console.error("Spotify fetch error:", err);
      setError(err instanceof Error ? err.message : "Nepodařilo se načíst data");
      setNowPlaying({ isPlaying: false });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

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
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isActive, nowPlaying, lastFetchTime]);

  if (loading) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-muted rounded-xl animate-pulse flex items-center justify-center">
              <Music className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Načítání...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-card/90 backdrop-blur-xl border border-destructive/30 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-xl">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium">Spotify offline</p>
              <button
                onClick={fetchNowPlaying}
                className="text-xs text-primary hover:underline"
              >
                Zkusit znovu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const shouldExpand = isHovered;

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`bg-card/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl transition-all duration-500 ${
          shouldExpand && isActive ? "p-5 min-w-[300px]" : "p-3"
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Album Art */}
          <div className="relative flex-shrink-0">
            {isActive && nowPlaying?.albumImageUrl ? (
              <div className="relative">
                <img
                  src={nowPlaying.albumImageUrl}
                  alt="Album cover"
                  className={`object-cover rounded-xl transition-all duration-300 ${
                    shouldExpand ? "w-14 h-14" : "w-10 h-10"
                  }`}
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center ring-2 ring-card">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                </div>
              </div>
            ) : (
              <div
                className={`bg-muted flex items-center justify-center rounded-xl transition-all duration-300 ${
                  shouldExpand ? "w-14 h-14" : "w-10 h-10"
                }`}
              >
                <Music className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Content */}
          {shouldExpand ? (
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${isActive ? "bg-primary animate-pulse" : "bg-muted-foreground"}`} />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {isActive ? "Hraje" : "Offline"}
                </span>
              </div>

              {isActive && nowPlaying ? (
                <div className="space-y-2">
                  <a
                    href={nowPlaying.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sm truncate block hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="truncate">{nowPlaying.title}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </a>
                  <p className="text-xs text-muted-foreground truncate">{nowPlaying.artist}</p>

                  {nowPlaying.duration && (
                    <div className="space-y-1.5 pt-1">
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-100"
                          style={{ width: `${Math.min((localProgress / nowPlaying.duration) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {formatTime(localProgress)}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {formatTime(nowPlaying.duration)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Spotify</p>
                  <p className="text-xs text-muted-foreground/60">Právě nehraje</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 min-w-0">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? "bg-primary animate-pulse" : "bg-muted-foreground"}`} />
              <div className="min-w-0">
                <span className="text-sm font-medium block truncate max-w-[100px]">
                  {isActive ? nowPlaying?.title || "Spotify" : "Spotify"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotifyNowPlaying;
