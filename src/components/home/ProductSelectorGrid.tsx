import { useState, memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import cardPersonal from "@/assets/card-personal.png";
import cardBusiness from "@/assets/card-business.png";
import cardHome from "@/assets/card-home.png";
import cardEducation from "@/assets/card-education.png";

const products = [
  {
    id: "personal",
    label: "Personal",
    image: cardPersonal,
    title: "Personal Loan",
    description: "Quick disbursement for your personal needs with flexible EMIs.",
    rate: "10.5%",
    maxAmount: "₹40 Lakh",
    tenure: "Up to 5 Years",
    href: "/apply?type=personal",
    accent: "200 90% 55%",
    features: ["No collateral required", "Instant approval in 2 mins", "Flexible repayment options"],
  },
  {
    id: "business",
    label: "Business",
    image: cardBusiness,
    title: "Business Loan",
    description: "Fuel your business growth with competitive rates and minimal documentation.",
    rate: "12%",
    maxAmount: "₹2 Crore",
    tenure: "Up to 7 Years",
    href: "/apply?type=business",
    accent: "148 62% 42%",
    features: ["Collateral-free up to ₹75L", "Quick disbursal in 48 hrs", "Overdraft facility available"],
  },
  {
    id: "home",
    label: "Dream",
    image: cardHome,
    title: "Home Loan",
    description: "Make your dream home a reality with industry-best rates.",
    rate: "8.5%",
    maxAmount: "₹5 Crore",
    tenure: "Up to 30 Years",
    href: "/apply?type=home",
    accent: "42 90% 55%",
    features: ["Balance transfer option", "Top-up loan available", "Tax benefits up to ₹3.5L"],
  },
  {
    id: "education",
    label: "Commercial",
    image: cardEducation,
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

const ProductSelectorGrid = memo(() => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = products.find((p) => p.id === selectedId);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", ...springConfig }}
          className="text-center mb-10"
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

        {/* Isometric Card Buttons */}
        <div className="flex justify-center items-end gap-0 md:gap-0 max-w-4xl mx-auto mb-8 -mx-2 overflow-x-auto px-2">
          {products.map((product, index) => {
            const isActive = selectedId === product.id;
            return (
              <motion.button
                key={product.id}
                onClick={() => setSelectedId(isActive ? null : product.id)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", ...springConfig, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex flex-col items-center cursor-pointer group transition-all duration-300 px-2 md:px-4 ${
                  isActive ? "z-10" : "z-0"
                }`}
                style={{ perspective: "800px" }}
              >
                {/* Card image */}
                <motion.div
                  className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${index % 2 === 0 ? -5 : 5}deg) rotateX(3deg)`,
                  }}
                  animate={{
                    boxShadow: isActive
                      ? `0 20px 50px -10px hsl(${product.accent} / 0.4)`
                      : "0 10px 30px -10px hsl(var(--foreground) / 0.1)",
                    scale: isActive ? 1.08 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  <img
                    src={product.image}
                    alt={product.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Active ring */}
                  {isActive && (
                    <motion.div
                      layoutId="card-ring"
                      className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                      style={{ borderColor: `hsl(${product.accent})` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>

                {/* Label */}
                <span
                  className={`mt-3 text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {product.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Expanded Detail Panel */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
              className="max-w-3xl mx-auto"
            >
              <div
                className="relative rounded-3xl border border-border/40 bg-card/80 backdrop-blur-md overflow-hidden"
              >
                {/* Accent glow */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 20% 0%, hsl(${selected.accent}), transparent 60%)`,
                  }}
                />
                {/* Top shimmer */}
                <div
                  className="absolute top-0 left-[10%] right-[10%] h-[1px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, hsl(${selected.accent} / 0.5), transparent)`,
                  }}
                />

                <div className="relative p-8 md:p-10">
                  <h3
                    className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {selected.title}
                  </h3>
                  <p className="text-muted-foreground mb-8">{selected.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8 p-5 bg-muted/20 rounded-2xl border border-border/30">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">
                        Rate from
                      </span>
                      <p className="text-2xl font-bold holographic-text leading-none">{selected.rate}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">
                        Up to
                      </span>
                      <p className="text-xl font-bold text-foreground leading-none">{selected.maxAmount}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">
                        Tenure
                      </span>
                      <p className="text-base font-semibold text-foreground leading-none mt-0.5">
                        {selected.tenure}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {selected.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: `hsl(${selected.accent})` }}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={selected.href}
                    className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold shadow-md hover:shadow-xl hover:brightness-110 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

ProductSelectorGrid.displayName = "ProductSelectorGrid";
export default ProductSelectorGrid;
