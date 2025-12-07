import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="about" className="py-32 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Left Column - Title */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-mono uppercase tracking-[0.3em] text-primary">
                [01] O mně
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9]">
                KDO<br />
                <span className="neon-text">JSEM</span>
              </h2>
            </div>

            {/* Quick Facts */}
            <div className="space-y-4 pt-8 border-t-2 border-border">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground uppercase text-sm tracking-wider">Lokace</span>
                <span className="font-bold">Brno, CZ</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground uppercase text-sm tracking-wider">Focus</span>
                <span className="font-bold">Backend / Bots</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground uppercase text-sm tracking-wider">Od roku</span>
                <span className="font-bold">2023</span>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="brutal-card">
            <div className="space-y-6">
              <p className="text-2xl font-bold leading-tight">
                Ahoj, jsem <span className="neon-text">Bloby</span>.
              </p>
              
              <p className="text-muted-foreground leading-relaxed font-sans">
                Pocházím z Brna a mám rád technologie, hudbu a dělání smysluplných projektů. 
                Kóďím převážně v Javě a JavaScriptu, tvořím Minecraft pluginy, Discord boty a NPM balíčky.
              </p>

              <p className="text-muted-foreground leading-relaxed font-sans">
                Baví mě zkoušet nové věci a experimentovat s různými nápady. Věřím v čistý kód, 
                dobře dokumentované projekty a spolehlivé řešení.
              </p>

              <div className="pt-6 border-t-2 border-border">
                <div className="flex flex-wrap gap-2">
                  {["Java", "JavaScript", "TypeScript", "Node.js", "Discord.js"].map((tech) => (
                    <span key={tech} className="px-3 py-1 border-2 border-foreground text-sm font-bold uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
