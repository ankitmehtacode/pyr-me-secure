import { useState, memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Wallet, Briefcase, Home, Building2, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TiltedCard from "./TiltedCard";

const products = [
  {
    id: "personal",
    icon: Wallet,
    title: "Personal Loan",
    description: "Quick disbursement for your personal needs with flexible EMIs.",
    rate: "10.5%",
    maxAmount: "₹40 Lakh",
    tenure: "Up to 5 Years",
    href: "/apply?type=personal",
    accent: "148 62% 42%",
    features: ["No collateral required", "Instant approval in 2 mins", "Flexible repayment options"],
  },
  {
    id: "business",
    icon: Briefcase,
    title: "Business Loan",
    description: "Fuel your business growth with competitive rates and minimal documentation.",
    rate: "12%",
    maxAmount: "₹2 Crore",
    tenure: "Up to 7 Years",
    href: "/apply?type=business",
    accent: "217 91% 60%",
    features: ["Collateral-free up to ₹75L", "Quick disbursal in 48 hrs", "Overdraft facility available"],
  },
  {
    id: "home",
    icon: Home,
    title: "Home Loan",
    description: "Make your dream home a reality with industry-best rates.",
    rate: "8.5%",
    maxAmount: "₹5 Crore",
    tenure: "Up to 30 Years",
    href: "/apply?type=home",
    accent: "50 100% 50%",
    features: ["Balance transfer option", "Top-up loan available", "Tax benefits up to ₹3.5L"],
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Education Loan",
    description: "Invest in your future with affordable education financing.",
    rate: "9%",
    maxAmount: "₹1 Crore",
    tenure: "Up to 15 Years",
    href: "/apply?type=education",
    accent: "280 70% 60%",
    features: ["Moratorium during study", "Covers tuition + living", "Tax benefit under Sec 80E"],
  },
];

const springConfig = { stiffness: 120, damping: 28, mass: 0.8 };

const ProductCard = memo(({ product, isExpanded, onToggle }: {
  product: typeof products[0];
  isExpanded: boolean;
  onToggle: () => void;
}) => (
  <TiltedCard className="rounded-2xl" tiltStrength={6} glareOpacity={0.15}>
    <div
      className="group relative bg-card/70 backdrop-blur-sm rounded-2xl border border-border/40 overflow-hidden transition-all duration-500 hover:border-transparent hover:shadow-[0_20px_60px_-15px_hsl(var(--foreground)/0.08)]"
    >
      {/* Ambient edge glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 0%, hsl(${product.accent} / 0.08), transparent 60%)` }}
      />
      {/* Top shimmer */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, hsl(${product.accent} / 0.5), transparent)` }}
      />

      {/* Clickable header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-7 md:p-8 relative cursor-pointer"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start gap-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-105"
            style={{ background: `hsl(${product.accent} / 0.08)` }}
          >
            <product.icon
              className="w-6 h-6 transition-colors duration-300"
              style={{ color: `hsl(${product.accent})` }}
              strokeWidth={1.8}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                {product.title}
              </h3>
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </button>

      {/* Expandable detail panel */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 30, opacity: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <div className="px-7 md:px-8 pb-7 md:pb-8">
              {/* Divider */}
              <div
                className="h-[1px] mb-6"
                style={{ background: `linear-gradient(90deg, transparent, hsl(${product.accent} / 0.3), transparent)` }}
              />

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-muted/20 rounded-xl border border-border/30">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">Rate from</span>
                  <p className="text-xl font-bold holographic-text leading-none">{product.rate}</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">Up to</span>
                  <p className="text-lg font-bold text-foreground leading-none">{product.maxAmount}</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">Tenure</span>
                  <p className="text-sm font-semibold text-foreground leading-none mt-0.5">{product.tenure}</p>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6">
                {product.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: `hsl(${product.accent})` }}
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to={product.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </TiltedCard>
));

ProductCard.displayName = "ProductCard";

const ProductSelectorGrid = memo(() => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => setExpandedId(prev => prev === id ? null : id);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", ...springConfig }}
          className="text-center mb-12"
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

        {/* Product accordion grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, rotateX: 4 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", ...springConfig, delay: index * 0.08 }}
              style={{ perspective: "1200px" }}
            >
              <ProductCard
                product={product}
                isExpanded={expandedId === product.id}
                onToggle={() => toggle(product.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

ProductSelectorGrid.displayName = "ProductSelectorGrid";
export default ProductSelectorGrid;
