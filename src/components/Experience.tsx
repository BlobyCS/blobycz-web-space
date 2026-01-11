import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Briefcase, Calendar, Sparkles, Code2, Bot, Gamepad2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(-1);
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      title: "Discord Bot Developer",
      company: "Freelance",
      period: "2023 — Present",
      description:
        "Vytváření moderních Discord botů s pokročilými funkcemi pro komunity a servery.",
      highlights: ["10+ botů", "Moderační systémy", "Optimalizace výkonu", "Custom commands"],
      icon: Bot,
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Minecraft Plugin Developer",
      company: "Personal Projects",
      period: "2022 — Present",
      description:
        "Vývoj Java pluginů pro Minecraft servery s využitím Spigot API.",
      highlights: ["Spigot API", "Java", "Game mechanics", "Server optimization"],
      icon: Gamepad2,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Web Developer",
      company: "Self-taught",
      period: "2021 — Present",
      description:
        "Učení se moderních webových technologií a vytváření projektů.",
      highlights: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
      icon: Code2,
      color: "from-teal-500 to-green-600",
    },
  ];

  // Animate timeline line on scroll
  useEffect(() => {
    if (isVisible && timelineRef.current) {
      const timeline = timelineRef.current;
      const totalHeight = timeline.scrollHeight;
      
      let currentHeight = 0;
      const interval = setInterval(() => {
        if (currentHeight < totalHeight) {
          currentHeight += 3;
          setLineHeight(currentHeight);
        } else {
          clearInterval(interval);
        }
      }, 10);

      // Animate active items
      experiences.forEach((_, index) => {
        setTimeout(() => {
          setActiveIndex(index);
        }, 300 + index * 400);
      });

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section id="experience" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 animate-pulse" />
              Kariéra
              <Sparkles className="w-3 h-3 animate-pulse" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Moje <span className="gradient-text">Zkušenosti</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Cesta od prvních řádků kódu po komplexní projekty
            </p>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Animated Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border/30" />
            <div 
              className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 w-0.5 bg-gradient-to-b from-primary via-primary to-primary/50 transition-all duration-100"
              style={{ height: `${lineHeight}px` }}
            />
            
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const isActive = index <= activeIndex;
              const Icon = exp.icon;
              
              return (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 last:mb-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <div 
                    className={`absolute left-8 md:left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ${
                      isActive ? 'scale-100' : 'scale-0'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${exp.color} shadow-lg shadow-primary/30`}>
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                    </div>
                  </div>

                  {/* Connecting Line */}
                  <div 
                    className={`hidden md:block absolute top-1/2 w-12 h-0.5 transition-all duration-500 delay-200 ${
                      isLeft ? 'left-1/2 ml-2' : 'right-1/2 mr-2'
                    } ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                    style={{ 
                      background: `linear-gradient(${isLeft ? '90deg' : '270deg'}, hsl(var(--primary)), transparent)`,
                      transformOrigin: isLeft ? 'left' : 'right'
                    }}
                  />

                  {/* Content Card */}
                  <div 
                    className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] transition-all duration-700 ${
                      isActive 
                        ? 'opacity-100 translate-x-0' 
                        : `opacity-0 ${isLeft ? 'md:-translate-x-10' : 'md:translate-x-10'}`
                    }`}
                    style={{ transitionDelay: `${index * 150 + 200}ms` }}
                  >
                    <div className="group relative p-6 glass-card-modern hover:border-primary/40 transition-all duration-500">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Icon */}
                      <div className={`absolute -top-4 ${isLeft ? 'right-6' : 'left-6 md:right-6 md:left-auto'} w-10 h-10 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      <div className="relative">
                        {/* Period Badge */}
                        <span className="inline-flex items-center gap-2 text-xs font-mono text-primary mb-3 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>

                        {/* Title & Company */}
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium mb-4 flex items-center gap-2">
                          <Briefcase className="w-3 h-3" />
                          {exp.company}
                        </p>

                        {/* Description */}
                        <p className="text-muted-foreground mb-5 leading-relaxed text-sm">
                          {exp.description}
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2">
                          {exp.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="text-xs px-3 py-1.5 bg-muted/50 rounded-lg font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-default border border-transparent hover:border-primary/20"
                              style={{ 
                                transitionDelay: `${i * 50}ms`,
                                opacity: isActive ? 1 : 0,
                                transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                              }}
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Decorative corner */}
                      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/5 to-transparent rounded-2xl pointer-events-none" />
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </div>
              );
            })}
          </div>

          {/* Bottom decoration */}
          <div className="flex justify-center mt-16">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
