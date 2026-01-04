import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Calendar, Code2 } from "lucide-react";

const About = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const quickFacts = [
    { label: "Lokace", value: "Brno, CZ", icon: MapPin },
    { label: "Focus", value: "Backend / Bots", icon: Code2 },
    { label: "Od roku", value: "2023", icon: Calendar },
  ];

  const technologies = [
    "Java",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Discord.js",
  ];

  return (
    <section id="about" className="py-24 px-6 lg:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Left Column - Title */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                O mně
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Kdo jsem
              </h2>
            </div>

            {/* Quick Facts */}
            <div className="space-y-4">
              {quickFacts.map((fact, index) => (
                <div
                  key={fact.label}
                  className="group flex items-center justify-between p-4 bg-card/50 border border-border rounded-xl hover:border-primary/30 transition-all duration-300"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transitionDelay: `${index * 100 + 200}ms`,
                    transition: 'all 0.5s ease'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <fact.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {fact.label}
                    </span>
                  </div>
                  <span className="font-semibold">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div 
            className="relative p-8 bg-card/80 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '300ms',
              transition: 'all 0.6s ease'
            }}
          >
            {/* Decorative Element */}
            <div className="absolute -top-3 -right-3 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
            
            <div className="relative space-y-6">
              <p className="text-2xl font-semibold leading-relaxed">
                Ahoj, jsem <span className="text-primary">Bloby</span>. 👋
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Pocházím z Brna a mám rád technologie, hudbu a dělání
                smysluplných projektů. Kóďím převážně v <span className="text-foreground font-medium">Javě</span> a <span className="text-foreground font-medium">JavaScriptu</span>,
                tvořím Minecraft pluginy, Discord boty a NPM balíčky.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Baví mě zkoušet nové věci a experimentovat s různými nápady.
                Věřím v čistý kód, dobře dokumentované projekty a spolehlivé
                řešení.
              </p>

              <div className="pt-6 border-t border-border">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">Technologie</p>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-muted/50 text-sm rounded-lg font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-default"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                        transitionDelay: `${index * 50 + 500}ms`,
                        transition: 'all 0.3s ease'
                      }}
                    >
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
