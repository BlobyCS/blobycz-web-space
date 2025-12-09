import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const testimonials = [
    { name: "Jan Novák", role: "Server Owner", text: "Skvělá spolupráce! Bot funguje perfektně a Bloby byl vždy k dispozici pro úpravy." },
    { name: "Petra Svobodová", role: "Community Manager", text: "Profesionální přístup a rychlá komunikace. Vřele doporučuji." },
    { name: "Martin Dvořák", role: "Developer", text: "Čistý kód a skvělá dokumentace. Spolupráce byla příjemná." },
  ];

  return (
    <section className="py-32 px-6 lg:px-12 relative">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">Reference</span>
            <h2 className="text-4xl md:text-6xl font-bold">
              Co říkají <span className="gradient-text">klienti</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-card p-8 hover:border-primary/30 transition-all duration-300"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`,
                  transition: 'all 0.6s ease'
                }}
              >
                <Quote className="w-10 h-10 text-primary/20 mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="pt-4 border-t border-border/50">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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
