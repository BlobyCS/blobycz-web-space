import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const testimonials = [
    {
      name: "Jan Novák",
      role: "Backend Developer",
      company: "TechCorp",
      text: "Skvělá spolupráce! Výborné znalosti Javy a Discord API. Projekt byl dodán včas a bez chyb.",
    },
    {
      name: "Petra Svobodová",
      role: "Project Manager",
      company: "DevStudio",
      text: "Profesionální přístup a rychlá komunikace. Dokáže vyřešit i ty nejtěžší problémy.",
    },
    {
      name: "Martin Dvořák",
      role: "CTO",
      company: "StartupXYZ",
      text: "Nejlepší Discord bot developer, se kterým jsem měl tu čest pracovat. Určitě doporučuji!",
    },
  ];

  return (
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-sm font-mono uppercase tracking-[0.3em] text-primary">
                [05] Reference
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                OHLASY
              </h2>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="brutal-card group"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`,
                  transition: 'all 0.5s ease'
                }}
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/30 mb-6" />

                {/* Text */}
                <p className="text-foreground/90 leading-relaxed mb-8 font-sans italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="pt-6 border-t-2 border-border">
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} — {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
