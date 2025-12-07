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
    { label: "DOMŮ", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "O MĚ", action: () => scrollToSection("about") },
    { label: "SKILLS", action: () => scrollToSection("skills") },
    { label: "PROJEKTY", action: () => scrollToSection("projects") },
    { label: "KONTAKT", action: () => scrollToSection("contact") },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/95 backdrop-blur border-b-2 border-border" : ""
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="font-bold text-xl tracking-tighter">
            <span className="text-foreground">BLOBY</span>
            <span className="neon-text">CZ</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors brutal-link"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-4 border-l-2 border-border">
              <a
                href="https://github.com/bloby22"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://discord.com/users/1178258199590228078"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <SiDiscord size={20} />
              </a>
              <a
                href="https://instagram.com/blobycz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b-2 border-foreground">
          <div className="px-6 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted transition-all border-l-4 border-transparent hover:border-primary"
              >
                {item.label}
              </button>
            ))}

            <div className="flex items-center justify-between pt-4 mt-4 border-t-2 border-border">
              <div className="flex items-center gap-4">
                <a href="https://github.com/bloby22" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary">
                  <Github size={20} />
                </a>
                <a href="https://discord.com/users/1178258199590228078" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary">
                  <SiDiscord size={20} />
                </a>
                <a href="https://instagram.com/blobycz" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary">
                  <Instagram size={20} />
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
