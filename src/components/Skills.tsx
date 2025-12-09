import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const skills = [
    { name: "JavaScript", level: 90, color: "from-yellow-400 to-yellow-600" },
    { name: "Java", level: 75, color: "from-orange-400 to-red-500" },
    { name: "TypeScript", level: 45, color: "from-blue-400 to-blue-600" },
    { name: "C# (Unity)", level: 30, color: "from-purple-400 to-purple-600" },
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
    <section id="skills" className="py-32 px-6 lg:px-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary/30 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">
              Technologie
            </span>
            <h2 className="text-4xl md:text-6xl font-bold">
              Moje <span className="gradient-text">dovednosti</span>
            </h2>
          </div>

          {/* Skills */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="glass-card p-6"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`,
                  transition: 'all 0.6s ease'
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                  <span className="text-2xl font-bold gradient-text">{skill.level}%</span>
                </div>
                
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 100 + 300}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold mb-6 text-center">Nástroje které používám</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {tools.map((tool, index) => (
                <div
                  key={tool.name}
                  className="group flex items-center gap-3 px-5 py-3 bg-secondary/50 rounded-2xl hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-default"
                  style={{ 
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                    transitionDelay: `${index * 50 + 400}ms`,
                    transition: 'all 0.4s ease'
                  }}
                >
                  <img
                    src={`https://skillicons.dev/icons?i=${tool.icon}&theme=dark`}
                    alt={tool.name}
                    className="w-6 h-6"
                  />
                  <span className="font-medium group-hover:text-primary transition-colors">{tool.name}</span>
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
