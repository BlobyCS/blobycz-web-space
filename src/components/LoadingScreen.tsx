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
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className={`fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${isExiting ? "opacity-0" : "opacity-100"}`}>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">
        <span className="text-foreground">BLOBY</span>
        <span className="neon-text">CZ</span>
      </h1>
      <div className="w-64 md:w-96">
        <div className="h-2 bg-border border-2 border-foreground">
          <div className="h-full bg-primary transition-all duration-200" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <div className="flex justify-between items-center mt-4 font-mono text-sm">
          <span className="text-muted-foreground">LOADING</span>
          <span className="neon-text font-bold">{Math.round(Math.min(progress, 100))}%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;