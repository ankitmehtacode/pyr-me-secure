import { useState, useEffect } from "react";
import { Shield, CheckCircle, TrendingUp, Clock } from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";
import SmartInput from "./SmartInput";

const CountUp = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <>{prefix}{count}{suffix}</>;
};

// Spring-physics config for biological feel
const springConfig = { stiffness: 100, damping: 30, mass: 0.8 };

const HeroSection = () => {
  const stats = [
    { value: 500, suffix: "Cr+", prefix: "₹", label: "Loans Disbursed", icon: TrendingUp },
    { value: 24, suffix: " Hrs", prefix: "", label: "Avg. Approval", icon: Clock },
    { value: 98, suffix: ".5%", prefix: "", label: "Approval Rate", icon: CheckCircle },
  ];

  const trustBadges = [
    "RBI Compliant",
    "ISO 27001",
    "256-bit Encrypted",
    "GDPR Ready",
  ];

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-gradient" />

      {/* Ambient orbs with spring physics - fewer, more subtle */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: "hsl(148 62% 42% / 0.04)" }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{ background: "hsl(217 91% 60% / 0.03)" }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="max-w-5xl mx-auto text-center">

          {/* Trust signal - minimal, institutional */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ...springConfig, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-success/8 border border-success/15 rounded-full mb-10"
          >
            <Shield className="w-3.5 h-3.5 text-success" />
            <span className="text-xs font-medium text-success tracking-wide">
              Bank-Grade Security • Trusted by 50,000+ Users
            </span>
          </motion.div>

          {/* Massive centered headline with aurora gradient clip */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ...springConfig, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold mb-6 leading-[1.05]"
            style={{ letterSpacing: "-0.035em" }}
          >
            <span className="text-foreground">Smart Loans.</span>
            <br />
            <span className="text-aurora-clip">Better Rates.</span>
          </motion.h1>

          {/* Subtitle - refined */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ...springConfig, delay: 0.35 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Compare rates from 15+ banks, calculate EMIs instantly, and get
            personalized loan offers — all in one place.
          </motion.p>

          {/* Smart Command Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ...springConfig, delay: 0.45 }}
            className="mb-20"
          >
            <SmartInput />
          </motion.div>

          {/* Stats - glass cards with spring stagger */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  ...springConfig,
                  delay: 0.6 + index * 0.1,
                }}
                className="group relative bg-card/60 backdrop-blur-sm rounded-2xl border border-border/40 p-6 text-center transition-all duration-300 hover:border-primary/20 hover:shadow-[0_8px_30px_-12px_hsl(148_62%_42%/0.15)]"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/12 transition-colors duration-300">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-foreground block mb-1 tabular-nums">
                  <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </span>
                <span className="text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Trust badges - ultra minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", ...springConfig, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-14"
          >
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-card/40 border border-border/30 rounded-full text-[11px] text-muted-foreground tracking-wide"
              >
                <CheckCircle className="w-3 h-3 text-success/70" />
                {badge}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
