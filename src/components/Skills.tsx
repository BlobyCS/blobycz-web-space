import { Card } from "@/components/ui/card";

const Skills = () => {
  const skills = [
    {
      name: "JavaScript",
      level: 90,
      icon: "javascript",
    },
    {
      name: "Java",
      level: 75,
      icon: "java",
    },
    {
      name: "TypeScript",
      level: 45,
      icon: "typescript",
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Mé Dovednosti
          </h2>
          <p className="text-muted-foreground text-lg">
            Technologie, se kterými pracuji
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 animate-fade-in">
          {skills.map((skill, index) => (
            <Card
              key={skill.name}
              className="p-8 bg-gradient-card backdrop-blur-glass border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 group-hover:animate-float">
                  <img
                    src={`https://skillicons.dev/icons?i=${skill.icon}`}
                    alt={skill.name}
                    className="w-20 h-20"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                <div className="w-full bg-muted rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-primary h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
