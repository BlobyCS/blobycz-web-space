import { useState, useEffect } from "react";
import { Menu, X, Github, Instagram } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 bg-background/10 backdrop-blur-md border border-border/20 rounded-2xl mt-4 px-6">
          <div className="text-xl font-bold bg-gradient-text bg-clip-text text-transparent">
            BlobyCZ
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-4 py-2 text-foreground/60 hover:text-foreground transition-colors text-sm font-medium rounded-lg hover:bg-muted/10"
              >
                Domů
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="px-4 py-2 text-foreground/60 hover:text-foreground transition-colors text-sm font-medium rounded-lg hover:bg-muted/10"
              >
                O mě
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="px-4 py-2 text-foreground/60 hover:text-foreground transition-colors text-sm font-medium rounded-lg hover:bg-muted/10"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="px-4 py-2 text-foreground/60 hover:text-foreground transition-colors text-sm font-medium rounded-lg hover:bg-muted/10"
              >
                Projekty
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 py-2 text-foreground/60 hover:text-foreground transition-colors text-sm font-medium rounded-lg hover:bg-muted/10"
              >
                Kontakt
              </button>
            </div>
            
            <div className="flex items-center gap-2 pl-4 border-l border-border/30">
              <a
                href="https://github.com/bloby22"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/60 hover:text-foreground transition-colors rounded-lg hover:bg-muted/10"
              >
                <Github size={20} />
              </a>
              <a
                href="https://discord.com/users/1178258199590228078"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/60 hover:text-foreground transition-colors rounded-lg hover:bg-muted/10"
              >
                <SiDiscord size={20} />
              </a>
              <a
                href="https://instagram.com/blobycz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/60 hover:text-foreground transition-colors rounded-lg hover:bg-muted/10"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Theme Toggle - Desktop */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2 hover:bg-muted/20 rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/10 backdrop-blur-xl border-b border-border/30">
          <div className="px-4 py-6 space-y-2">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted/20 rounded-lg transition-all text-sm font-medium"
            >
              Domů
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted/20 rounded-lg transition-all text-sm font-medium"
            >
              O mě
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted/20 rounded-lg transition-all text-sm font-medium"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted/20 rounded-lg transition-all text-sm font-medium"
            >
              Projekty
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted/20 rounded-lg transition-all text-sm font-medium"
            >
              Kontakt
            </button>
            
            <div className="flex items-center justify-center gap-4 pt-4 mt-4 border-t border-border/30">
              <a
                href="https://github.com/bloby22"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/60 hover:text-foreground transition-colors rounded-lg hover:bg-muted/10"
              >
                <Github size={20} />
              </a>
              <a
                href="https://discord.com/users/1178258199590228078"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/60 hover:text-foreground transition-colors rounded-lg hover:bg-muted/10"
              >
                <SiDiscord size={20} />
              </a>
              <a
                href="https://instagram.com/blobycz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/60 hover:text-foreground transition-colors rounded-lg hover:bg-muted/10"
              >
                <Instagram size={20} />
              </a>
            </div>

            {/* Theme Toggle - Mobile */}
            <div className="pt-4 flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
