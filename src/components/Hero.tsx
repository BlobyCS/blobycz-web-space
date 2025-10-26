const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Title */}
        <div className="animate-fade-up space-y-8">
          <div className="relative inline-block">
            <div className="absolute -inset-12 bg-gradient-primary opacity-20 blur-[120px]"></div>
            <h1 className="relative text-[clamp(3rem,15vw,12rem)] font-black bg-gradient-text bg-clip-text text-transparent tracking-tighter leading-none">
              BlobyCZ
            </h1>
          </div>
          
          {/* Role Tags */}
          <div className="flex flex-col items-center gap-4">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-primary opacity-50 blur-md group-hover:opacity-75 transition-opacity"></div>
              <div className="relative inline-flex items-center gap-3 px-8 py-4 bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl shadow-lg">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-primary animate-glow-pulse"></div>
                <p className="text-xl font-semibold bg-gradient-text bg-clip-text text-transparent">
                  Discord Bot Developer
                </p>
              </div>
            </div>
            
            <div className="px-6 py-2.5 bg-muted/50 backdrop-blur-sm rounded-xl border border-border/50">
              <p className="text-sm font-medium text-muted-foreground">
                + Java Developer
              </p>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-light">
            Vytvářím Discord boty a Minecraft pluginy s čistým kódem a moderním designem.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-primary blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <span className="relative px-8 py-4 font-semibold text-white rounded-2xl transition-transform group-hover:scale-[1.02]">
                Zobrazit projekty
              </span>
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl transition-all group-hover:border-primary/30 group-hover:bg-glass-hover"></div>
              <span className="relative px-8 py-4 font-semibold bg-gradient-text bg-clip-text text-transparent">
                Kontakt
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
