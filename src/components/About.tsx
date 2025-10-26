const About = () => {
  return (
    <section id="about" className="py-32 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-text bg-clip-text text-transparent">
            O mně
          </h2>
          <div className="h-1 w-16 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        {/* Content Card */}
        <div className="group relative animate-scale-in">
          {/* Glow Background */}
          <div className="absolute -inset-1 bg-gradient-primary rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
          
          {/* Main Card */}
          <div className="relative bg-glass-bg backdrop-blur-xl border border-glass-border rounded-3xl p-10 md:p-14 shadow-xl transition-all duration-300 group-hover:border-primary/20">
            <div className="space-y-8">
              {/* Greeting */}
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                Ahoj, jsem <span className="bg-gradient-text bg-clip-text text-transparent">Bloby</span>.
              </p>
              
              {/* Main Content */}
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Pocházím z Brna a mám rád technologie, hudbu a dělání smysluplných projektů. 
                Kóďím převážně v Javě a JavaScriptu, tvořím Minecraft pluginy, Discord boty a NPM balíčky. 
                Baví mě zkoušet nové věci a experimentovat s různými nápady.
              </p>

              {/* Decorative Line */}
              <div className="flex items-center gap-4 pt-6">
                <div className="h-px flex-1 bg-gradient-primary opacity-20"></div>
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
                </div>
                <div className="h-px flex-1 bg-gradient-primary opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
