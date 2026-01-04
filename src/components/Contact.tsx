import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, MapPin, Github, Instagram, ArrowUpRight } from "lucide-react";
import { SiDiscord } from "react-icons/si";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const contactInfo = [
    {
      label: "Discord",
      value: "@blobycz",
      icon: SiDiscord,
      link: "https://discord.com/users/1178258199590228078",
      color: "hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:text-indigo-400",
    },
    {
      label: "Email",
      value: "michal@bloby.eu",
      icon: Mail,
      link: "mailto:michal@bloby.eu",
      color: "hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400",
    },
    {
      label: "GitHub",
      value: "Bloby22",
      icon: Github,
      link: "https://github.com/bloby22",
      color: "hover:bg-gray-500/10 hover:border-gray-500/30",
    },
    {
      label: "Instagram",
      value: "@blobycz",
      icon: Instagram,
      link: "https://instagram.com/blobycz",
      color: "hover:bg-pink-500/10 hover:border-pink-500/30 hover:text-pink-400",
    },
    {
      label: "Lokace",
      value: "Brno, CZ",
      icon: MapPin,
      color: "",
    },
  ];

  return (
    <section id="contact" className="py-24 px-6 lg:px-12 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/50 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              Kontakt
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Pojďme spolupracovat
            </h2>
            <p className="text-muted-foreground text-lg">
              Máte projekt, na kterém chcete pracovat? Neváhejte mě kontaktovat.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                    transitionDelay: `${index * 80}ms`,
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative block p-6 bg-card/80 backdrop-blur-sm border border-border rounded-2xl text-center h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${info.color}`}
                    >
                      <ArrowUpRight className="absolute top-3 right-3 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="inline-flex p-3 mb-4 bg-muted/50 rounded-xl group-hover:bg-muted transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-xs text-muted-foreground mb-1 font-mono uppercase tracking-wider">
                        {info.label}
                      </div>
                      <div className="text-sm font-semibold truncate">
                        {info.value}
                      </div>
                    </a>
                  ) : (
                    <div className="p-6 bg-card/80 backdrop-blur-sm border border-border rounded-2xl text-center h-full">
                      <div className="inline-flex p-3 mb-4 bg-muted/50 rounded-xl">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-xs text-muted-foreground mb-1 font-mono uppercase tracking-wider">
                        {info.label}
                      </div>
                      <div className="text-sm font-semibold">{info.value}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="mailto:michal@bloby.eu"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-semibold rounded-2xl hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
            >
              Napište mi
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
