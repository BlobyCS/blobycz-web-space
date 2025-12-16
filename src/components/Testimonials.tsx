import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const testimonials = [
    {
      name: "Ziky",
      role: "Video Editor",
      company: "ZikyZone",
      text: "Jsem nadměrně spokojen, Bloby udělal vše, co jsem po botovi chtěl a funguje překrásně. Doporučuji!",
    },
    {
      name: "Blob",
      role: "JavaScript Developer, Slovensko",
      company: "",
      text: "Super a rýchlo všetko spravil, úplná spokojnosť! 11/10",
    },
    {
      name: "Lucki",
      role: "Grafik",
      company: "",
      text: "Celkově si myslím že děláš super práci boti vypadají supr i když mají občas pár nedokonalostí jsou dobré libí se mi pěkné embedy a funkce co dokážeš udělat",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Header */}
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
              Reference
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Ohlasy
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-lg"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`,
                  transition: 'all 0.5s ease'
                }}
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="pt-4 border-t border-border">
                  <div className="font-medium">{testimonial.name}</div>
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
