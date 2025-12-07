const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 lg:px-12 border-t-2 border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold text-2xl tracking-tighter">
            <span className="text-foreground">BLOBY</span>
            <span className="neon-text">CZ</span>
          </div>
          <div className="text-sm text-muted-foreground font-mono">
            © {currentYear} BlobyCZ. Všechna práva vyhrazena.
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="brutal-outline text-sm py-2 px-4"
          >
            ↑ NAHORU
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;