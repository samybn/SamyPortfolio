import { ContactButton, FadeIn } from "./shared";
import { motion } from "motion/react";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

export const HeroSection = () => {
  return (
    <section
      id="hero"
      style={{
        overflowX: "clip",
        background: "#0C0C0C",
        fontFamily: "'Kanit', sans-serif",
      }}
      className="h-screen flex flex-col relative overflow-hidden"
    >
      {/* Abstract Background Visual (Subtle, themed & softly masked) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <img
            src="/hero-bg.png"
            alt="Hero Background Abstract"
            className="w-full h-full object-cover sm:object-contain object-center opacity-25 sm:opacity-30 mix-blend-screen"
            style={{
              maskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 75%)",
            }}
          />
          {/* Subtle Ambient Color Glow to seamlessly integrate with dark theme */}
          <div
            style={{
              background:
                "radial-gradient(circle, rgba(182, 0, 168, 0.1) 0%, rgba(118, 33, 177, 0.05) 45%, transparent 70%)",
            }}
            className="absolute inset-0 w-full h-full blur-3xl pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="relative z-10">
        <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{ color: "#D7E2EA", fontWeight: 500 }}
              className="uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {link}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5 relative z-10">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading w-full whitespace-nowrap leading-none tracking-tight uppercase"
            style={{
              fontSize: "clamp(12vw, 17.5vw, 18vw)",
              fontWeight: 900,
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            Hi, i&apos;m Jack
          </h1>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 mt-auto relative z-10">
        <FadeIn delay={0.35} y={20}>
          <p
            style={{
              color: "#D7E2EA",
              fontWeight: 300,
              fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)",
            }}
            className="uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          >
            a full stack developer crafting clean, performant &amp; scalable web
            apps
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};
