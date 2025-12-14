import { Building2, ExternalLink, Phone, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BankOffer {
  id: string;
  bankName: string;
  logo?: string;
  maxLoanAmount: number;
  roi: number;
  processingFee: string;
  emi: number;
  approvalProbability: number;
  processingTime: string;
  featured?: boolean;
}

interface BankComparisonTableProps {
  offers: BankOffer[];
  loanAmount: number;
  tenure: number;
  onApplyDirect: (bankId: string) => void;
  onApplyWithPyrme: (bankId: string) => void;
}

const BankComparisonTable = ({ 
  offers, 
  loanAmount, 
  tenure, 
  onApplyDirect, 
  onApplyWithPyrme 
}: BankComparisonTableProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getApprovalColor = (probability: number) => {
    if (probability >= 80) return "bg-success";
    if (probability >= 60) return "bg-trust";
    if (probability >= 40) return "bg-primary";
    return "bg-destructive";
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Best Loan Offers For You</h2>
        <span className="text-sm text-muted-foreground">{offers.length} banks found</span>
      </div>

      {/* Mobile Cards / Desktop Table */}
      <div className="space-y-4">
        {offers.map((offer, index) => (
          <div 
            key={offer.id}
            className={cn(
              "neo-card p-4 md:p-6 transition-all duration-300 card-hover",
              offer.featured && "ring-2 ring-trust glow-trust"
            )}
          >
            {offer.featured && (
              <div className="flex items-center gap-1 text-trust text-xs font-medium mb-3">
                <Star className="w-3 h-3 fill-trust" />
                <span>Best Match</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
              {/* Bank Info */}
              <div className="flex items-center gap-3 md:col-span-1">
                <div className="w-12 h-12 rounded-xl neo-card-inset flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{offer.bankName}</p>
                  <p className="text-xs text-muted-foreground">{offer.processingTime}</p>
                </div>
              </div>

              {/* Loan Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:col-span-3">
                <div>
                  <p className="text-xs text-muted-foreground">Max Loan</p>
                  <p className="font-semibold text-foreground">{formatCurrency(offer.maxLoanAmount)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ROI</p>
                  <p className="font-semibold text-primary">{offer.roi}% p.a.</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Processing Fee</p>
                  <p className="font-semibold text-foreground">{offer.processingFee}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">EMI</p>
                  <p className="font-semibold text-success">{formatCurrency(offer.emi)}/mo</p>
                </div>
              </div>

              {/* Approval Bar & Actions */}
              <div className="md:col-span-2 space-y-3">
                {/* Approval Probability */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Approval Chance</span>
                    <span className="font-medium text-foreground">{offer.approvalProbability}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full transition-all duration-500", getApprovalColor(offer.approvalProbability))}
                      style={{ width: `${offer.approvalProbability}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs neo-button border-0"
                    onClick={() => onApplyDirect(offer.id)}
                  >
                    Apply Direct
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 text-xs bg-primary hover:bg-primary/90"
                    onClick={() => onApplyWithPyrme(offer.id)}
                  >
                    Apply with PYRME
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankComparisonTable;
