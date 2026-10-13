import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { HeroSection } from "./components/HeroSection";
import { Skills } from "./components/SkillsNew";
import { ProjectsSection } from "./components/ProjectsSection";
import { Footer } from "./components/Footer";
import { LanguageToggle } from "./components/LanguageToggle";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { getProjectById } from "./data/projectsData";

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
      className="bg-portfolio-dark min-h-screen flex flex-col items-center justify-center"
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

/**
 * Automatically scrolls to top on route change or to anchor when hash exists.
 */
function ScrollToTopAndHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If legacy hash route #project/xxx arrived, HashRedirector handles redirect
    if (hash.startsWith("#project/")) return;

    if (hash) {
      const elementId = hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}

/**
 * Backwards compatibility redirector for legacy hash URLs (#project/:id)
 */
function HashRedirector() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash.startsWith("#project/")) {
      const id = decodeURIComponent(location.hash.replace("#project/", ""));
      const found = getProjectById(id);
      if (found) {
        navigate(`/projects/${found.id}`, { replace: true });
      } else {
        navigate(`/projects/${id}`, { replace: true });
      }
    }
  }, [location.hash, navigate]);

  return null;
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <motion.main
      id="main-content"
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-portfolio-dark overflow-x-clip outline-none"
    >
      <HeroSection />
      <Skills />
      <ProjectsSection
        onSelectProject={(projectId) => navigate(`/projects/${projectId}`)}
      />
      <Suspense fallback={<SectionLoadingFallback height={320} />}>
        <MoreProjectsSection
          onSelectProject={(projectId) => navigate(`/projects/${projectId}`)}
        />
      </Suspense>
      <Suspense fallback={<SectionLoadingFallback height={400} />}>
        <ContactSection />
      </Suspense>
      <Footer />
    </motion.main>
  );
}

function ProjectDetailRoute() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const project = id ? getProjectById(decodeURIComponent(id)) : undefined;

  if (!project) {
    return (
      <NotFoundPage
        invalidPath={location.pathname}
        onGoHome={() => navigate("/")}
        onGoProjects={() => navigate("/#projects")}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <ProjectDetailPage
        project={project}
        onBack={() => {
          navigate("/#projects");
        }}
        onSelectProject={(nextId) => {
          navigate(`/projects/${nextId}`);
        }}
      />
    </motion.div>
  );
}

function NotFoundRoute() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <NotFoundPage
        invalidPath={location.pathname}
        onGoHome={() => navigate("/")}
        onGoProjects={() => navigate("/#projects")}
      />
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/projects/:id"
          element={
            <Suspense fallback={<PageLoadingFallback />}>
              <ProjectDetailRoute />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoadingFallback />}>
              <NotFoundRoute />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function PortfolioLayout() {
  const { lang } = useLanguage();

  return (
    <>
      <a href="#main-content" className="skip-link">
        {lang === "FR" ? "Passer au contenu principal" : "Skip to main content"}
      </a>
      <ScrollToTopAndHash />
      <HashRedirector />
      <AnimatedRoutes />
      <LanguageToggle />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LanguageProvider>
        <PortfolioLayout />
      </LanguageProvider>
    </BrowserRouter>
  );
}
