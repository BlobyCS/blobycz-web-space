import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, MapPin, Github, Instagram } from "lucide-react";
import { SiDiscord } from "react-icons/si";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const contactInfo = [
    {
      label: "Discord",
      value: "@blobycz",
      icon: <SiDiscord className="w-5 h-5" />,
      link: "https://discord.com/users/1178258199590228078",
    },
    {
      label: "Email",
      value: "michal@bloby.eu",
      icon: <Mail className="w-5 h-5" />,
      link: "mailto:michal@bloby.eu",
    },
    {
      label: "GitHub",
      value: "Bloby22",
      icon: <Github className="w-5 h-5" />,
      link: "https://github.com/bloby22",
    },
    {
      label: "Instagram",
      value: "@blobycz",
      icon: <Instagram className="w-5 h-5" />,
      link: "https://instagram.com/blobycz",
    },
    {
      label: "Lokace",
      value: "Brno, CZ",
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  return (
    <section id="contact" className="py-24 px-6 lg:px-12 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
              Kontakt
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Pojďme spolupracovat
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Máte projekt, na kterém chcete pracovat? Neváhejte mě kontaktovat.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {contactInfo.map((info, index) => (
              <div
                key={info.label}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 80}ms`,
                  transition: "all 0.5s ease",
                }}
              >
                {info.link ? (
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all text-center group h-full"
                  >
                    <div className="inline-flex p-2 mb-3 text-muted-foreground group-hover:text-primary transition-colors">
                      {info.icon}
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {info.label}
                    </div>
                    <div className="text-sm font-medium truncate">
                      {info.value}
                    </div>
                  </a>
                ) : (
                  <div className="p-4 bg-card border border-border rounded-lg text-center h-full">
                    <div className="inline-flex p-2 mb-3 text-muted-foreground">
                      {info.icon}
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {info.label}
                    </div>
                    <div className="text-sm font-medium">{info.value}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a
              href="mailto:michal@bloby.eu"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Napište mi →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
