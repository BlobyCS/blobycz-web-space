import { useEffect, useState } from "react";

const LoadingScreen = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onLoadComplete, 400);
          }, 200);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className={`fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center transition-opacity duration-400 ${isExiting ? "opacity-0" : "opacity-100"}`}>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
        Bloby<span className="text-primary">CZ</span>
      </h1>
      <div className="w-48 md:w-64">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-150 ease-out" 
            style={{ width: `${Math.min(progress, 100)}%` }} 
          />
        </div>
        <div className="flex justify-center mt-3">
          <span className="text-xs text-muted-foreground font-mono">
            {Math.round(Math.min(progress, 100))}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
