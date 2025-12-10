import { useState, useEffect, useCallback, useRef } from "react";

type CursorStyle = "line" | "block" | "underscore" | "none";
type TypingMode = "loop" | "once" | "single";

interface TypingEffectProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  delayBeforeDelete?: number;
  cursorStyle?: CursorStyle;
  cursorColor?: string;
  showCursor?: boolean;
  loop?: boolean;
  mode?: TypingMode;
  startDelay?: number;
  randomizeSpeed?: boolean;
  onComplete?: () => void;
  onTextChange?: (text: string, index: number) => void;
  className?: string;
  cursorClassName?: string;
}

interface CursorConfig {
  width: string;
  height: string;
  shape: string;
}

const CURSOR_STYLES: Record<CursorStyle, CursorConfig> = {
  line: { width: "w-0.5", height: "h-6 sm:h-7", shape: "" },
  block: { width: "w-2", height: "h-6 sm:h-7", shape: "" },
  underscore: { width: "w-2", height: "h-0.5", shape: "self-end mb-1" },
  none: { width: "w-0", height: "h-0", shape: "hidden" },
};

const TypingEffect = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 2000,
  delayBeforeDelete = 1500,
  cursorStyle = "line",
  cursorColor,
  showCursor = true,
  loop = true,
  mode = "loop",
  startDelay = 0,
  randomizeSpeed = false,
  onComplete,
  onTextChange,
  className = "",
  cursorClassName = "",
}: TypingEffectProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const hasNotifiedComplete = useRef(false);

  // Get randomized speed
  const getSpeed = useCallback((baseSpeed: number): number => {
    if (!randomizeSpeed) return baseSpeed;
    const variation = baseSpeed * 0.3;
    return baseSpeed + (Math.random() * variation - variation / 2);
  }, [randomizeSpeed]);

  // Handle initial start delay
  useEffect(() => {
    if (startDelay > 0 && !isStarted) {
      const timeout = setTimeout(() => {
        setIsStarted(true);
      }, startDelay);
      return () => clearTimeout(timeout);
    } else {
      setIsStarted(true);
    }
  }, [startDelay, isStarted]);

  // Main typing effect
  useEffect(() => {
    if (!isStarted || isComplete) return;

    // Handle pause between texts
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        
        // Check if we should continue based on mode
        if (mode === "single" || (mode === "once" && currentTextIndex === texts.length - 1)) {
          setIsComplete(true);
          if (!hasNotifiedComplete.current) {
            onComplete?.();
            hasNotifiedComplete.current = true;
          }
        } else {
          setIsDeleting(true);
        }
      }, delayBeforeDelete);
      
      return () => clearTimeout(pauseTimeout);
    }

    const targetText = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        if (currentText.length < targetText.length) {
          const nextChar = targetText[currentText.length];
          setCurrentText(prev => prev + nextChar);
        } else {
          // Text complete - pause before deleting
          setIsPaused(true);
          onTextChange?.(targetText, currentTextIndex);
        }
      } else {
        // Deleting phase
        if (currentText.length > 0) {
          setCurrentText(prev => prev.slice(0, -1));
        } else {
          // Deletion complete - move to next text
          setIsDeleting(false);
          
          const nextIndex = (currentTextIndex + 1) % texts.length;
          setCurrentTextIndex(nextIndex);
          
          // Check if we completed the loop
          if (!loop && nextIndex === 0) {
            setIsComplete(true);
            if (!hasNotifiedComplete.current) {
              onComplete?.();
              hasNotifiedComplete.current = true;
            }
          }
          
          // Small delay before starting next text
          if (delayBetweenTexts > 0) {
            setTimeout(() => {}, delayBetweenTexts);
          }
        }
      }
    }, getSpeed(isDeleting ? deletingSpeed : typingSpeed));

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    isPaused,
    currentTextIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    delayBetweenTexts,
    delayBeforeDelete,
    loop,
    mode,
    isStarted,
    isComplete,
    getSpeed,
    onComplete,
    onTextChange,
  ]);

  // Get cursor configuration
  const cursorConfig = CURSOR_STYLES[showCursor ? cursorStyle : "none"];
  const cursorColorClass = cursorColor || "bg-primary";

  return (
    <span 
      className={`inline-flex items-center gap-1 ${className}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span 
        className="bg-gradient-text bg-clip-text text-transparent"
        aria-label={currentText}
      >
        {currentText}
      </span>
      
      {showCursor && (
        <span
          className={`inline-block ${cursorConfig.width} ${cursorConfig.height} ${cursorConfig.shape} ${cursorColorClass} ${
            isComplete ? "" : "animate-pulse"
          } ml-1 ${cursorClassName}`}
          aria-hidden="true"
        />
      )}
    </span>
  );
};

// Preset configurations for common use cases
export const TypingPresets = {
  fast: {
    typingSpeed: 50,
    deletingSpeed: 30,
    delayBetweenTexts: 1000,
    delayBeforeDelete: 1000,
  },
  normal: {
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenTexts: 2000,
    delayBeforeDelete: 1500,
  },
  slow: {
    typingSpeed: 150,
    deletingSpeed: 75,
    delayBetweenTexts: 3000,
    delayBeforeDelete: 2000,
  },
  realistic: {
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenTexts: 2000,
    delayBeforeDelete: 1500,
    randomizeSpeed: true,
  },
};

// Hook for external control
export const useTypingControl = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);
  const reset = useCallback(() => setIsReset(prev => !prev), []);

  return {
    isPaused,
    isReset,
    pause,
    resume,
    reset,
  };
};

export default TypingEffect;
