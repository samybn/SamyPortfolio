import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Hls from "hls.js";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const ROLES = [
  "applications web",
  "applications mobiles",
  "jeux vidéo",
];

const ACCENT_GRADIENT =
  "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)";

/* ─────────────── HLS Video Background ─────────────── */
const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.45)" }} />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: "linear-gradient(to top, #0C0C0C, transparent)",
        }}
      />
    </div>
  );
};

/* ─────────────── Floating Pill Navbar ─────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Accueil");
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
      style={{ fontFamily: "'Kanit', sans-serif" }}
    >
      <div
        className="inline-flex items-center rounded-full backdrop-blur-md px-2 py-2 transition-shadow duration-300"
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(12,12,12,0.65)",
          boxShadow: scrolled
            ? "0 4px 12px rgba(0,0,0,0.3)"
            : "none",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="flex-shrink-0 rounded-full p-[2px] transition-transform duration-300"
          style={{
            width: 36,
            height: 36,
            background: logoHovered
              ? "linear-gradient(225deg, #B600A8 0%, #7621B0 50%, #BE4C00 100%)"
              : ACCENT_GRADIENT,
            transform: logoHovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{
              background: "#0C0C0C",
              fontWeight: 600,
              fontSize: 13,
              color: "#D7E2EA",
              fontStyle: "italic",
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            SB
          </div>
        </a>

        {/* Divider (hidden mobile) */}
        <div
          className="hidden sm:block mx-1"
          style={{ width: 1, height: 20, background: "rgba(215,226,234,0.15)" }}
        />

        {/* Nav Links */}
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setActiveLink(link.label)}
            className="rounded-full transition-all duration-200 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontWeight: 500,
              color:
                activeLink === link.label ? "#D7E2EA" : "rgba(215,226,234,0.5)",
              background:
                activeLink === link.label
                  ? "rgba(215,226,234,0.1)"
                  : "transparent",
            }}
            onMouseEnter={(e) => {
              if (activeLink !== link.label) {
                e.currentTarget.style.color = "#D7E2EA";
                e.currentTarget.style.background = "rgba(215,226,234,0.08)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeLink !== link.label) {
                e.currentTarget.style.color = "rgba(215,226,234,0.5)";
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {link.label}
          </a>
        ))}

        {/* Divider */}
        <div
          className="hidden sm:block mx-1"
          style={{ width: 1, height: 20, background: "rgba(215,226,234,0.15)" }}
        />

        {/* Say Hi Button */}
        <SayHiButton />
      </div>
    </motion.nav>
  );
};

const SayHiButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-full text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 transition-transform duration-200"
      style={{
        fontFamily: "'Kanit', sans-serif",
        fontWeight: 500,
        transform: hovered ? "scale(1.05)" : "scale(1)",
      }}
    >
      {/* Gradient border on hover */}
      {hovered && (
        <span
          className="absolute rounded-full"
          style={{
            inset: -2,
            background: ACCENT_GRADIENT,
            zIndex: 0,
          }}
        />
      )}
      <span
        className="relative z-10 rounded-full flex items-center gap-1 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2"
        style={{
          background: "rgba(12,12,12,0.8)",
          color: "#D7E2EA",
          margin: hovered ? 0 : undefined,
        }}
      >
        Me Contacter <span style={{ fontSize: "0.75em" }}>↗</span>
      </span>
    </a>
  );
};

/* ─────────────── Cycling Domain Text ─────────────── */
const CyclingRole = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-flex justify-center items-center px-1"
      style={{
        verticalAlign: "baseline",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={roleIndex}
          initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading inline-block font-bold italic"
          style={{
            fontFamily: "'Kanit', sans-serif",
            padding: "0 2px",
          }}
        >
          {ROLES[roleIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ─────────────── CTA Buttons ─────────────── */
const SeeWorksButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#projects"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-full text-sm px-7 py-3.5 transition-transform duration-200 inline-block"
      style={{
        fontFamily: "'Kanit', sans-serif",
        fontWeight: 500,
        transform: hovered ? "scale(1.05)" : "scale(1)",
        background: hovered ? "#0C0C0C" : "#D7E2EA",
        color: hovered ? "#D7E2EA" : "#0C0C0C",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}
    >
      {hovered && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: -2,
            background: ACCENT_GRADIENT,
            zIndex: -1,
          }}
        />
      )}
      Voir les Projets
    </a>
  );
};

const ReachOutButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-full text-sm px-7 py-3.5 transition-transform duration-200 inline-block"
      style={{
        fontFamily: "'Kanit', sans-serif",
        fontWeight: 500,
        transform: hovered ? "scale(1.05)" : "scale(1)",
        color: "#D7E2EA",
        background: "#0C0C0C",
        border: hovered ? "2px solid transparent" : "2px solid rgba(215,226,234,0.2)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}
    >
      {hovered && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: -2,
            background: ACCENT_GRADIENT,
            zIndex: -1,
          }}
        />
      )}
      Me Contacter
    </a>
  );
};

/* ─────────────── Main Hero Section ─────────────── */
export const HeroSection = () => {
  return (
    <>
      <Navbar />
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "#0C0C0C",
          fontFamily: "'Kanit', sans-serif",
        }}
      >
        {/* HLS Video Background */}
        <HeroVideo />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              color: "rgba(215,226,234,0.5)",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              fontWeight: 400,
              marginBottom: "1.5rem",
            }}
          >
            PORTFOLIO &apos;26 · GÉNIE LOGICIEL
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero-heading"
            style={{
              fontSize: "clamp(2.4rem, 7.5vw, 6.8rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              fontStyle: "italic",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            Bouadloune Samy
          </motion.h1>

          {/* Role line */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              color: "rgba(215,226,234,0.85)",
              fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)",
              fontWeight: 400,
              marginBottom: "1rem",
            }}
          >
            Étudiant en Master spécialisé en <span className="hero-heading font-black italic">Génie Logiciel</span>
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              color: "rgba(215,226,234,0.6)",
              fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
              fontWeight: 300,
              maxWidth: 580,
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            Passionné par l&apos;ingénierie logicielle et le développement Full Stack,
            je conçois et développe des <CyclingRole /> modernes, performants et scalables.
            De la conception d&apos;architectures distribuées robustes aux interfaces utilisateurs
            soignées, je transforme des problématiques complexes en solutions digitales fiables et pérennes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex gap-4"
          >
            <SeeWorksButton />
            <ReachOutButton />
          </motion.div>
        </div>
      </section>
    </>
  );
};
