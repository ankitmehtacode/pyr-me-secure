import { Sparkles, Percent, Gift, Tag, Zap, TrendingUp, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const offers = [
  { icon: TrendingUp, text: "Home Loan @ 8.35% p.a.", highlight: true, tag: "LIVE" },
  { icon: Percent, text: "50% Off Processing Fee – HDFC Bank", highlight: false },
  { icon: Gift, text: "₹2,000 Cashback on First EMI – ICICI Bank", highlight: false },
  { icon: ArrowUpRight, text: "Personal Loan @ 10.25% p.a.", highlight: true, tag: "LIVE" },
  { icon: Tag, text: "₹500 Amazon Gift Card – Axis Bank", highlight: false },
  { icon: Sparkles, text: "5,000 Reward Points on Approval – SBI", highlight: false },
  { icon: Zap, text: "Instant Pre-Approval in 60 Seconds", highlight: false },
  { icon: TrendingUp, text: "Business Loan @ 14.5% p.a.", highlight: true, tag: "LIVE" },
  { icon: Percent, text: "Zero Foreclosure Charges – Kotak", highlight: false },
];

const OffersMarquee = () => {
  const doubled = [...offers, ...offers];

  return (
    <section className="relative overflow-hidden border-y border-border/20 bg-card/40 backdrop-blur-sm">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      {/* Subtle top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {doubled.map((offer, i) => {
          const Icon = offer.icon;
          return (
            <span
              key={i}
              className="mx-5 inline-flex items-center gap-2 text-sm select-none"
            >
              {offer.highlight && offer.tag && (
                <span className="relative flex items-center gap-1 px-1.5 py-0.5 rounded bg-success/15 text-success text-[10px] font-bold tracking-wider uppercase">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
                  </span>
                  {offer.tag}
                </span>
              )}
              <Icon className={`h-3.5 w-3.5 shrink-0 ${offer.highlight ? "text-success" : "text-primary/60"}`} />
              <span className={`font-medium ${offer.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                {offer.text}
              </span>
              <span className="ml-3 text-border/40">│</span>
            </span>
          );
        })}
      </div>

      {/* Subtle bottom glow line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
};

export default OffersMarquee;
