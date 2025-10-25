import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/40 backdrop-blur-glass border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            BlobyCZ
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              O mně
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Projekty
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2 bg-gradient-primary rounded-lg font-medium hover:shadow-glow transition-all duration-300"
            >
              Kontakt
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-glass border-b border-border/50">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
            >
              O mně
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="block w-full text-left px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
            >
              Projekty
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-2 bg-gradient-primary rounded-lg font-medium"
            >
              Kontakt
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
