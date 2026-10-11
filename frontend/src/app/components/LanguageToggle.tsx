import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

const ACCENT_GRADIENT =
  "linear-gradient(135deg, #023e8a 0%, #0077b6 40%, #00b4d8 75%, #90e0ef 100%)";

export const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[999] select-none"
      style={{ fontFamily: "'Kanit', sans-serif" }}
    >
      <div
        className="relative flex items-center p-1 rounded-full border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,180,216,0.25)]"
        style={{
          background: "rgba(16, 16, 18, 0.85)",
          boxShadow:
            "0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.08)",
        }}
        role="group"
        aria-label="Sélection de la langue"
      >
        {/* Globe icon */}
        <div className="pl-2 pr-1 text-white/40 flex items-center justify-center">
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        </div>

        {(["FR", "EN"] as const).map((item) => {
          const isActive = lang === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setLang(item)}
              className="relative px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-200 cursor-pointer focus:outline-none"
              style={{
                color: isActive ? "#FFFFFF" : "rgba(215, 226, 234, 0.5)",
              }}
              aria-pressed={isActive}
              aria-label={`Langue ${item === "FR" ? "Français" : "English"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeLangIndicator"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: ACCENT_GRADIENT,
                    boxShadow: "0 2px 10px rgba(0, 180, 216, 0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

