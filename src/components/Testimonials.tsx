import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const testimonials = [
    {
      name: "Ziky",
      role: "Video Editor",
      company: "ZikyZone",
      text: "Jsem nadměrně spokojen, Bloby udělal vše, co jsem po botovi chtěl a funguje překrásně. Doporučuji!",
      rating: 5,
    },
    {
      name: "Blob",
      role: "JavaScript Developer",
      company: "Slovensko",
      text: "Super a rýchlo všetko spravil, úplná spokojnosť! 11/10",
      rating: 5,
    },
    {
      name: "Lucki",
      role: "Grafik",
      company: "",
      text: "Celkově si myslím že děláš super práci boti vypadají supr i když mají občas pár nedokonalostí jsou dobré libí se mi pěkné embedy a funkce co dokážeš udělat",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Header */}
          <div className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              Reference
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Co říkají klienti
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative p-8 bg-card/80 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  {/* Quote Icon */}
                  <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-6">
                    <Quote className="w-5 h-5 text-primary" />
                  </div>
                  
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  {/* Quote Text */}
                  <p className="text-foreground/90 leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author */}
                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold">{testimonial.name[0]}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}{testimonial.company && ` • ${testimonial.company}`}
                        </div>
                      </div>
                    </div>
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
