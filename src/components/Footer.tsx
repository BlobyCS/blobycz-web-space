import { ArrowUp, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 lg:px-12 border-t border-border">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="font-bold text-2xl">
            Bloby<span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">CZ</span>
          </div>
          
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} BlobyCZ.</span>
            <span className="hidden sm:inline">Vytvořeno s</span>
            <Heart className="w-4 h-4 text-primary fill-primary hidden sm:inline" />
          </div>
          
          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-card border border-border rounded-xl hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            Nahoru
            <ArrowUp className="w-4 h-4 text-primary group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
