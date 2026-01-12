import { useState, useEffect } from "react";
import { Menu, X, Github, Instagram, Sparkles } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = ["contact", "projects", "skills", "about"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 200) setActiveSection("home");
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
    { label: "Domů", id: "home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "O mně", id: "about", action: () => scrollToSection("about") },
    { label: "Skills", id: "skills", action: () => scrollToSection("skills") },
    { label: "Projekty", id: "projects", action: () => scrollToSection("projects") },
    { label: "Kontakt", id: "contact", action: () => scrollToSection("contact") },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/bloby22", icon: Github },
    { name: "Discord", href: "https://discord.com/users/1178258199590228078", icon: SiDiscord },
    { name: "Instagram", href: "https://instagram.com/blobycz", icon: Instagram },
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled
          ? "w-auto"
          : "w-auto"
      }`}
    >
      {/* Modern Transparent Container */}
      <div className={`px-3 py-2.5 rounded-2xl transition-all duration-500 ${
        isScrolled 
          ? "bg-transparent backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.12)]" 
          : "bg-transparent border border-transparent"
      }`}>
        <div className="flex items-center gap-2">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-bold text-lg px-4 py-2 hover:opacity-80 transition-all duration-300 flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline">
              Bloby<span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">CZ</span>
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 group ${
                    activeSection === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {/* Hover/Active glow effect */}
                  <span className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    activeSection === item.id 
                      ? "bg-white/[0.08] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" 
                      : "bg-transparent group-hover:bg-white/[0.05]"
                  }`} />
                  {/* Active indicator dot */}
                  {activeSection === item.id && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_2px] shadow-primary/50" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-border/50 mx-3" />

            {/* Social Icons */}
            <div className="flex items-center gap-0.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-white/[0.05] rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
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
              className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 mt-2 transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-background/60 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="flex items-center gap-2 pt-4 mt-4 border-t border-border/50">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
