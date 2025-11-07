import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let progress = 0;
    const startTime = performance.now();
    
    // Simulace loading s měřením rychlosti načítání
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        const loadTime = performance.now() - startTime;
        const connectionSpeed = loadTime < 1000 ? "Fast" : loadTime < 3000 ? "Normal" : "Slow";
        
        setTimeout(() => {
          Swal.close();
          setIsLoading(false);
        }, 300);
      }
      
      // Update progress bar
      const progressBar = document.getElementById('loading-progress');
      const progressText = document.getElementById('progress-text');
      if (progressBar && progressText) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        progressText.textContent = `${Math.floor(Math.min(progress, 100))}%`;
      }
    }, 100);

    // Show SweetAlert loading
    Swal.fire({
      title: 'BlobyCZ Portfolio',
      html: `
        <div class="w-full bg-muted/20 rounded-full h-2.5 overflow-hidden">
          <div id="loading-progress" class="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300" style="width: 0%"></div>
        </div>
        <p id="progress-text" class="mt-4 text-sm text-foreground/60">0%</p>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      background: 'hsl(var(--card))',
      color: 'hsl(var(--foreground))',
      customClass: {
        popup: 'backdrop-blur-xl border border-border/50',
      }
    });

    return () => {
      clearInterval(interval);
      Swal.close();
    };
  }, []);

  if (!isLoading) return null;

  return null;
};

export default LoadingScreen;
