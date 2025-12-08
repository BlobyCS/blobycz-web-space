const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 lg:px-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-lg">
            Bloby<span className="text-primary">CZ</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {currentYear} BlobyCZ. Všechna práva vyhrazena.
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ↑ Nahoru
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;