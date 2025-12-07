import { useState, useEffect, useRef } from "react";
import { Music, ExternalLink } from "lucide-react";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
  error?: string;
}

const SpotifyNowPlaying = () => {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastFetchTimeRef = useRef<number>(Date.now());

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/spotify?action=now-playing`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({}),
        }
      );

      if (res.ok) {
        const nowPlaying = await res.json();
        setData(nowPlaying);
        if (nowPlaying.progress) {
          setCurrentProgress(nowPlaying.progress);
          lastFetchTimeRef.current = Date.now();
        }
      }
    } catch (err) {
      console.error('Error fetching now playing:', err);
    }
  };

  useEffect(() => {
    if (data?.isPlaying && data.duration) {
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - lastFetchTimeRef.current;
        const newProgress = (data.progress || 0) + elapsed;
        if (newProgress <= data.duration) {
          setCurrentProgress(newProgress);
        }
      }, 1000);
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [data]);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = data?.duration 
    ? (currentProgress / data.duration) * 100 
    : 0;

  // Idle state - no data or not playing
  if (!data || (!data.isPlaying && !data.error)) {
    return (
      <div 
        className="fixed bottom-6 right-6 z-50 group cursor-pointer"
        title="Nepřehrává se"
      >
        <div className="relative p-4 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/30 transition-all duration-300 group-hover:border-[#1DB954]/40 group-hover:shadow-[0_0_30px_-10px_#1DB954]">
          <svg className="w-5 h-5 text-muted-foreground group-hover:text-[#1DB954] transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>
      </div>
    );
  }

  if (data.error) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div 
        className={`relative overflow-hidden transition-all duration-500 ease-out ${
          isHovered ? 'w-[340px]' : 'w-[200px]'
        }`}
        style={{
          borderRadius: '20px',
        }}
      >
        {/* Background with gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/20 via-transparent to-primary/10 rounded-[20px]" />
        
        {/* Card Content */}
        <div className="relative bg-card/60 backdrop-blur-2xl border border-border/40 rounded-[20px] overflow-hidden transition-all duration-500 hover:border-[#1DB954]/30">
          
          {/* Top Glow Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1DB954] to-transparent opacity-60" />
          
          {/* Spotify Header - Always Visible */}
          <div className="flex items-center gap-2 px-4 pt-3 pb-2">
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#1DB954">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#1DB954]">
              Poslouchá na Spotify
            </span>
            
            {/* Sound Bars */}
            {data.isPlaying && (
              <div className="flex items-end gap-[2px] ml-auto h-3">
                <span className="w-[3px] bg-[#1DB954] rounded-sm animate-[soundbar_0.8s_ease-in-out_infinite]" style={{ height: '60%', animationDelay: '0ms' }} />
                <span className="w-[3px] bg-[#1DB954] rounded-sm animate-[soundbar_0.8s_ease-in-out_infinite]" style={{ height: '100%', animationDelay: '200ms' }} />
                <span className="w-[3px] bg-[#1DB954] rounded-sm animate-[soundbar_0.8s_ease-in-out_infinite]" style={{ height: '40%', animationDelay: '400ms' }} />
                <span className="w-[3px] bg-[#1DB954] rounded-sm animate-[soundbar_0.8s_ease-in-out_infinite]" style={{ height: '80%', animationDelay: '600ms' }} />
              </div>
            )}
          </div>

          {/* Song Info */}
          <a 
            href={data.songUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block px-4 pb-2 group/link"
          >
            <div className="flex items-center gap-3">
              {/* Album Art */}
              {data.albumImageUrl && (
                <div className="relative flex-shrink-0">
                  <img 
                    src={data.albumImageUrl} 
                    alt={data.album}
                    className={`rounded-xl object-cover shadow-lg transition-all duration-500 ${
                      isHovered ? 'w-16 h-16' : 'w-12 h-12'
                    }`}
                  />
                  {/* Album Glow */}
                  <div className="absolute inset-0 rounded-xl bg-[#1DB954]/20 opacity-0 group-hover/link:opacity-100 transition-opacity blur-xl" />
                </div>
              )}
              
              {/* Track Details */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-center gap-2">
                  <p className={`font-semibold truncate transition-all duration-300 ${
                    isHovered ? 'text-sm text-foreground' : 'text-xs text-foreground/90'
                  }`}>
                    {data.title}
                  </p>
                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                </div>
                <p className={`text-muted-foreground truncate transition-all duration-300 ${
                  isHovered ? 'text-xs' : 'text-[11px]'
                }`}>
                  {data.artist}
                </p>
                {isHovered && data.album && (
                  <p className="text-[10px] text-muted-foreground/60 truncate mt-0.5">
                    {data.album}
                  </p>
                )}
              </div>
            </div>
          </a>

          {/* Progress Section */}
          <div className="px-4 pb-3">
            {/* Progress Bar */}
            <div className="relative h-1 bg-muted/30 rounded-full overflow-hidden">
              {/* Animated Progress */}
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
              {/* Glow effect on progress */}
              <div 
                className="absolute inset-y-0 left-0 bg-[#1DB954] rounded-full blur-sm opacity-50 transition-all duration-1000"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
            
            {/* Time Display */}
            <div className="flex justify-between items-center mt-1.5">
              <span className="text-[10px] text-muted-foreground/70 font-mono tabular-nums">
                {formatTime(currentProgress)}
              </span>
              <span className="text-[10px] text-muted-foreground/70 font-mono tabular-nums">
                {formatTime(data.duration || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Keyframes */}
      <style>{`
        @keyframes soundbar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SpotifyNowPlaying;
