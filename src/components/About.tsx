import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Calendar, Code2 } from "lucide-react";

const About = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const facts = [
    { icon: MapPin, label: "Lokace", value: "Brno, Česko" },
    { icon: Code2, label: "Zaměření", value: "Backend & Bots" },
    { icon: Calendar, label: "Aktivní od", value: "2023" },
  ];

  return (
    <section id="about" className="py-32 px-6 lg:px-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">
              O mně
            </span>
            <h2 className="text-4xl md:text-6xl font-bold">
              Kdo stojí za <span className="gradient-text">projekty</span>
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Main Text */}
            <div className="lg:col-span-3 glass-card p-8">
              <p className="text-2xl font-semibold mb-6">
                Ahoj! Jsem <span className="gradient-text">Michal</span>, ale všichni mi říkají Bloby.
              </p>
              
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Pocházím z Brna a programování se věnuji od roku 2023. Mám rád technologie, 
                  hudbu a vytváření věcí, které mají smysl.
                </p>
                <p>
                  Specializuji se na Discord boty a Minecraft pluginy. Věřím v čistý, 
                  dobře dokumentovaný kód a spolehlivé řešení problémů.
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border/50">
                {["Java", "JavaScript", "TypeScript", "Node.js", "Discord.js", "Spigot"].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 bg-secondary rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Facts Cards */}
            <div className="lg:col-span-2 space-y-4">
              {facts.map((fact, index) => (
                <div 
                  key={fact.label}
                  className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                    transitionDelay: `${index * 150}ms`,
                    transition: 'all 0.6s ease'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <fact.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{fact.label}</div>
                      <div className="font-semibold text-lg">{fact.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
