import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const skills = [
    { name: "JavaScript", level: 90, icon: "javascript" },
    { name: "Java", level: 75, icon: "java" },
    { name: "TypeScript", level: 45, icon: "typescript" },
    { name: "C# (Unity)", level: 30, icon: "cs" },
  ];

  const tools = [
    { name: "VS Code", icon: "vscode" },
    { name: "Terminal", icon: "bash" },
    { name: "Linux", icon: "linux" },
    { name: "Docker", icon: "docker" },
    { name: "Node.js", icon: "nodejs" },
    { name: "TypeScript", icon: "typescript" },
    { name: "IntelliJ IDEA", icon: "idea" },
    { name: "Unity", icon: "unity" },
  ];

  return (
    <section id="skills" className="py-24 px-6 lg:px-12 relative bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
              Skills & Tools
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Technologie
            </h2>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group p-6 bg-card border border-border hover:border-primary/50 transition-all duration-300"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`,
                  transition: 'all 0.5s ease'
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                    alt={skill.name}
                    className="w-10 h-10"
                  />
                  <h3 className="font-semibold">{skill.name}</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100 + 300}ms`
                      }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tools Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Co používám</h3>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool, index) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border hover:border-primary/50 transition-all duration-300"
                  style={{ 
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 50 + 500}ms`,
                    transition: 'all 0.4s ease'
                  }}
                >
                  <img
                    src={`https://skillicons.dev/icons?i=${tool.icon}&theme=dark`}
                    alt={tool.name}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
