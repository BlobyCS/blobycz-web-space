import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const REDIRECT_URI = "https://bloby.eu/spotify/callback";

const SpotifyCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");

    if (error) {
      setStatus("error");
      setErrorMessage(`Spotify chyba: ${error}`);
      console.error("Spotify authorization error:", error);
      return;
    }

    if (!code) {
      setStatus("error");
      setErrorMessage("Chybí autorizační kód");
      return;
    }

    const exchangeCode = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl) {
          throw new Error("Chybí konfigurace VITE_SUPABASE_URL");
        }

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        // Přidej Authorization header pouze pokud je dostupný anon key
        if (anonKey) {
          headers["Authorization"] = `Bearer ${anonKey}`;
        }

        const response = await fetch(
          `${supabaseUrl}/functions/v1/spotify?action=callback`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({ 
              code, 
              redirectUri: REDIRECT_URI 
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        if (data.success && data.refreshToken) {
          setStatus("success");
          setRefreshToken(data.refreshToken);
        } else {
          throw new Error(data.error || "Nepodařilo se vyměnit kód za token");
        }

      } catch (err) {
        console.error("Callback error:", err);
        setStatus("error");
        setErrorMessage(
          err instanceof Error 
            ? err.message 
            : "Nepodařilo se připojit ke Spotify"
        );
      }
    };

    exchangeCode();
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(refreshToken);
      // Mohli bychom přidat toast notifikaci
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Zpracovávám...</h1>
              <p className="text-muted-foreground">Připojuji se ke Spotify</p>
            </>
          )}
          
          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-2">Úspěch!</h1>
              <p className="text-muted-foreground mb-4">
                Zkopíruj tento refresh token a ulož ho jako secret v Supabase:
              </p>
              <div className="bg-muted/30 rounded-xl p-4 mb-4 relative group">
                <code className="text-xs text-green-400 break-all select-all block">
                  {refreshToken}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-primary/20 hover:bg-primary/30 rounded text-xs"
                  title="Zkopírovat"
                >
                  Kopírovat
                </button>
              </div>
              <div className="text-left bg-muted/20 rounded-xl p-4 mb-4 text-sm">
                <p className="font-semibold mb-2">Jak nastavit:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Otevři Supabase Dashboard</li>
                  <li>Jdi do Settings → Edge Functions</li>
                  <li>Přidej secret: <code className="text-primary">SPOTIFY_REFRESH_TOKEN</code></li>
                  <li>Vlož zkopírovaný token</li>
                </ol>
              </div>
              <button
                onClick={() => navigate("/")}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition font-medium"
              >
                Zpět na hlavní stránku
              </button>
            </>
          )}
          
          {status === "error" && (
            <>
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-2">Chyba autorizace</h1>
              <p className="text-muted-foreground mb-2">{errorMessage}</p>
              <p className="text-xs text-muted-foreground/70 mb-4">
                Zkus to prosím znovu nebo zkontroluj konfiguraci Spotify API.
              </p>
              <button
                onClick={() => navigate("/")}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition font-medium"
              >
                Zpět na hlavní stránku
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotifyCallback;
