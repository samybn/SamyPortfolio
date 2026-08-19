import { useState } from "react";
import { FadeIn, ContactButton } from "./shared";
import { Mail, Github, Linkedin, Twitter, Loader2 } from "lucide-react";

export const ContactSection = () => {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "jack@example.com";
  const githubUrl = import.meta.env.VITE_GITHUB_URL || "#";
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL || "#";
  const twitterUrl = import.meta.env.VITE_TWITTER_URL || "#";
  const apiUrl = import.meta.env.VITE_API_URL || "";

  const socials = [
    { Icon: Github, label: "GitHub", href: githubUrl },
    { Icon: Linkedin, label: "LinkedIn", href: linkedinUrl },
    { Icon: Twitter, label: "Twitter", href: twitterUrl },
    { Icon: Mail, label: "Email", href: `mailto:${contactEmail}` },
  ];

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (apiUrl) {
        const endpoint = apiUrl.endsWith("/") ? `${apiUrl}contact` : `${apiUrl}/contact`;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          throw new Error("Échec de l'envoi du message.");
        }
      }
      setSent(true);
    } catch (err: any) {
      console.warn("Contact API error or offline mode:", err);
      // Even if offline, show confirmation to the user
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(215, 226, 234, 0.05)",
    border: "1px solid rgba(215, 226, 234, 0.2)",
    borderRadius: 12,
    color: "#D7E2EA",
    fontFamily: "'Kanit', sans-serif",
    fontWeight: 300,
    fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
    padding: "14px 18px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      style={{
        background: "#0C0C0C",
        fontFamily: "'Kanit', sans-serif",
      }}
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-30 relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading uppercase leading-none tracking-tight text-center"
          style={{
            fontWeight: 900,
            fontSize: "clamp(3rem, 12vw, 160px)",
            fontFamily: "'Kanit', sans-serif",
            marginBottom: "clamp(2rem, 5vw, 5rem)",
          }}
        >
          Contact
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left – info */}
        <FadeIn delay={0.1} y={30}>
          <div className="flex flex-col gap-6">
            <p
              style={{
                color: "#D7E2EA",
                fontWeight: 300,
                fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                lineHeight: 1.7,
                opacity: 0.8,
              }}
            >
              Got a project in mind or just want to say hi? Drop me a message and
              I&apos;ll get back to you as soon as possible.
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <a
                href={`mailto:${contactEmail}`}
                style={{ color: "#D7E2EA", fontWeight: 400, fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
                className="uppercase tracking-wider hover:opacity-70 transition-opacity"
              >
                {contactEmail}
              </a>
              <span
                style={{ color: "#D7E2EA", fontWeight: 300, fontSize: "clamp(0.85rem, 1.3vw, 1rem)", opacity: 0.5 }}
                className="uppercase tracking-wider"
              >
                Based in Paris, France · Open to remote
              </span>
            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-4">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  style={{
                    color: "#D7E2EA",
                    border: "1px solid rgba(215,226,234,0.2)",
                    borderRadius: "50%",
                    width: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s",
                  }}
                  className="hover:bg-[#D7E2EA]/10"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Right – form */}
        <FadeIn delay={0.2} y={30}>
          {sent ? (
            <div
              style={{
                color: "#D7E2EA",
                border: "1px solid rgba(215,226,234,0.2)",
                borderRadius: 20,
                padding: "40px 32px",
                textAlign: "center",
              }}
            >
              <p style={{ fontWeight: 500, fontSize: "1.3rem", marginBottom: 8 }}>
                Message sent!
              </p>
              <p style={{ fontWeight: 300, opacity: 0.6, fontSize: "1rem" }}>
                Thanks for reaching out — I&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(215,226,234,0.6)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(215,226,234,0.2)")}
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(215,226,234,0.6)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(215,226,234,0.2)")}
              />
              <textarea
                name="message"
                placeholder="Your message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(215,226,234,0.6)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(215,226,234,0.2)")}
              />
              {error && (
                <p className="text-red-400 text-sm font-light">{error}</p>
              )}
              <div className="mt-2">
                <ContactButton label={loading ? "Sending..." : "Send Message"} />
              </div>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
};
