import { OrbitalImageWheel } from "./unlumen-ui/orbital-image-wheel";

/* ─── Devicon base URL ─── */
const DEVICON = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

/* ─── Skills data ─── */
const skills = [
  {
    src: DEVICON("java"),
    label: "Java",
    subtitle: "POO, Spring Boot, API REST et architectures backend",
    bg: "transparent",
    contain: true,
  },
  {
    src: DEVICON("react"),
    label: "React",
    subtitle: "Interfaces modernes, hooks et gestion d'état",
    bg: "transparent",
    contain: true,
  },
  {
    src: DEVICON("nextjs"),
    label: "Next.js",
    subtitle: "SSR, App Router et applications full-stack",
    bg: "transparent",
    contain: true,
  },
  {
    src: DEVICON("typescript"),
    label: "TypeScript",
    subtitle: "Typage strict pour un code robuste et maintenable",
    bg: "transparent",
    contain: true,
  },
  {
    src: DEVICON("spring"),
    label: "Spring Boot",
    subtitle: "Microservices, sécurité JWT, JPA/Hibernate",
    bg: "transparent",
    contain: true,
  },
  {
    src: DEVICON("nodejs"),
    label: "Node.js",
    subtitle: "APIs rapides avec Express et traitements asynchrones",
    bg: "transparent",
    contain: true,
  },
  {
    src: DEVICON("python"),
    label: "Python",
    subtitle: "Data, scripts d'automatisation et machine learning",
    bg: "transparent",
    contain: true,
  },
  {
    src: DEVICON("postgresql"),
    label: "PostgreSQL",
    subtitle: "Modélisation, requêtes avancées et optimisation",
    bg: "transparent",
    contain: true,
  },
  {
    src: DEVICON("mysql"),
    label: "MySQL",
    subtitle: "Bases relationnelles et conception de schémas",
    bg: "transparent",
    contain: true,
  },
  {
    src: DEVICON("docker"),
    label: "Docker",
    subtitle: "Conteneurisation et déploiement reproductible",
    bg: "transparent",
    contain: true,
  },
  {
    src: DEVICON("git"),
    label: "Git",
    subtitle: "Versioning, branches et workflows collaboratifs",
    bg: "transparent",
    contain: true,
  },
  {
    src: DEVICON("linux"),
    label: "Linux",
    subtitle: "Administration système et ligne de commande",
    bg: "transparent",
    contain: true,
  },
];

/* ─── Title block passed as header slot ─── */
const SectionHeader = (
  <>
    {/* Eyebrow */}
    <span
      style={{
        color: "rgba(215,226,234,0.45)",
        fontFamily: "'Kanit', sans-serif",
        fontSize: "0.72rem",
        textTransform: "uppercase",
        letterSpacing: "0.3em",
        display: "block",
        marginBottom: "0.6rem",
      }}
    >
      Stack technique
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
      Mes compétences
    </h2>
  </>
);

/* ─── Skills Section ─── */
export function Skills() {
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
        images={skills}
        header={SectionHeader}
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
