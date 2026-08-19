import { HeroSection } from "./components/HeroSection";
import { MarqueeSection } from "./components/MarqueeSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { MoreProjectsSection } from "./components/MoreProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div
      style={{
        background: "#0C0C0C",
        fontFamily: "'Kanit', sans-serif",
        overflowX: "clip",
      }}
    >
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <MoreProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
