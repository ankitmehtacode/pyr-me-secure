import { FileText, Search, CheckCircle, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const springConfig = { stiffness: 120, damping: 28, mass: 0.8 };

const ProcessSection = () => {
  const steps = [
    {
      icon: FileText,
      step: "01",
      title: "Apply Online",
      description: "Fill a simple form with basic details. Takes less than 5 minutes.",
    },
    {
      icon: Search,
      step: "02",
      title: "Quick Verification",
      description: "Our team verifies your documents digitally within 24 hours.",
    },
    {
      icon: CheckCircle,
      step: "03",
      title: "Instant Approval",
      description: "Get approval notification with personalized loan offers.",
    },
    {
      icon: CreditCard,
      step: "04",
      title: "Fast Disbursement",
      description: "Funds transferred directly to your bank account.",
    },
  ];

  return (
    <section className="py-20 md:py-28 trust-gradient">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", ...springConfig }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-4">
            How It Works
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4" style={{ letterSpacing: "-0.02em" }}>
            Simple 4-Step Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From application to disbursement — transparent, fast, and hassle-free
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", ...springConfig, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-px bg-border/60">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", ...springConfig, delay: 0.3 + index * 0.1 }}
                      className="absolute right-0 w-2 h-2 rounded-full bg-primary -translate-y-[3px]"
                      style={{ boxShadow: "0 0 12px hsl(148 62% 42% / 0.4)" }}
                    />
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="relative bg-card/70 backdrop-blur-sm rounded-2xl border border-border/40 p-6 text-center group transition-all duration-300 hover:border-primary/20 hover:shadow-[0_12px_40px_-15px_hsl(148_62%_42%/0.12)]"
                >
                  {/* Step Number */}
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full"
                    style={{ boxShadow: "0 4px 14px hsl(148 62% 42% / 0.3)" }}
                  >
                    {step.step}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                    className="w-16 h-16 mx-auto rounded-2xl bg-primary/8 flex items-center justify-center mb-5 mt-4 group-hover:bg-primary/12 transition-colors duration-300"
                  >
                    <step.icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
