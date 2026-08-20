import { useState, useRef, MouseEvent } from "react";
import { motion } from "motion/react";
import { FadeIn } from "./shared";
import { Code2, Server, Terminal, Sparkles } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface Category {
  id: string;
  label: string;
  subtitle: string;
  icon: typeof Code2;
  accentGradient: string;
  glowColor: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    id: "frontend",
    label: "Frontend",
    subtitle: "Interfaces modernes, réactives & animées",
    icon: Code2,
    accentGradient: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
    glowColor: "rgba(236, 72, 153, 0.25)",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Vue.js", level: 75 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    subtitle: "APIs évolutives & bases de données cloud",
    icon: Server,
    accentGradient: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
    glowColor: "rgba(139, 92, 246, 0.25)",
    skills: [
      { name: "Node.js", level: 93 },
      { name: "Python", level: 85 },
      { name: "PostgreSQL", level: 88 },
      { name: "GraphQL", level: 82 },
      { name: "Redis", level: 78 },
      { name: "Express.js", level: 91 },
    ],
  },
  {
    id: "tools",
    label: "Outils & DevOps",
    subtitle: "DevOps, cloud & flux de travail",
    icon: Terminal,
    accentGradient: "linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)",
    glowColor: "rgba(245, 158, 11, 0.25)",
    skills: [
      { name: "Git", level: 96 },
      { name: "Docker", level: 85 },
      { name: "AWS", level: 78 },
      { name: "CI/CD", level: 82 },
      { name: "Linux", level: 84 },
      { name: "Figma", level: 75 },
    ],
  },
];

interface FloatingTag {
  name: string;
  position: string;
  duration: number;
  delay: number;
  yOffset: number;
  xOffset: number;
  baseRotate: number;
  baseScale: number;
  glow?: string;
}

const FLOATING_TAGS: FloatingTag[] = [
  // Upper Organic Cloud (Asymmetrical around Header)
  {
    name: "React",
    position: "top-7 left-[3%] sm:left-[5%] lg:left-[7%]",
    duration: 5.6,
    delay: 0,
    yOffset: -16,
    xOffset: 5,
    baseRotate: -5,
    baseScale: 1.05,
    glow: "rgba(97, 218, 251, 0.45)",
  },
  {
    name: "Node.js",
    position: "top-9 right-[4%] sm:right-[7%] lg:right-[8%]",
    duration: 6.2,
    delay: 0.8,
    yOffset: -18,
    xOffset: -6,
    baseRotate: 4,
    baseScale: 1.05,
    glow: "rgba(104, 160, 99, 0.45)",
  },
  {
    name: "Java",
    position: "top-28 right-[14%] sm:right-[18%] lg:right-[22%] hidden md:block",
    duration: 6.8,
    delay: 1.6,
    yOffset: -14,
    xOffset: 7,
    baseRotate: -3,
    baseScale: 0.95,
    glow: "rgba(248, 152, 32, 0.4)",
  },
  {
    name: "Next.js",
    position: "top-24 left-[15%] sm:left-[19%] lg:left-[23%] hidden md:block",
    duration: 5.9,
    delay: 1.1,
    yOffset: -15,
    xOffset: -5,
    baseRotate: 6,
    baseScale: 0.98,
    glow: "rgba(255, 255, 255, 0.35)",
  },

  // Flanc Gauche Dispersé (Marge extérieure naturelle)
  {
    name: "TypeScript",
    position: "top-[36%] left-[1%] sm:left-[2%] lg:left-[2%] 2xl:left-[4%]",
    duration: 6.4,
    delay: 0.4,
    yOffset: -17,
    xOffset: 6,
    baseRotate: 4,
    baseScale: 1.02,
    glow: "rgba(49, 120, 198, 0.45)",
  },
  {
    name: "Python",
    position: "top-[54%] left-[2%] sm:left-[3%] lg:left-[3%] 2xl:left-[5%]",
    duration: 7.1,
    delay: 1.9,
    yOffset: -15,
    xOffset: -7,
    baseRotate: -6,
    baseScale: 0.96,
    glow: "rgba(255, 212, 59, 0.45)",
  },
  {
    name: "PostgreSQL",
    position: "top-[73%] left-[1%] sm:left-[2%] lg:left-[2%] 2xl:left-[3%]",
    duration: 5.7,
    delay: 2.3,
    yOffset: -14,
    xOffset: 5,
    baseRotate: 5,
    baseScale: 0.94,
    glow: "rgba(51, 103, 145, 0.4)",
  },

  // Flanc Droit Dispersé (Marge extérieure naturelle)
  {
    name: "GraphQL",
    position: "top-[38%] right-[1%] sm:right-[2%] lg:right-[2%] 2xl:right-[4%]",
    duration: 5.8,
    delay: 1.4,
    yOffset: -16,
    xOffset: -6,
    baseRotate: -4,
    baseScale: 1.0,
    glow: "rgba(229, 53, 171, 0.45)",
  },
  {
    name: "Docker",
    position: "top-[56%] right-[2%] sm:right-[3%] lg:right-[3%] 2xl:right-[5%]",
    duration: 6.5,
    delay: 0.7,
    yOffset: -19,
    xOffset: 8,
    baseRotate: 5,
    baseScale: 1.04,
    glow: "rgba(13, 183, 237, 0.45)",
  },
  {
    name: "Redis",
    position: "top-[74%] right-[1%] sm:right-[2%] lg:right-[2%] 2xl:right-[3%]",
    duration: 6.0,
    delay: 2.1,
    yOffset: -13,
    xOffset: -5,
    baseRotate: -5,
    baseScale: 0.95,
    glow: "rgba(220, 56, 45, 0.4)",
  },

  // Zone Inférieure Organique (Sous les cartes)
  {
    name: "AWS",
    position: "bottom-7 left-[5%] sm:left-[10%] lg:left-[14%]",
    duration: 6.3,
    delay: 1.3,
    yOffset: -15,
    xOffset: 6,
    baseRotate: 3,
    baseScale: 0.98,
    glow: "rgba(255, 153, 0, 0.4)",
  },
  {
    name: "MongoDB",
    position: "bottom-14 left-[24%] sm:left-[28%] lg:left-[32%] hidden sm:block",
    duration: 5.5,
    delay: 2.7,
    yOffset: -12,
    xOffset: -6,
    baseRotate: -4,
    baseScale: 0.92,
    glow: "rgba(77, 179, 61, 0.4)",
  },
  {
    name: "Tailwind",
    position: "bottom-6 left-[46%] sm:left-[48%] -translate-x-1/2 hidden md:block",
    duration: 6.7,
    delay: 0.5,
    yOffset: -14,
    xOffset: 5,
    baseRotate: 2,
    baseScale: 1.02,
    glow: "rgba(56, 189, 248, 0.45)",
  },
  {
    name: "Linux",
    position: "bottom-14 right-[24%] sm:right-[28%] lg:right-[32%] hidden sm:block",
    duration: 5.9,
    delay: 1.8,
    yOffset: -13,
    xOffset: 7,
    baseRotate: 6,
    baseScale: 0.93,
    glow: "rgba(255, 214, 0, 0.35)",
  },
  {
    name: "Git",
    position: "bottom-7 right-[5%] sm:right-[10%] lg:right-[14%]",
    duration: 5.4,
    delay: 0.9,
    yOffset: -17,
    xOffset: -5,
    baseRotate: -3,
    baseScale: 1.0,
    glow: "rgba(240, 80, 50, 0.45)",
  },
];

