import { useLanguage } from "../context/LanguageContext";
import { FadeIn } from "./shared";
import { getSocialLinks } from "../constants/socials";

export const Footer = () => {
  const { t } = useLanguage();
  const socials = getSocialLinks();

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer
      className="bg-portfolio-dark px-5 sm:px-8 md:px-10 py-12 md:py-16 relative overflow-hidden"
    >
      {/* Divider */}
      <FadeIn delay={0} y={15}>
        <div style={{ borderTop: "1px solid rgba(215,226,234,0.12)", marginBottom: "2.5rem" }} />
      </FadeIn>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Brand */}
        <FadeIn delay={0.06} y={25}>
          <div className="flex flex-col gap-3">
            <span
              className="hero-heading uppercase"
              style={{
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                lineHeight: 1,
              }}
            >
              Bouadloune Samy
            </span>
            <span
              className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-70"
              style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)" }}
            >
              {t.footer.subtitle}
            </span>
          </div>
        </FadeIn>

        {/* Nav */}
        <FadeIn delay={0.12} y={25}>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)" }}
                className="text-[#D7E2EA] font-normal uppercase tracking-wider opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </FadeIn>

        {/* Socials */}
        <FadeIn delay={0.18} y={25}>
          <div className="flex flex-col gap-3">
            <span
              className="text-[#D7E2EA] font-light text-xs uppercase tracking-widest opacity-70"
            >
              {t.footer.socialsTitle}
            </span>
            <div className="flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="portfolio-social-btn w-10 h-10"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom */}
      <FadeIn delay={0.24} y={15}>
        <div
          style={{
            borderTop: "1px solid rgba(215,226,234,0.08)",
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              color: "#D7E2EA",
              fontWeight: 300,
              fontSize: "0.8rem",
              opacity: 0.7,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            &copy; {new Date().getFullYear()} {t.footer.rights}
          </span>
          <span
            style={{
              color: "#D7E2EA",
              fontWeight: 300,
              fontSize: "0.8rem",
              opacity: 0.7,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {t.footer.crafted}
          </span>
        </div>
      </FadeIn>
    </footer>
  );
};
