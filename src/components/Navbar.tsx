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
          ? "bg-glass-bg backdrop-blur-2xl border-b border-glass-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="text-xl font-bold bg-gradient-text bg-clip-text text-transparent tracking-tight">
            BlobyCZ
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollToSection("about")}
              className="px-5 py-2.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium rounded-xl hover:bg-muted/30"
            >
              O mně
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="px-5 py-2.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium rounded-xl hover:bg-muted/30"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="px-5 py-2.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium rounded-xl hover:bg-muted/30"
            >
              Projekty
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="group relative ml-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-90 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <span className="relative px-6 py-2.5 font-medium text-sm text-white">
                Kontakt
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2.5 hover:bg-muted/30 rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-glass-bg backdrop-blur-2xl border-t border-glass-border">
          <div className="px-6 py-6 space-y-2">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-5 py-3.5 text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-xl transition-all text-sm font-medium"
            >
              O mně
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="block w-full text-left px-5 py-3.5 text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-xl transition-all text-sm font-medium"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left px-5 py-3.5 text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-xl transition-all text-sm font-medium"
            >
              Projekty
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-5 py-3.5 bg-gradient-primary rounded-xl font-medium text-sm text-white mt-2"
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
