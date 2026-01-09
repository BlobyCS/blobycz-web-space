import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";

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

const DEFAULT_PROJECTS: Project[] = [
  {
    title: "ZikyZone",
    description: "Moderní Discord bot s pokročilými funkcemi pro správu serverů a zábavu uživatelů.",
    tech: ["JavaScript", "Discord.js", "Node.js"],
    type: "Discord Bot",
    link: "https://github.com/Bloby22/ZikyZone",
    status: "active",
  },
];

const ProjectCard = ({ project, index, isVisible }: ProjectCardProps) => {
  const statusConfig = {
    active: { 
      bg: "bg-emerald-500/10", 
      text: "text-emerald-500", 
      border: "border-emerald-500/20",
      label: "Aktivní",
      dot: "bg-emerald-500"
    },
    completed: { 
      bg: "bg-blue-500/10", 
      text: "text-blue-500", 
      border: "border-blue-500/20",
      label: "Dokončeno",
      dot: "bg-blue-500"
    },
    archived: { 
      bg: "bg-gray-500/10", 
      text: "text-gray-500", 
      border: "border-gray-500/20",
      label: "Archivováno",
      dot: "bg-gray-500"
    },
  };

  const status = project.status ? statusConfig[project.status] : null;

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative perspective-1000"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 150}ms`,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Animated Border Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-2xl opacity-0 group-hover:opacity-75 blur-sm group-hover:animate-pulse transition-all duration-500" />
      
      {/* Card */}
      <div className="relative overflow-hidden p-8 bg-card/90 backdrop-blur-md border border-border rounded-2xl group-hover:border-transparent group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2 group-hover:scale-[1.02] transition-all duration-500 h-full flex flex-col">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-purple-500/0 opacity-0 group-hover:opacity-20 group-hover:animate-gradient-shift transition-all duration-700" />
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        </div>
        
        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/0 group-hover:border-primary/50 rounded-tl-2xl transition-all duration-500 group-hover:w-20 group-hover:h-20" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/0 group-hover:border-primary/50 rounded-br-2xl transition-all duration-500 group-hover:w-20 group-hover:h-20" />
        
        {/* Header */}
        <div className="relative flex items-start justify-between mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:scale-105 transition-all duration-300">
              <Sparkles className="w-3 h-3 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
              {project.type}
            </span>
            {status && (
              <span className={`inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-lg border group-hover:scale-105 transition-all duration-300 ${status.bg} ${status.text} ${status.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`} />
                {status.label}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {project.githubStars && (
              <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors duration-300">
                <Github className="w-3 h-3" />
                {project.githubStars}
              </span>
            )}
            <div className="p-2 bg-muted/50 rounded-lg group-hover:bg-primary group-hover:rotate-45 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-all duration-300" />
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div className="relative flex-grow">
          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="relative flex flex-wrap gap-2 pt-6 mt-6 border-t border-border/50 group-hover:border-primary/30 transition-colors duration-300">
          {project.tech.map((tech, techIndex) => (
            <span
              key={tech}
              className="text-xs px-3 py-1.5 bg-muted/50 text-muted-foreground font-mono rounded-lg group-hover:bg-primary/10 group-hover:text-primary group-hover:translate-y-[-2px] transition-all duration-300"
              style={{ transitionDelay: `${techIndex * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="projects" className="py-24 px-6 lg:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Projekty
            </h2>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {DEFAULT_PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
