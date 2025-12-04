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
      setErrorMessage(`Spotify error: ${error}`);
      console.error("Spotify authorization error:", error);
      return;
    }

    if (!code) {
      setStatus("error");
      setErrorMessage("Missing authorization code");
      return;
    }

    const exchangeCode = async () => {
      try {
        console.log("Exchanging code for tokens...");

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/spotify?action=callback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({ 
              code, 
              redirectUri: REDIRECT_URI 
            }),
          }
        );

        const data = await response.json();
        console.log("Response:", data);

        if (data.success && data.refreshToken) {
          setStatus("success");
          setRefreshToken(data.refreshToken);
        } else {
          throw new Error(data.error || "Failed to exchange code");
        }

      } catch (err) {
        console.error("Callback error:", err);
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Connection failed");
      }
    };

    exchangeCode();
  }, [navigate]);

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
              <p className="text-muted-foreground mb-4">Zkopíruj tento refresh token a ulož ho jako secret:</p>
              <div className="bg-muted/30 rounded-xl p-4 mb-4">
                <code className="text-xs text-green-400 break-all select-all">
                  {refreshToken}
                </code>
              </div>
              <p className="text-sm text-muted-foreground">
                Ulož jako <code className="text-primary">SPOTIFY_REFRESH_TOKEN</code>
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition"
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
              <h1 className="text-2xl font-bold mb-2">Chyba</h1>
              <p className="text-muted-foreground">{errorMessage || "Nepodařilo se připojit"}</p>
              <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition"
              >
                Zpět
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotifyCallback;
