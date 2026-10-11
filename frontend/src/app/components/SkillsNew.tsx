import { useMemo } from "react";
import { OrbitalImageWheel } from "./unlumen-ui/orbital-image-wheel";
import { useLanguage } from "../context/LanguageContext";

/* ─── Devicon base URL ─── */
const DEVICON = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

const RAW_SKILLS = [
  { key: "Java", devicon: "java" },
  { key: "React", devicon: "react" },
  { key: "Next.js", devicon: "nextjs" },
  { key: "TypeScript", devicon: "typescript" },
  { key: "Spring Boot", devicon: "spring" },
  { key: "Node.js", devicon: "nodejs" },
  { key: "Python", devicon: "python" },
  { key: "PostgreSQL", devicon: "postgresql" },
  { key: "MySQL", devicon: "mysql" },
  { key: "Docker", devicon: "docker" },
  { key: "Git", devicon: "git" },
  { key: "Linux", devicon: "linux" },
];

/* ─── Skills Section ─── */
export function Skills() {
  const { t } = useLanguage();

  const skillsData = useMemo(() => {
    return RAW_SKILLS.map((item) => ({
      src: DEVICON(item.devicon),
      label: item.key,
      subtitle: t.skills.items[item.key]?.subtitle || "",
      bg: "transparent",
      contain: true,
    }));
  }, [t]);

  const sectionHeader = (
    <>
      {/* Eyebrow */}
      <span
        style={{
          color: "rgba(215,226,234,0.7)",
          fontFamily: "'Kanit', sans-serif",
          fontSize: "0.72rem",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          display: "block",
          marginBottom: "0.6rem",
        }}
      >
        {t.skills.eyebrow}
      </span>

      {/* Heading */}
      <h2
        style={{
          fontSize: "clamp(1.8rem,4vw,3.2rem)",
          fontWeight: 600,
          color: "#D7E2EA",
          fontFamily: "'Kanit', sans-serif",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        {t.skills.heading}
      </h2>
    </>
  );

  return (
    <section
      id="skills"
      className="relative w-full"
      style={{
        background: "#0C0C0C",
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(144, 224, 239, 0.10) 0%, rgba(0, 119, 182, 0.05) 50%, transparent 70%)",
          }}
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] animate-pulse"
        />
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(0, 119, 182, 0.10) 0%, rgba(0, 180, 216, 0.05) 50%, transparent 70%)",
          }}
          className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full blur-[150px] animate-pulse"
        />
      </div>

      {/* Orbital Wheel with header slot rendered inside its sticky viewport */}
      <OrbitalImageWheel
        images={skillsData}
        header={sectionHeader}
        turns={3}
        itemWidth={190}
        itemHeight={240}
        navbarClearance={110}
        cropRatio={0.78}
        scrollLength={400}
        scrollSensitivity={0.75}
        subtitleDirection="bottom"
        blur={5}
        dim={35}
        brightnessBoost={20}
        focusSpread={0.28}
        scaleEffect={0.08}
        captionOffset={24}
        subtitleSpeed={1}
        subtitleStagger={0.016}
        showCaption={true}
      />
    </section>
  );
}

export default Skills;
