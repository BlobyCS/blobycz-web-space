import { useEffect, useState } from "react";

const LoadingScreen = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedResources, setLoadedResources] = useState(0);
  const [totalResources, setTotalResources] = useState(0);

  useEffect(() => {
    // Count all resources to load
    const images = Array.from(document.images);
    const stylesheets = Array.from(document.styleSheets);
    const scripts = Array.from(document.scripts);
    
    const total = images.length + stylesheets.length + scripts.length;
    setTotalResources(total || 1); // Avoid division by zero
    
    let loaded = 0;
    
    const updateProgress = () => {
      loaded++;
      setLoadedResources(loaded);
      const calculatedProgress = Math.min((loaded / total) * 100, 100);
      setProgress(calculatedProgress);
      
      if (loaded >= total) {
        setIsLoaded(true);
      }
    };
    
    // Track image loading
    images.forEach((img) => {
      if (img.complete) {
        updateProgress();
      } else {
        img.addEventListener('load', updateProgress);
        img.addEventListener('error', updateProgress); // Count errors as loaded
      }
    });
    
    // Track document readyState
    const checkDocumentState = () => {
      if (document.readyState === 'complete') {
        // Add remaining count if not all resources fired events
        const remaining = total - loaded;
        if (remaining > 0) {
          loaded = total;
          setLoadedResources(total);
          setProgress(100);
          setIsLoaded(true);
        }
      }
    };
    
    document.addEventListener('readystatechange', checkDocumentState);
    window.addEventListener('load', checkDocumentState);
    
    // Initial check
    checkDocumentState();
    
    return () => {
      document.removeEventListener('readystatechange', checkDocumentState);
      images.forEach((img) => {
        img.removeEventListener('load', updateProgress);
        img.removeEventListener('error', updateProgress);
      });
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
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-text bg-clip-text text-transparent tracking-tight">
          Loading...
        </h1>
        
        <div className="w-full bg-muted/20 rounded-full h-2 overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-center text-sm text-foreground/60">
          {totalResources > 0 && `${loadedResources}/${totalResources} resources`}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
