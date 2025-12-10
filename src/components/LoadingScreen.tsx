import React, { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onLoadComplete: () => void;
  minDisplayMs?: number;
}

const PACKAGES = [
  "@hookform/resolvers",
  "@radix-ui/react-accordion",
  "@radix-ui/react-alert-dialog",
  "@radix-ui/react-aspect-ratio",
  "@radix-ui/react-avatar",
  "@radix-ui/react-checkbox",
  "@radix-ui/react-collapsible",
  "@radix-ui/react-context-menu",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-hover-card",
  "@radix-ui/react-label",
  "@radix-ui/react-menubar",
  "@radix-ui/react-navigation-menu",
  "@radix-ui/react-popover",
  "@radix-ui/react-progress",
  "@radix-ui/react-radio-group",
  "@radix-ui/react-scroll-area",
  "@radix-ui/react-select",
  "@radix-ui/react-separator",
  "@radix-ui/react-slider",
  "@radix-ui/react-slot",
  "@radix-ui/react-switch",
  "@radix-ui/react-tabs",
  "@radix-ui/react-toast",
  "@radix-ui/react-toggle",
  "@radix-ui/react-toggle-group",
  "@radix-ui/react-tooltip",
  "@supabase/supabase-js",
  "@tanstack/react-query",
  "class-variance-authority",
  "clsx",
  "cmdk",
  "date-fns",
  "embla-carousel-react",
  "i18next",
  "i18next-browser-languagedetector",
  "input-otp",
  "lucide-react",
  "next-themes",
  "react",
  "react-day-picker",
  "react-dom",
  "react-hook-form",
  "react-i18next",
  "react-icons",
  "react-resizable-panels",
  "react-router-dom",
  "recharts",
  "sonner",
  "tailwind-merge",
  "tailwindcss-animate",
  "vaul",
  "zod",
  "@eslint/js",
  "@tailwindcss/typography",
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "@vitejs/plugin-react-swc",
  "autoprefixer",
  "eslint",
  "eslint-plugin-react-hooks",
  "eslint-plugin-react-refresh",
  "globals",
  "lovable-tagger",
  "postcss",
  "tailwindcss",
  "typescript",
  "typescript-eslint",
  "vite"
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete, minDisplayMs = 500 }) => {
  const [progress, setProgress] = useState(0);
  const [currentPackage, setCurrentPackage] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const intervalsRef = useRef<number[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
    let index = 0;
    let accumulatedProgress = 0;

    const clearAll = () => {
      intervalsRef.current.forEach(clearInterval);
      timeoutsRef.current.forEach(clearTimeout);
      intervalsRef.current = [];
      timeoutsRef.current = [];
    };

    const loadNext = () => {
      if (index >= PACKAGES.length) {
        const finish = () => {
          setProgress(100);
          const exitTimeout = window.setTimeout(() => {
            setIsExiting(true);
            const completeTimeout = window.setTimeout(onLoadComplete, 400);
            timeoutsRef.current.push(completeTimeout);
          }, 250);
          timeoutsRef.current.push(exitTimeout);
        };

        const elapsed = Date.now() - startTimeRef.current;
        if (elapsed < minDisplayMs) {
          const wait = minDisplayMs - elapsed;
          const t = window.setTimeout(finish, wait);
          timeoutsRef.current.push(t);
        } else {
          finish();
        }
        return;
      }

      const pkgName = PACKAGES[index];
      setCurrentPackage(pkgName);
      const packageLoadTime = 150 + Math.random() * 300;
      const targetProgress = Math.round(((index + 1) / PACKAGES.length) * 100);
      const stepMs = 50;
      const steps = Math.max(1, Math.floor(packageLoadTime / stepMs));
      const progressDelta = (targetProgress - accumulatedProgress) / steps;

      const intervalId = window.setInterval(() => {
        accumulatedProgress += progressDelta;
        setProgress(Math.min(100, Math.round(accumulatedProgress)));
      }, stepMs);
      intervalsRef.current.push(intervalId);

      const tId = window.setTimeout(() => {
        accumulatedProgress = targetProgress;
        setProgress(targetProgress);
        clearInterval(intervalId);
        index += 1;
        const gap = 30 + Math.random() * 120;
        const gapId = window.setTimeout(loadNext, gap);
        timeoutsRef.current.push(gapId);
      }, packageLoadTime);
      timeoutsRef.current.push(tId);
    };

    loadNext();

    return () => clearAll();
  }, [onLoadComplete, minDisplayMs]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center transition-opacity duration-300 ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-center mb-12 px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 select-none">
          Bloby<span className="text-primary">CZ</span>
        </h1>
      </div>
      <div className="w-64 md:w-80">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            aria-valuenow={Math.round(Math.min(Math.max(progress, 0), 100))}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          />
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground font-mono truncate max-w-[70%]" title={currentPackage}>
            {currentPackage ? <>Loading <span className="text-primary font-semibold">{currentPackage}</span>…</> : "Inicializuji…"}
          </span>
          <span className="text-muted-foreground font-mono font-semibold">{Math.round(Math.min(Math.max(progress, 0), 100))}%</span>
        </div>
      </div>
      <div className="mt-6 flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: `${i * 150}ms`, animationDuration: "900ms" }}
          />
        ))}
      </div>
      <span className="sr-only">
        {progress >= 100 ? "Načítání dokončeno." : `Načítám ${currentPackage || "zdroje"}. ${Math.round(progress)} procent.`}
      </span>
    </div>
  );
};

export default LoadingScreen;
