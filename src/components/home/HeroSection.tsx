import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, CheckCircle, TrendingUp, Star, Zap, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    { value: "₹500Cr+", label: "Loans Disbursed", icon: TrendingUp },
    { value: "24 Hrs", label: "Avg. Approval Time", icon: Clock },
    { value: "98.5%", label: "Approval Rate", icon: CheckCircle },
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
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-trust/5 rounded-full blur-3xl animate-float animation-delay-200" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Offer Ribbon */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full shadow-sm mb-8 animate-fade-up">
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
          </div>

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full mb-8 animate-fade-up animation-delay-100">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-xs font-medium text-success uppercase tracking-wider">
              Bank-Grade Security • Trusted by 50,000+ Users
            </span>
          </div>

          {/* Headline - Tighter typography */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 animate-fade-up animation-delay-200" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Smart Loans.{" "}
            <span className="text-gradient">Better Rates.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-up animation-delay-300">
            Compare rates from 15+ banks, calculate EMIs instantly, and get personalized loan offers. 
            Transparent. Secure. Fast.
          </p>

          {/* CTA Buttons - Strategic placement for lead gen */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up animation-delay-400">
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
              size="xl"
              className="w-full sm:w-auto"
            >
              <Link to="/apply#emi-calculator">
                Calculate EMI
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto animate-fade-up animation-delay-500">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="card-elevated p-6 text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-foreground block mb-1">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-12 animate-fade-up animation-delay-500">
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 px-3 py-1.5 bg-card/50 border border-border/50 rounded-full text-xs text-muted-foreground"
              >
                <CheckCircle className="w-3 h-3 text-success" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
