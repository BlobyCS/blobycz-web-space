import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const Education = () => {
  const { ref, isVisible } = useScrollAnimation();

  const education = [
    {
      type: "degree",
      icon: GraduationCap,
      title: "Bakalářské studium Informatiky",
      institution: "Vysoká škola ekonomická",
      period: "2019 - 2022",
      description: "Specializace na softwarové inženýrství a databázové systémy",
      color: "violet",
    },
    {
      type: "certification",
      icon: Award,
      title: "Java Professional Certification",
      institution: "Oracle",
      period: "2021",
      description: "Certifikace pokročilých znalostí Java SE 11",
      color: "indigo",
    },
    {
      type: "certification",
      icon: Award,
      title: "Discord Bot Developer Certification",
      institution: "Discord",
      period: "2020",
      description: "Certifikace pro vývoj Discord botů a integrace",
      color: "blue",
    },
    {
      type: "course",
      icon: BookOpen,
      title: "Advanced React & TypeScript",
      institution: "Udemy",
      period: "2022",
      description: "Pokročilé techniky React development a TypeScript best practices",
      color: "violet",
    },
  ];

  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      violet: "text-violet-600 dark:text-violet-400 bg-violet-500/10",
      indigo: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
      blue: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
    };
    return colors[color] || colors.violet;
  };

  return (
    <section
      ref={ref}
      className={`py-20 px-6 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Vzdělání & Certifikace
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Moje akademická cesta a profesní certifikace
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {education.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-br from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 rounded-full transform -translate-x-1/2 ring-4 ring-white dark:ring-slate-900 z-10" />

                {/* Content card */}
                <div
                  className={`flex-1 ml-20 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-elegant hover:-translate-y-2 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-2xl ${getIconColor(item.color)} group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {item.title}
                          </h3>
                          <span className="text-sm font-medium text-violet-600 dark:text-violet-400 whitespace-nowrap ml-4">
                            {item.period}
                          </span>
                        </div>
                        
                        <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">
                          {item.institution}
                        </p>
                        
                        <p className="text-slate-600 dark:text-slate-400">
                          {item.description}
                        </p>
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

export default Education;
