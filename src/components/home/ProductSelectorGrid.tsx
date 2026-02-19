import { Link } from "react-router-dom";
import { ArrowRight, Wallet, Briefcase, Home, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import TiltedCard from "./TiltedCard";

const ProductSelectorGrid = () => {
  const products = [
    {
      icon: Wallet,
      title: "Personal Loan",
      description: "Quick disbursement for your personal needs with flexible EMIs.",
      rate: "10.5%",
      maxAmount: "₹40 Lakh",
      tenure: "Up to 5 Years",
      href: "/apply?type=personal",
      accent: "148 62% 42%",
    },
    {
      icon: Briefcase,
      title: "Business Loan",
      description: "Fuel your business growth with competitive rates.",
      rate: "12%",
      maxAmount: "₹2 Crore",
      tenure: "Up to 7 Years",
      href: "/apply?type=business",
      accent: "217 91% 60%",
    },
    {
      icon: Home,
      title: "Home Loan",
      description: "Make your dream home a reality with industry-best rates.",
      rate: "8.5%",
      maxAmount: "₹5 Crore",
      tenure: "Up to 30 Years",
      href: "/apply?type=home",
      accent: "50 100% 50%",
    },
    {
      icon: Building2,
      title: "Loan Against Property",
      description: "Unlock the value of your property with high LTV ratios.",
      rate: "9.5%",
      maxAmount: "₹3 Crore",
      tenure: "Up to 15 Years",
      href: "/apply?type=lap",
      accent: "280 70% 60%",
    },
  ];

  const springConfig = { stiffness: 120, damping: 28, mass: 0.8 };

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", ...springConfig }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-medium text-primary uppercase tracking-[0.2em] mb-4">
            Loan Products
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.1" }}
          >
            Financial Solutions for Every Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of loan products designed to meet your unique requirements
          </p>
        </motion.div>

        {/* Products Grid — overlapping fan-out on hover row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 50, rotateX: 4 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                ...springConfig,
                delay: index * 0.08,
              }}
              style={{ perspective: "1200px" }}
            >
              <TiltedCard className="rounded-2xl" tiltStrength={6} glareOpacity={0.15}>
                <Link
                  to={product.href}
                  className="group block relative bg-card/70 backdrop-blur-sm rounded-2xl border border-border/40 p-7 md:p-8 overflow-hidden transition-all duration-500 hover:border-transparent hover:shadow-[0_20px_60px_-15px_hsl(var(--foreground)/0.08)]"
                >
                  {/* Ambient edge glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 30% 0%, hsl(${product.accent} / 0.08), transparent 60%)`,
                    }}
                  />

                  {/* Top edge shimmer line */}
                  <div
                    className="absolute top-0 left-[10%] right-[10%] h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, hsl(${product.accent} / 0.5), transparent)`,
                    }}
                  />

                  <div className="relative">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-105"
                      style={{
                        background: `hsl(${product.accent} / 0.08)`,
                      }}
                    >
                      <product.icon
                        className="w-6 h-6 transition-colors duration-300"
                        style={{ color: `hsl(${product.accent})` }}
                        strokeWidth={1.8}
                      />
                    </div>

                    <h3
                      className="text-xl font-semibold text-foreground mb-2"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Stats row with holographic rate */}
                    <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-muted/20 rounded-xl border border-border/30">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">
                          Rate from
                        </span>
                        <p className="text-xl font-bold holographic-text leading-none">
                          {product.rate}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">
                          Up to
                        </span>
                        <p className="text-lg font-bold text-foreground leading-none">
                          {product.maxAmount}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">
                          Tenure
                        </span>
                        <p className="text-sm font-semibold text-foreground leading-none mt-0.5">
                          {product.tenure}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSelectorGrid;
