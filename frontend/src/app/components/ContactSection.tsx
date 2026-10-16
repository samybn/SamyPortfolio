import { useState, useEffect, useRef } from "react";
import { FadeIn, ContactButton } from "./shared";
import { useLanguage } from "../context/LanguageContext";
import { getSocialLinks } from "../constants/socials";

export const ContactSection = () => {
  const { t } = useLanguage();
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "samy.bouadloune6@gmail.com";
  const apiUrl = import.meta.env.VITE_API_URL || "";
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
  const socials = getSocialLinks();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  /** Honeypot — hidden field, humans never fill it */
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  // Mount the Turnstile widget after the script loads
  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) return;

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const w = window as any;
      if (w.turnstile && turnstileRef.current) {
        w.turnstile.render(turnstileRef.current, {
          sitekey: turnstileSiteKey,
          callback: (token: string) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(""),
        });
      }
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [turnstileSiteKey]);

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
      const endpoint = apiUrl
        ? apiUrl.endsWith("/")
          ? `${apiUrl}contact`
          : `${apiUrl}/contact`
        : "/api/contact";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website, turnstileToken }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || t.contact.errorMessage);
      }

      setSent(true);
    } catch (err: any) {
      console.error("Contact API error:", err);
      setError(err?.message || t.contact.errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    <section
      id="contact"
      className="bg-portfolio-dark rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-30 relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]">
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(0, 180, 216, 0.08) 0%, transparent 70%)",
          }}
          className="absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px]"
        />
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(0, 119, 182, 0.08) 0%, transparent 70%)",
          }}
          className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full blur-[140px]"
        />
      </div>

      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading uppercase leading-none tracking-tight text-center"
          style={{
            fontWeight: 900,
            fontSize: "clamp(3rem, 12vw, 160px)",
            marginBottom: "clamp(2rem, 5vw, 5rem)",
          }}
        >
          {t.contact.heading}
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left – info */}
        <FadeIn delay={0.1} y={30}>
          <div className="flex flex-col gap-6">
            <p
              className="text-[#D7E2EA] font-light leading-relaxed opacity-80"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}
            >
              {t.contact.intro}
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <a
                href={`mailto:${contactEmail}`}
                className="text-[#D7E2EA] font-normal uppercase tracking-wider hover:opacity-70 transition-opacity break-all text-sm sm:text-base md:text-lg"
              >
                {contactEmail}
              </a>
              <span
                style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)" }}
                className="text-[#D7E2EA] font-light uppercase tracking-wider opacity-75"
              >
                {t.contact.location}
              </span>
            </div>

            {/* Socials */}
            <div className="flex gap-3 sm:gap-4 mt-4">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="portfolio-social-btn w-11 h-11 sm:w-12 sm:h-12"
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
              className="text-[#D7E2EA] border border-[#D7E2EA]/20 rounded-[20px] py-10 px-6 sm:px-8 text-center"
            >
              <p className="font-medium text-xl sm:text-2xl mb-2">
                {t.contact.successTitle}
              </p>
              <p className="font-light opacity-80 text-sm sm:text-base">
                {t.contact.successDesc}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4">
              {/* Honeypot — hidden from humans, visible to bots */}
              <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} tabIndex={-1} aria-hidden="true">
                <label htmlFor="contact-website">Ne pas remplir</label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <input
                type="text"
                name="name"
                aria-label={t.contact.namePlaceholder}
                placeholder={t.contact.namePlaceholder}
                required
                maxLength={100}
                value={form.name}
                onChange={handleChange}
                className="portfolio-input"
              />
              <input
                type="email"
                name="email"
                aria-label={t.contact.emailPlaceholder}
                placeholder={t.contact.emailPlaceholder}
                required
                maxLength={320}
                value={form.email}
                onChange={handleChange}
                className="portfolio-input"
              />
              <textarea
                name="message"
                aria-label={t.contact.messagePlaceholder}
                placeholder={t.contact.messagePlaceholder}
                required
                rows={4}
                maxLength={5000}
                value={form.message}
                onChange={handleChange}
                className="portfolio-input resize-none"
              />

              {/* Cloudflare Turnstile — only rendered when site key is configured */}
              {turnstileSiteKey && (
                <div ref={turnstileRef} className="mt-1" />
              )}

              {error && (
                <p className="text-red-400 text-sm font-light">{error}</p>
              )}
              <div className="mt-2 w-full">
                <ContactButton
                  type="submit"
                  className="w-full sm:w-auto"
                  label={loading ? t.contact.sendingButton : t.contact.sendButton}
                  ariaLabel={loading ? t.contact.sendingButton : t.contact.sendButton}
                />
              </div>
            </form>

          )}
        </FadeIn>
      </div>
    </section>
  );
};
