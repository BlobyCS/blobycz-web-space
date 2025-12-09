import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, MapPin, Github, Instagram, Send } from "lucide-react";
import { SiDiscord } from "react-icons/si";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const socials = [
    { name: "Discord", value: "@blobycz", icon: SiDiscord, link: "https://discord.com/users/1178258199590228078" },
    { name: "Email", value: "michal@bloby.eu", icon: Mail, link: "mailto:michal@bloby.eu" },
    { name: "GitHub", value: "Bloby22", icon: Github, link: "https://github.com/bloby22" },
    { name: "Instagram", value: "@blobycz", icon: Instagram, link: "https://instagram.com/blobycz" },
  ];

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">Kontakt</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Pojďme <span className="gradient-text">spolupracovat</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              Máte projekt nebo nápad? Rád si s vámi popovídám.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {socials.map((social, index) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card p-6 text-center hover:scale-105 hover:border-primary/30 transition-all duration-300"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 80}ms`,
                  transition: 'all 0.5s ease'
                }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <social.icon className="w-6 h-6 group-hover:text-primary transition-colors" />
                </div>
                <div className="text-sm text-muted-foreground mb-1">{social.name}</div>
                <div className="font-semibold">{social.value}</div>
              </a>
            ))}
          </div>

          <div className="glass-card p-6 flex items-center justify-center gap-3 mb-12">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">Brno, Česká republika</span>
          </div>

          <div className="text-center">
            <a 
              href="mailto:michal@bloby.eu" 
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-2xl hover:scale-105 transition-all duration-300 glow"
            >
              <Send className="w-5 h-5" />
              Napsat email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
