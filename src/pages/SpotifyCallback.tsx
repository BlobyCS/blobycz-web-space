import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SpotifyCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");

    if (error) {
      setStatus("error");
      setErrorMessage(`Spotify error: ${error}`);
      console.error("Spotify authorization error:", error);
      setTimeout(() => navigate("/"), 3000);
      return;
    }

    if (!code) {
      setStatus("error");
      setErrorMessage("Missing authorization code");
      setTimeout(() => navigate("/"), 3000);
      return;
    }

    const sendCodeToBackend = async () => {
      try {
        console.log("Sending code to backend:", code);

        const response = await fetch("http://localhost:3000/api/auth/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error(`Backend error: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setStatus("success");
          console.log("Authorization successful!");
          
          setTimeout(() => {
            window.location.href = 'http://localhost:3000';
          }, 2000);
        } else {
          throw new Error(data.error || "Unknown error");
        }

      } catch (err) {
        console.error("Callback error:", err);
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Connection failed");
        setTimeout(() => navigate("/"), 3000);
      }
    };

    sendCodeToBackend();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Zpracovávám...</h1>
              <p className="text-muted-foreground">Připojuji se ke Spotify trackeru</p>
            </>
          )}
          
          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-2">Tracker běží!</h1>
              <p className="text-muted-foreground mb-2">Spotify tracking je aktivní</p>
              <p className="text-xs text-muted-foreground">Přesměrování na tracker...</p>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotifyCallback;
