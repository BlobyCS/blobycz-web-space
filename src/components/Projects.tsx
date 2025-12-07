import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowUpRight } from "lucide-react";

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const projects = [
    {
      title: "ZikyZone",
      description: "Moderní Discord bot s pokročilými funkcemi pro správu serverů a zábavu uživatelů. Nabízí automatizaci, moderaci a interaktivní příkazy.",
      tech: ["JavaScript", "Discord.js", "Node.js"],
      type: "Discord Bot",
      number: "01",
    },
    {
      title: "InsaneKick",
      description: "Minecraft plugin přidávající nové funkce a zlepšující herní zážitek. Optimalizované pro výkon a stabilitu serveru.",
      tech: ["Java", "Spigot API", "Minecraft"],
      type: "Minecraft Plugin",
      number: "02",
    },
  ];

  return (
    <section id="projects" className="py-32 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-sm font-mono uppercase tracking-[0.3em] text-primary">
                [03] Portfolio
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                PROJEKTY
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md font-sans">
              Vybrané projekty, na kterých jsem pracoval. Každý projekt je unikátní výzva s vlastními požadavky.
            </p>
          </div>

          {/* Projects List */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group brutal-card cursor-pointer"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${index * 150}ms`,
                  transition: 'all 0.6s ease'
                }}
              >
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  {/* Number */}
                  <div className="md:col-span-1">
                    <span className="text-6xl font-bold text-muted-foreground/30 group-hover:text-primary transition-colors">
                      {project.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                        {project.type}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold group-hover:neon-text transition-all">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-sans">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 border-2 border-border text-sm font-bold uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="md:col-span-3 flex md:justify-end items-start">
                    <div className="p-4 border-2 border-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                      <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
