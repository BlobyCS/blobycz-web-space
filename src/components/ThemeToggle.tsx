import { useEffect, useState, useCallback } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

interface ThemeToggleProps {
  showSystemOption?: boolean;
  size?: number;
  variant?: "icon" | "text" | "dropdown";
  className?: string;
  storageKey?: string;
  onChange?: (theme: Theme) => void;
}

interface ThemeOption {
  value: Theme;
  label: string;
  icon: typeof Sun;
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: "light", label: "Světlý", icon: Sun },
  { value: "dark", label: "Tmavý", icon: Moon },
  { value: "system", label: "Systém", icon: Monitor },
];

const ThemeToggle = ({
  showSystemOption = false,
  size = 18,
  variant = "icon",
  className = "",
  storageKey = "theme",
  onChange,
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Get system preference
  const getSystemTheme = useCallback((): "light" | "dark" => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    const resolvedTheme = newTheme === "system" ? getSystemTheme() : newTheme;

    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Add transition for smooth theme change
    root.style.transition = "background-color 0.3s ease, color 0.3s ease";
    setTimeout(() => {
      root.style.transition = "";
    }, 300);
  }, [getSystemTheme]);

  // Initialize theme
  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;
    const prefersDark = getSystemTheme() === "dark";
    
    let initialTheme: Theme;
    
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      initialTheme = savedTheme;
    } else if (prefersDark) {
      initialTheme = "dark";
    } else {
      initialTheme = "light";
    }

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, [storageKey, getSystemTheme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      applyTheme("system");
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Legacy browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme, applyTheme]);

  // Toggle between themes
  const toggleTheme = useCallback(() => {
    const availableThemes: Theme[] = showSystemOption 
      ? ["light", "dark", "system"] 
      : ["light", "dark"];
    
    const currentIndex = availableThemes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    const newTheme = availableThemes[nextIndex];

    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
    onChange?.(newTheme);
  }, [theme, showSystemOption, applyTheme, storageKey, onChange]);

  // Select specific theme
  const selectTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
    setIsOpen(false);
    onChange?.(newTheme);
  }, [applyTheme, storageKey, onChange]);

  // Get current icon
  const getCurrentIcon = useCallback(() => {
    if (theme === "system") {
      return getSystemTheme() === "dark" ? Moon : Sun;
    }
    return theme === "dark" ? Moon : Sun;
  }, [theme, getSystemTheme]);

  // Prevent flash during SSR
  if (!mounted) {
    return (
      <div className={`p-2 ${className}`} style={{ width: size + 16, height: size + 16 }} />
    );
  }

  // Icon only variant (simple toggle)
  if (variant === "icon") {
    const Icon = getCurrentIcon();
    
    return (
      <button
        onClick={toggleTheme}
        className={`group relative p-2 text-muted-foreground hover:text-foreground transition-all duration-200 rounded-lg hover:bg-secondary ${className}`}
        aria-label={`Změnit téma (aktuálně: ${theme})`}
        title={`Změnit téma (aktuálně: ${theme})`}
      >
        <div className="relative">
          <Icon 
            size={size} 
            className="transition-transform duration-200 group-hover:rotate-12" 
          />
          {showSystemOption && theme === "system" && (
            <Monitor 
              size={size / 2} 
              className="absolute -bottom-1 -right-1 text-primary" 
            />
          )}
        </div>
      </button>
    );
  }

  // Text variant (button with label)
  if (variant === "text") {
    const Icon = getCurrentIcon();
    const currentOption = THEME_OPTIONS.find(opt => opt.value === theme);
    
    return (
      <button
        onClick={toggleTheme}
        className={`group flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 rounded-lg hover:bg-secondary ${className}`}
        aria-label={`Změnit téma (aktuálně: ${currentOption?.label})`}
      >
        <Icon 
          size={size} 
          className="transition-transform duration-200 group-hover:rotate-12" 
        />
        <span>{currentOption?.label}</span>
      </button>
    );
  }

  // Dropdown variant
  if (variant === "dropdown") {
    const options = showSystemOption 
      ? THEME_OPTIONS 
      : THEME_OPTIONS.filter(opt => opt.value !== "system");

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 rounded-lg hover:bg-secondary ${className}`}
          aria-label="Otevřít menu témat"
          aria-expanded={isOpen}
        >
          {(() => {
            const Icon = getCurrentIcon();
            return <Icon size={size} />;
          })()}
          <span className="text-sm">Téma</span>
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-36 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
              {options.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.value;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => selectTheme(option.value)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{option.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
};

export default ThemeToggle;
