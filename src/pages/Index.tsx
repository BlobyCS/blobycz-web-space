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
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  if (!showContent) {
    return <LoadingScreen onLoadComplete={() => setShowContent(true)} />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <ScrollProgressBar />
      <Navbar />
      <SpotifyNowPlaying />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <GithubActivity />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
