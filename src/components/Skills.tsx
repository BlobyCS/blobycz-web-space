import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const skills = [
    { name: "JavaScript", level: 90, icon: "javascript" },
    { name: "Java", level: 75, icon: "java" },
    { name: "TypeScript", level: 45, icon: "typescript" },
  ];

  return (
    <section id="skills" className="py-32 px-6 lg:px-12 relative bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-sm font-mono uppercase tracking-[0.3em] text-primary">
                [02] Technologie
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                SKILLS
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md font-sans">
              Nástroje a technologie, které používám k vytváření robustních a škálovatelných aplikací.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="brutal-card group"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`,
                  transition: 'all 0.5s ease'
                }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <img
                    src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                    alt={skill.name}
                    className="w-16 h-16 grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                {/* Name */}
                <h3 className="text-2xl font-bold mb-4">{skill.name}</h3>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="h-3 bg-muted border-2 border-foreground">
                    <div
                      className="h-full bg-primary transition-all duration-1000 ease-out"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100 + 300}ms`
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Úroveň</span>
                    <span className="text-2xl font-bold neon-text">{skill.level}%</span>
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

export default Skills;
