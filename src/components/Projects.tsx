import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowUpRight, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  type: string;
  link: string;
  githubStars?: number;
  status?: "active" | "completed" | "archived";
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

interface ProjectsProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
  animationDelay?: number;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    title: "ZikyZone",
    description: "Moderní Discord bot s pokročilými funkcemi pro správu serverů a zábavu uživatelů.",
    tech: ["JavaScript", "Discord.js", "Node.js"],
    type: "Discord Bot",
    link: "https://github.com/Bloby22/ZikyZone",
    status: "active",
  },
  {
    title: "InsaneKick",
    description: "Minecraft plugin přidávající nové funkce a zlepšující herní zážitek.",
    tech: ["Java", "Spigot API", "Minecraft"],
    type: "Minecraft Plugin",
    link: "https://github.com/Bloby22/InsaneKick",
    status: "completed",
  },
];

const ProjectCard = ({ project, index, isVisible }: ProjectCardProps) => {
  const statusColors = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    archived: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  };

  const statusLabels = {
    active: "Aktivní",
    completed: "Dokončeno",
    archived: "Archivováno",
  };

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 150}ms`,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      aria-label={`Otevřít projekt ${project.title} na GitHubu`}
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Card Content */}
      <div className="relative p-6 bg-card border border-border group-hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-wider text-primary px-2 py-1 bg-primary/10 border border-primary/20">
              {project.type}
            </span>
            {project.status && (
              <span className={`text-xs font-mono uppercase tracking-wider px-2 py-1 border ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {project.githubStars && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Github className="w-3 h-3" />
                {project.githubStars}
              </span>
            )}
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="flex-grow">
          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 bg-muted text-muted-foreground font-mono hover:bg-primary/10 hover:text-primary transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

const Projects = ({
  title = "Projekty",
  subtitle = "Portfolio",
  projects = DEFAULT_PROJECTS,
  animationDelay = 150,
}: ProjectsProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="projects"
      className="py-24 px-6 lg:px-12 relative"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <header className="mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
              {subtitle}
            </span>
            <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold tracking-tight">
              {title}
            </h2>
          </header>

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Zatím zde nejsou žádné projekty.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
