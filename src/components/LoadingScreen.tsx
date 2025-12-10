import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [currentPackage, setCurrentPackage] = useState("");

  const packages = [
    "react",
    "react-dom",
    "lucide-react",
    "react-icons",
    "tailwindcss",
    "framer-motion",
    "components",
    "assets",
    "styles",
  ];

  useEffect(() => {
    let currentPackageIndex = 0;
    let currentProgress = 0;

    // Simulace načítání každého package
    const loadPackage = () => {
      if (currentPackageIndex < packages.length) {
        setCurrentPackage(packages[currentPackageIndex]);
        
        const packageLoadTime = 200 + Math.random() * 300; // 200-500ms per package
        const progressIncrement = (100 / packages.length);
        
        const interval = setInterval(() => {
          currentProgress += progressIncrement / 10;
          setProgress(Math.min(currentProgress, (currentPackageIndex + 1) * progressIncrement));
        }, packageLoadTime / 10);

        setTimeout(() => {
          clearInterval(interval);
          currentPackageIndex++;
          if (currentPackageIndex < packages.length) {
            loadPackage();
          } else {
            // Všechny packages načteny
            setProgress(100);
            setTimeout(() => {
              setIsExiting(true);
              setTimeout(onLoadComplete, 400);
            }, 300);
          }
        }, packageLoadTime);
      }
    };

    loadPackage();
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center transition-opacity duration-400 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
          Bloby<span className="text-primary">CZ</span>
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          Načítání portfolia...
        </p>
      </div>

      <div className="w-64 md:w-80">
        {/* Progress Bar */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Progress Info */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground font-mono truncate max-w-[70%]">
            {currentPackage && (
              <>
                Loading <span className="text-primary">{currentPackage}</span>
                ...
              </>
            )}
          </span>
          <span className="text-muted-foreground font-mono font-semibold">
            {Math.round(Math.min(progress, 100))}%
          </span>
        </div>
      </div>

      {/* Loading Dots Animation */}
      <div className="mt-6 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 200}ms`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
