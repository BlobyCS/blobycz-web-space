import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const experiences = [
    {
      title: "Discord Bot Developer",
      company: "Freelance",
      period: "2023 - Současnost",
      location: "Remote",
      description: "Vytváření moderních Discord botů s pokročilými funkcemi pro různé servery a komunity.",
      highlights: [
        "Vývoj 10+ botů pro různé klienty",
        "Implementace složitých moderačních systémů",
        "Optimalizace výkonu a scalability"
      ]
    },
    {
      title: "Java Plugin Developer",
      company: "xTyping",
      period: "2023 - Současnost",
      location: "Brno, Czech Republic",
      description: "Vývoj custom Minecraft pluginů pro servery se zaměřením na výkon a uživatelský zážitek.",
      highlights: [
        "Tvorba custom game modes",
        "Práce s Spigot/Paper API",
        "Optimalizace pro velké servery"
      ]
    }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Header */}
          <div className="text-center mb-24 space-y-4">
            <div className="inline-block px-4 py-2 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/30 mb-6">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                Můj příběh
              </p>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-text bg-clip-text text-transparent tracking-tighter">
              Zkušenosti
            </h2>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 delay-${index * 200}`}
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${index * 200}ms`
                }}
              >
                {/* Timeline line */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent"></div>
                )}

                <div className="relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-primary/30 transition-all duration-300 group hover:bg-card/60">
                  {/* Timeline dot */}
                  <div className="absolute -left-2 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background group-hover:scale-125 transition-transform"></div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Left: Title & Company */}
                    <div className="md:col-span-1 space-y-2">
                      <h3 className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
                        {exp.title}
                      </h3>
                      <p className="text-lg font-semibold text-foreground/80">
                        {exp.company}
                      </p>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Description & Highlights */}
                    <div className="md:col-span-2 space-y-4">
                      <p className="text-muted-foreground/90 leading-relaxed">
                        {exp.description}
                      </p>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1.5">•</span>
                            <span className="text-foreground/80">{highlight}</span>
                          </li>
                        ))}
                      </ul>
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

export default Experience;
