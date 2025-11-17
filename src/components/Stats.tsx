import { useEffect, useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Code2, Users, Clock, Award } from "lucide-react";

const Stats = () => {
  const { ref, isVisible } = useScrollAnimation();

  const stats = [
    {
      icon: Code2,
      value: 50,
      label: "Dokončených projektů",
      suffix: "+",
    },
    {
      icon: Users,
      value: 30,
      label: "Spokojených klientů",
      suffix: "+",
    },
    {
      icon: Clock,
      value: 5000,
      label: "Hodin zkušeností",
      suffix: "+",
    },
    {
      icon: Award,
      value: 15,
      label: "Certifikací",
      suffix: "",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              {...stat}
              isVisible={isVisible}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix: string;
  isVisible: boolean;
  delay: number;
}

const StatCard = ({ icon: Icon, value, label, suffix, isVisible, delay }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(increment * currentStep));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <div
      className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-elegant hover:-translate-y-2 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 dark:from-violet-400/5 dark:to-indigo-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="inline-flex p-3 bg-violet-500/10 rounded-2xl mb-4 group-hover:bg-violet-500/20 transition-colors">
          <Icon className="w-8 h-8 text-violet-600 dark:text-violet-400" />
        </div>
        
        <div className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
          {count}{suffix}
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 font-medium">
          {label}
        </p>
      </div>
    </div>
  );
};

export default Stats;
