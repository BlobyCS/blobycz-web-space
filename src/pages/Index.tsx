import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg relative overflow-x-hidden">
      {/* Ultra Modern Animated Blur Circles */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Large primary blur */}
        <div className="absolute top-0 -left-1/4 w-[600px] h-[600px] bg-primary/40 rounded-full blur-[150px] animate-float opacity-50" />
        
        {/* Secondary blue blur */}
        <div 
          className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px] animate-float opacity-40" 
          style={{ animationDelay: "1s", animationDuration: "4s" }} 
        />
        
        {/* Bottom left accent */}
        <div 
          className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-primary/35 rounded-full blur-[130px] animate-float opacity-45" 
          style={{ animationDelay: "2s", animationDuration: "5s" }} 
        />
        
        {/* Center accent */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-secondary/25 rounded-full blur-[100px] animate-float opacity-30" 
          style={{ animationDelay: "0.5s", animationDuration: "6s" }} 
        />
        
        {/* Additional small accents */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/30 rounded-full blur-[90px] animate-float opacity-35" 
          style={{ animationDelay: "1.5s", animationDuration: "4.5s" }} 
        />
      </div>

      {/* Gradient Overlay for depth */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/50 via-transparent to-background/50 pointer-events-none"></div>

      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
