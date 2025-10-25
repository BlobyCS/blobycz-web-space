const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto text-center">
        <div className="animate-fade-in space-y-8">
          {/* Main Title with Gradient */}
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-primary blur-3xl opacity-30 animate-glow"></div>
            <h1 className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 bg-gradient-text bg-clip-text text-transparent tracking-tight">
              BlobyCZ
            </h1>
          </div>
          
          {/* Subtitle with Border */}
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-border rounded-2xl blur opacity-40"></div>
            <div className="relative bg-card/40 backdrop-blur-xl border border-primary/30 rounded-2xl px-8 py-4">
              <p className="text-2xl sm:text-3xl md:text-4xl text-foreground/90 font-semibold">
                Full Stack Developer
              </p>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Vytvářím moderní webové aplikace a Discord boty s využitím nejnovějších technologií.
            Specializuji se na čisté kódování a inovativní řešení.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <a
              href="#projects"
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-primary rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-glow"></div>
              <div className="relative px-10 py-5 bg-gradient-primary rounded-2xl font-bold text-lg shadow-glow hover:shadow-glow-strong transition-all duration-300 transform hover:scale-105">
                Zobrazit projekty
              </div>
            </a>
            <a
              href="#contact"
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-secondary rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative px-10 py-5 bg-card/60 backdrop-blur-xl border-2 border-primary/40 rounded-2xl font-bold text-lg hover:border-primary/60 transition-all duration-300 transform hover:scale-105">
                <span className="bg-gradient-text bg-clip-text text-transparent">
                  Kontaktovat
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
