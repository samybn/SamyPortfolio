import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FadeIn, LiveProjectButton } from "./shared";
import { parseGoogleDriveUrl } from "../utils/googleDrive";

export interface Project {
  number: string;
  name: string;
  category: string;
  col1img1: string;
  col1img2: string;
  col2img: string;
}

const PROJECTS: Project[] = [
  {
    number: "01",
    name: "Nextlevel Studio",
    category: "Client",
    col1img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    col1img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    col2img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
  },
  {
    number: "02",
    name: "Aura Brand Identity",
    category: "Personal",
    col1img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    col1img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
  },
  {
    number: "03",
    name: "Solaris Digital",
    category: "Client",
    col1img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    col1img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    col2img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  },
];

const TOTAL = PROJECTS.length;

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
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
            <div className="flex items-center gap-4 md:gap-6">
              <span
                className="hero-heading leading-none"
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
                >
                  {project.name}
                </span>
              </div>
            </div>
            <LiveProjectButton />
          </div>

          {/* Image grid */}
          <div className="flex gap-3 md:gap-4">
            {/* Left column – 40% */}
            <div
              className="flex flex-col gap-3 md:gap-4"
              style={{ flex: "0 0 40%" }}
            >
              <img
                src={parseGoogleDriveUrl(project.col1img1)}
                alt={`${project.name} preview 1`}
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: "clamp(130px, 16vw, 230px)" }}
              />
              <img
                src={parseGoogleDriveUrl(project.col1img2)}
                alt={`${project.name} preview 2`}
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: "clamp(160px, 22vw, 340px)" }}
              />
            </div>

            {/* Right column – 60% */}
            <div style={{ flex: "0 0 60%" }}>
              <img
                src={parseGoogleDriveUrl(project.col2img)}
                alt={`${project.name} preview 3`}
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: "100%" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export const ProjectsSection = () => {
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
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};
