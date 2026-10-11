import { useEffect } from "react";
import { Home, Compass } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface NotFoundPageProps {
  invalidPath?: string;
  onGoHome: () => void;
  onGoProjects: () => void;
}

export function NotFoundPage({
  invalidPath,
  onGoHome,
  onGoProjects,
}: NotFoundPageProps) {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const prevTitle = document.title;
    document.title = "404 — Page non trouvée | Samy's Portfolio";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div
      style={{
        background: "#0C0C0C",
        fontFamily: "'Kanit', sans-serif",
        minHeight: "100vh",
      }}
      className="relative flex flex-col items-center justify-center px-6 py-20 text-center text-[#D7E2EA] overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 180, 216, 0.12) 0%, rgba(2, 62, 138, 0.04) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-lg">
        {/* 404 Badge */}
        <span
          style={{
            background: "rgba(215, 226, 234, 0.06)",
            border: "1px solid rgba(215, 226, 234, 0.15)",
            color: "#90e0ef",
          }}
          className="text-xs sm:text-sm uppercase tracking-widest px-4 py-1.5 rounded-full font-semibold mb-6"
        >
          {t.notFound.badge}
        </span>

        {/* 404 Heading */}
        <h1
          style={{
            fontSize: "clamp(5rem, 16vw, 130px)",
            fontWeight: 900,
            lineHeight: 0.9,
            background:
              "linear-gradient(135deg, #FFFFFF 0%, #D7E2EA 50%, rgba(144, 224, 239, 0.5) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="mb-4 select-none"
        >
          404
        </h1>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 text-white">
          {t.notFound.title}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base opacity-75 font-light leading-relaxed mb-4 max-w-md">
          {t.notFound.description}
        </p>

        {invalidPath && (
          <code
            style={{
              background: "rgba(215, 226, 234, 0.05)",
              border: "1px solid rgba(215, 226, 234, 0.12)",
              color: "#90e0ef",
            }}
            className="text-xs px-3 py-1.5 rounded-md mb-8 font-mono break-all max-w-full"
          >
            {invalidPath}
          </code>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <button
            type="button"
            onClick={onGoHome}
            style={{
              background:
                "linear-gradient(123deg, #023e8a 7%, #0077b6 37%, #00b4d8 72%, #90e0ef 100%)",
              boxShadow: "0px 4px 16px rgba(0, 180, 216, 0.3)",
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium text-xs sm:text-sm uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            <Home size={16} />
            <span>{t.notFound.backHome}</span>
          </button>

          <button
            type="button"
            onClick={onGoProjects}
            style={{
              border: "1px solid rgba(215, 226, 234, 0.25)",
              background: "rgba(215, 226, 234, 0.05)",
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[#D7E2EA] font-medium text-xs sm:text-sm uppercase tracking-wider hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]/40 active:scale-95 transition-all cursor-pointer"
          >
            <Compass size={16} />
            <span>{t.notFound.viewProjects}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
