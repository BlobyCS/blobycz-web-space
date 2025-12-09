import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowUpRight } from "lucide-react";

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const projects = [
    {
      title: "ZikyZone",
      description: "Moderní Discord bot s pokročilými funkcemi pro správu serverů a zábavu uživatelů.",
      tech: ["JavaScript", "Discord.js", "Node.js"],
      type: "Discord Bot",
      link: "https://github.com/Bloby22/ZikyZone",
    },
    {
      title: "InsaneKick",
      description: "Minecraft plugin přidávající nové funkce a zlepšující herní zážitek.",
      tech: ["Java", "Spigot API", "Minecraft"],
      type: "Minecraft Plugin",
      link: "https://github.com/Bloby22/InsaneKick",
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 lg:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Projekty
            </h2>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 bg-card border border-border hover:border-primary/50 transition-all duration-300"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 150}ms`,
                  transition: 'all 0.5s ease'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary px-2 py-1 bg-primary/10">
                    {project.type}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-muted text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
