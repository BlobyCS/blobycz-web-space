import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GitCommit, Star, GitFork, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const GithubActivity = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [stats, setStats] = useState<{ public_repos: number; followers: number; following: number } | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/bloby22")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">GitHub</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Aktivita</h2>
            </div>
            <a 
              href="https://github.com/bloby22" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Zobrazit profil <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-6 bg-card border border-border rounded-lg text-center">
              <GitCommit className="w-6 h-6 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold text-primary mb-1">{stats?.public_repos || "—"}</div>
              <div className="text-sm text-muted-foreground">Veřejné repozitáře</div>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg text-center">
              <Star className="w-6 h-6 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold mb-1">{stats?.followers || "—"}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg text-center">
              <GitFork className="w-6 h-6 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold mb-1">{stats?.following || "—"}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
          </div>
          
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="text-sm text-muted-foreground mb-4 font-mono">Contribution Graph</div>
            <img 
              src="https://ghchart.rshah.org/22c55e/bloby22" 
              alt="GitHub Contribution Graph" 
              className="w-full dark:invert dark:brightness-90" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;