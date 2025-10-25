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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-card/30 backdrop-blur-2xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="text-xl font-bold bg-gradient-text bg-clip-text text-transparent">
            BlobyCZ
          </div>

          {/* Desktop Menu - Minimal */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => scrollToSection("about")}
              className="px-4 py-2 text-foreground/60 hover:text-foreground transition-colors text-sm font-medium rounded-xl hover:bg-muted/20"
            >
              O mně
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="px-4 py-2 text-foreground/60 hover:text-foreground transition-colors text-sm font-medium rounded-xl hover:bg-muted/20"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="px-4 py-2 text-foreground/60 hover:text-foreground transition-colors text-sm font-medium rounded-xl hover:bg-muted/20"
            >
              Projekty
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-2 px-6 py-2 bg-gradient-primary rounded-xl font-medium text-sm transition-all duration-200 hover:shadow-md"
            >
              Kontakt
            </button>
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
        <div className="md:hidden bg-card/40 backdrop-blur-2xl border-b border-border/50">
          <div className="px-4 py-6 space-y-2">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-xl transition-all text-sm font-medium"
            >
              O mně
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-xl transition-all text-sm font-medium"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-xl transition-all text-sm font-medium"
            >
              Projekty
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-3 bg-gradient-primary rounded-xl font-medium text-sm mt-2"
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
