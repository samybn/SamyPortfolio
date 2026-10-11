import { useState, useEffect, lazy, Suspense } from "react";
import { HeroSection } from "./components/HeroSection";
import { Skills } from "./components/SkillsNew";
import { ProjectsSection } from "./components/ProjectsSection";
import { Footer } from "./components/Footer";
import { LanguageToggle } from "./components/LanguageToggle";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { getProjectById, ProjectDetail } from "./data/projectsData";

// Code-split heavy & below-the-fold components
const ProjectDetailPage = lazy(() =>
  import("./components/ProjectDetailPage").then((m) => ({
    default: m.ProjectDetailPage,
  }))
);

const MoreProjectsSection = lazy(() =>
  import("./components/MoreProjectsSection").then((m) => ({
    default: m.MoreProjectsSection,
  }))
);

const ContactSection = lazy(() =>
  import("./components/ContactSection").then((m) => ({
    default: m.ContactSection,
  }))
);

const NotFoundPage = lazy(() => import("./components/NotFoundPage"));

function SectionLoadingFallback({ height = 240 }: { height?: number }) {
  return (
    <div
      style={{
        minHeight: height,
        background: "#0C0C0C",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    >
      <div className="w-7 h-7 rounded-full border-2 border-[#00b4d8]/20 border-t-[#00b4d8] animate-spin" />
    </div>
  );
}

function PageLoadingFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0C0C0C",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Kanit', sans-serif",
      }}
      role="status"
      aria-label="Chargement de la page..."
    >
      <div className="w-10 h-10 rounded-full border-2 border-[#00b4d8]/20 border-t-[#00b4d8] animate-spin mb-4" />
      <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
        Chargement...
      </span>
    </div>
  );
}

export type RouteState =
  | { type: "home" }
  | { type: "project"; project: ProjectDetail }
  | { type: "not-found"; invalidPath: string };

/**
 * Resolve application route from URL pathname and hash.
 * Handles clean URLs, legacy hash URLs, and detects 404s.
 */
function resolveRoute(pathname: string, hash: string): RouteState {
  // 1. Legacy hash routes: #project/xxx
  if (hash.startsWith("#project/")) {
    const id = decodeURIComponent(hash.replace("#project/", ""));
    const found = getProjectById(id);
    if (found) {
      return { type: "project", project: found };
    }
    return { type: "not-found", invalidPath: `#project/${id}` };
  }

  // 2. Clean URLs: /projects/:id
  const match = pathname.match(/^\/projects\/(.+)$/);
  if (match) {
    const id = decodeURIComponent(match[1]);
    const found = getProjectById(id);
    if (found) {
      return { type: "project", project: found };
    }
    return { type: "not-found", invalidPath: pathname };
  }

  // 3. Invalid pathname that isn't root or static index
  if (pathname !== "/" && pathname !== "" && !pathname.endsWith("index.html")) {
    return { type: "not-found", invalidPath: pathname };
  }

  return { type: "home" };
}

function PortfolioContent() {
  const { lang } = useLanguage();
  const [route, setRoute] = useState<RouteState>(() =>
    resolveRoute(window.location.pathname, window.location.hash)
  );

  // Sync with browser history on popstate (back/forward)
  useEffect(() => {
    // If loaded via legacy hash for an existing project, redirect URL bar to clean URL
    const hash = window.location.hash;
    if (hash.startsWith("#project/")) {
      const id = decodeURIComponent(hash.replace("#project/", ""));
      const found = getProjectById(id);
      if (found) {
        window.history.replaceState(null, "", `/projects/${found.id}`);
      }
    }

    const handlePopState = () => {
      const resolved = resolveRoute(window.location.pathname, window.location.hash);
      setRoute(resolved);
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleSelectProject = (projectId: string) => {
    const found = getProjectById(projectId);
    if (found) {
      setRoute({ type: "project", project: found });
      window.history.pushState(null, "", `/projects/${found.id}`);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handleBackToProjects = () => {
    setRoute({ type: "home" });
    window.history.pushState(null, "", "/#projects");
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
  };

  const handleGoHome = () => {
    setRoute({ type: "home" });
    window.history.pushState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        {lang === "FR" ? "Passer au contenu principal" : "Skip to main content"}
      </a>
      {route.type === "project" ? (
        <Suspense fallback={<PageLoadingFallback />}>
          <ProjectDetailPage
            project={route.project}
            onBack={handleBackToProjects}
            onSelectProject={handleSelectProject}
          />
        </Suspense>
      ) : route.type === "not-found" ? (
        <Suspense fallback={<PageLoadingFallback />}>
          <NotFoundPage
            invalidPath={route.invalidPath}
            onGoHome={handleGoHome}
            onGoProjects={handleBackToProjects}
          />
        </Suspense>
      ) : (
        <main
          id="main-content"
          tabIndex={-1}
          style={{
            background: "#0C0C0C",
            fontFamily: "'Kanit', sans-serif",
            overflowX: "clip",
            outline: "none",
          }}
        >
          <HeroSection />
          <Skills />
          <ProjectsSection onSelectProject={handleSelectProject} />
          <Suspense fallback={<SectionLoadingFallback height={320} />}>
            <MoreProjectsSection />
          </Suspense>
          <Suspense fallback={<SectionLoadingFallback height={400} />}>
            <ContactSection />
          </Suspense>
          <Footer />
        </main>
      )}
      <LanguageToggle />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioContent />
    </LanguageProvider>
  );
}
