import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Ultra Modern Blur Background */}
      <div className="fixed inset-0 -z-10">
        {/* Primary Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-gradient-primary opacity-10 blur-[140px] rounded-full" />
        
        {/* Accent Glows */}
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-secondary opacity-8 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[600px] bg-gradient-primary opacity-8 blur-[130px] rounded-full" />
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background via-transparent to-background/80 pointer-events-none"></div>

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
