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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Domů", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "O mně", action: () => scrollToSection("about") },
    { label: "Skills", action: () => scrollToSection("skills") },
    { label: "Projekty", action: () => scrollToSection("projects") },
    { label: "Kontakt", action: () => scrollToSection("contact") },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/bloby22", icon: Github },
    { name: "Discord", href: "https://discord.com/users/1178258199590228078", icon: SiDiscord },
    { name: "Instagram", href: "https://instagram.com/blobycz", icon: Instagram },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-bold text-xl hover:opacity-80 transition-opacity"
          >
            Bloby<span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">CZ</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center p-1 bg-muted/50 rounded-xl">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background rounded-lg transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-1 ml-4 pl-4 border-l border-border">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300 ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.action();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded-xl font-medium"
            >
              {item.label}
            </button>
          ))}

          <div className="flex items-center gap-2 pt-4 mt-4 border-t border-border">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-colors"
                aria-label={social.name}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
