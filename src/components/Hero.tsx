import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TypingEffect from "./TypingEffect";
import ChristmasDecorations from "./ChristmasDecorations";

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Christmas decorations in hero */}
      <ChristmasDecorations />
      
      <div ref={ref} className="max-w-6xl mx-auto text-center">
        <div className={`space-y-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Main Title - Christmas Style */}
          <div className="relative inline-block">
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 blur-[100px] opacity-40"></div>
            <h1 className="relative text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black mb-8 bg-gradient-text bg-clip-text text-transparent tracking-tighter leading-none drop-shadow-lg">
              BlobyCZ
            </h1>
          </div>
          
          {/* Subtitle - Clean & Minimal with Typing Effect */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <p className="text-xl sm:text-2xl font-semibold tracking-tight">
                <TypingEffect 
                  texts={[
                    "Discord Bot Developer",
                    "Java Developer",
                    "TypeScript Enthusiast",
                    "Minecraft Plugin Developer"
                  ]}
                  typingSpeed={100}
                  deletingSpeed={50}
                  delayBetweenTexts={2000}
                />
              </p>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed font-light px-4">
            Vytvářím Discord boty a Minecraft pluginy s čistým kódem a moderním designem.
          </p>
          
          {/* CTA Buttons - Christmas styled */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-75 group-hover:opacity-100 blur-sm transition duration-300"></div>
              <div className="relative px-8 py-4 bg-gradient-to-r from-primary to-primary/90 rounded-2xl font-semibold text-base text-primary-foreground transition-transform duration-300 group-hover:scale-[1.02] shadow-lg">
                Zobrazit projekty
              </div>
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center"
            >
              <div className="relative px-8 py-4 bg-card/50 backdrop-blur-xl border border-accent/30 rounded-2xl font-semibold text-base hover:border-accent/50 hover:bg-card/70 transition-all duration-300 shadow-md">
                <span className="bg-gradient-text bg-clip-text text-transparent">
                  Kontakt
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
