import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  IndianRupee,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const formatCurrency = (value: number) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 26 },
  },
};

/* ─── Mini EMI Calculator ─── */
const MiniEMI = () => {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(10.5);
  const [months, setMonths] = useState(36);

  const { emi, totalPayment, totalInterest, principalPct } = useMemo(() => {
    const r = rate / 12 / 100;
    const e = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const total = e * months;
    const interest = total - amount;
    return {
      emi: Math.round(e),
      totalPayment: Math.round(total),
      totalInterest: Math.round(interest),
      principalPct: (amount / total) * 100,
    };
  }, [amount, rate, months]);

  const radius = 70;
  const circ = 2 * Math.PI * radius;
  const arc = (principalPct / 100) * circ;

  return (
    <motion.div
      variants={fadeUp}
      className="relative rounded-2xl border border-border/40 bg-card/70 backdrop-blur-md p-6 md:p-8 overflow-hidden"
    >
      {/* Subtle glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-lg">EMI Calculator</h3>
          <p className="text-xs text-muted-foreground">Plan your monthly payments</p>
        </div>
      </div>

      {/* Chart + Summary row */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-36 h-36 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="14" />
            <circle
              cx="80" cy="80" r={radius} fill="none"
              stroke="hsl(var(--primary))" strokeWidth="14"
              strokeDasharray={`${arc} ${circ}`} strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">EMI</span>
            <span className="text-lg font-bold text-primary">{formatCurrency(emi)}</span>
            <span className="text-[10px] text-muted-foreground">/month</span>
          </div>
        </div>

        <div className="flex-1 space-y-2.5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" /> Principal
            </span>
            <span className="font-semibold text-foreground">{formatCurrency(amount)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-trust inline-block" /> Interest
            </span>
            <span className="font-semibold text-foreground">{formatCurrency(totalInterest)}</span>
          </div>
          <div className="h-px bg-border/60 my-1" />
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-foreground">Total</span>
            <span className="font-bold text-foreground">{formatCurrency(totalPayment)}</span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-5">
        <SliderRow
          label="Loan Amount"
          value={amount}
          display={formatCurrency(amount)}
          min={100000} max={10000000} step={50000}
          onChange={setAmount}
          minLabel="₹1L" maxLabel="₹1Cr"
        />
        <SliderRow
          label="Interest Rate"
          value={rate}
          display={`${rate}%`}
          min={6} max={24} step={0.25}
          onChange={setRate}
          minLabel="6%" maxLabel="24%"
        />
        <SliderRow
          label="Tenure"
          value={months}
          display={`${months} mo`}
          min={12} max={360} step={12}
          onChange={setMonths}
          minLabel="1yr" maxLabel="30yr"
        />
      </div>
    </motion.div>
  );
};

const SliderRow = ({
  label, value, display, min, max, step, onChange, minLabel, maxLabel,
}: {
  label: string; value: number; display: string;
  min: number; max: number; step: number;
  onChange: (v: number) => void;
  minLabel: string; maxLabel: string;
}) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{display}</span>
    </div>
    <Slider value={[value]} onValueChange={(v) => onChange(v[0])} min={min} max={max} step={step} className="cursor-pointer" />
    <div className="flex justify-between mt-1">
      <span className="text-[10px] text-muted-foreground">{minLabel}</span>
      <span className="text-[10px] text-muted-foreground">{maxLabel}</span>
    </div>
  </div>
);

/* ─── Quick Eligibility Check ─── */
const QuickEligibility = () => {
  const [income, setIncome] = useState(50000);
  const [cibil, setCibil] = useState(720);

  const score = useMemo(() => {
    let s = 0;
    if (cibil >= 750) s += 45;
    else if (cibil >= 700) s += 35;
    else if (cibil >= 650) s += 20;
    else s += 10;

    if (income >= 100000) s += 40;
    else if (income >= 50000) s += 30;
    else if (income >= 25000) s += 20;
    else s += 10;

    s += 15; // base
    return Math.min(s, 100);
  }, [income, cibil]);

  const getDetails = () => {
    if (score >= 80) return { label: "Excellent", color: "text-success", bg: "bg-success" };
    if (score >= 60) return { label: "Good", color: "text-primary", bg: "bg-primary" };
    if (score >= 40) return { label: "Fair", color: "text-warning", bg: "bg-warning" };
    return { label: "Needs Work", color: "text-destructive", bg: "bg-destructive" };
  };

  const d = getDetails();
  const radius = 60;
  const circ = 2 * Math.PI * radius;
  const arc = (score / 100) * circ;

  return (
    <motion.div
      variants={fadeUp}
      className="relative rounded-2xl border border-border/40 bg-card/70 backdrop-blur-md p-6 md:p-8 overflow-hidden flex flex-col"
    >
      <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-trust/5 blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-trust/10 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-trust" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-lg">Check Eligibility</h3>
          <p className="text-xs text-muted-foreground">Instant assessment</p>
        </div>
      </div>

      {/* Score Ring */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
            <circle
              cx="70" cy="70" r={radius} fill="none"
              stroke={`hsl(var(--${score >= 80 ? "success" : score >= 60 ? "primary" : score >= 40 ? "warning" : "destructive"}))`}
              strokeWidth="10" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={circ - arc}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-3xl font-bold", d.color)}>{score}</span>
            <span className="text-[10px] text-muted-foreground">/ 100</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold", d.bg + "/10", d.color)}>
          {score >= 60 ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
          {d.label}
        </span>
      </div>

      {/* Inputs */}
      <div className="space-y-5 flex-1">
        <SliderRow
          label="Monthly Income"
          value={income}
          display={formatCurrency(income)}
          min={15000} max={500000} step={5000}
          onChange={setIncome}
          minLabel="₹15K" maxLabel="₹5L"
        />
        <SliderRow
          label="CIBIL Score"
          value={cibil}
          display={cibil.toString()}
          min={300} max={900} step={10}
          onChange={setCibil}
          minLabel="300" maxLabel="900"
        />
      </div>

      {/* CTA */}
      <motion.a
        href="/apply"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:shadow-glow-primary transition-shadow"
      >
        Check Full Eligibility
        <ArrowRight className="w-4 h-4" />
      </motion.a>
    </motion.div>
  );
};

/* ─── Main Section ─── */
const PlanFinancesSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionVariants}
      className="py-16 md:py-24 bg-muted/20"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4"
          >
            <IndianRupee className="w-3.5 h-3.5" />
            Plan Your Finances
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-2xl md:text-4xl font-bold text-foreground mb-3"
          >
            Know Before You Apply
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto"
          >
            Calculate your EMI and check eligibility in seconds — no paperwork, no commitments.
          </motion.p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <MiniEMI />
          <QuickEligibility />
        </div>
      </div>
    </motion.section>
  );
};

export default PlanFinancesSection;
