import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GitCommit, Star, GitFork, ExternalLink } from "lucide-react";
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
    },
    {
      icon: Star,
      value: stats?.followers || "—",
      label: "Followers",
    },
    {
      icon: GitFork,
      value: stats?.following || "—",
      label: "Following",
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
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
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
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              Zobrazit profil
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {statsData.map((stat, index) => (
              <div
                key={stat.label}
                className="p-6 bg-card border border-border rounded-lg text-center hover:border-primary/50 transition-all group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 100}ms`,
                  transition: "all 0.5s ease",
                }}
              >
                <stat.icon className="w-6 h-6 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-primary mb-1">
                  {loading ? (
                    <span className="inline-block w-12 h-8 bg-muted animate-pulse rounded" />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Contribution Graph */}
          <div
            className="p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "300ms",
              transition: "all 0.5s ease",
            }}
          >
            <div className="text-sm text-muted-foreground mb-4 font-mono">
              Contribution Graph
            </div>
            <div className="overflow-x-auto">
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
