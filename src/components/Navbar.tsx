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
    { label: "Domů", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "O mě", action: () => scrollToSection("about") },
    { label: "Skills", action: () => scrollToSection("skills") },
    { label: "Projekty", action: () => scrollToSection("projects") },
    { label: "Kontakt", action: () => scrollToSection("contact") },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="font-bold text-xl">
            Bloby<span className="text-primary">CZ</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-1 pl-4 border-l border-border">
              <a
                href="https://github.com/bloby22"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="https://discord.com/users/1178258199590228078"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <SiDiscord size={18} />
              </a>
              <a
                href="https://instagram.com/blobycz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <a href="https://github.com/bloby22" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground">
                  <Github size={18} />
                </a>
                <a href="https://discord.com/users/1178258199590228078" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground">
                  <SiDiscord size={18} />
                </a>
                <a href="https://instagram.com/blobycz" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground">
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
