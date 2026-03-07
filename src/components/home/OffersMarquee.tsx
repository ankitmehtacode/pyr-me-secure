import { Sparkles, Percent, Gift, Tag, Zap } from "lucide-react";
import { motion } from "framer-motion";

const offers = [
  { icon: Percent, text: "50% Off Processing Fee – HDFC Bank" },
  { icon: Gift, text: "₹2,000 Cashback on First EMI – ICICI Bank" },
  { icon: Tag, text: "₹500 Amazon Gift Card on Disbursement – Axis Bank" },
  { icon: Sparkles, text: "5,000 Reward Points on Approval – SBI" },
  { icon: Zap, text: "Instant Pre-Approval in 60 Seconds" },
  { icon: Percent, text: "Interest Rates Starting 8.5% p.a." },
];

const OffersMarquee = () => {
  // Double the array for seamless loop
  const doubled = [...offers, ...offers];

  return (
    <section className="relative overflow-hidden border-y border-border/30 bg-primary/[0.04] backdrop-blur-sm">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      <div className="flex animate-marquee whitespace-nowrap py-3">
        {doubled.map((offer, i) => {
          const Icon = offer.icon;
          return (
            <motion.span
              key={i}
              className="mx-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground select-none"
              whileHover={{ color: "hsl(var(--primary))", scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-primary/70" />
              {offer.text}
              <span className="ml-4 text-border/60">•</span>
            </motion.span>
          );
        })}
      </div>
    </section>
  );
};

export default OffersMarquee;
