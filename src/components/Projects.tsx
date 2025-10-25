import { Card } from "@/components/ui/card";
import { ExternalLink, Sparkles } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "ZikyZone",
      description: "Moderní Discord bot s pokročilými funkcemi pro správu serverů a zábavu uživatelů. Nabízí automatizaci, moderaci a interaktivní příkazy.",
      tech: ["JavaScript", "Discord.js", "Node.js"],
      type: "Discord Bot",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "InsaneKick",
      description: "Minecraft plugin přidávající nové funkce a zlepšující herní zážitek. Optimalizované pro výkon a stabilitu serveru.",
      tech: ["Java", "Spigot API", "Minecraft"],
      type: "Minecraft Plugin",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20 animate-fade-in">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-2 bg-gradient-secondary blur-2xl opacity-30"></div>
            <h2 className="relative text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-text bg-clip-text text-transparent">
              Mé Projekty
            </h2>
          </div>
          <p className="text-muted-foreground text-xl mt-4">
            Podívejte se na mou nejnovější práci
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Glowing Border */}
              <div className="absolute -inset-1 bg-gradient-border rounded-3xl opacity-40 group-hover:opacity-100 blur-lg transition duration-500 animate-glow"></div>
              
              <Card className="relative p-8 bg-gradient-card backdrop-blur-2xl border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 hover:shadow-glow-strong group-hover:-translate-y-2 h-full overflow-hidden rounded-3xl">
                {/* Shimmer Overlay */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="space-y-3 flex-1">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-xl text-sm font-semibold shadow-glow">
                        <Sparkles size={16} />
                        {project.type}
                      </div>
                      <h3 className="text-3xl font-black bg-gradient-text bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 origin-left">
                        {project.title}
                      </h3>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-xl group-hover:bg-gradient-primary group-hover:animate-float transition-all duration-300 border border-primary/20">
                      <ExternalLink className="text-foreground group-hover:text-foreground transition-colors" size={24} />
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-muted/40 backdrop-blur-xl border border-primary/20 rounded-xl text-sm font-medium hover:bg-muted/60 hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-default"
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
