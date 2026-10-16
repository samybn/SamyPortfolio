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

/* ─────────────── Floating Pill Navbar with Mobile Menu ─────────────── */
const Navbar = () => {
  const { t, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#hero");
  const [logoHovered, setLogoHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setActiveHref(href);
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-[1000] flex justify-center pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4"
      >
        <div
          className="w-full sm:w-auto sm:max-w-fit flex items-center justify-between sm:justify-start gap-2 sm:gap-2.5 rounded-full backdrop-blur-xl px-3.5 sm:px-3.5 py-2.5 sm:py-2.5 transition-all duration-300"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(12,12,12,0.78)",
            boxShadow: scrolled
              ? "0 10px 30px -10px rgba(0,0,0,0.8), 0 0 15px rgba(0,180,216,0.15)"
              : "0 4px 16px rgba(0,0,0,0.3)",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            aria-label={lang === "FR" ? "Accueil - Bouadloune Samy" : "Home - Bouadloune Samy"}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="flex-shrink-0 rounded-full p-[2px] transition-transform duration-300"
            style={{
              width: 40,
              height: 40,
              background: logoHovered
                ? "linear-gradient(225deg, #90e0ef 0%, #0077b6 50%, #00b4d8 100%)"
                : ACCENT_GRADIENT,
              transform: logoHovered ? "scale(1.08)" : "scale(1)",
            }}
          >
            <div
              className="w-full h-full rounded-full flex items-center justify-center font-bold text-xs sm:text-sm italic"
              style={{
                background: "#0C0C0C",
                color: "#D7E2EA",
              }}
            >
              SB
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="rounded-full transition-all duration-200 text-xs sm:text-sm px-3.5 sm:px-4 py-2 whitespace-nowrap"
                style={{
                  fontWeight: 500,
                  color:
                    activeHref === link.href ? "#D7E2EA" : "rgba(215,226,234,0.7)",
                  background:
                    activeHref === link.href
                      ? "rgba(215,226,234,0.12)"
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
          </div>

          {/* Divider (Desktop only) */}
          <div
            className="hidden sm:block mx-1.5 sm:mx-2"
            style={{ width: 1, height: 22, background: "rgba(215,226,234,0.15)" }}
          />

          {/* Say Hi Button (Desktop only) */}
          <div className="hidden sm:block">
            <SayHiButton />
          </div>

          {/* Mobile Right Controls: Quick Contact + Hamburger Button */}
          <div className="flex sm:hidden items-center gap-1.5">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              aria-label={t.nav.sayHi}
              className="text-xs px-3 py-2 rounded-full border border-[rgba(215,226,234,0.25)] text-[#D7E2EA] font-medium whitespace-nowrap active:scale-95 transition-all bg-[rgba(215,226,234,0.06)]"
            >
              Contact ↗
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu de navigation"}
              className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1 text-[#D7E2EA] transition-colors focus:outline-none"
              style={{
                background: mobileMenuOpen ? "rgba(0,180,216,0.18)" : "rgba(215,226,234,0.08)",
                border: "1px solid rgba(215,226,234,0.15)",
              }}
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-0.5 bg-[#D7E2EA] rounded-full block"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="w-4 h-0.5 bg-[#D7E2EA] rounded-full block"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-0.5 bg-[#D7E2EA] rounded-full block"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ─────────────── Mobile Fullscreen / Backdrop Drawer Menu ─────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[990] bg-black/85 backdrop-blur-2xl flex flex-col justify-between p-6 sm:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Top spacing under floating navbar */}
            <div className="pt-20 flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D7E2EA]/50 font-medium px-4 mb-2">
                Navigation
              </span>

              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-xl font-medium transition-all"
                  style={{
                    color: activeHref === link.href ? "#90e0ef" : "#D7E2EA",
                    background:
                      activeHref === link.href
                        ? "rgba(144, 224, 239, 0.1)"
                        : "transparent",
                    border:
                      activeHref === link.href
                        ? "1px solid rgba(144, 224, 239, 0.25)"
                        : "1px solid transparent",
                  }}
                >
                  <span>{link.label}</span>
                  <span className="text-xs opacity-40 font-mono tracking-wider">0{idx + 1}</span>
                </motion.a>
              ))}
            </div>

            {/* Bottom info & direct action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex flex-col gap-3 pt-6 border-t border-[rgba(215,226,234,0.12)]"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="w-full py-3.5 rounded-full text-center text-sm font-semibold uppercase tracking-widest text-[#0C0C0C] bg-[#D7E2EA] shadow-lg active:scale-98 transition-transform"
              >
                {t.nav.sayHi} ↗
              </a>
              <p className="text-center text-xs text-[#D7E2EA]/50 font-light mt-1">
                Bouadloune Samy · Paris, France
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
      className="relative inline-flex items-center rounded-full text-xs sm:text-sm px-3.5 sm:px-4 py-2 transition-all duration-200"
      style={{
        fontWeight: 500,
        background: hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#D7E2EA",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered ? "0 0 12px rgba(0,180,216,0.25)" : "none",
      }}
    >
      <span className="flex items-center gap-1.5">
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
      className="relative rounded-full text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 transition-transform duration-200 inline-block text-center w-full sm:w-auto"
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
      className="relative rounded-full text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 transition-transform duration-200 inline-block text-center w-full sm:w-auto"
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
        className="relative h-screen min-h-[560px] flex items-center justify-center overflow-hidden bg-portfolio-dark"
      >
        {/* HLS Video Background */}
        <HeroVideo />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl w-full">

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero-heading whitespace-nowrap"
            style={{
              fontSize: "clamp(1.35rem, 5.5vw, 4.2rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontStyle: "italic",
              textTransform: "uppercase",
              marginBottom: "1rem",
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
              fontSize: "clamp(0.9rem, 1.8vw, 1.25rem)",
              fontWeight: 400,
              marginBottom: "0.85rem",
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
            className="px-2"
            style={{
              color: "rgba(215,226,234,0.6)",
              fontSize: "clamp(0.82rem, 1.2vw, 1rem)",
              fontWeight: 300,
              maxWidth: 580,
              lineHeight: 1.7,
              marginBottom: "2rem",
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
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-[280px] sm:max-w-none items-stretch sm:items-center justify-center"
          >
            <SeeWorksButton />
            <ReachOutButton />
          </motion.div>
        </div>
      </section>
    </>
  );
};

