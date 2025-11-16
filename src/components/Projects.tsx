import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Projects = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  const projects = [
    {
      title: "ZikyZone",
      description: "Moderní Discord bot s pokročilými funkcemi pro správu serverů a zábavu uživatelů. Nabízí automatizaci, moderaci a interaktivní příkazy.",
      tech: ["JavaScript", "Discord.js", "Node.js"],
      type: "Discord Bot",
    },
    {
      title: "InsaneKick",
      description: "Minecraft plugin přidávající nové funkce a zlepšující herní zážitek. Optimalizované pro výkon a stabilitu serveru.",
      tech: ["Java", "Spigot API", "Minecraft"],
      type: "Minecraft Plugin",
    },
  ];

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto relative">
        {/* Figma-Style Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-24 space-y-4 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block px-4 py-2 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/30 mb-6">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
              Portfolio
            </p>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-text bg-clip-text text-transparent tracking-tighter">
            Projekty
          </h2>
        </div>

        {/* Projects Grid - Figma Cards */}
        <div ref={gridRef} className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative transition-all duration-1000 ${
                gridVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
              }`}
              style={{ transitionDelay: gridVisible ? `${index * 200}ms` : "0ms" }}
            >
              <Card className="relative p-10 bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-glow h-full rounded-3xl group-hover:bg-card/60 overflow-hidden group-hover:scale-[1.02]">
                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-xl"></div>
                </div>

                <div className="relative space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="inline-block px-3 py-1.5 bg-muted/40 border border-border/30 rounded-lg text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {project.type}
                      </div>
                      <h3 className="text-3xl font-black text-foreground/90 tracking-tight">
                        {project.title}
                      </h3>
                    </div>
                    <div className="p-2.5 bg-muted/30 rounded-xl group-hover:bg-gradient-primary/20 transition-all duration-300 border border-border/30">
                      <ExternalLink className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground/90 text-base leading-relaxed font-light">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-muted/30 backdrop-blur-xl border border-border/30 rounded-lg text-xs font-medium text-foreground/80 hover:bg-muted/50 hover:border-border/50 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
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

export default Projects;
