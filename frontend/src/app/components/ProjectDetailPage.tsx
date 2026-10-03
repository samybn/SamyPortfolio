import { useEffect } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Calendar,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { ProjectDetail, getNextProject } from "../data/projectsData";
import { ProjectImageSlider } from "./ProjectImageSlider";

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
  const nextProject = getNextProject(project.id);

  // Scroll to top on project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project.id]);

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
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {/* Back button */}
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]/40 text-xs sm:text-sm font-medium tracking-wide text-[#D7E2EA] transition-all cursor-pointer"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Retour aux projets</span>
          </button>

          {/* Logo in center */}
          <div
            onClick={onBack}
            className="w-9 h-9 rounded-full border border-[#D7E2EA]/30 bg-[#121212] flex items-center justify-center text-xs font-semibold italic text-[#D7E2EA] cursor-pointer hover:border-[#D7E2EA] transition-colors"
          >
            SB
          </div>

          {/* Direct Visit Link Button (same clean bordered style) */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/15 hover:border-[#D7E2EA]/50 text-xs sm:text-sm font-medium tracking-wide text-[#D7E2EA] transition-all"
          >
            <span>Visiter</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      {/* ── Main Content Container ── */}
      <main className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-10 pt-8 sm:pt-12 pb-24 flex flex-col gap-8 sm:gap-10 md:gap-12">
        {/* ── 1. NOM DU PROJET ── */}
        <section className="flex flex-col gap-4">
          {/* Eyebrow & Number */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold text-[#D7E2EA] bg-[#D7E2EA]/5 border border-[#D7E2EA]/15">
              PROJET #{project.number}
            </span>
            <span className="px-3 py-1 rounded-full text-xs uppercase tracking-widest font-medium text-[#D7E2EA]/70 bg-[#D7E2EA]/5 border border-[#D7E2EA]/10">
              {project.category}
            </span>
            <span className="text-xs uppercase tracking-widest opacity-50 flex items-center gap-1.5 ml-auto">
              <Calendar size={13} />
              {project.year}
            </span>
          </div>

          {/* Project Title */}
          <h1
            className="hero-heading uppercase tracking-tight leading-none text-white text-left"
            style={{
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 7vw, 84px)",
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            {project.name}
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl font-light opacity-75 max-w-3xl leading-relaxed text-[#D7E2EA]">
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
        <section className="flex flex-wrap items-center gap-4">
          {/* Bouton Visiter le projet (même style sobre que le bouton code source) */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] font-medium text-sm sm:text-base uppercase tracking-wider hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA] transition-all cursor-pointer"
          >
            <span>Visiter le projet</span>
            <ArrowUpRight size={17} />
          </a>

          {/* Bouton Code source GitHub (si disponible) */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] font-medium text-sm sm:text-base uppercase tracking-wider hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA] transition-all cursor-pointer"
            >
              <Github size={17} />
              <span>Code source</span>
            </a>
          )}
        </section>

        {/* ── 4. PRÉSENTATION ── */}
        <section className="flex flex-col gap-4 pt-6 border-t border-[#D7E2EA]/10">
          <h2 className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-semibold">
            Présentation
          </h2>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            À propos du projet
          </h3>
          <p className="text-base sm:text-lg font-light opacity-80 leading-relaxed text-[#D7E2EA]/90 whitespace-pre-line">
            {project.description}
          </p>

          {/* Metadata Cards (Client, Rôle, Année, Type) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 p-4 sm:p-5 rounded-2xl bg-[#D7E2EA]/[0.02] border border-[#D7E2EA]/10">
            <div>
              <span className="text-xs uppercase tracking-wider opacity-50 block mb-1">
                Client
              </span>
              <p className="text-sm sm:text-base font-medium text-white">
                {project.client}
              </p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider opacity-50 block mb-1">
                Rôle
              </span>
              <p className="text-sm sm:text-base font-medium text-white">
                {project.role}
              </p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider opacity-50 block mb-1">
                Année
              </span>
              <p className="text-sm sm:text-base font-medium text-white">
                {project.year}
              </p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider opacity-50 block mb-1">
                Catégorie
              </span>
              <p className="text-sm sm:text-base font-medium text-white">
                {project.category}
              </p>
            </div>
          </div>
        </section>

        {/* ── 5. POINTS CLÉS ── */}
        <section className="flex flex-col gap-4 pt-6 border-t border-[#D7E2EA]/10">
          <h2 className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-semibold">
            Points clés
          </h2>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Fonctionnalités principales
          </h3>
          <ul className="flex flex-col gap-2.5">
            {project.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl text-sm sm:text-base font-light text-[#D7E2EA]/90 bg-[#D7E2EA]/[0.02] border border-[#D7E2EA]/10"
              >
                <CheckCircle2
                  size={18}
                  className="text-[#D7E2EA]/70 shrink-0 mt-0.5"
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
              Stack technique
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Technologies utilisées
          </h3>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-[#D7E2EA] bg-[#D7E2EA]/5 border border-[#D7E2EA]/15 hover:bg-[#D7E2EA]/10 transition-colors"
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
              Projet suivant
            </span>
            <button
              type="button"
              onClick={onBack}
              className="text-xs uppercase tracking-wider text-[#D7E2EA] hover:underline cursor-pointer opacity-70 hover:opacity-100"
            >
              Retour aux projets
            </button>
          </div>

          <div
            onClick={() => onSelectProject(nextProject.id)}
            className="group p-5 sm:p-7 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#D7E2EA]/[0.02] border border-[#D7E2EA]/12 hover:bg-[#D7E2EA]/[0.06] hover:border-[#D7E2EA]/30 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                Projet #{nextProject.number}
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
          </div>
        </section>
      </main>
    </div>
  );
}
