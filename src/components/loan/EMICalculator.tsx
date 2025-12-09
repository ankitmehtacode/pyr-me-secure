import { useState, useEffect, useMemo } from "react";
import { Calculator, TrendingUp, IndianRupee } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface EMICalculatorProps {
  loanAmount?: number;
  interestRate?: number;
  tenure?: number;
  className?: string;
}

const EMICalculator = ({
  loanAmount: initialAmount = 500000,
  interestRate: initialRate = 10.5,
  tenure: initialTenure = 36,
  className = "",
}: EMICalculatorProps) => {
  const [amount, setAmount] = useState(initialAmount);
  const [rate, setRate] = useState(initialRate);
  const [months, setMonths] = useState(initialTenure);

  useEffect(() => {
    setAmount(initialAmount);
  }, [initialAmount]);

  const { emi, totalPayment, totalInterest } = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const emiValue =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const total = emiValue * months;
    const interest = total - amount;

    return {
      emi: Math.round(emiValue),
      totalPayment: Math.round(total),
      totalInterest: Math.round(interest),
    };
  }, [amount, rate, months]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className={`bg-card rounded-xl border border-border shadow-sm p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">EMI Calculator</h3>
          <p className="text-xs text-muted-foreground">Estimate your monthly payments</p>
        </div>
      </div>

      {/* EMI Display */}
      <div className="text-center p-6 bg-primary/5 rounded-xl mb-6">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Monthly EMI</span>
        <p className="text-3xl font-bold text-primary mt-1">{formatCurrency(emi)}</p>
      </div>

      {/* Sliders */}
      <div className="space-y-6">
        {/* Loan Amount */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Loan Amount</span>
            <span className="text-sm font-semibold text-primary">{formatCurrency(amount)}</span>
          </div>
          <Slider
            value={[amount]}
            onValueChange={(v) => setAmount(v[0])}
            min={100000}
            max={5000000}
            step={50000}
            className="cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">₹1L</span>
            <span className="text-xs text-muted-foreground">₹50L</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Interest Rate</span>
            <span className="text-sm font-semibold text-primary">{rate}% p.a.</span>
          </div>
          <Slider
            value={[rate]}
            onValueChange={(v) => setRate(v[0])}
            min={8}
            max={20}
            step={0.5}
            className="cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">8%</span>
            <span className="text-xs text-muted-foreground">20%</span>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Tenure</span>
            <span className="text-sm font-semibold text-primary">{months} months</span>
          </div>
          <Slider
            value={[months]}
            onValueChange={(v) => setMonths(v[0])}
            min={12}
            max={84}
            step={6}
            className="cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">12 mo</span>
            <span className="text-xs text-muted-foreground">84 mo</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-border space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <IndianRupee className="w-4 h-4" />
            Principal Amount
          </span>
          <span className="text-sm font-medium text-foreground">{formatCurrency(amount)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Total Interest
          </span>
          <span className="text-sm font-medium text-accent">{formatCurrency(totalInterest)}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-border">
          <span className="text-sm font-medium text-foreground">Total Payment</span>
          <span className="text-lg font-bold text-foreground">{formatCurrency(totalPayment)}</span>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
