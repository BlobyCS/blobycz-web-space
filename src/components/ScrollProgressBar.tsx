import { useEffect, useState } from "react";

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress((scrolled / windowHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-transparent z-[100]">
      <div 
        className="h-full bg-gradient-to-r from-primary via-primary to-primary/50 shadow-sm shadow-primary/20 transition-all duration-150" 
        style={{ width: `${progress}%` }} 
      />
    </div>
  );
};

export default ScrollProgressBar;
