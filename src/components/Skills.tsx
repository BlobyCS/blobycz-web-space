import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    { name: "JavaScript", level: 90, icon: "javascript", color: "from-yellow-400 to-yellow-600", status: "active" },
    { name: "Java", level: 75, icon: "java", color: "from-red-400 to-red-600", status: "2025-Pause" },
    { name: "TypeScript", level: 45, icon: "typescript", color: "from-blue-400 to-blue-600", status: "learning" },
  ];

  const tools = [
    { name: "VS Code", icon: "vscode" },
    { name: "Terminal", icon: "bash" },
    { name: "Linux", icon: "linux" },
    { name: "Docker", icon: "docker" },
    { name: "Node.js", icon: "nodejs" },
    { name: "TypeScript", icon: "typescript" },
    { name: "IntelliJ IDEA", icon: "idea" },
  ];

  return (
    <section id="skills" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background pointer-events-none" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-6xl mx-auto relative">
        <div ref={ref} className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Header */}
          <div className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Skills & Tools
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text">
              Technologie
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              Nástroje a jazyky, které používám k tvorbě projektů
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 150}ms`,
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Card Glow */}
                <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />
                
                <div className="relative p-8 bg-card/80 backdrop-blur-xl border border-border rounded-3xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full ${
                      skill.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      skill.status === '2025-Pause' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {skill.status}
                    </span>
                  </div>
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    <div className="relative w-20 h-20 flex items-center justify-center bg-muted/50 rounded-2xl border border-border group-hover:border-primary/30 transition-all duration-300">
                      <img
                        src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                        alt={skill.name}
                        className="w-12 h-12 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  
                  {/* Skill Info */}
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-bold text-xl">{skill.name}</h3>
                      <span className={`text-3xl font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-muted-foreground/10 to-transparent" />
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative`}
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 150 + 400}ms`
                        }}
                      >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tools Section */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-3xl blur-xl opacity-50" />
            <div className="relative p-10 bg-card/50 backdrop-blur-xl border border-border rounded-3xl">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-3 h-3 bg-gradient-to-r from-primary to-primary/50 rounded-full animate-pulse" />
                Co používám
                <span className="text-sm font-normal text-muted-foreground ml-2">({tools.length} nástrojů)</span>
              </h3>
              <div className="flex flex-wrap gap-4">
                {tools.map((tool, index) => (
                  <div
                    key={tool.name}
                    className="group relative"
                    style={{ 
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                      transitionDelay: `${index * 50 + 600}ms`,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {/* Tool Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                    
                    <div className="relative flex items-center gap-3 px-6 py-4 bg-background/80 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300">
                      <img
                        src={`https://skillicons.dev/icons?i=${tool.icon}&theme=dark`}
                        alt={tool.name}
                        className="w-7 h-7 group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">{tool.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
