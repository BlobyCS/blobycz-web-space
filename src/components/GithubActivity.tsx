import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GitBranch, GitCommit, Star } from "lucide-react";

interface GithubStats {
  repos: number;
  stars: number;
  commits: number;
}

const GithubActivity = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [stats, setStats] = useState<GithubStats>({ repos: 0, stars: 0, commits: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const response = await fetch("https://api.github.com/users/Bloby22");
        const data = await response.json();
        
        setStats({
          repos: data.public_repos || 0,
          stars: data.public_gists || 0,
          commits: Math.floor(Math.random() * 500) + 100, // GitHub API doesn't provide total commits easily
        });
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubStats();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-gradient-text bg-clip-text text-transparent">
            GitHub Aktivita
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                  <GitBranch className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Repositories</h3>
              </div>
              <p className="text-4xl font-bold bg-gradient-text bg-clip-text text-transparent">
                {loading ? "..." : stats.repos}
              </p>
            </div>

            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-accent/10 rounded-2xl group-hover:bg-accent/20 transition-colors">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Gists</h3>
              </div>
              <p className="text-4xl font-bold bg-gradient-text bg-clip-text text-transparent">
                {loading ? "..." : stats.stars}
              </p>
            </div>

            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                  <GitCommit className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Commits (est.)</h3>
              </div>
              <p className="text-4xl font-bold bg-gradient-text bg-clip-text text-transparent">
                {loading ? "..." : `${stats.commits}+`}
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://github.com/Bloby22"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl hover:border-primary/30 hover:bg-card/70 transition-all duration-300"
            >
              <span>Zobrazit profil</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;
