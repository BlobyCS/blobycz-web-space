import { useState, useEffect } from "react";
import { Music, Pause, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  const fetchNowPlaying = async () => {
    try {
      const { data: response, error } = await supabase.functions.invoke('spotify', {
        body: {},
        headers: {},
      });

      // Use query param approach
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
      }
    } catch (err) {
      console.error('Error fetching now playing:', err);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  if (!data || (!data.isPlaying && !data.error)) {
    return (
      <div 
        className="fixed top-20 right-4 z-40 bg-card/60 backdrop-blur-xl border border-border/50 rounded-full p-3 cursor-pointer hover:bg-card/80 transition-all"
        title="Not playing"
      >
        <Music className="w-5 h-5 text-muted-foreground" />
      </div>
    );
  }

  if (data.error) {
    return null;
  }

  const progressPercent = data.progress && data.duration 
    ? (data.progress / data.duration) * 100 
    : 0;

  return (
    <div 
      className={`fixed top-20 right-4 z-40 transition-all duration-300 ${
        isExpanded ? 'w-72' : 'w-auto'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden">
        {isExpanded ? (
          <a 
            href={data.songUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-3 hover:bg-card/80 transition-all"
          >
            <div className="flex items-center gap-3">
              {data.albumImageUrl && (
                <img 
                  src={data.albumImageUrl} 
                  alt={data.album}
                  className="w-12 h-12 rounded-lg shadow-lg"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {data.isPlaying ? (
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="w-1 h-4 bg-green-500 rounded-full animate-pulse delay-75" />
                      <span className="w-1 h-2 bg-green-500 rounded-full animate-pulse delay-150" />
                    </div>
                  ) : (
                    <Pause className="w-3 h-3 text-muted-foreground" />
                  )}
                  <span className="text-[10px] text-green-500 font-medium uppercase tracking-wider">
                    {data.isPlaying ? 'Now Playing' : 'Paused'}
                  </span>
                </div>
                <p className="text-sm font-medium truncate text-foreground">
                  {data.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {data.artist}
                </p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-2 h-1 bg-muted/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </a>
        ) : (
          <div className="p-3 cursor-pointer flex items-center gap-2">
            {data.albumImageUrl ? (
              <img 
                src={data.albumImageUrl} 
                alt={data.album}
                className="w-8 h-8 rounded-lg"
              />
            ) : (
              <Music className="w-5 h-5 text-green-500" />
            )}
            <div className="flex items-center gap-1">
              <span className="w-1 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="w-1 h-3 bg-green-500 rounded-full animate-pulse delay-75" />
              <span className="w-1 h-2 bg-green-500 rounded-full animate-pulse delay-150" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyNowPlaying;
