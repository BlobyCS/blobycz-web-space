import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, MapPin, Github, Instagram } from "lucide-react";
import { SiDiscord } from "react-icons/si";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const contactInfo = [
    {
      label: "Discord",
      value: "@blobycz",
      subValue: "ID: 1178258199590228078",
      icon: <SiDiscord className="w-6 h-6" />,
      link: "https://discord.com/users/1178258199590228078",
    },
    {
      label: "Email",
      value: "michal@bloby.eu",
      icon: <Mail className="w-6 h-6" />,
      link: "mailto:michal@bloby.eu",
    },
    {
      label: "GitHub",
      value: "Bloby22",
      icon: <Github className="w-6 h-6" />,
      link: "https://github.com/bloby22",
    },
    {
      label: "Instagram",
      value: "@blobycz",
      icon: <Instagram className="w-6 h-6" />,
      link: "https://instagram.com/blobycz",
    },
    {
      label: "Lokace",
      value: "Brno, CZ",
      icon: <MapPin className="w-6 h-6" />,
    },
  ];

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div className="space-y-4">
              <span className="text-sm font-mono uppercase tracking-[0.3em] text-primary">
                [06] Spojení
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9]">
                POJĎME<br />
                <span className="neon-text">SPOLUPRACOVAT</span>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-muted-foreground text-lg font-sans leading-relaxed">
                Máte projekt, na kterém chcete pracovat? Nebo jen chcete říct ahoj? 
                Neváhejte mě kontaktovat přes jakýkoliv z níže uvedených kanálů.
              </p>
            </div>
          </div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {contactInfo.map((info, index) => (
              <div
                key={info.label}
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 80}ms`,
                  transition: 'all 0.5s ease'
                }}
              >
                {info.link ? (
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-card h-full flex flex-col items-center text-center gap-4 group"
                  >
                    <div className="p-3 border-2 border-foreground group-hover:bg-primary group-hover:border-primary transition-colors">
                      <div className="group-hover:text-primary-foreground transition-colors">{info.icon}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        {info.label}
                      </div>
                      <div className="font-bold break-all">{info.value}</div>
                      {info.subValue && (
                        <div className="text-xs text-muted-foreground mt-1 font-mono">{info.subValue}</div>
                      )}
                    </div>
                  </a>
                ) : (
                  <div className="brutal-card h-full flex flex-col items-center text-center gap-4">
                    <div className="p-3 border-2 border-foreground">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        {info.label}
                      </div>
                      <div className="font-bold">{info.value}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Large CTA */}
          <div className="mt-16 pt-16 border-t-2 border-border text-center">
            <a href="mailto:michal@bloby.eu" className="brutal-button text-xl inline-block">
              Napište mi →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
