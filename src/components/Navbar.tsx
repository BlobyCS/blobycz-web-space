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
          ? "bg-card/20 backdrop-blur-2xl border-b border-primary/20 shadow-glow"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-primary rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
              BlobyCZ
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => scrollToSection("about")}
              className="px-5 py-2.5 text-foreground/70 hover:text-foreground transition-all duration-300 hover:bg-muted/30 rounded-lg relative group"
            >
              <span className="relative z-10">O mně</span>
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="px-5 py-2.5 text-foreground/70 hover:text-foreground transition-all duration-300 hover:bg-muted/30 rounded-lg relative group"
            >
              <span className="relative z-10">Skills</span>
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="px-5 py-2.5 text-foreground/70 hover:text-foreground transition-all duration-300 hover:bg-muted/30 rounded-lg relative group"
            >
              <span className="relative z-10">Projekty</span>
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="relative group ml-4"
            >
              <div className="absolute -inset-0.5 bg-gradient-primary rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-glow"></div>
              <div className="relative px-8 py-3 bg-background rounded-xl">
                <span className="bg-gradient-text bg-clip-text text-transparent font-semibold">
                  Kontakt
                </span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground relative group"
          >
            <div className="absolute -inset-2 bg-gradient-primary rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/30 backdrop-blur-2xl border-b border-primary/20 shadow-glow">
          <div className="px-4 py-6 space-y-2">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-5 py-3 text-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-xl transition-all duration-300"
            >
              O mně
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="block w-full text-left px-5 py-3 text-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-xl transition-all duration-300"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left px-5 py-3 text-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-xl transition-all duration-300"
            >
              Projekty
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-5 py-3 bg-gradient-primary rounded-xl font-semibold mt-4 shadow-glow hover:shadow-glow-strong transition-all duration-300"
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
