import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface DownloadFile {
  id: string;
  filename: string;
  file_path: string;
  file_size: number | null;
  upload_date: string;
  description: string | null;
  is_active: boolean;
}

interface DownloadStat {
  file_id: string;
  filename: string;
  unique_downloads: number;
  total_downloads: number;
  countries_count: number;
  last_download: string | null;
}

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<DownloadFile[]>([]);
  const [stats, setStats] = useState<DownloadStat[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUser(user);

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      const hasAdminRole = roles?.some(r => r.role === "admin");
      setIsAdmin(hasAdminRole || false);

      if (hasAdminRole) {
        await loadFiles();
        await loadStats();
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFiles = async () => {
    const { data, error } = await supabase
      .from("download_files")
      .select("*")
      .order("upload_date", { ascending: false });

    if (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se načíst soubory",
        variant: "destructive"
      });
      return;
    }

    setFiles(data || []);
  };

  const loadStats = async () => {
    const { data, error } = await supabase
      .rpc("get_download_stats");

    if (error) {
      console.error("Stats error:", error);
      return;
    }

    setStats(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "N/A";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-bg">
        <div className="text-foreground">Načítání...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-bg p-4">
        <Card className="glass-effect max-w-md">
          <CardHeader>
            <CardTitle className="gradient-text">Přístup odepřen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Nemáte oprávnění pro přístup k admin panelu.</p>
            <div className="flex gap-2">
              <Button onClick={() => navigate("/")} variant="outline">
                Domů
              </Button>
              <Button onClick={handleLogout} variant="destructive">
                Odhlásit se
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold gradient-text">Admin Panel</h1>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/")} variant="outline">
              Domů
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              Odhlásit se
            </Button>
          </div>
        </div>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Soubory ke stažení</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Název souboru</TableHead>
                  <TableHead>Velikost</TableHead>
                  <TableHead>Stav</TableHead>
                  <TableHead>Datum nahrání</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      Žádné soubory
                    </TableCell>
                  </TableRow>
                ) : (
                  files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.filename}</TableCell>
                      <TableCell>{formatFileSize(file.file_size)}</TableCell>
                      <TableCell>
                        <Badge variant={file.is_active ? "default" : "secondary"}>
                          {file.is_active ? "Aktivní" : "Neaktivní"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(file.upload_date).toLocaleDateString("cs-CZ")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Statistiky stahování</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Soubor</TableHead>
                  <TableHead>Unikátní stažení</TableHead>
                  <TableHead>Celkem stažení</TableHead>
                  <TableHead>Zemí</TableHead>
                  <TableHead>Poslední stažení</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      Žádné statistiky
                    </TableCell>
                  </TableRow>
                ) : (
                  stats.map((stat) => (
                    <TableRow key={stat.file_id}>
                      <TableCell className="font-medium">{stat.filename}</TableCell>
                      <TableCell>{stat.unique_downloads}</TableCell>
                      <TableCell>{stat.total_downloads}</TableCell>
                      <TableCell>{stat.countries_count}</TableCell>
                      <TableCell>
                        {stat.last_download
                          ? new Date(stat.last_download).toLocaleDateString("cs-CZ")
                          : "Nikdy"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}