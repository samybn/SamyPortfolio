import { useEffect } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { ProjectDetail, getNextProject } from "../data/projectsData";
import { ProjectImageSlider } from "./ProjectImageSlider";
import { useLanguage } from "../context/LanguageContext";

interface ProjectDetailPageProps {
  project: ProjectDetail;
  onBack: () => void;
  onSelectProject: (id: string) => void;
}

export function ProjectDetailPage({
  project,
  onBack,
  onSelectProject,
}: ProjectDetailPageProps) {
  const { t } = useLanguage();
  const nextProject = getNextProject(project.id);

  // Scroll to top on project change and update title for SEO
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const originalTitle = document.title;
    document.title = `${project.name} — Bouadloune Samy | Portfolio`;
    return () => {
      document.title = originalTitle;
    };
  }, [project.id, project.name]);

  return (
    <div
      style={{
        background: "#0C0C0C",
        fontFamily: "'Kanit', sans-serif",
        minHeight: "100vh",
      }}
      className="relative text-[#D7E2EA] overflow-x-hidden"
    >
      {/* ── Top Navigation Bar ── */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b border-[#D7E2EA]/10 bg-[#0C0C0C]/85 px-4 sm:px-8 md:px-12 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Back button */}
          <a
            href="/#projects"
            aria-label={t.projectDetail.backToProjects}
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 hover:bg-[#90e0ef]/10 hover:border-[#90e0ef] hover:text-[#90e0ef] text-xs sm:text-sm font-medium tracking-wide text-[#D7E2EA] transition-all cursor-pointer no-underline shrink-0"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="hidden sm:inline">{t.projectDetail.backToProjects}</span>
            <span className="inline sm:hidden">{t.projectDetail.backToProjects.split(" ")[0] || "Retour"}</span>
          </a>

          {/* Logo in center */}
          <button
            type="button"
            onClick={onBack}
            aria-label={t.projectDetail.backToProjects}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#D7E2EA]/30 bg-[#121212] flex items-center justify-center text-xs font-semibold italic text-[#D7E2EA] cursor-pointer hover:border-[#D7E2EA] transition-colors shrink-0"
          >
            SB
          </button>

          {/* Direct Visit Link Button (if available) */}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.projectDetail.visit} ${project.name}`}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 hover:bg-[#90e0ef]/15 hover:border-[#90e0ef] hover:text-[#90e0ef] text-xs sm:text-sm font-medium tracking-wide text-[#D7E2EA] transition-all shrink-0"
            >
              <span>{t.projectDetail.visit}</span>
              <ArrowUpRight size={13} />
            </a>
          ) : null}
        </div>
      </header>

      {/* ── Main Content Container ── */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 md:px-10 pt-6 sm:pt-12 pb-24 flex flex-col gap-8 sm:gap-10 md:gap-12">
        {/* ── 1. NOM DU PROJET ── */}
        <section className="flex flex-col gap-3 sm:gap-4">
          {/* Eyebrow & Number */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold text-[#90e0ef] bg-[#90e0ef]/5 border border-[#90e0ef]/30">
              {t.projectDetail.projectBadge}{project.number}
            </span>
            <span className="px-3 py-1 rounded-full text-xs uppercase tracking-widest font-medium text-[#D7E2EA]/70 bg-[#D7E2EA]/5 border border-[#D7E2EA]/10">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h1
            className="hero-heading uppercase tracking-tight leading-none text-white text-left"
            style={{
              fontWeight: 900,
              fontSize: "clamp(2rem, 7vw, 84px)",
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            {project.name}
          </h1>

          {/* Tagline */}
          <p className="text-sm sm:text-lg md:text-xl font-light opacity-75 max-w-3xl leading-relaxed text-[#D7E2EA]">
            {project.tagline}
          </p>
        </section>

        {/* ── 2. IMAGES DU PROJET (Défilement d'images) ── */}
        <section className="w-full">
          <ProjectImageSlider
            images={project.images}
            projectName={project.name}
          />
        </section>

        {/* ── 3. BOUTONS VISITER ET CODE SOURCE ── */}
        <section className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          {/* Bouton Visiter le projet (si disponible) */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.projectDetail.visitProject} : ${project.name}`}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] font-medium text-xs sm:text-base uppercase tracking-wider hover:bg-[#90e0ef]/10 hover:border-[#90e0ef] hover:text-[#90e0ef] transition-all cursor-pointer text-center"
            >
              <span>{t.projectDetail.visitProject}</span>
              <ArrowUpRight size={16} />
            </a>
          )}

          {/* Bouton Code source GitHub (si disponible) */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.projectDetail.sourceCode} - ${project.name}`}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] font-medium text-xs sm:text-base uppercase tracking-wider hover:bg-[#90e0ef]/10 hover:border-[#90e0ef] hover:text-[#90e0ef] transition-all cursor-pointer text-center"
            >
              <Github size={16} />
              <span>{t.projectDetail.sourceCode}</span>
            </a>
          )}
        </section>

        {/* ── 4. PRÉSENTATION ── */}
        <section className="flex flex-col gap-4 pt-6 border-t border-[#D7E2EA]/10">
          <h2 className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-semibold">
            {t.projectDetail.overviewEyebrow}
          </h2>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            {t.projectDetail.aboutProject}
          </h3>
          <p className="text-base sm:text-lg font-light opacity-80 leading-relaxed text-[#D7E2EA]/90 whitespace-pre-line">
            {project.description}
          </p>
        </section>

        {/* ── 5. POINTS CLÉS ── */}
        <section className="flex flex-col gap-4 pt-6 border-t border-[#D7E2EA]/10">
          <h2 className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-semibold">
            {t.projectDetail.keyPointsEyebrow}
          </h2>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            {t.projectDetail.mainFeatures}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {project.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl text-sm sm:text-base font-light text-[#D7E2EA]/90 bg-[#D7E2EA]/[0.02] border border-[#D7E2EA]/10"
              >
                <CheckCircle2
                  size={18}
                  className="text-[#90e0ef] shrink-0 mt-0.5"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 6. STACK TECHNIQUE ── */}
        <section className="flex flex-col gap-4 pt-6 border-t border-[#D7E2EA]/10">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-[#D7E2EA]/60" />
            <h2 className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-semibold">
              {t.projectDetail.techStackEyebrow}
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            {t.projectDetail.techUsed}
          </h3>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-[#D7E2EA] bg-[#D7E2EA]/5 border border-[#D7E2EA]/15 hover:border-[#90e0ef]/60 hover:text-[#90e0ef] hover:bg-[#90e0ef]/5 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ── 7. PROJET SUIVANT ── */}
        <section className="pt-6 border-t border-[#D7E2EA]/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest opacity-50">
              {t.projectDetail.nextProjectEyebrow}
            </span>
            <a
              href="/#projects"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
              className="text-xs uppercase tracking-wider text-[#D7E2EA] hover:underline cursor-pointer opacity-70 hover:opacity-100 no-underline"
            >
              {t.projectDetail.backToProjects}
            </a>
          </div>

          <a
            href={`/projects/${nextProject.id}`}
            aria-label={`Projet suivant : ${nextProject.name}`}
            onClick={(e) => {
              e.preventDefault();
              onSelectProject(nextProject.id);
            }}
            className="group p-5 sm:p-7 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#D7E2EA]/[0.02] border border-[#D7E2EA]/12 hover:bg-[#D7E2EA]/[0.06] hover:border-[#D7E2EA]/30 transition-all duration-300 cursor-pointer no-underline text-inherit block"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                {t.projectDetail.nextProjectBadge}{nextProject.number}
              </span>
              <h4 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-[#D7E2EA] transition-colors">
                {nextProject.name}
              </h4>
              <p className="text-xs sm:text-sm font-light opacity-60 line-clamp-1">
                {nextProject.tagline}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full border border-[#D7E2EA]/30 flex items-center justify-center text-[#D7E2EA] group-hover:bg-[#D7E2EA] group-hover:text-[#0C0C0C] group-hover:translate-x-1 transition-all shrink-0">
              <ArrowRight size={18} />
            </div>
          </a>
        </section>
      </main>
    </div>
  );
}
