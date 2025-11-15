import { useEffect, useState } from "react";

const LoadingScreen = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Track real page load progress
    const updateProgress = () => {
      if (document.readyState === 'loading') {
        setProgress(33);
      } else if (document.readyState === 'interactive') {
        setProgress(66);
      } else if (document.readyState === 'complete') {
        setProgress(100);
        setIsLoaded(true);
      }
    };

    // Initial check
    updateProgress();

    // Listen for readyState changes
    document.addEventListener('readystatechange', updateProgress);
    
    // Fallback: ensure we complete after window load
    window.addEventListener('load', () => {
      setProgress(100);
      setIsLoaded(true);
    });

    return () => {
      document.removeEventListener('readystatechange', updateProgress);
    };
  }, []);

  useEffect(() => {
    if (isLoaded && progress === 100) {
      const timer = setTimeout(() => {
        onLoadComplete();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, progress, onLoadComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
      <div className="max-w-md w-full px-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-text bg-clip-text text-transparent">
          BlobyCZ Portfolio
        </h1>
        
        <div className="w-full bg-muted/20 rounded-full h-2 overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-center text-sm text-foreground/60">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
