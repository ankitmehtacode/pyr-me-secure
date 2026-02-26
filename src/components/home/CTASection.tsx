import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ctaCityscape from "@/assets/cta-cityscape.jpg";
import happyCustomers from "@/assets/happy-customers.jpg";

const CTASection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Cityscape background */}
      <div className="absolute inset-0">
        <img
          src={ctaCityscape}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/80 dark:bg-foreground/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/70 to-foreground/95" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-4">
              Get Started Today
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6 leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Your Dream Loan is
              <br />
              <span className="text-primary">Just a Click Away</span>
            </h2>
            <p className="text-background/70 text-lg mb-8 max-w-lg leading-relaxed">
              Join 50,000+ Indians who chose PRYME to find the best loan rates. 
              Compare, apply, and get approved — all within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button
                  size="lg"
                  className="neo-button px-8 py-6 text-base rounded-full"
                >
                  Apply Now — It's Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:18003094001">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base rounded-full border-background/30 text-background hover:bg-background/10 hover:text-background"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Talk to Expert
                </Button>
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 mt-10">
              <div>
                <p className="text-2xl font-bold text-primary">₹500Cr+</p>
                <p className="text-xs text-background/50 uppercase tracking-wider">Disbursed</p>
              </div>
              <div className="w-px h-10 bg-background/20" />
              <div>
                <p className="text-2xl font-bold text-background">15+</p>
                <p className="text-xs text-background/50 uppercase tracking-wider">Partner Banks</p>
              </div>
              <div className="w-px h-10 bg-background/20" />
              <div>
                <p className="text-2xl font-bold text-background">24 Hrs</p>
                <p className="text-xs text-background/50 uppercase tracking-wider">Avg. Approval</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Happy customers image */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
              <img
                src={happyCustomers}
                alt="Happy couple reviewing their approved loan documents"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Gradient overlay bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
              
              {/* Floating approval badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-6 left-6 right-6 bg-card/90 backdrop-blur-md rounded-2xl p-4 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-lg">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Loan Approved!</p>
                    <p className="text-xs text-muted-foreground">₹25 Lakh @ 10.5% p.a.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
