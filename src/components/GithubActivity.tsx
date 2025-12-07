import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GitCommit, Star, GitFork } from "lucide-react";
import { useEffect, useState } from "react";

const GithubActivity = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [stats, setStats] = useState<{ public_repos: number; followers: number; following: number } | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/bloby22").then((res) => res.json()).then(setStats).catch(console.error);
  }, []);

  return (
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-sm font-mono uppercase tracking-[0.3em] text-primary">[—] GitHub</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">AKTIVITA</h2>
            </div>
            <a href="https://github.com/bloby22" target="_blank" rel="noopener noreferrer" className="brutal-outline inline-block text-center">Profil →</a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="brutal-card text-center">
              <GitCommit className="w-8 h-8 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold neon-text mb-2">{stats?.public_repos || "—"}</div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground">Veřejné repozitáře</div>
            </div>
            <div className="brutal-card text-center">
              <Star className="w-8 h-8 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold mb-2">{stats?.followers || "—"}</div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground">Followers</div>
            </div>
            <div className="brutal-card text-center">
              <GitFork className="w-8 h-8 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold mb-2">{stats?.following || "—"}</div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground">Following</div>
            </div>
          </div>
          <div className="mt-8 brutal-card">
            <div className="text-sm text-muted-foreground mb-4 font-mono uppercase tracking-wider">Contribution Graph</div>
            <img src="https://ghchart.rshah.org/22c55e/bloby22" alt="GitHub Contribution Graph" className="w-full dark:invert dark:brightness-90" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;