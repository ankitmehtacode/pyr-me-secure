import { Building2 } from "lucide-react";
import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

const PartnerBankMarquee = () => {
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

  const [phase, setPhase] = useState(0);
  const [hovered, setHovered] = useState(false);
  const speedRef = useRef(0.008);

  useAnimationFrame(() => {
    if (!hovered) {
      setPhase((prev) => prev + speedRef.current);
    }
  });

  // Each bank is placed along a sine wave for depth simulation
  const getItemStyle = (index: number, total: number) => {
    const normalizedPos = (index / total) * Math.PI * 2 + phase;
    const wave = Math.sin(normalizedPos);
    // wave ranges -1 to 1; map to scale, opacity, blur
    const scale = 0.75 + (wave + 1) * 0.15; // 0.75 to 1.05
    const opacity = 0.35 + (wave + 1) * 0.325; // 0.35 to 1.0
    const blur = Math.max(0, (1 - (wave + 1) / 2) * 2.5); // 2.5 to 0
    const yOffset = -wave * 12; // subtle vertical wave

    return {
      transform: `scale(${scale}) translateY(${yOffset}px)`,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex: Math.round((wave + 1) * 10),
    };
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-10 md:py-14 border-y border-border/50 bg-card/30"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Building2 className="w-4 h-4" />
          <span className="font-medium">Trusted by 15+ Partner Banks & NBFCs</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 md:gap-5 flex-wrap px-4 max-w-6xl mx-auto">
        {banks.map((bank, index) => {
          const style = getItemStyle(index, banks.length);
          return (
            <motion.div
              key={bank.id}
              className="group flex items-center gap-3 px-5 py-3 bg-card/70 backdrop-blur-sm border border-border/40 rounded-xl transition-colors duration-300 hover:border-primary/30 cursor-default select-none"
              style={style}
              whileHover={{ scale: 1.08, filter: "blur(0px)", opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {bank.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default PartnerBankMarquee;
