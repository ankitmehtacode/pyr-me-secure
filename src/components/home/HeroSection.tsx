import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, CheckCircle, TrendingUp, Star, Zap, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
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
  return <>{count}{suffix}</>;
};

const HeroSection = () => {
  const [currentOffer, setCurrentOffer] = useState(0);

  const offers = [
    { icon: Gift, text: "₹2,000 Cashback on First Loan", color: "text-success" },
    { icon: Zap, text: "50% Off Processing Fee", color: "text-trust-foreground" },
    { icon: Star, text: "Pre-approved Offers Available", color: "text-primary" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: 500, suffix: "Cr+", prefix: "₹", label: "Loans Disbursed", icon: TrendingUp },
    { value: 24, suffix: " Hrs", prefix: "", label: "Avg. Approval Time", icon: Clock },
    { value: 98, suffix: ".5%", prefix: "", label: "Approval Rate", icon: CheckCircle },
  ];

  const trustBadges = [
    "RBI Compliant",
    "ISO 27001 Certified",
    "256-bit Encryption",
    "GDPR Ready",
  ];

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-trust/5 rounded-full blur-3xl"
        animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Offer Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full shadow-sm mb-8"
          >
            <div className="flex items-center gap-2 overflow-hidden h-5">
              {offers.map((offer, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 transition-all duration-500 ${
                    index === currentOffer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute"
                  }`}
                >
                  <offer.icon className={`w-4 h-4 ${offer.color}`} />
                  <span className="text-sm font-medium text-foreground">{offer.text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-1 ml-2">
              {offers.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentOffer ? "bg-primary w-3" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full mb-8"
          >
            <Shield className="w-4 h-4 text-success" />
            <span className="text-xs font-medium text-success uppercase tracking-wider">
              Bank-Grade Security • Trusted by 50,000+ Users
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6"
            style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            Smart Loans.{" "}
            <span className="text-gradient">Better Rates.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Compare rates from 15+ banks, calculate EMIs instantly, and get personalized loan offers.
            Transparent. Secure. Fast.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              asChild
              variant="primary"
              size="xl"
              className="w-full sm:w-auto"
            >
              <Link to="/apply">
                Check Eligibility
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="w-full sm:w-auto"
            >
              <Link to="/apply#emi-calculator">
                Calculate EMI
              </Link>
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 + index * 0.12 }}
                className="card-elevated p-6 text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-foreground block mb-1">
                  {stat.prefix}<CountUp target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-12"
          >
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 px-3 py-1.5 bg-card/50 border border-border/50 rounded-full text-xs text-muted-foreground"
              >
                <CheckCircle className="w-3 h-3 text-success" />
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
