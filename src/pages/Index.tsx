import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg relative overflow-x-hidden">
      {/* Figma-Style Subtle Blur Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Main blur - top center */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[150px] opacity-40" />
        
        {/* Secondary blur - right */}
        <div 
          className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[140px] opacity-30" 
        />
        
        {/* Tertiary blur - bottom left */}
        <div 
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[160px] opacity-35" 
        />
      </div>

      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/60 via-transparent to-background/60 pointer-events-none"></div>

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
