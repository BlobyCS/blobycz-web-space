import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const quickFacts = [
    { label: "Lokace", value: "Brno, CZ" },
    { label: "Focus", value: "Backend / Bots" },
    { label: "Od roku", value: "2023" },
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
          className={`grid lg:grid-cols-2 gap-12 items-start transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Left Column - Title */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
                O mně
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Kdo jsem
              </h2>
            </div>

            {/* Quick Facts */}
            <div className="space-y-3 pt-6 border-t border-border">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex justify-between items-center py-2"
                >
                  <span className="text-muted-foreground text-sm">
                    {fact.label}
                  </span>
                  <span className="font-medium">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors">
            <div className="space-y-4">
              <p className="text-xl font-semibold">
                Ahoj, jsem <span className="text-primary">Bloby</span>.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Pocházím z Brna a mám rád technologie, hudbu a dělání
                smysluplných projektů. Kóďím převážně v Javě a JavaScriptu,
                tvořím Minecraft pluginy, Discord boty a NPM balíčky.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Baví mě zkoušet nové věci a experimentovat s různými nápady.
                Věřím v čistý kód, dobře dokumentované projekty a spolehlivé
                řešení.
              </p>

              <div className="pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-sm rounded-md hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
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
