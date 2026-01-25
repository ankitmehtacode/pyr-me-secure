import { Building2 } from "lucide-react";

const PartnerBankMarquee = () => {
  // Partner banks - in production these would be actual logos
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

  return (
    <section className="py-10 md:py-14 border-y border-border/50 bg-card/30">
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Building2 className="w-4 h-4" />
          <span className="font-medium">Trusted by 15+ Partner Banks & NBFCs</span>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-content">
          {banks.map((bank) => (
            <div
              key={bank.id}
              className="flex items-center gap-3 px-6 py-3 mx-4 bg-card border border-border/50 rounded-xl bank-logo hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Building2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{bank.name}</span>
            </div>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {banks.map((bank) => (
            <div
              key={`${bank.id}-dup`}
              className="flex items-center gap-3 px-6 py-3 mx-4 bg-card border border-border/50 rounded-xl bank-logo hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Building2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{bank.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerBankMarquee;
