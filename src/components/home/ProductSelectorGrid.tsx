import { useState, memo, useRef, useEffect } from "react";
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
    label: "Home Loan",
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
    label: "Education",
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

const spring = { type: "spring" as const, stiffness: 140, damping: 22, mass: 0.7 };

const ProductSelectorGrid = memo(() => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = products.find((p) => p.id === selectedId);
  const selectedIndex = products.findIndex((p) => p.id === selectedId);
  const rowRef = useRef<HTMLDivElement>(null);

  // Scroll selected card to center on mobile
  useEffect(() => {
    if (selectedId && rowRef.current) {
      const container = rowRef.current;
      const card = container.children[selectedIndex] as HTMLElement;
      if (card) {
        const scrollLeft = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [selectedId, selectedIndex]);

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={spring}
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

        {/* Card Row */}
        <div
          ref={rowRef}
          className="flex justify-center items-end gap-4 md:gap-6 max-w-5xl mx-auto mb-10 overflow-x-auto px-4 pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product, index) => {
            const isActive = selectedId === product.id;
            const hasSelection = selectedId !== null;
            const isInactive = hasSelection && !isActive;

            return (
              <motion.button
                key={product.id}
                onClick={() => setSelectedId(isActive ? null : product.id)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: index * 0.08 }}
                className="relative flex flex-col items-center cursor-pointer group snap-center shrink-0"
                style={{ perspective: "1000px" }}
                layout
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  animate={{
                    width: isActive ? 200 : isInactive ? 120 : 160,
                    height: isActive ? 200 : isInactive ? 120 : 160,
                    filter: isInactive ? "blur(3px) brightness(0.6)" : "blur(0px) brightness(1)",
                    opacity: isInactive ? 0.5 : 1,
                    y: isActive ? -16 : 0,
                    rotateY: isActive ? 0 : index % 2 === 0 ? -6 : 6,
                    rotateX: isActive ? 0 : 4,
                    scale: isActive ? 1.1 : isInactive ? 0.9 : 1,
                  }}
                  whileHover={!isActive ? { 
                    scale: isInactive ? 0.95 : 1.06, 
                    y: -8, 
                    filter: isInactive ? "blur(1px) brightness(0.8)" : "blur(0px) brightness(1)",
                    opacity: isInactive ? 0.7 : 1,
                  } : undefined}
                  whileTap={{ scale: 0.95 }}
                  transition={{ ...spring, filter: { duration: 0.4 }, opacity: { duration: 0.3 } }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={product.image}
                    alt={product.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Active glow ring */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={spring}
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          border: `2px solid hsl(${product.accent})`,
                          boxShadow: `0 0 30px -5px hsl(${product.accent} / 0.5), inset 0 0 20px -10px hsl(${product.accent} / 0.2)`,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Subtle shimmer on active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.15 }}
                      style={{
                        background: `linear-gradient(135deg, transparent 40%, hsl(${product.accent} / 0.6) 50%, transparent 60%)`,
                        backgroundSize: "200% 200%",
                      }}
                    />
                  )}
                </motion.div>

                {/* Label */}
                <motion.span
                  animate={{
                    opacity: isInactive ? 0.35 : 1,
                    scale: isActive ? 1.1 : isInactive ? 0.9 : 1,
                    y: isActive ? -8 : 0,
                  }}
                  transition={spring}
                  className={`mt-4 text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {product.label}
                </motion.span>

                {/* Active dot indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={spring}
                      className="w-1.5 h-1.5 rounded-full mt-2"
                      style={{ background: `hsl(${product.accent})` }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Expanded Detail Panel — 3D Rotating Box Reveal */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              className="max-w-3xl mx-auto"
              style={{ perspective: "1200px" }}
            >
              <motion.div
                initial={{
                  rotateX: 90,
                  rotateY: -15,
                  opacity: 0,
                  scale: 0.85,
                  filter: "blur(12px)",
                }}
                animate={{
                  rotateX: 0,
                  rotateY: 0,
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  rotateX: -90,
                  rotateY: 15,
                  opacity: 0,
                  scale: 0.85,
                  filter: "blur(12px)",
                }}
                transition={{
                  ...spring,
                  rotateX: { type: "spring", stiffness: 80, damping: 20, mass: 0.9 },
                  rotateY: { type: "spring", stiffness: 100, damping: 24, mass: 0.7 },
                  opacity: { duration: 0.35 },
                  filter: { duration: 0.4 },
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="relative overflow-hidden border border-border/30"
                  style={{
                    borderRadius: "24px",
                    background: "hsl(var(--card) / 0.6)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    boxShadow: `
                      0 2px 0 0 hsl(${selected.accent} / 0.08),
                      0 8px 30px -8px hsl(var(--background) / 0.5),
                      0 20px 60px -15px hsl(${selected.accent} / 0.12),
                      inset 0 1px 0 0 hsl(var(--foreground) / 0.04)
                    `,
                  }}
                >
                  {/* Accent radial glow */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    style={{
                      background: `radial-gradient(ellipse at 15% -10%, hsl(${selected.accent}), transparent 55%)`,
                    }}
                  />

                  {/* Top edge highlight */}
                  <div
                    className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, transparent, hsl(${selected.accent} / 0.45), transparent)`,
                    }}
                  />

                  {/* Bottom subtle reflection */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, transparent 20%, hsl(var(--foreground) / 0.04) 50%, transparent 80%)`,
                    }}
                  />

                  {/* Glass inner shimmer */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--foreground) / 0.02) 0%, transparent 40%, hsl(${selected.accent} / 0.03) 70%, transparent 100%)`,
                    }}
                  />

                  <div className="relative p-8 md:p-10">
                    <motion.h3
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04, ...spring }}
                      className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {selected.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.07, ...spring }}
                      className="text-muted-foreground mb-8"
                    >
                      {selected.description}
                    </motion.p>

                    {/* Stats — glassmorphic inner card */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, ...spring }}
                      className="grid grid-cols-3 gap-4 mb-8 p-5 rounded-2xl border border-border/20"
                      style={{
                        background: "hsl(var(--muted) / 0.15)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
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
                    </motion.div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {selected.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.12 + i * 0.03, ...spring }}
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
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, ...spring }}
                    >
                      <Link
                        to={selected.href}
                        className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold shadow-md hover:shadow-xl hover:brightness-110 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                      >
                        Apply Now <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

ProductSelectorGrid.displayName = "ProductSelectorGrid";
export default ProductSelectorGrid;
