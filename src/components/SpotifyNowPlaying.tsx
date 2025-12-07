import { useState, useEffect } from "react";
import { Music } from "lucide-react";

const SpotifyNowPlaying = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`brutal-card transition-all duration-300 ${isHovered ? "p-4" : "p-3"}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 border-2 border-primary">
            <Music className="w-4 h-4 text-primary" />
          </div>
          {isHovered && (
            <div className="transition-all duration-300">
              <div className="text-xs text-primary uppercase tracking-wider font-bold mb-1">Spotify</div>
              <div className="font-bold text-sm">Not Playing</div>
            </div>
          )}
          {!isHovered && <span className="text-xs font-bold uppercase tracking-wider text-primary">Music</span>}
        </div>
      </div>
    </div>
  );
};

export default SpotifyNowPlaying;