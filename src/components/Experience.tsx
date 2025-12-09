import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Briefcase } from "lucide-react";

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const experiences = [
    {
      title: "Discord Bot Developer",
      company: "Freelance",
      period: "2023 — Nyní",
      description: "Vývoj moderních Discord botů s pokročilými funkcemi pro správu, moderaci a engagement komunity.",
      highlights: ["10+ botů", "Custom commands", "Moderační systémy"]
    },
    {
      title: "Java Plugin Developer",
      company: "xTyping",
      period: "2023 — Nyní",
      description: "Vytváření custom Minecraft pluginů pro servery s unikátními herními mechanismy.",
      highlights: ["Spigot/Paper", "Custom gamemodes", "Optimalizace"]
    }
  ];

  return (
    <section className="py-32 px-6 lg:px-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">Zkušenosti</span>
            <h2 className="text-4xl md:text-6xl font-bold">
              Pracovní <span className="gradient-text">historie</span>
            </h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="glass-card p-8 hover:border-primary/30 transition-all duration-300"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${index * 150}ms`,
                  transition: 'all 0.6s ease'
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                        {exp.period}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight, i) => (
                        <span key={i} className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                          {highlight}
                        </span>
                      ))}
                    </div>
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
