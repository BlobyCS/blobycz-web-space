import { useState, useEffect } from "react";
import { Wrench } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const MaintenanceOverlay = () => {
  const targetDate = new Date("2026-02-10T18:00:00");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMaintenanceOver, setIsMaintenanceOver] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsMaintenanceOver(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isMaintenanceOver) {
    return null;
  }

  const timeBlocks = [
    { value: timeLeft.days, label: "Dní" },
    { value: timeLeft.hours, label: "Hodin" },
    { value: timeLeft.minutes, label: "Minut" },
    { value: timeLeft.seconds, label: "Sekund" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative text-center px-6">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-2xl bg-primary/10 border border-primary/20">
          <Wrench className="w-10 h-10 text-primary animate-pulse" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Údržba
          </span>
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
          Pracuji na vylepšeních. Vrátím se brzy!
        </p>

        {/* Countdown */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {timeBlocks.map((block, index) => (
            <div
              key={index}
              className="glass-card p-4 md:p-6 min-w-[80px] md:min-w-[100px] rounded-2xl border border-border hover:border-primary/50 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {String(block.value).padStart(2, "0")}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                {block.label}
              </div>
            </div>
          ))}
        </div>

        {/* Target date */}
        <p className="text-sm text-muted-foreground">
          Očekávaný návrat: <span className="text-foreground font-medium">10. 2. 2026 v 18:00</span>
        </p>
      </div>
    </div>
  );
};

export default MaintenanceOverlay;
