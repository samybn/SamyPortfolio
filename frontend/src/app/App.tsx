import { HeroSection } from "./components/HeroSection";
import { Skills } from "./components/SkillsNew";
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
      <Skills />
      <ProjectsSection />
      <MoreProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

