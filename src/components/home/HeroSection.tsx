import { useRef, useEffect, memo, useCallback } from "react";
import { Shield, CheckCircle, TrendingUp, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import SmartInput from "./SmartInput";
import PrymeLogo from "@/components/PrymeLogo";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: "Cr+", prefix: "₹", label: "Loans Disbursed", icon: TrendingUp },
  { value: 24, suffix: " Hrs", prefix: "", label: "Avg. Approval", icon: Clock },
  { value: 98, suffix: ".5%", prefix: "", label: "Approval Rate", icon: CheckCircle },
];

const trustBadges = ["RBI Compliant", "ISO 27001", "256-bit Encrypted", "GDPR Ready"];

// Animated counter using GSAP
const CountUp = memo(({ target, suffix = "", prefix = "", elRef }: { target: number; suffix?: string; prefix?: string; elRef: React.RefObject<HTMLSpanElement> }) => {
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power2.out",
      delay: 0.8,
      onUpdate: () => {
        el.textContent = `${prefix}${Math.floor(obj.val)}${suffix}`;
      },
    });
  }, [target, suffix, prefix, elRef]);

  return <span ref={elRef}>{prefix}0{suffix}</span>;
});
CountUp.displayName = "CountUp";

const HeroSection = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<SVGSVGElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const statCountRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Parallax blobs tracking mouse
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // GSAP blob parallax ticker
  useEffect(() => {
    const quickX1 = gsap.quickTo(blob1Ref.current, "x", { duration: 1.5, ease: "power3.out" });
    const quickY1 = gsap.quickTo(blob1Ref.current, "y", { duration: 1.5, ease: "power3.out" });
    const quickX2 = gsap.quickTo(blob2Ref.current, "x", { duration: 2, ease: "power3.out" });
    const quickY2 = gsap.quickTo(blob2Ref.current, "y", { duration: 2, ease: "power3.out" });

    const tick = () => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = mouseRef.current.x - cx;
      const dy = mouseRef.current.y - cy;
      quickX1(-dx * 0.05);
      quickY1(-dy * 0.05);
      quickX2(dx * 0.04);
      quickY2(dy * 0.04);
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  // Main entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });

      // Logo entrance: start huge, settle at display size
      tl.fromTo(
        heroLogoRef.current,
        { scale: 3, opacity: 0, rotateY: 180 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1.4, ease: "expo.out" },
        0
      );

      // Trust badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.3
      );

      // Headline character animation with SplitType
      if (headlineRef.current) {
        const split = new SplitType(headlineRef.current, { types: "chars,words" });
        if (split.chars) {
          gsap.set(split.chars, { y: "100%", opacity: 0 });
          tl.to(
            split.chars,
            {
              y: "0%",
              opacity: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              stagger: 0.02,
            },
            0.4
          );
        }
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.8
      );

      // Smart input
      tl.fromTo(
        inputRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        1.0
      );

      // Stats cards
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll(".stat-card-item");
        tl.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.4)", stagger: 0.1 },
          1.2
        );
      }

      // Trust badges
      if (trustRef.current) {
        const badges = trustRef.current.querySelectorAll(".trust-badge-item");
        tl.fromTo(
          badges,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" },
          1.6
        );
      }

      // ScrollTrigger: Logo shrinks and flies to header as user scrolls
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=150",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(heroLogoRef.current, {
            scale: 1 - p * 0.6,
            opacity: 1 - p,
            y: -p * 80,
            rotateY: p * 8,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden min-h-[92vh] flex items-center">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-gradient" />

      {/* Parallax blobs */}
      <div
        ref={blob1Ref}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] will-change-transform"
        style={{ background: "hsl(148 62% 42% / 0.04)" }}
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] will-change-transform"
        style={{ background: "hsl(217 91% 60% / 0.03)" }}
      />

      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="max-w-5xl mx-auto text-center">

          {/* Hero logo - starts large, docks to header on scroll */}
          <div className="flex justify-center mb-8" style={{ perspective: "1000px" }}>
            <PrymeLogo
              ref={heroLogoRef as any}
              showText={false}
              className="h-20 md:h-28 w-auto text-foreground will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            />
          </div>

          {/* Trust signal */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 bg-success/8 border border-success/15 rounded-full mb-10 opacity-0">
            <Shield className="w-3.5 h-3.5 text-success" />
            <span className="text-xs font-medium text-success tracking-wide">
              Bank-Grade Security • Trusted by 50,000+ Users
            </span>
          </div>

          {/* Headline with SplitType character animation */}
          <h1
            ref={headlineRef}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold mb-6 leading-[1.05] overflow-hidden"
            style={{ letterSpacing: "-0.035em", clipPath: "inset(0 0 0 0)" }}
          >
            <span className="text-foreground">Smart Loans.</span>
            <br />
            <span className="text-aurora-clip">Better Rates.</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto opacity-0"
          >
            Compare rates from 15+ banks, calculate EMIs instantly, and get
            personalized loan offers — all in one place.
          </p>

          {/* Smart Command Bar */}
          <div ref={inputRef} className="mb-20 opacity-0">
            <SmartInput />
          </div>

          {/* Stats cards */}
          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => {
              const ref = { current: null as HTMLSpanElement | null };
              return (
                <div
                  key={stat.label}
                  className="stat-card-item group relative bg-card/60 backdrop-blur-sm rounded-2xl border border-border/40 p-6 text-center transition-colors duration-300 hover:border-primary/20 opacity-0"
                  style={{ willChange: "transform" }}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/12 transition-colors duration-300">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-2xl md:text-3xl font-bold text-foreground block mb-1 tabular-nums">
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      elRef={ref as React.RefObject<HTMLSpanElement>}
                    />
                  </span>
                  <span className="text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</span>
                </div>
              );
            })}
          </div>

          {/* Trust badges */}
          <div ref={trustRef} className="flex flex-wrap items-center justify-center gap-2 mt-14">
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="trust-badge-item flex items-center gap-1.5 px-3 py-1.5 bg-card/40 border border-border/30 rounded-full text-[11px] text-muted-foreground tracking-wide opacity-0"
              >
                <CheckCircle className="w-3 h-3 text-success/70" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
