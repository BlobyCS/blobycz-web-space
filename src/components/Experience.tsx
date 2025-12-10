import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const experiences = [
    {
      title: "Discord Bot Developer",
      company: "Freelance",
      period: "2023 — Present",
      description:
        "Vytváření moderních Discord botů s pokročilými funkcemi.",
      highlights: ["10+ botů", "Moderační systémy", "Optimalizace výkonu"],
    },
    {
      title: "Java Plugin Developer",
      company: "xTyping",
      period: "2023 — Present",
      description: "Vývoj custom Minecraft pluginů pro servery.",
      highlights: ["Custom game modes", "Spigot/Paper API", "Optimalizace"],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 lg:px-12 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
              Kariéra
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Zkušenosti
            </h2>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transitionDelay: `${index * 150}ms`,
                  transition: "all 0.5s ease",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </div>
                  <span className="text-sm font-mono text-primary whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-muted rounded-md hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                    >
                      {highlight}
                    </span>
                  ))}
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
