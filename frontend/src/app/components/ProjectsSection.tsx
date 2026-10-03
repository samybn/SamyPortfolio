import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FadeIn, LiveProjectButton } from "./shared";
import { parseGoogleDriveUrl } from "../utils/googleDrive";
import { PROJECTS_DATA, ProjectDetail } from "../data/projectsData";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (TOTAL - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Offset by top: ${index * 28}px
  const stickyTop = `calc(clamp(80px, 11vh, 120px) + ${index * 28}px)`;

  const handleOpen = () => {
    onSelectProject?.(project.id);
  };

  return (
    <div
      ref={containerRef}
      className="h-[85vh] sm:h-[90vh] md:h-screen flex items-start justify-center sticky top-0"
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
        className="w-full relative rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 shadow-2xl"
      >
        <div className="w-full">
          {/* Top row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6">
            <div
              onClick={handleOpen}
              className="flex items-center gap-4 md:gap-6 cursor-pointer group"
            >
              <span
                className="hero-heading leading-none group-hover:scale-105 transition-transform"
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(3rem, 10vw, 140px)",
                  fontFamily: "'Kanit', sans-serif",
                }}
              >
                {project.number}
              </span>
              <div className="flex flex-col">
                <span
                  style={{
                    color: "#D7E2EA",
                    fontWeight: 300,
                    fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    opacity: 0.6,
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  {project.category}
                </span>
                <span
                  style={{
                    color: "#D7E2EA",
                    fontWeight: 500,
                    fontSize: "clamp(1rem, 2.5vw, 2rem)",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    fontFamily: "'Kanit', sans-serif",
                  }}
                  className="group-hover:text-pink-300 transition-colors"
                >
                  {project.name}
                </span>
              </div>
            </div>
            <LiveProjectButton onClick={handleOpen} />
          </div>

          {/* Image grid */}
          <div
            onClick={handleOpen}
            className="flex gap-3 md:gap-4 cursor-pointer group/images"
          >
            {/* Left column – 40% */}
            <div
              className="flex flex-col gap-3 md:gap-4"
              style={{ flex: "0 0 40%" }}
            >
              <img
                src={parseGoogleDriveUrl(project.col1img1)}
                alt={`${project.name} preview 1`}
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] group-hover/images:brightness-110 transition-all duration-300"
                style={{ height: "clamp(130px, 16vw, 230px)" }}
              />
              <img
                src={parseGoogleDriveUrl(project.col1img2)}
                alt={`${project.name} preview 2`}
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] group-hover/images:brightness-110 transition-all duration-300"
                style={{ height: "clamp(160px, 22vw, 340px)" }}
              />
            </div>

            {/* Right column – 60% */}
            <div style={{ flex: "0 0 60%" }}>
              <img
                src={parseGoogleDriveUrl(project.col2img)}
                alt={`${project.name} preview 3`}
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] group-hover/images:brightness-110 transition-all duration-300"
                style={{ height: "100%" }}
              />
            </div>
          </div>
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
  return (
    <section
      id="projects"
      style={{
        background: "#0C0C0C",
        fontFamily: "'Kanit', sans-serif",
      }}
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading uppercase leading-none tracking-tight text-center mb-12 sm:mb-16 md:mb-20"
          style={{
            fontWeight: 900,
            fontSize: "clamp(3rem, 12vw, 160px)",
            fontFamily: "'Kanit', sans-serif",
          }}
        >
          Projets
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
