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
            setTimeout(onLoadComplete, 500);
          }, 200);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className={`fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center transition-all duration-500 ${isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}>
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          <span className="gradient-text">Bloby</span>
          <span>CZ</span>
        </h1>
        
        <div className="w-48 md:w-64 mx-auto">
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-200 ease-out" 
              style={{ width: `${Math.min(progress, 100)}%` }} 
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground font-mono">
            {Math.round(Math.min(progress, 100))}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
