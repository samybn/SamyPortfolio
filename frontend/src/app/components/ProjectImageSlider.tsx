import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { ImageWithSkeleton } from "./ImageWithSkeleton";
import { getOptimizedImageUrl, getImageSrcSet } from "../utils/googleDrive";
import { useLanguage } from "../context/LanguageContext";

interface ProjectImageSliderProps {
  images: string[];
  projectName: string;
}

export function ProjectImageSlider({ images, projectName }: ProjectImageSliderProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const total = images.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => (prev + newDirection + total) % total);
    },
    [total],
  );

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate, isFullscreen]);

  if (!images || images.length === 0) return null;

  const rawImage = images[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring" as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  };

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6">
      {/* Main Showcase Frame */}
      <div
        className="relative w-full overflow-hidden rounded-[28px] sm:rounded-[40px] md:rounded-[48px] border-2 border-[#D7E2EA]/20 bg-[#121212] shadow-2xl group"
        style={{
          aspectRatio: "16 / 9.5",
          maxHeight: "72vh",
        }}
      >
        {/* Subtle vignette inside frame */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Sliding Image */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full absolute inset-0 flex items-center justify-center p-2 sm:p-4"
          >
            <ImageWithSkeleton
              src={getOptimizedImageUrl(rawImage, 1200)}
              srcSet={getImageSrcSet(rawImage, [640, 960, 1280, 1600])}
              sizes="(max-width: 1024px) 100vw, 1100px"
              decoding="async"
              alt={`${projectName} — Capture d'écran ${currentIndex + 1} sur ${total}`}
              containerClassName="w-full h-full rounded-[20px] sm:rounded-[32px]"
              className="w-full h-full object-cover sm:object-contain rounded-[20px] sm:rounded-[32px]"
              containerStyle={{
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Counter Badge (Top Right) */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 pointer-events-none">
          <div
            style={{
              background: "rgba(12, 12, 12, 0.75)",
              border: "1px solid rgba(215, 226, 234, 0.2)",
              backdropFilter: "blur(12px)",
              fontFamily: "'Kanit', sans-serif",
            }}
            className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wider text-[#D7E2EA]"
          >
            <span className="text-white font-semibold">0{currentIndex + 1}</span>
            <span className="opacity-40 mx-1.5">/</span>
            <span className="opacity-60">0{total}</span>
          </div>
        </div>

        {/* Expand / Fullscreen Button (Top Left) */}
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          title={t.slider.expandTitle}
          aria-label={t.slider.expandTitle}
          style={{
            background: "rgba(12, 12, 12, 0.65)",
            border: "1px solid rgba(215, 226, 234, 0.15)",
            backdropFilter: "blur(10px)",
          }}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 w-10 h-10 rounded-full flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
        >
          <Maximize2 size={16} />
        </button>

        {/* Navigation Arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label={t.slider.prevImage}
              style={{
                background: "rgba(12, 12, 12, 0.65)",
                border: "1px solid rgba(215, 226, 234, 0.2)",
                backdropFilter: "blur(12px)",
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-[#D7E2EA] hover:scale-110 hover:bg-[#D7E2EA] hover:text-[#0C0C0C] active:scale-95 transition-all duration-300 cursor-pointer shadow-xl"
            >
              <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
            </button>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label={t.slider.nextImage}
              style={{
                background: "rgba(12, 12, 12, 0.65)",
                border: "1px solid rgba(215, 226, 234, 0.2)",
                backdropFilter: "blur(12px)",
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-[#D7E2EA] hover:scale-110 hover:bg-[#D7E2EA] hover:text-[#0C0C0C] active:scale-95 transition-all duration-300 cursor-pointer shadow-xl"
            >
              <ChevronRight size={24} className="sm:w-7 sm:h-7" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Strip & Dot Indicators */}
      {total > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Aller à la diapositive ${idx + 1}`}
                style={{
                  width: idx === currentIndex ? 28 : 8,
                  height: 8,
                  background:
                    idx === currentIndex
                      ? "#D7E2EA"
                      : "rgba(215, 226, 234, 0.25)",
                }}
                className="rounded-full transition-all duration-300 cursor-pointer"
              />
            ))}
          </div>

          {/* Mini Thumbnails */}
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto max-w-full py-1">
            {images.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`Afficher la capture ${idx + 1} de ${projectName}`}
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden shrink-0 transition-all duration-300 cursor-pointer group/thumb"
                  style={{
                    width: 72,
                    height: 48,
                    border: isActive
                      ? "2px solid #D7E2EA"
                      : "1px solid rgba(215, 226, 234, 0.2)",
                    opacity: isActive ? 1 : 0.65,
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <ImageWithSkeleton
                    src={getOptimizedImageUrl(img, 240, 75)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              aria-label="Fermer le mode plein écran"
              className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full bg-[#1A1A1A] border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <Minimize2 size={20} />
            </button>

            <img
              src={getOptimizedImageUrl(rawImage, 1600)}
              srcSet={getImageSrcSet(rawImage, [960, 1440, 1920])}
              sizes="100vw"
              decoding="async"
              alt={`${projectName} — Vue agrandie de la capture ${currentIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
