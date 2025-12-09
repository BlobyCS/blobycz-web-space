import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GitCommit, Users, ExternalLink } from "lucide-react";
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
    <section className="py-32 px-6 lg:px-12 relative">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="inline-block text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">GitHub</span>
              <h2 className="text-4xl md:text-6xl font-bold">
                Moje <span className="gradient-text">aktivita</span>
              </h2>
            </div>
            <a 
              href="https://github.com/bloby22" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
            >
              Zobrazit profil <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="glass-card p-6 text-center">
              <GitCommit className="w-8 h-8 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold gradient-text mb-2">{stats?.public_repos || "—"}</div>
              <div className="text-muted-foreground">Veřejné repozitáře</div>
            </div>
            <div className="glass-card p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold mb-2">{stats?.followers || "—"}</div>
              <div className="text-muted-foreground">Followers</div>
            </div>
            <div className="glass-card p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold mb-2">{stats?.following || "—"}</div>
              <div className="text-muted-foreground">Following</div>
            </div>
          </div>
          
          <div className="glass-card p-8">
            <div className="text-sm text-muted-foreground mb-6 font-mono text-center">Contribution Graph</div>
            <img 
              src="https://ghchart.rshah.org/7c3aed/bloby22" 
              alt="GitHub Contribution Graph" 
              className="w-full dark:brightness-90" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;