function FloatingPill({ tag }: { tag: FloatingTag }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`absolute ${tag.position} z-20 select-none cursor-pointer`}
      animate={{
        y: [0, tag.yOffset, tag.yOffset * 0.4, 0],
        x: [0, tag.xOffset, -tag.xOffset * 0.6, 0],
        rotate: [
          tag.baseRotate,
          tag.baseRotate + 2.5,
          tag.baseRotate - 2,
          tag.baseRotate,
        ],
      }}
      transition={{
        duration: tag.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: tag.delay,
      }}
      whileHover={{
        scale: tag.baseScale * 1.2,
        y: tag.yOffset - 14,
        rotate: 0,
        transition: { type: "spring", stiffness: 350, damping: 15 },
      }}
      whileTap={{ scale: tag.baseScale * 0.9 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          background: isHovered
            ? "rgba(30, 30, 30, 0.95)"
            : "rgba(16, 16, 16, 0.68)",
          border: isHovered
            ? "1px solid rgba(215, 226, 234, 0.65)"
            : "1px solid rgba(215, 226, 234, 0.16)",
          boxShadow: isHovered
            ? `0 14px 40px -4px ${tag.glow || "rgba(215,226,234,0.4)"}`
            : "0 6px 22px -3px rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(14px)",
          fontFamily: "'Kanit', sans-serif",
          transform: `scale(${tag.baseScale})`,
        }}
        className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 group"
      >
        <span
          style={{
            color: isHovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.9)",
          }}
          className="text-xs sm:text-sm md:text-[0.95rem] font-semibold tracking-wider whitespace-nowrap"
        >
          {tag.name}
        </span>
      </div>
    </motion.div>
  );
}

