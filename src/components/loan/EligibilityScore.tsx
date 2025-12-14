import { TrendingUp, AlertCircle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface EligibilityScoreProps {
  score: number; // 0-100
  cibilScore: number;
  monthlyIncome: number;
  loanAmount: number;
}

const EligibilityScore = ({ score, cibilScore, monthlyIncome, loanAmount }: EligibilityScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-trust";
    if (score >= 40) return "text-primary";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  const strokeDashoffset = 283 - (283 * score) / 100;

  return (
    <div className="neo-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl neo-card-inset flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Eligibility Score</h3>
          <p className="text-xs text-muted-foreground">Based on your profile</p>
        </div>
      </div>

      {/* Circular Score */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={cn("transition-all duration-1000", getScoreColor(score))}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-3xl font-bold", getScoreColor(score))}>{score}</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <span className={cn("text-lg font-semibold", getScoreColor(score))}>
          {getScoreLabel(score)}
        </span>
      </div>

      {/* Score Factors */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 neo-card-inset rounded-lg">
          <span className="text-sm text-muted-foreground">CIBIL Score</span>
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{cibilScore}</span>
            {cibilScore >= 700 ? (
              <CheckCircle className="w-4 h-4 text-success" />
            ) : (
              <AlertCircle className="w-4 h-4 text-trust" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-3 neo-card-inset rounded-lg">
          <span className="text-sm text-muted-foreground">Income-Loan Ratio</span>
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">
              {((loanAmount / (monthlyIncome * 12)) * 100).toFixed(0)}%
            </span>
            {loanAmount <= monthlyIncome * 60 ? (
              <CheckCircle className="w-4 h-4 text-success" />
            ) : (
              <AlertCircle className="w-4 h-4 text-destructive" />
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-lg flex items-start gap-2">
        <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-xs text-muted-foreground">
          Your eligibility score helps banks assess your loan application. A higher score increases approval chances.
        </p>
      </div>
    </div>
  );
};

export default EligibilityScore;
