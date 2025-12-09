import { useState, useEffect } from "react";
import { Music, ExternalLink } from "lucide-react";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
}

const SpotifyNowPlaying = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [localProgress, setLocalProgress] = useState<number>(0);
  const [lastFetchTime, setLastFetchTime] = useState<number>(Date.now());

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        
        if (!supabaseUrl) {
          console.error('VITE_SUPABASE_URL is not defined');
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${supabaseUrl}/functions/v1/spotify?action=now-playing`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          setNowPlaying(data);
          if (data.progress !== undefined) {
            setLocalProgress(data.progress);
            setLastFetchTime(Date.now());
          }
        } else {
          console.error('Spotify API error:', response.status);
          setNowPlaying({ isPlaying: false });
        }
      } catch (error) {
        console.error('Spotify fetch error:', error);
        setNowPlaying({ isPlaying: false });
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!nowPlaying?.isPlaying || nowPlaying.progress === undefined) {
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
  }, [nowPlaying, lastFetchTime]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
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
  }

  const isActive = nowPlaying?.isPlaying;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg transition-all duration-300 ${
        isHovered && isActive ? "p-4 min-w-[280px]" : "p-3"
      }`}>
        <div className="flex items-center gap-3">
          {isActive && nowPlaying.albumImageUrl ? (
            <div className="relative flex-shrink-0">
              <img 
                src={nowPlaying.albumImageUrl} 
                alt="Album" 
                className={`object-cover rounded transition-all duration-300 ${
                  isHovered ? "w-12 h-12" : "w-10 h-10"
                }`}
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse" />
              </div>
            </div>
          ) : (
            <div className={`bg-muted flex items-center justify-center rounded transition-all duration-300 ${
              isHovered ? "w-12 h-12" : "w-10 h-10"
            }`}>
              <Music className={`text-muted-foreground transition-all duration-300 ${
                isHovered ? "w-6 h-6" : "w-5 h-5"
              }`} />
            </div>
          )}
          
          {isHovered ? (
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${
                  isActive ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
                }`} />
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {isActive ? 'Hraje' : 'Offline'}
                </span>
              </div>
              
              {isActive ? (
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
                  
                  {nowPlaying.duration && (
                    <div className="mt-2 space-y-1">
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-100"
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
                  <p className="text-xs text-muted-foreground/60">Nehraje</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isActive ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
              }`} />
              <div className="min-w-0">
                <span className="text-sm font-medium block truncate max-w-[120px]">
                  {isActive ? (nowPlaying.title || 'Spotify') : 'Spotify'}
                </span>
                {isActive && nowPlaying.artist && (
                  <span className="text-xs text-muted-foreground block truncate max-w-[120px]">
                    {nowPlaying.artist}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotifyNowPlaying;
