import { useState, useEffect } from "react";
import { Music, Pause } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('spotify', {
          body: {},
          headers: {},
        });
        
        // Parse the action from URL
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/spotify?action=now-playing`,
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
        }
      } catch (error) {
        console.error('Spotify fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

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

  return (
    <div 
      className="fixed bottom-6 right-6 z-50" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`bg-card/95 backdrop-blur-sm border border-border transition-all duration-300 ${
        isHovered && nowPlaying?.isPlaying ? "p-4 min-w-[280px]" : "p-3"
      }`}>
        <div className="flex items-center gap-3">
          {nowPlaying?.isPlaying && nowPlaying.albumImageUrl ? (
            <img 
              src={nowPlaying.albumImageUrl} 
              alt="Album" 
              className="w-10 h-10 object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-muted flex items-center justify-center">
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
                  {nowPlaying.progress && nowPlaying.duration && (
                    <div className="mt-2">
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${(nowPlaying.progress / nowPlaying.duration) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>{formatTime(nowPlaying.progress)}</span>
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