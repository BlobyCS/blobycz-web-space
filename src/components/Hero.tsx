import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative">
      <div ref={ref} className="max-w-6xl mx-auto text-center">
        <div className={`space-y-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Main Title - Figma Style */}
          <div className="relative inline-block">
            <div className="absolute -inset-8 bg-gradient-primary blur-[100px] opacity-20"></div>
            <h1 className="relative text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black mb-8 bg-gradient-text bg-clip-text text-transparent tracking-tighter leading-none">
              BlobyCZ
            </h1>
          </div>
          
          {/* Subtitle - Clean & Minimal */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl">
              <div className="w-2 h-2 rounded-full bg-gradient-primary animate-pulse"></div>
              <p className="text-xl sm:text-2xl text-foreground/90 font-semibold tracking-tight">
                Discord Bot Developer
              </p>
            </div>
            
            <div className="inline-block px-4 py-2 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/30">
              <p className="text-base text-muted-foreground font-medium">
                + Java Developer
              </p>
            </div>
          </div>
          
          {/* Description - Figma Typography */}
          <p className="text-lg sm:text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed font-light px-4">
            Vytvářím Discord boty a Minecraft pluginy s čistým kódem a moderním designem.
          </p>
          
          {/* CTA Buttons - Minimal & Clean */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center"
            >
              <div className="absolute -inset-0.5 bg-gradient-primary rounded-2xl opacity-75 group-hover:opacity-100 blur-sm transition duration-300"></div>
              <div className="relative px-8 py-4 bg-gradient-primary rounded-2xl font-semibold text-base transition-transform duration-300 group-hover:scale-[1.02]">
                Zobrazit projekty
              </div>
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center"
            >
              <div className="relative px-8 py-4 bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl font-semibold text-base hover:border-primary/30 hover:bg-card/70 transition-all duration-300">
                <span className="bg-gradient-text bg-clip-text text-transparent">
                  Kontakt
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
