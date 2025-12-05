import { useState, useEffect, useRef } from "react";
import { Music } from "lucide-react";

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
  const [isExpanded, setIsExpanded] = useState(false);
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

  // Real-time progress update
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

  if (!data || (!data.isPlaying && !data.error)) {
    return (
      <div 
        className="fixed bottom-6 right-6 z-40 rounded-xl p-3 cursor-pointer transition-all duration-300 hover:scale-105 bg-transparent border border-white/20"
        title="Nepřehrává se"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1DB954">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span className="text-xs font-medium text-white/60">Poslouchá na Spotify</span>
        </div>
      </div>
    );
  }

  if (data.error) {
    return null;
  }

  const progressPercent = data.duration 
    ? (currentProgress / data.duration) * 100 
    : 0;

  return (
    <div 
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        isExpanded ? 'w-80' : 'w-auto'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div 
        className="overflow-hidden transition-all duration-500 bg-transparent border border-white/20 rounded-xl"
        style={{
          boxShadow: isExpanded 
            ? '0 20px 40px -10px rgba(0, 0, 0, 0.4)' 
            : 'none',
        }}
      >
        {isExpanded ? (
          <a 
            href={data.songUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-4 hover:bg-white/5 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1DB954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#1DB954]">
                Poslouchá na Spotify
              </span>
              {data.isPlaying && (
                <div className="flex items-center gap-[3px] ml-auto">
                  <span className="w-[3px] h-3 bg-[#1DB954] rounded-full animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
                  <span className="w-[3px] h-4 bg-[#1DB954] rounded-full animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '150ms' }} />
                  <span className="w-[3px] h-2 bg-[#1DB954] rounded-full animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex items-center gap-3">
              {data.albumImageUrl && (
                <img 
                  src={data.albumImageUrl} 
                  alt={data.album}
                  className="w-14 h-14 rounded-lg shadow-lg object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-white/95">
                  {data.title}
                </p>
                <p className="text-xs text-white/60 truncate">
                  {data.artist}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1DB954] rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-white/40 font-medium tabular-nums">
                  {formatTime(currentProgress)}
                </span>
                <span className="text-[10px] text-white/40 font-medium tabular-nums">
                  {formatTime(data.duration || 0)}
                </span>
              </div>
            </div>
          </a>
        ) : (
          <div className="p-3 cursor-pointer flex items-center gap-3">
            {data.albumImageUrl ? (
              <img 
                src={data.albumImageUrl} 
                alt={data.album}
                className="w-10 h-10 rounded-lg shadow-md"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-transparent border border-white/10 flex items-center justify-center">
                <Music className="w-5 h-5 text-[#1DB954]" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-[#1DB954] uppercase tracking-wider">Poslouchá na Spotify</span>
              <span className="text-xs text-white/70 truncate max-w-[120px]">{data.title}</span>
            </div>
            <div className="flex items-center gap-[3px] ml-2">
              <span className="w-[3px] h-2 bg-[#1DB954] rounded-full animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
              <span className="w-[3px] h-3 bg-[#1DB954] rounded-full animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '150ms' }} />
              <span className="w-[3px] h-2 bg-[#1DB954] rounded-full animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyNowPlaying;
