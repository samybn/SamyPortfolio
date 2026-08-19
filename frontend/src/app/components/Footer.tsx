import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const NAV = ["About", "Skills", "Projects", "Contact"];

export const Footer = () => {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "jack@example.com";
  const githubUrl = import.meta.env.VITE_GITHUB_URL || "#";
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL || "#";
  const twitterUrl = import.meta.env.VITE_TWITTER_URL || "#";

  const socials = [
    { Icon: Github, label: "GitHub", href: githubUrl },
    { Icon: Linkedin, label: "LinkedIn", href: linkedinUrl },
    { Icon: Twitter, label: "Twitter", href: twitterUrl },
    { Icon: Mail, label: "Email", href: `mailto:${contactEmail}` },
  ];

  return (
    <footer
      style={{ background: "#0C0C0C", fontFamily: "'Kanit', sans-serif" }}
      className="px-5 sm:px-8 md:px-10 py-12 md:py-16"
    >
      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(215,226,234,0.12)", marginBottom: "2.5rem" }} />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <span
            className="hero-heading uppercase"
            style={{
              fontWeight: 900,
              fontSize: "clamp(2rem, 6vw, 5rem)",
              lineHeight: 1,
            }}
          >
            Jack
          </span>
          <span
            style={{
              color: "#D7E2EA",
              fontWeight: 300,
              fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)",
              opacity: 0.45,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Full Stack Developer
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-2">
          {NAV.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                color: "#D7E2EA",
                fontWeight: 400,
                fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                opacity: 0.7,
              }}
              className="hover:opacity-100 transition-opacity duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex flex-col gap-3">
          <span
            style={{
              color: "#D7E2EA",
              fontWeight: 300,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              opacity: 0.4,
            }}
          >
            Follow me
          </span>
          <div className="flex gap-3">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                style={{
                  color: "#D7E2EA",
                  border: "1px solid rgba(215,226,234,0.18)",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, opacity 0.2s",
                  opacity: 0.7,
                }}
                className="hover:opacity-100 hover:bg-[#D7E2EA]/10"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
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
            opacity: 0.35,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          &copy; {new Date().getFullYear()} Jack — All rights reserved
        </span>
        <span
          style={{
            color: "#D7E2EA",
            fontWeight: 300,
            fontSize: "0.8rem",
            opacity: 0.25,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Designed &amp; built with passion
        </span>
      </div>
    </footer>
  );
};
