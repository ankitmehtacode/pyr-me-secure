import { Building2 } from "lucide-react";
import { motion } from "framer-motion";

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

  const BankItem = ({ bank, suffix = "" }: { bank: typeof banks[0]; suffix?: string }) => (
    <div
      key={`${bank.id}${suffix}`}
      className="group flex items-center gap-3 px-5 py-2.5 mx-3 bg-card border border-border/50 rounded-xl transition-all duration-300 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:shadow-md hover:border-primary/30"
    >
      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
        <Building2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <span className="text-sm font-medium text-foreground whitespace-nowrap">{bank.name}</span>
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8 md:py-12 border-y border-border/50 bg-card/30"
    >
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Building2 className="w-4 h-4" />
          <span className="font-medium">Trusted by 15+ Partner Banks & NBFCs</span>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-content">
          {banks.map((bank) => (
            <BankItem key={bank.id} bank={bank} />
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {banks.map((bank) => (
            <BankItem key={bank.id} bank={bank} suffix="-dup" />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PartnerBankMarquee;
