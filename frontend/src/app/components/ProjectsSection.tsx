import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FadeIn, LiveProjectButton } from "./shared";
import { ImageWithSkeleton } from "./ImageWithSkeleton";
import { getOptimizedImageUrl, getImageSrcSet } from "../utils/googleDrive";
import { PROJECTS_DATA, ProjectDetail } from "../data/projectsData";
import { useLanguage } from "../context/LanguageContext";

export type Project = ProjectDetail;

const TOTAL = PROJECTS_DATA.length;

function ProjectCard({
  project,
  index,
  onSelectProject,
}: {
  project: ProjectDetail;
  index: number;
  onSelectProject?: (id: string) => void;
}) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (TOTAL - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Dynamic top offset: smaller gap on mobile so 7 stacked cards fit comfortably in view
  const stickyTop = `calc(clamp(64px, 8.5vh, 110px) + calc(var(--card-stack-gap, 13px) * ${index}))`;

  const handleOpen = () => {
    onSelectProject?.(project.id);
  };

  return (
    <div
      ref={containerRef}
      className="h-[80vh] sm:h-[88vh] md:h-screen flex items-start justify-center sticky top-0"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          top: stickyTop,
          transformOrigin: "top center",
          background: "#0C0C0C",
          willChange: "transform",
        }}
        className="w-full relative rounded-[28px] sm:rounded-[44px] md:rounded-[60px] border-2 border-[#D7E2EA] p-3 sm:p-5 md:p-8 shadow-2xl"
      >
        <div className="w-full">
          {/* Top row */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-5">
            <a
              href={`/projects/${project.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleOpen();
              }}
              className="flex items-center gap-2.5 sm:gap-4 md:gap-6 cursor-pointer group no-underline text-inherit min-w-0"
            >
              <span
                className="hero-heading leading-none group-hover:scale-105 transition-transform shrink-0"
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 6.5vw, 120px)",
                  fontFamily: "'Kanit', sans-serif",
                }}
              >
                {project.number}
              </span>
              <div className="flex flex-col min-w-0">
                <span
                  style={{
                    color: "#D7E2EA",
                    fontWeight: 300,
                    fontSize: "clamp(0.65rem, 1.1vw, 0.95rem)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    opacity: 0.75,
                    fontFamily: "'Kanit', sans-serif",
                  }}
                  className="truncate"
                >
                  {project.category}
                </span>
                <span
                  style={{
                    color: "#D7E2EA",
                    fontWeight: 600,
                    fontSize: "clamp(0.9rem, 2.2vw, 2rem)",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    fontFamily: "'Kanit', sans-serif",
                  }}
                  className="group-hover:text-[#90e0ef] transition-colors truncate"
                >
                  {project.name}
                </span>
              </div>
            </a>

            <div className="shrink-0">
              <LiveProjectButton
                href={`/projects/${project.id}`}
                onClick={handleOpen}
                label={t.projects.liveButton}
                ariaLabel={`${t.projects.liveButton} : ${project.name}`}
                className="!px-3 !py-1.5 sm:!px-8 sm:!py-3 !text-[11px] sm:!text-sm"
              />
            </div>
          </div>

          {/* Image grid */}
          <a
            href={`/projects/${project.id}`}
            aria-label={`Voir les détails et captures du projet ${project.name}`}
            onClick={(e) => {
              e.preventDefault();
              handleOpen();
            }}
            className="flex gap-2 sm:gap-4 cursor-pointer group/images no-underline block"
          >
            {/* Left column – 40% */}
            <div
              className="flex flex-col gap-2 sm:gap-4"
              style={{ flex: "0 0 40%" }}
            >
              <ImageWithSkeleton
                src={getOptimizedImageUrl(project.col1img1, 800)}
                srcSet={getImageSrcSet(project.col1img1, [480, 768, 1024])}
                sizes="(max-width: 768px) 100vw, 40vw"
                alt={`${project.name} — Aperçu : ${project.tagline}`}
                loading="lazy"
                decoding="async"
                containerClassName="w-full rounded-[18px] sm:rounded-[36px] md:rounded-[48px]"
                containerStyle={{ height: "clamp(85px, 13vh, 230px)" }}
                className="w-full h-full object-cover rounded-[18px] sm:rounded-[36px] md:rounded-[48px] group-hover/images:brightness-110 transition-all duration-300"
              />
              <ImageWithSkeleton
                src={getOptimizedImageUrl(project.col1img2, 800)}
                srcSet={getImageSrcSet(project.col1img2, [480, 768, 1024])}
                sizes="(max-width: 768px) 100vw, 40vw"
                alt={`${project.name} — Conception d'interface`}
                loading="lazy"
                decoding="async"
                containerClassName="w-full rounded-[18px] sm:rounded-[36px] md:rounded-[48px]"
                containerStyle={{ height: "clamp(110px, 18vh, 340px)" }}
                className="w-full h-full object-cover rounded-[18px] sm:rounded-[36px] md:rounded-[48px] group-hover/images:brightness-110 transition-all duration-300"
              />
            </div>

            {/* Right column – 60% */}
            <div style={{ flex: "0 0 60%" }}>
              <ImageWithSkeleton
                src={getOptimizedImageUrl(project.col2img, 1200)}
                srcSet={getImageSrcSet(project.col2img, [640, 960, 1280, 1600])}
                sizes="(max-width: 768px) 100vw, 60vw"
                alt={`${project.name} — Présentation globale (${project.technologies.slice(0, 3).join(', ')})`}
                loading="lazy"
                decoding="async"
                containerClassName="w-full rounded-[18px] sm:rounded-[36px] md:rounded-[48px]"
                containerStyle={{ height: "100%", minHeight: "clamp(200px, 32vh, 580px)" }}
                className="w-full h-full object-cover rounded-[18px] sm:rounded-[36px] md:rounded-[48px] group-hover/images:brightness-110 transition-all duration-300"
              />
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export const ProjectsSection = ({
  onSelectProject,
}: {
  onSelectProject?: (projectId: string) => void;
}) => {
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      className="bg-portfolio-dark rounded-t-[32px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-3.5 sm:px-8 md:px-10 pt-16 sm:pt-24 md:pt-32 pb-24 sm:pb-32 [--card-stack-gap:12px] sm:[--card-stack-gap:20px] md:[--card-stack-gap:28px]"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading uppercase leading-none tracking-tight text-center mb-10 sm:mb-16 md:mb-20"
          style={{
            fontWeight: 900,
            fontSize: "clamp(2.4rem, 11vw, 160px)",
          }}
        >
          {t.projects.heading}
        </h2>
      </FadeIn>

      <div className="relative">
        {PROJECTS_DATA.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
};
