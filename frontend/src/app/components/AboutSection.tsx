import { AnimatedText, ContactButton, FadeIn } from "./shared";

const MOON =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png";
const P59 =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png";
const LEGO =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png";
const GROUP =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png";

const ABOUT_TEXT =
  "With more than five years of experience in software development, I focus on building full-stack web applications, APIs, and scalable cloud architectures. I enjoy working with ambitious teams that want to ship products that are fast, reliable, and beautifully crafted. Let's build something incredible together!";

export const AboutSection = () => {
  return (
    <section
      id="about"
      style={{ background: "#0C0C0C", fontFamily: "'Kanit', sans-serif" }}
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Decorative corners */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]">
        <img src={MOON} alt="" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
        <img src={P59} alt="" className="w-[100px] sm:w-[140px] md:w-[180px]" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]">
        <img src={LEGO} alt="" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
        <img src={GROUP} alt="" className="w-[130px] sm:w-[170px] md:w-[220px]" />
      </FadeIn>

      {/* Content */}
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 z-10">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading uppercase leading-none tracking-tight text-center"
            style={{
              fontSize: "clamp(3rem, 12vw, 160px)",
              fontWeight: 900,
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            About me
          </h2>
        </FadeIn>

        <AnimatedText
          text={ABOUT_TEXT}
          style={{
            color: "#D7E2EA",
            fontWeight: 500,
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: 560,
            fontSize: "clamp(1rem, 2vw, 1.35rem)",
            fontFamily: "'Kanit', sans-serif",
          }}
        />

        <div className="mt-6 sm:mt-10 md:mt-14">
          <ContactButton />
        </div>
      </div>
    </section>
  );
};
