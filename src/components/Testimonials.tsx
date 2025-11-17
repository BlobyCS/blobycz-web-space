import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonial = () => {
  const { ref, isVisible } = useScrollAnimation();

  const testimonials = [
    {
      name: "Jan Novák",
      role: "Backend Developer",
      company: "TechCorp",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jan",
      text: "Skvělá spolupráce! Výborné znalosti Javy a Discord API. Projekt byl dodán včas a bez chyb.",
      rating: 5,
    },
    {
      name: "Petra Svobodová",
      role: "Project Manager",
      company: "DevStudio",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Petra",
      text: "Profesionální přístup a rychlá komunikace. Dokáže vyřešit i ty nejtěžší problémy.",
      rating: 5,
    },
    {
      name: "Martin Dvořák",
      role: "CTO",
      company: "StartupXYZ",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Martin",
      text: "Nejlepší Discord bot developer, se kterým jsem měl tu čest pracovat. Určitě doporučuji!",
      rating: 5,
    },
  ];

  return (
    <section
      ref={ref}
      className={`py-20 px-6 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Co o mně říkají
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Ohlasy od klientů a spolupracovníků
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-slate-200/50 dark:border-slate-700/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-violet-600/20 dark:text-violet-400/20 mb-4" />
                
                <p className="text-slate-700 dark:text-slate-300 mb-6 italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full ring-2 ring-violet-600/20"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
