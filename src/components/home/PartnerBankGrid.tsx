import { Building2, Shield } from "lucide-react";
import { motion } from "framer-motion";

const banks = [
  { name: "HDFC Bank", id: "hdfc" },
  { name: "ICICI Bank", id: "icici" },
  { name: "State Bank of India", id: "sbi" },
  { name: "Axis Bank", id: "axis" },
  { name: "Kotak Mahindra", id: "kotak" },
  { name: "Yes Bank", id: "yes" },
  { name: "IndusInd Bank", id: "indusind" },
  { name: "Bank of Baroda", id: "bob" },
  { name: "Punjab National Bank", id: "pnb" },
  { name: "IDFC First Bank", id: "idfc" },
  { name: "Federal Bank", id: "federal" },
  { name: "Bajaj Finance", id: "bajaj" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const PartnerBankGrid = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4"
          >
            <Shield className="w-3.5 h-3.5" />
            Our Partners
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-foreground mb-3"
          >
            Trusted by 15+ Banks & NBFCs
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-sm max-w-md mx-auto"
          >
            We compare offers across India's top financial institutions to get you the best deal.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-5xl mx-auto"
        >
          {banks.map((bank) => (
            <motion.div
              key={bank.id}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm cursor-default select-none grayscale hover:grayscale-0 hover:border-primary/20 hover:shadow-elevated transition-all duration-300"
            >
              {/* Icon placeholder */}
              <div className="w-11 h-11 rounded-xl bg-muted/60 flex items-center justify-center border border-border/30 group-hover:bg-primary/10 transition-colors duration-300">
                <Building2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground text-center leading-tight transition-colors duration-300">
                {bank.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PartnerBankGrid;
