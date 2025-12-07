import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const experiences = [
    {
      title: "Discord Bot Developer",
      company: "Freelance",
      period: "2023 — Present",
      location: "Remote",
      description: "Vytváření moderních Discord botů s pokročilými funkcemi pro různé servery a komunity.",
      highlights: [
        "Vývoj 10+ botů pro různé klienty",
        "Implementace složitých moderačních systémů",
        "Optimalizace výkonu a scalability"
      ]
    },
    {
      title: "Java Plugin Developer",
      company: "xTyping",
      period: "2023 — Present",
      location: "Brno, CZ",
      description: "Vývoj custom Minecraft pluginů pro servery se zaměřením na výkon a uživatelský zážitek.",
      highlights: [
        "Tvorba custom game modes",
        "Práce s Spigot/Paper API",
        "Optimalizace pro velké servery"
      ]
    }
  ];

  return (
    <section className="py-32 px-6 lg:px-12 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-sm font-mono uppercase tracking-[0.3em] text-primary">
                [04] Kariéra
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                ZKUŠENOSTI
              </h2>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group border-l-4 border-border hover:border-primary pl-8 py-8 transition-colors relative"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                  transitionDelay: `${index * 150}ms`,
                  transition: 'all 0.6s ease'
                }}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[10px] top-10 w-4 h-4 bg-background border-4 border-border group-hover:border-primary transition-colors" />

                <div className="grid md:grid-cols-12 gap-8">
                  {/* Left - Meta */}
                  <div className="md:col-span-4 space-y-2">
                    <span className="text-sm font-mono text-primary uppercase tracking-wider">
                      {exp.period}
                    </span>
                    <h3 className="text-2xl font-bold">{exp.title}</h3>
                    <p className="text-muted-foreground font-sans">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.location}</p>
                  </div>

                  {/* Right - Content */}
                  <div className="md:col-span-8 space-y-4">
                    <p className="text-muted-foreground leading-relaxed font-sans">
                      {exp.description}
                    </p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-primary font-bold">→</span>
                          <span className="font-sans">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
