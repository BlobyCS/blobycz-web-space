import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const skills = [
    { name: "JavaScript", level: 90, icon: "javascript", color: "from-yellow-400 to-yellow-600", status: "active" },
    { name: "TypeScript", level: 66, icon: "typescript", color: "from-blue-400 to-blue-600", status: "learning" },
  ];

  const tools = [
    { name: "VS Code", icon: "vscode" },
    { name: "Terminal", icon: "bash" },
    { name: "Linux", icon: "linux" },
    { name: "Node.js", icon: "nodejs" },
    { name: "TypeScript", icon: "typescript" },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, skillName: string) => {
    if (hoveredSkill === skillName) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
      });
    }
  };

  return (
    <section id="skills" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background pointer-events-none" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl animate-morph" />
      
      <div className="max-w-6xl mx-auto relative">
        <div ref={ref} className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Header */}
          <div className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm animate-shimmer">
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
                className="group relative perspective-1000"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => {
                  setHoveredSkill(null);
                  setMousePosition({ x: 0, y: 0 });
                }}
                onMouseMove={(e) => handleMouseMove(e, skill.name)}
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 150}ms`,
                  transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Animated Border Gradient */}
                <div className={`absolute -inset-[2px] rounded-3xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                  <div className="absolute inset-[2px] bg-card rounded-[22px]" />
                </div>
                
                {/* Card Glow */}
                <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700`} />
                
                <div 
                  className="relative p-8 bg-card/90 backdrop-blur-xl border border-border rounded-3xl hover:border-transparent hover:shadow-2xl transition-all duration-500"
                  style={{
                    transform: hoveredSkill === skill.name 
                      ? `rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) translateZ(20px)` 
                      : 'rotateX(0) rotateY(0) translateZ(0)',
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  {/* Shine Effect */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: hoveredSkill === skill.name 
                        ? `radial-gradient(600px circle at ${mousePosition.x * 10 + 50}% ${mousePosition.y * 10 + 50}%, rgba(255,255,255,0.1), transparent 40%)`
                        : 'none'
                    }}
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-sm ${
                      skill.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      skill.status === '2025-Pause' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      {skill.status}
                    </span>
                  </div>
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                    <div className="relative w-20 h-20 flex items-center justify-center bg-muted/50 rounded-2xl border border-border group-hover:border-primary/30 group-hover:bg-muted/80 transition-all duration-500 overflow-hidden">
                      {/* Icon Background Animation */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                      <img
                        src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                        alt={skill.name}
                        className="relative w-12 h-12 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500"
                      />
                    </div>
                  </div>
                  
                  {/* Skill Info */}
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300">{skill.name}</h3>
                      <span className={`text-3xl font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-muted-foreground/10 to-transparent" />
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 150 + 400}ms`
                        }}
                      >
                        {/* Animated Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
                      </div>
                    </div>
                    
                    {/* Floating Particles on Hover */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${skill.color} animate-float`}
                          style={{ animationDelay: `${i * 0.2}s`, animationDuration: `${2 + i * 0.3}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tools Section */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-3xl blur-xl opacity-50 animate-gradient-shift" />
            <div className="relative p-10 bg-card/50 backdrop-blur-xl border border-border rounded-3xl overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                  backgroundSize: '32px 32px'
                }} />
              </div>
              
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
                <span className="w-3 h-3 bg-gradient-to-r from-primary to-primary/50 rounded-full animate-pulse" />
                Co používám
                <span className="text-sm font-normal text-muted-foreground ml-2">({tools.length} nástrojů)</span>
              </h3>
              <div className="flex flex-wrap gap-4 relative z-10">
                {tools.map((tool, index) => (
                  <div
                    key={tool.name}
                    className="group relative"
                    style={{ 
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
                      transitionDelay: `${index * 80 + 600}ms`,
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {/* Tool Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-300 group-hover:scale-110" />
                    
                    <div className="relative flex items-center gap-3 px-6 py-4 bg-background/90 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 hover:scale-105 transition-all duration-300 group-hover:bg-background">
                      {/* Icon Glow */}
                      <div className="absolute left-4 w-10 h-10 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img
                        src={`https://skillicons.dev/icons?i=${tool.icon}&theme=dark`}
                        alt={tool.name}
                        className="relative w-7 h-7 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"
                      />
                      <span className="relative text-sm font-medium group-hover:text-primary transition-colors duration-300">{tool.name}</span>
                      
                      {/* Hover Arrow */}
                      <span className="absolute right-4 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary">
                        →
                      </span>
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
