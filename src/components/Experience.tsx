import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Briefcase, Calendar } from "lucide-react";

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
  ];

  return (
    <section id="experience" className="py-24 px-6 lg:px-12 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/50 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <Briefcase className="w-3 h-3" />
              Kariéra
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Zkušenosti
            </h2>
          </div>

          {/* Timeline */}
          <div className="space-y-6 relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-border to-transparent hidden md:block" />
            
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 150}ms`,
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/20 hidden md:block z-10" />
                
                <div className="md:ml-16 p-6 bg-card/80 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-muted-foreground font-medium">{exp.company}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-mono text-primary whitespace-nowrap px-3 py-1 bg-primary/10 rounded-full">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="text-xs px-4 py-2 bg-muted/50 rounded-lg font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-default"
                      >
                        {highlight}
                      </span>
                    ))}
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
