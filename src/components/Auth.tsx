import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "./ui/use-toast";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Neplatná emailová adresa" }).max(255),
  password: z.string().min(6, { message: "Heslo musí mít alespoň 6 znaků" }).max(100)
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = authSchema.parse({ email, password });

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: validated.email,
          password: validated.password
        });

        if (error) throw error;

        toast({
          title: "Přihlášení úspěšné",
          description: "Byli jste úspěšně přihlášeni"
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email: validated.email,
          password: validated.password
        });

        if (error) throw error;

        toast({
          title: "Registrace úspěšná",
          description: "Můžete se nyní přihlásit"
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Chyba validace",
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Chyba",
          description: error instanceof Error ? error.message : "Něco se pokazilo",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-bg">
      <Card className="w-full max-w-md glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="gradient-text text-2xl">
            {isLogin ? "Přihlášení" : "Registrace"}
          </CardTitle>
          <CardDescription>
            {isLogin ? "Přihlaste se ke svému účtu" : "Vytvořte si nový účet"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                maxLength={100}
                className="glass-input"
              />
            </div>
            <Button
              type="submit"
              className="w-full gradient-button"
              disabled={loading}
            >
              {loading ? "Načítání..." : isLogin ? "Přihlásit se" : "Registrovat se"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? "Nemáte účet? Registrujte se" : "Už máte účet? Přihlaste se"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}