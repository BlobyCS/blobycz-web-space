import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "ZikyZone",
      description: "Moderní Discord bot s pokročilými funkcemi pro správu serverů a zábavu uživatelů.",
      tech: ["JavaScript", "Discord.js", "Node.js"],
      type: "Discord Bot",
    },
    {
      title: "InsaneKick",
      description: "Minecraft plugin přidávající nové funkce a zlepšující herní zážitek.",
      tech: ["Java", "Spigot API", "Minecraft"],
      type: "Minecraft Plugin",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Mé Projekty
          </h2>
          <p className="text-muted-foreground text-lg">
            Podívejte se na mou práci
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="p-8 bg-gradient-card backdrop-blur-glass border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:scale-105 group animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm rounded-full mb-3">
                    {project.type}
                  </span>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
                <ExternalLink className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
              </div>
              <p className="text-muted-foreground mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-muted rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
