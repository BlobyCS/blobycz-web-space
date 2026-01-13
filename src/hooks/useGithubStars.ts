import { useState, useEffect } from "react";

interface GithubStars {
  [repoName: string]: number | null;
}

export const useGithubStars = (repos: string[]) => {
  const [stars, setStars] = useState<GithubStars>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStars = async () => {
      const results: GithubStars = {};
      
      await Promise.all(
        repos.map(async (repoUrl) => {
          try {
            // Extract owner/repo from GitHub URL
            const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
            if (!match) {
              results[repoUrl] = null;
              return;
            }
            
            const [, owner, repo] = match;
            const response = await fetch(
              `https://api.github.com/repos/${owner}/${repo}`
            );
            
            if (response.ok) {
              const data = await response.json();
              results[repoUrl] = data.stargazers_count;
            } else {
              results[repoUrl] = null;
            }
          } catch {
            results[repoUrl] = null;
          }
        })
      );
      
      setStars(results);
      setLoading(false);
    };

    if (repos.length > 0) {
      fetchStars();
    } else {
      setLoading(false);
    }
  }, [repos.join(",")]);

  return { stars, loading };
};
