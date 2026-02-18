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
    },
    {
      icon: Briefcase,
      title: "Business Loan",
      description: "Fuel your business growth with competitive rates.",
      rate: "12%",
      maxAmount: "₹2 Crore",
      tenure: "Up to 7 Years",
      href: "/apply?type=business",
    },
    {
      icon: Home,
      title: "Home Loan",
      description: "Make your dream home a reality with industry-best rates.",
      rate: "8.5%",
      maxAmount: "₹5 Crore",
      tenure: "Up to 30 Years",
      href: "/apply?type=home",
    },
    {
      icon: Building2,
      title: "Loan Against Property",
      description: "Unlock the value of your property with high LTV ratios.",
      rate: "9.5%",
      maxAmount: "₹3 Crore",
      tenure: "Up to 15 Years",
      href: "/apply?type=lap",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-4">
            Loan Products
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Financial Solutions for Every Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of loan products designed to meet your unique requirements
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {products.map((product) => (
            <motion.div key={product.title} variants={cardVariants}>
              <TiltedCard className="rounded-xl">
                <Link
                  to={product.href}
                  className="group block bg-card rounded-xl border border-border/50 p-6 md:p-8 overflow-hidden relative transition-all duration-300 hover:border-primary hover:shadow-elevated-lg"
                >
                  {/* Background shimmer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300">
                      <product.icon className="w-7 h-7 text-primary" strokeWidth={2} />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-2">{product.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-xl">
                      <div>
                        <span className="text-xs text-muted-foreground block mb-1">Rate from</span>
                        <p className="text-lg font-bold text-primary">{product.rate}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground block mb-1">Up to</span>
                        <p className="text-lg font-bold text-foreground">{product.maxAmount}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground block mb-1">Tenure</span>
                        <p className="text-sm font-semibold text-foreground">{product.tenure}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary/30 text-sm font-semibold text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                        Apply Now
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltedCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSelectorGrid;
