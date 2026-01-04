import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GitCommit, Star, GitFork, ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

const GithubActivity = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/bloby22")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("GitHub API Error:", error);
        setLoading(false);
      });
  }, []);

  const statsData = [
    {
      icon: GitCommit,
      value: stats?.public_repos || "—",
      label: "Veřejné repozitáře",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Star,
      value: stats?.followers || "—",
      label: "Followers",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: GitFork,
      value: stats?.following || "—",
      label: "Following",
      color: "from-blue-500 to-blue-600",
    },
  ];

  return (
    <section id="github" className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                <Github className="w-3 h-3" />
                GitHub
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Aktivita
              </h2>
            </div>
            <a
              href="https://github.com/bloby22"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-card border border-border rounded-xl hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              Zobrazit profil
              <ExternalLink className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative p-8 bg-card/80 backdrop-blur-sm border border-border rounded-2xl text-center hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 100}ms`,
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="inline-flex p-4 mb-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    {loading ? (
                      <span className="inline-block w-16 h-10 bg-muted animate-pulse rounded-lg" />
                    ) : (
                      <span className="bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contribution Graph */}
          <div
            className="p-8 bg-card/80 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/30 transition-all duration-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "300ms",
              transition: "all 0.5s ease",
            }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 font-mono">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Contribution Graph
            </div>
            <div className="overflow-x-auto rounded-xl">
              <img
                src="https://ghchart.rshah.org/22c55e/bloby22"
                alt="GitHub Contribution Graph"
                className="w-full min-w-[600px] dark:invert dark:brightness-90"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;
