const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            BlobyCZ
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-foreground/80 mb-8">
            Full Stack Developer
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Vytvářím moderní webové aplikace a Discord boty s využitím nejnovějších technologií.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="px-8 py-4 bg-gradient-primary rounded-lg font-medium hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Zobrazit projekty
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-card/60 backdrop-blur-glass border border-border rounded-lg font-medium hover:bg-card transition-all duration-300"
            >
              Kontaktovat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
