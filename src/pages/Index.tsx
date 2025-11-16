import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import GithubActivity from "@/components/GithubActivity";
import AnimatedBackground from "@/components/AnimatedBackground";
import ParticleBackground from "@/components/ParticleBackground";
import Experience from "@/components/Experience";

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  if (!showContent) {
    return <LoadingScreen onLoadComplete={() => setShowContent(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-bg relative overflow-x-hidden animate-fade-in">
      <AnimatedBackground />
      <ParticleBackground />

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <GithubActivity />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
