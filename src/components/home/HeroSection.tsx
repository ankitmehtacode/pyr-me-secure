import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hyperspeed from "@/components/backgrounds/Hyperspeed";

const HeroSection = () => {
  const stats = [
    { icon: Shield, label: "Secure Processing", value: "Bank-Grade" },
    { icon: Clock, label: "Approval Time", value: "24 Hours" },
    { icon: CheckCircle, label: "Success Rate", value: "98.5%" },
  ];

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Hyperspeed Background */}
      <Hyperspeed />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-10 animate-fade-in">
            <Shield className="w-4 h-4 text-trust" />
            <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
              RBI Compliant • ISO 27001 Certified
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Your Financial Future,{" "}
            <span className="bg-gradient-to-r from-primary to-trust bg-clip-text text-transparent">
              Secured
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Experience transparent loan processing with bank-grade security. 
            No hidden fees, no surprises — just seamless financial solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button asChild size="xl" className="bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all">
              <Link to="/apply">
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white">
              <Link to="/dashboard">Track Application</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all"
              >
                <stat.icon className="w-8 h-8 text-trust mb-3 mx-auto" />
                <span className="text-2xl font-bold text-white block mb-1">{stat.value}</span>
                <span className="text-sm text-white/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
