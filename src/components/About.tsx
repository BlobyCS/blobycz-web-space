const About = () => {
  return (
    <section id="about" className="py-32 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-text bg-clip-text text-transparent">
            O mně
          </h2>
          <div className="h-1 w-20 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        {/* Content Card */}
        <div className="relative group animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-primary rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          
          {/* Main card */}
          <div className="relative bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="space-y-6">
              {/* Greeting */}
              <p className="text-xl md:text-2xl font-semibold text-foreground">
                Ahoj, jsem <span className="bg-gradient-text bg-clip-text text-transparent">Bloby</span>.
              </p>
              
              {/* Main content */}
              <p className="text-lg text-foreground/80 leading-relaxed">
                Pocházím z Brna a mám rád technologie, hudbu a děláním smysluplných projektů. 
                Kóďím převážně v Javě a JavaScriptu - tvořím Minecraft pluginy, Discord boty a NPM balíčky. 
                Baví mě zkoušet nový věci a experimentovat s různými nápady.
              </p>

              {/* Decorative elements */}
              <div className="flex items-center gap-3 pt-4">
                <div className="h-1 flex-1 bg-gradient-primary rounded-full opacity-30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                <div className="w-2 h-2 rounded-full bg-primary/30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
