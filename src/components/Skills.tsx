import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Skills = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  const skills = [
    {
      name: "JavaScript",
      level: 90,
      icon: "javascript",
    },
    {
      name: "Java",
      level: 75,
      icon: "java",
    },
    {
      name: "TypeScript",
      level: 45,
      icon: "typescript",
    },
  ];

  return (
    <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Figma-Style Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-24 space-y-4 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block px-4 py-2 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/30 mb-6">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
              Technologie
            </p>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-text bg-clip-text text-transparent tracking-tighter">
            Dovednosti
          </h2>
        </div>

        {/* Skills Grid - Figma Cards */}
        <div ref={gridRef} className="grid gap-6 md:grid-cols-3">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group relative transition-all duration-700 ${
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: gridVisible ? `${index * 150}ms` : "0ms" }}
            >
              <Card className="relative p-8 bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg h-full rounded-3xl group-hover:bg-card/60">
                <div className="relative flex flex-col items-center text-center space-y-6">
                  {/* Icon with subtle glow */}
                  <div className="relative">
                    <div className="absolute -inset-3 bg-gradient-primary rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
                    <img
                      src={`https://skillicons.dev/icons?i=${skill.icon}`}
                      alt={skill.name}
                      className="relative w-20 h-20 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Skill Name */}
                  <h3 className="text-2xl font-bold text-foreground/90">
                    {skill.name}
                  </h3>
                  
                  {/* Progress Bar - Minimal */}
                  <div className="w-full space-y-3">
                    <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        Úroveň
                      </span>
                      <span className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
