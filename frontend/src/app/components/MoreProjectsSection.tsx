import { motion } from "motion/react";
import { FadeIn } from "./shared";
import { ArrowUpRight, BookOpen, Clock, Calendar } from "lucide-react";
import { parseGoogleDriveUrl } from "../utils/googleDrive";

interface JournalEntry {
  id: string;
  title: string;
  description: string;
  tag: string;
  readTime: string;
  date: string;
  image: string;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "01",
    title: "Building High-Throughput Edge APIs with Cloudflare Workers & TypeScript",
    description: "Architecting sub-50ms latency global microservices with worker bindings, smart caching, and zero cold starts.",
    tag: "Architecture",
    readTime: "5 min read",
    date: "Aug 2026",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=85",
  },
  {
    id: "02",
    title: "Micro-Frontend State Synchronization & Real-time Edge Pipelines",
    description: "Designing isolated domain modules that communicate via lightweight pub/sub event buses without tight coupling.",
    tag: "Full Stack",
    readTime: "7 min read",
    date: "Jul 2026",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=85",
  },
  {
    id: "03",
    title: "Mastering Scroll-Driven Stacking Animations with Framer Motion",
    description: "Implementing 60fps 3D card stacking, scale interpolation, and magnetic interactions for modern web portfolios.",
    tag: "UI / Motion",
    readTime: "4 min read",
    date: "Jun 2026",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=85",
  },
  {
    id: "04",
    title: "Designing Resilient Offline-First Architectures with Google Drive APIs",
    description: "Leveraging cloud folder synchronization, image CDN transforms, and client-side caching for dynamic media showcase.",
    tag: "Cloud & Dev",
    readTime: "6 min read",
    date: "May 2026",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&auto=format&fit=crop&q=85",
  },
];

export const MoreProjectsSection = () => {
  return (
    <section
      id="journal"
      style={{
        background: "#0C0C0C",
        fontFamily: "'Kanit', sans-serif",
      }}
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 relative px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-36 overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(182, 0, 168, 0.12) 0%, transparent 70%)",
          }}
          className="absolute -top-24 right-1/4 w-[550px] h-[550px] rounded-full blur-[140px]"
        />
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          }}
          className="absolute bottom-10 -left-20 w-[500px] h-[500px] rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header pattern: eyebrow + heading + subtext + View All button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 sm:mb-16 md:mb-20">
          <FadeIn delay={0} y={30} className="flex flex-col">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  background:
                    "linear-gradient(90deg, #B600A8 0%, #7621B0 50%, #BE4C00 100%)",
                  width: 32,
                  height: 2,
                }}
                className="rounded-full"
              />
              <span
                style={{ color: "#D7E2EA" }}
                className="text-xs uppercase tracking-[0.25em] opacity-60 font-light"
              >
                Journal &amp; Insights
              </span>
            </div>

            {/* Heading */}
            <h2
              className="hero-heading uppercase leading-none tracking-tight mb-4"
              style={{
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 7vw, 100px)",
                fontFamily: "'Kanit', sans-serif",
              }}
            >
              Recent <span className="italic font-light opacity-90 text-[#D7E2EA]">thoughts</span>
            </h2>

            {/* Subtext */}
            <p
              style={{ color: "#D7E2EA" }}
              className="text-sm sm:text-base md:text-lg font-light opacity-70 max-w-xl leading-relaxed"
            >
              Deep dives, architectural breakdowns, and engineering insights from
              building modern digital applications.
            </p>
          </FadeIn>

          {/* "View all" Ghost Pill Button */}
          <FadeIn delay={0.15} y={20} className="shrink-0">
            <button
              style={{
                fontFamily: "'Kanit', sans-serif",
                color: "#D7E2EA",
                borderColor: "rgba(215, 226, 234, 0.3)",
              }}
              className="group inline-flex items-center gap-3 px-7 py-3 rounded-full border border-[rgba(215,226,234,0.3)] bg-[rgba(215,226,234,0.03)] hover:bg-[rgba(215,226,234,0.1)] hover:border-[#D7E2EA] transition-all duration-300 text-xs sm:text-sm uppercase tracking-widest font-medium"
            >
              <span>View All Thoughts</span>
              <BookOpen size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            </button>
          </FadeIn>
        </div>

        {/* 4 Journal Entries displayed as Large Horizontal Pill Cards */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {JOURNAL_ENTRIES.map((entry, index) => (
            <FadeIn key={entry.id} delay={index * 0.08} y={20}>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.012, y: -2 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: "rgba(215, 226, 234, 0.03)",
                  border: "1px solid rgba(215, 226, 234, 0.12)",
                }}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-4 sm:p-5 md:p-6 rounded-[28px] sm:rounded-[36px] lg:rounded-full hover:bg-[rgba(215,226,234,0.07)] hover:border-[rgba(215,226,234,0.35)] transition-all duration-300 group cursor-pointer shadow-lg"
              >
                {/* Left Side: Large Preview Image + Title & Description */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 flex-1 min-w-0">
                  {/* Large Image Thumbnail */}
                  <div className="relative w-full sm:w-36 md:w-44 lg:w-48 h-40 sm:h-24 md:h-28 rounded-[20px] sm:rounded-[24px] overflow-hidden shrink-0 border border-[rgba(215,226,234,0.18)] shadow-md">
                    <img
                      src={parseGoogleDriveUrl(entry.image)}
                      alt={entry.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    {/* Subtle Overlay Gradient on Image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  </div>

                  {/* Title, Tag & Brief Description */}
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          background: "rgba(215, 226, 234, 0.08)",
                          color: "#D7E2EA",
                        }}
                        className="text-[10px] sm:text-xs uppercase tracking-wider px-3 py-1 rounded-full font-light opacity-85"
                      >
                        {entry.tag}
                      </span>
                    </div>

                    <h3
                      style={{
                        color: "#D7E2EA",
                        fontFamily: "'Kanit', sans-serif",
                      }}
                      className="text-base sm:text-lg md:text-xl font-medium group-hover:text-white transition-colors line-clamp-1"
                    >
                      {entry.title}
                    </h3>

                    <p
                      style={{ color: "#D7E2EA" }}
                      className="text-xs sm:text-sm font-light opacity-60 line-clamp-1 leading-relaxed hidden sm:block"
                    >
                      {entry.description}
                    </p>
                  </div>
                </div>

                {/* Right Side: Read time, Date, Action Arrow */}
                <div className="flex items-center justify-between lg:justify-end gap-5 sm:gap-8 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[rgba(215,226,234,0.08)]">
                  <div className="flex items-center gap-4 text-xs sm:text-sm opacity-55 font-light">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[#EC4899]" />
                      {entry.readTime}
                    </span>
                    <span className="hidden md:inline-flex items-center gap-1.5">
                      <Calendar size={14} />
                      {entry.date}
                    </span>
                  </div>

                  {/* Arrow Action Circle */}
                  <div
                    style={{
                      background: "rgba(215, 226, 234, 0.05)",
                      border: "1px solid rgba(215, 226, 234, 0.2)",
                    }}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-[#D7E2EA] group-hover:bg-[#D7E2EA] group-hover:text-[#0C0C0C] group-hover:rotate-45 transition-all duration-300 shrink-0 shadow-md"
                  >
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export const JournalSection = MoreProjectsSection;
export default MoreProjectsSection;
