import { useState, useEffect } from "react";
import { HeroSection } from "./components/HeroSection";
import { Skills } from "./components/SkillsNew";
import { ProjectsSection } from "./components/ProjectsSection";
import { MoreProjectsSection } from "./components/MoreProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { ProjectDetailPage } from "./components/ProjectDetailPage";
import { getProjectById, ProjectDetail } from "./data/projectsData";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  // Sync with URL hash: e.g. #project/nextlevel-studio or #project/01
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#project/")) {
        const id = decodeURIComponent(hash.replace("#project/", ""));
        const found = getProjectById(id);
        if (found) {
          setSelectedProject(found);
          window.scrollTo({ top: 0, behavior: "instant" });
          return;
        }
      }
      setSelectedProject(null);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  const handleSelectProject = (projectId: string) => {
    const found = getProjectById(projectId);
    if (found) {
      setSelectedProject(found);
      window.location.hash = `#project/${found.id}`;
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    window.history.pushState(null, "", window.location.pathname + "#projects");
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
  };

  if (selectedProject) {
    return (
      <ProjectDetailPage
        project={selectedProject}
        onBack={handleBackToProjects}
        onSelectProject={handleSelectProject}
      />
    );
  }

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
      <ProjectsSection onSelectProject={handleSelectProject} />
      <MoreProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