function SkillRow({
  skill,
  delay,
  accentGradient,
}: {
  skill: Skill;
  delay: number;
  accentGradient: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 sm:gap-4 py-3 border-b border-[rgba(215,226,234,0.06)] last:border-0 cursor-default transition-all duration-200"
    >
      {/* Skill Name */}
      <span
        style={{
          color: hovered ? "#FFFFFF" : "#D7E2EA",
          fontFamily: "'Kanit', sans-serif",
          transform: hovered ? "translateX(3px)" : "translateX(0)",
        }}
        className="text-sm font-light w-28 sm:w-32 shrink-0 transition-all duration-200"
      >
        {skill.name}
      </span>

      {/* Progress Track */}
      <div className="flex-1 h-[5px] bg-[rgba(215,226,234,0.08)] rounded-full overflow-hidden relative">
        <motion.div
          style={{
            background: accentGradient,
            boxShadow: hovered
              ? "0 0 12px rgba(236, 72, 153, 0.6)"
              : "none",
          }}
          className="h-full rounded-full transition-shadow duration-300"
          initial={{ width: "0%" }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        />
      </div>

      {/* Percentage */}
      <span
        style={{
          color: hovered ? "#FFFFFF" : "#D7E2EA",
          opacity: hovered ? 0.9 : 0.45,
          fontFamily: "'Kanit', sans-serif",
        }}
        className="text-xs font-mono w-9 text-right transition-all duration-200"
      >
        {skill.level}%
      </span>
    </div>
  );
}

function InteractiveCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = category.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -1000, y: -1000 });
      }}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        background: "rgba(18, 18, 18, 0.75)",
        backdropFilter: "blur(16px)",
      }}
      className="relative rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 border border-[rgba(215,226,234,0.12)] overflow-hidden group shadow-2xl transition-all duration-300"
    >
      {/* Interactive Spotlight Radial Gradient Following Mouse */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, ${category.glowColor}, transparent 70%)`,
        }}
      />

      {/* Subtle Permanent Corner Glow */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
        style={{ background: category.accentGradient }}
      />

      {/* Card Content */}
      <div className="relative z-10">
        {/* Category Header */}
        <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8 pb-5 border-b border-[rgba(215,226,234,0.08)]">
          <div className="flex items-center gap-3">
            {/* Category Icon Badge */}
            <div
              style={{
                background: "rgba(215, 226, 234, 0.06)",
                border: "1px solid rgba(215, 226, 234, 0.15)",
              }}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-[#D7E2EA] group-hover:scale-110 transition-transform duration-300"
            >
              <Icon size={18} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  style={{ color: "#D7E2EA", fontFamily: "'Kanit', sans-serif" }}
                  className="text-base sm:text-lg font-medium uppercase tracking-wider"
                >
                  {category.label}
                </span>
              </div>
              <p
                style={{ color: "#D7E2EA" }}
                className="text-xs font-light opacity-50"
              >
                {category.subtitle}
              </p>
            </div>
          </div>

          {/* Accent Line Indicator */}
          <div
            style={{
              background: category.accentGradient,
              boxShadow: `0 0 10px ${category.glowColor}`,
            }}
            className="w-8 h-[3px] rounded-full"
          />
        </div>

        {/* Skills List */}
        <div className="flex flex-col">
          {category.skills.map((skill, i) => (
            <SkillRow
              key={skill.name}
              skill={skill}
              delay={index * 0.1 + i * 0.05}
              accentGradient={category.accentGradient}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export const SkillsSection = () => {
  return (
    <section
      id="skills"
      style={{
        background: "#0C0C0C",
        fontFamily: "'Kanit', sans-serif",
      }}
      className="relative z-20 px-4 sm:px-8 md:px-12 lg:px-16 py-28 sm:py-36 md:py-44 overflow-hidden"
    >
      {/* Floating Interactive Tech Pills Around the Outer Perimeter */}
      {FLOATING_TAGS.map((tag) => (
        <FloatingPill key={tag.name} tag={tag} />
      ))}

      {/* Ambient Animated Color Blobs in Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Left Purple/Pink Glow */}
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(182, 0, 168, 0.16) 0%, rgba(118, 33, 177, 0.08) 50%, transparent 70%)",
          }}
          className="absolute top-1/4 -left-32 w-[550px] h-[550px] rounded-full blur-[130px] animate-pulse"
        />

        {/* Right Indigo/Blue Glow */}
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.16) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 70%)",
          }}
          className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] animate-pulse"
        />

        {/* Center Accent Glow */}
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(190, 76, 0, 0.08) 0%, transparent 60%)",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px]"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <FadeIn delay={0} y={30} className="mb-14 sm:mb-18 md:mb-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(215,226,234,0.15)] bg-[rgba(215,226,234,0.03)] backdrop-blur-md mb-6">
            <Sparkles size={13} className="text-[#EC4899]" />
            <span
              style={{ color: "#D7E2EA" }}
              className="text-xs uppercase tracking-[0.25em] font-light opacity-80"
            >
              Stack Technique &amp; Maîtrise
            </span>
          </div>

          {/* Heading */}
          <h2
            className="hero-heading uppercase leading-none tracking-tight mb-6"
            style={{
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 8vw, 120px)",
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            Compétences &amp; Expertise
          </h2>

          {/* Description */}
          <p
            style={{ color: "#D7E2EA" }}
            className="text-sm sm:text-base md:text-lg font-light opacity-70 max-w-2xl mx-auto leading-relaxed"
          >
            Un ensemble de technologies, frameworks et outils modernes que j&apos;utilise
            pour concevoir des expériences numériques performantes, évolutives et élégantes.
          </p>
        </FadeIn>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((category, index) => (
            <InteractiveCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
