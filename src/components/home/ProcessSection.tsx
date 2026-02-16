import { FileText, Search, CheckCircle, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="py-20 md:py-28 trust-gradient">
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
            How It Works
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Simple 4-Step Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From application to disbursement — transparent, fast, and hassle-free
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step, index) => (
              <motion.div key={step.title} variants={itemVariants} className="relative">
                {/* Connector Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.15 }}
                      className="absolute right-0 w-2 h-2 rounded-full bg-primary -translate-y-[3px] glow-primary"
                    />
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.08)" }}
                  transition={{ duration: 0.3 }}
                  className="relative neo-card p-6 text-center group"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full glow-primary">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 mx-auto rounded-full neo-card-inset flex items-center justify-center mb-5 mt-4 group-hover:glow-primary transition-all duration-300"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
