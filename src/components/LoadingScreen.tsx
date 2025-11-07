import { useEffect, useState } from "react";

const LoadingScreen = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          onLoadComplete();
        }, 500);
      }
      
      setProgress(Math.min(currentProgress, 100));
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
      <div className="max-w-md w-full px-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-text bg-clip-text text-transparent">
          BlobyCZ Portfolio
        </h1>
        
        <div className="w-full bg-muted/20 rounded-full h-2 overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-center text-sm text-foreground/60">
          {Math.floor(progress)}%
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
