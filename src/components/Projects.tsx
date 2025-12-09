import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowUpRight, Github } from "lucide-react";

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const projects = [
    {
      title: "ZikyZone",
      description: "Moderní Discord bot s pokročilými funkcemi pro správu serverů, moderaci a zábavu uživatelů.",
      tech: ["JavaScript", "Discord.js", "Node.js"],
      link: "https://github.com/Bloby22/ZikyZone",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      title: "InsaneKick",
      description: "Minecraft plugin přidávající nové funkce kickování hráčů s custom zprávami a efekty.",
      tech: ["Java", "Spigot API", "Minecraft"],
      link: "https://github.com/Bloby22/InsaneKick",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  return (
    <section id="projects" className="py-32 px-6 lg:px-12 relative">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-bold">
              Vybrané <span className="gradient-text">projekty</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative glass-card overflow-hidden hover:scale-[1.02] transition-all duration-500"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${index * 150}ms`,
                  transition: 'all 0.6s ease'
                }}
              >
                <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                      <Github className="w-6 h-6 text-white" />
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://github.com/bloby22"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
            >
              Zobrazit všechny projekty na GitHubu
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
