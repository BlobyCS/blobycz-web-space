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

  const navItems = [
    { label: "O mně", action: () => scrollToSection("about") },
    { label: "Dovednosti", action: () => scrollToSection("skills") },
    { label: "Projekty", action: () => scrollToSection("projects") },
    { label: "Kontakt", action: () => scrollToSection("contact") },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3" : "py-5"
    }`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl font-bold hover:opacity-80 transition-opacity"
          >
            <span className="gradient-text">Bloby</span>CZ
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a href="https://github.com/bloby22" target="_blank" rel="noopener noreferrer" className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all">
              <Github size={18} />
            </a>
            <a href="https://discord.com/users/1178258199590228078" target="_blank" rel="noopener noreferrer" className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all">
              <SiDiscord size={18} />
            </a>
            <a href="https://instagram.com/blobycz" target="_blank" rel="noopener noreferrer" className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all">
              <Instagram size={18} />
            </a>
            <div className="w-px h-6 bg-border mx-2" />
            <ThemeToggle />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all"
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
              <div className="flex items-center gap-1">
                <a href="https://github.com/bloby22" target="_blank" rel="noopener noreferrer" className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl">
                  <Github size={18} />
                </a>
                <a href="https://discord.com/users/1178258199590228078" target="_blank" rel="noopener noreferrer" className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl">
                  <SiDiscord size={18} />
                </a>
                <a href="https://instagram.com/blobycz" target="_blank" rel="noopener noreferrer" className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl">
                  <Instagram size={18} />
                </a>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
