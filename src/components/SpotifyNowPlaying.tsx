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
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center rounded-xl animate-pulse">
              <Music className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-sm text-slate-400">Načítání...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed bottom-8 right-8 z-50 group" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl transition-all duration-500 ease-out ${
        isHovered && nowPlaying?.isPlaying 
          ? "p-5 min-w-[320px] shadow-green-500/10" 
          : "p-4 hover:shadow-green-500/5"
      }`}>
        <div className="flex items-start gap-4">
          {nowPlaying?.isPlaying && nowPlaying.albumImageUrl ? (
            <div className="relative flex-shrink-0">
              <img 
                src={nowPlaying.albumImageUrl} 
                alt="Album" 
                className={`object-cover rounded-xl shadow-lg transition-all duration-500 ${
                  isHovered ? "w-16 h-16 shadow-green-500/20" : "w-12 h-12"
                }`}
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          ) : (
            <div className={`bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center rounded-xl transition-all duration-500 ${
              isHovered ? "w-16 h-16" : "w-12 h-12"
            }`}>
              <Music className={`text-slate-400 transition-all duration-500 ${
                isHovered ? "w-8 h-8" : "w-6 h-6"
              }`} />
            </div>
          )}
          
          {isHovered ? (
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${
                  nowPlaying?.isPlaying 
                    ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-pulse' 
                    : 'bg-slate-500'
                }`} />
                <span className="text-xs font-bold text-green-400 uppercase tracking-widest">
                  {nowPlaying?.isPlaying ? 'Právě hraje' : 'Offline'}
                </span>
              </div>
              
              {nowPlaying?.isPlaying ? (
                <div className="space-y-2">
                  <div className="group/link">
                    <a 
                      href={nowPlaying.songUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-bold text-base text-white truncate block hover:text-green-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="truncate">{nowPlaying.title}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                  </div>
                  <p className="text-sm text-slate-400 truncate font-medium">{nowPlaying.artist}</p>
                  
                  {nowPlaying.duration && (
                    <div className="mt-4 space-y-2">
                      <div className="relative h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full shadow-lg shadow-green-500/50 transition-all duration-100"
                          style={{ width: `${Math.min((localProgress / nowPlaying.duration) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-mono tabular-nums">
                          {formatTime(localProgress)}
                        </span>
                        <span className="text-xs text-slate-600 font-mono tabular-nums">
                          {formatTime(nowPlaying.duration)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-base font-bold text-slate-400">Spotify</p>
                  <p className="text-xs text-slate-600 mt-1">Momentálně nehraje nic</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 pt-1">
              <div className={`w-2 h-2 rounded-full ${
                nowPlaying?.isPlaying 
                  ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-pulse' 
                  : 'bg-slate-500'
              }`} />
              <div>
                <span className="text-sm font-bold text-white block">
                  {nowPlaying?.isPlaying ? (nowPlaying.title || 'Spotify') : 'Spotify'}
                </span>
                {nowPlaying?.isPlaying && nowPlaying.artist && (
                  <span className="text-xs text-slate-400 block truncate max-w-[150px]">
                    {nowPlaying.artist}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Spotify Logo Badge */}
      <div className="absolute -top-2 -left-2 bg-green-500 text-white px-2 py-1 rounded-full text-[10px] font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        SPOTIFY
      </div>
    </div>
  );
};

export default SpotifyNowPlaying;
