import { useState, useEffect } from "react";
import { Music } from "lucide-react";

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

  // Aktualizuj progress každých 100ms když hraje
  useEffect(() => {
    if (!nowPlaying?.isPlaying || nowPlaying.progress === undefined) {
      return;
    }

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - lastFetchTime;
      const newProgress = (nowPlaying.progress || 0) + elapsed;
      
      // Nepřekroč duration
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
        <div className="bg-card/95 backdrop-blur-sm border border-border p-3 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted flex items-center justify-center rounded animate-pulse">
              <Music className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">Načítání...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed bottom-6 right-6 z-50" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`bg-card/95 backdrop-blur-sm border border-border transition-all duration-300 rounded-lg ${
        isHovered && nowPlaying?.isPlaying ? "p-4 min-w-[280px]" : "p-3"
      }`}>
        <div className="flex items-center gap-3">
          {nowPlaying?.isPlaying && nowPlaying.albumImageUrl ? (
            <img 
              src={nowPlaying.albumImageUrl} 
              alt="Album" 
              className="w-10 h-10 object-cover rounded"
            />
          ) : (
            <div className="w-10 h-10 bg-muted flex items-center justify-center rounded">
              <Music className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
          
          {isHovered ? (
            <div className="flex-1 min-w-0">
              <div className="text-xs text-primary uppercase tracking-wider font-medium mb-1 flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${nowPlaying?.isPlaying ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
                {nowPlaying?.isPlaying ? 'Hraje' : 'Nehraje'}
              </div>
              {nowPlaying?.isPlaying ? (
                <>
                  <a 
                    href={nowPlaying.songUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold text-sm truncate block hover:text-primary transition-colors"
                  >
                    {nowPlaying.title}
                  </a>
                  <p className="text-xs text-muted-foreground truncate">{nowPlaying.artist}</p>
                  {nowPlaying.duration && (
                    <div className="mt-2">
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-100"
                          style={{ width: `${Math.min((localProgress / nowPlaying.duration) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>{formatTime(localProgress)}</span>
                        <span>{formatTime(nowPlaying.duration)}</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Spotify</p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${nowPlaying?.isPlaying ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
              <span className="text-xs font-medium">
                {nowPlaying?.isPlaying ? 'Hraje' : 'Spotify'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotifyNowPlaying;
