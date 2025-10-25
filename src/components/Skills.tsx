import { Card } from "@/components/ui/card";

const Skills = () => {
  const skills = [
    {
      name: "JavaScript",
      level: 90,
      icon: "javascript",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      name: "Java",
      level: 75,
      icon: "java",
      color: "from-red-500 to-orange-600",
    },
    {
      name: "TypeScript",
      level: 45,
      icon: "typescript",
      color: "from-blue-400 to-blue-600",
    },
  ];

  return (
    <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 animate-fade-in">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-2 bg-gradient-primary blur-2xl opacity-30"></div>
            <h2 className="relative text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-text bg-clip-text text-transparent">
              Mé Dovednosti
            </h2>
          </div>
          <p className="text-muted-foreground text-xl mt-4">
            Technologie, se kterými pracuji každý den
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Animated Border */}
              <div className="absolute -inset-0.5 bg-gradient-border rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500 animate-border-glow"></div>
              
              <Card className="relative p-8 bg-gradient-card backdrop-blur-2xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-glow h-full overflow-hidden rounded-3xl">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative flex flex-col items-center text-center">
                  <div className="mb-8 group-hover:animate-float relative">
                    <div className="absolute -inset-2 bg-gradient-primary rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition duration-500"></div>
                    <img
                      src={`https://skillicons.dev/icons?i=${skill.icon}`}
                      alt={skill.name}
                      className="relative w-24 h-24 transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-text bg-clip-text text-transparent">
                    {skill.name}
                  </h3>
                  
                  {/* Progress Bar */}
                  <div className="w-full">
                    <div className="relative h-4 bg-muted/50 rounded-full overflow-hidden mb-3 border border-primary/20">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer"></div>
                      <div
                        className={`h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out shadow-glow relative overflow-hidden`}
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground font-medium">Úroveň</span>
                      <span className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
