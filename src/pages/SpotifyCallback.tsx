import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SpotifyCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    // Get the authorization code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");

    if (error) {
      setStatus("error");
      console.error("Spotify authorization error:", error);
      setTimeout(() => navigate("/"), 3000);
      return;
    }

    if (code) {
      // Here you would typically send the code to your backend
      // For now, we'll just show success and redirect
      setStatus("success");
      console.log("Spotify authorization code:", code);
      
      // Redirect to home after 2 seconds
      setTimeout(() => navigate("/"), 2000);
    } else {
      setStatus("error");
      setTimeout(() => navigate("/"), 3000);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
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
              <p className="text-muted-foreground">Spotify bylo úspěšně připojeno</p>
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
              <p className="text-muted-foreground">Nepodařilo se připojit ke Spotify</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotifyCallback;
