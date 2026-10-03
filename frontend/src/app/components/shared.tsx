import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef, useEffect, useState, ReactNode, CSSProperties } from "react";

export const ContactButton = ({ label = "Me Contacter" }: { label?: string }) => (
  <button
    style={{
      background: "linear-gradient(123deg, #023e8a 7%, #0077b6 37%, #00b4d8 72%, #90e0ef 100%)",
      boxShadow: "0px 4px 4px rgba(0, 119, 182, 0.25), inset 4px 4px 12px #0077b6",
      outline: "2px solid white",
      outlineOffset: "-3px",
      fontFamily: "'Kanit', sans-serif",
      fontWeight: 500,
      cursor: "pointer",
    }}
    className="rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-white uppercase tracking-widest text-xs sm:text-sm md:text-base transition-opacity hover:opacity-90"
  >
    {label}
  </button>
);

export const LiveProjectButton = ({
  onClick,
  label = "Voir le Projet",
  className = "",
}: {
  onClick?: () => void;
  label?: string;
  className?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{ fontFamily: "'Kanit', sans-serif", fontWeight: 500, cursor: "pointer" }}
    className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#90e0ef]/10 hover:border-[#90e0ef] hover:text-[#90e0ef] transition-all duration-200 active:scale-95 ${className}`}
  >
    {label}
  </button>
);

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
}: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: "50px", amount: 0 }}
    transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className,
}: MagnetProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0, 0, 0)");
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      const inRange =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding;

      if (inRange) {
        setTransition(activeTransition);
        setTransform(`translate3d(${distX / strength}px, ${distY / strength}px, 0)`);
      } else {
        setTransition(inactiveTransition);
        setTransform("translate3d(0, 0, 0)");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={ref}
      style={{ transform, transition, willChange: "transform" }}
      className={className}
    >
      {children}
    </div>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

function AnimatedChar({
  char,
  progress,
  start,
  end,
}: {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <span className="relative inline-block whitespace-pre">
      <span className="invisible">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char}
      </motion.span>
    </span>
  );
}

export const AnimatedText = ({ text, className, style }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");
  const n = chars.length;

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => (
        <AnimatedChar
          key={i}
          char={char}
          progress={scrollYProgress}
          start={i / n}
          end={(i + 1) / n}
        />
      ))}
    </p>
  );
};
