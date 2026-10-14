import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Hls from "hls.js";
import { useLanguage } from "../context/LanguageContext";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const ACCENT_GRADIENT = "var(--accent-gradient)";

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
  const { t, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#hero");
  const [logoHovered, setLogoHovered] = useState(false);

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

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
      className="fixed top-0 left-0 right-0 z-[1000] flex justify-center pt-4 md:pt-6 px-4"
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
          aria-label={lang === "FR" ? "Accueil - Bouadloune Samy" : "Home - Bouadloune Samy"}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="flex-shrink-0 rounded-full p-[2px] transition-transform duration-300"
          style={{
            width: 36,
            height: 36,
            background: logoHovered
              ? "linear-gradient(225deg, #90e0ef 0%, #0077b6 50%, #00b4d8 100%)"
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
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setActiveHref(link.href)}
            className="rounded-full transition-all duration-200 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
            style={{
              fontWeight: 500,
              color:
                activeHref === link.href ? "#D7E2EA" : "rgba(215,226,234,0.7)",
              background:
                activeHref === link.href
                  ? "rgba(215,226,234,0.1)"
                  : "transparent",
            }}
            onMouseEnter={(e) => {
              if (activeHref !== link.href) {
                e.currentTarget.style.color = "#D7E2EA";
                e.currentTarget.style.background = "rgba(215,226,234,0.08)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeHref !== link.href) {
                e.currentTarget.style.color = "rgba(215,226,234,0.7)";
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
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#contact"
      aria-label={t.nav.sayHi}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-full text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 transition-transform duration-200"
      style={{
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
        {t.nav.sayHi} <span style={{ fontSize: "0.75em" }}>↗</span>
      </span>
    </a>
  );
};

/* ─────────────── Cycling Domain Text ─────────────── */
const CyclingRole = () => {
  const { t } = useLanguage();
  const roles = t.hero.roles;
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    setRoleIndex(0);
  }, [roles]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [roles]);

  return (
    <span
      className="inline-flex justify-center items-center px-1"
      style={{
        verticalAlign: "baseline",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={`${roleIndex}-${roles[roleIndex]}`}
          initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading inline-block font-bold italic"
          style={{
            padding: "0 2px",
          }}
        >
          {roles[roleIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ─────────────── CTA Buttons ─────────────── */
const SeeWorksButton = () => {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#projects"
      aria-label={t.hero.seeWorks}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-full text-sm px-7 py-3.5 transition-transform duration-200 inline-block"
      style={{
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
      {t.hero.seeWorks}
    </a>
  );
};

const ReachOutButton = () => {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#contact"
      aria-label={t.hero.reachOut}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-full text-sm px-7 py-3.5 transition-transform duration-200 inline-block"
      style={{
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
      {t.hero.reachOut}
    </a>
  );
};

/* ─────────────── Main Hero Section ─────────────── */
export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center overflow-hidden bg-portfolio-dark"
      >
        {/* HLS Video Background */}
        <HeroVideo />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero-heading whitespace-nowrap"
            style={{
              fontSize: "clamp(1.5rem, 5.2vw, 4.2rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontStyle: "italic",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
              whiteSpace: "nowrap",
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
            {t.hero.rolePrefix}
            <span className="hero-heading font-black italic">
              {t.hero.roleHighlight}
            </span>
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
            {t.hero.descriptionPart1}
            <CyclingRole />
            {t.hero.descriptionPart2}
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

