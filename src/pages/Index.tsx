import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GithubActivity from "@/components/GithubActivity";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import AnimatedBackground from "@/components/AnimatedBackground";
import ParticleBackground from "@/components/ParticleBackground";
import MaintenanceOverlay from "@/components/MaintenanceOverlay";

const Index = () => {
  return (
    <>
      <MaintenanceOverlay />
      <div className="min-h-screen bg-background relative overflow-x-hidden">
      <AnimatedBackground />
      <ParticleBackground />
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
    </>
  );
};

export default Index;
