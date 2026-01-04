import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const skills = [
    { name: "JavaScript", level: 90, icon: "javascript", color: "from-yellow-400 to-yellow-600" },
    { name: "Java", level: 75, icon: "java", color: "from-red-400 to-red-600" },
    { name: "TypeScript", level: 45, icon: "typescript", color: "from-blue-400 to-blue-600" },
    { name: "C# (Unity)", level: 30, icon: "cs", color: "from-purple-400 to-purple-600" },
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
    <section id="skills" className="py-24 px-6 lg:px-12 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <div ref={ref} className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Header */}
          <div className="mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              Skills & Tools
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Technologie
            </h2>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative p-6 bg-card/80 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      <img
                        src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                        alt={skill.name}
                        className="relative w-12 h-12"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{skill.name}</h3>
                      <span className="text-2xl font-bold text-primary">{skill.level}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 100 + 300}ms`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tools Section */}
          <div className="p-8 bg-card/50 backdrop-blur-sm border border-border rounded-2xl">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Co používám
            </h3>
            <div className="flex flex-wrap gap-4">
              {tools.map((tool, index) => (
                <div
                  key={tool.name}
                  className="group flex items-center gap-3 px-5 py-3 bg-background border border-border rounded-xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
                  style={{ 
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 50 + 500}ms`,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <img
                    src={`https://skillicons.dev/icons?i=${tool.icon}&theme=dark`}
                    alt={tool.name}
                    className="w-6 h-6"
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
