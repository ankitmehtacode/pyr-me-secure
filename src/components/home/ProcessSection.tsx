import { FileText, Search, CheckCircle, CreditCard } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: FileText,
      step: "01",
      title: "Apply Online",
      description: "Fill a simple form with basic details. Takes less than 5 minutes.",
    },
    {
      icon: Search,
      step: "02",
      title: "Quick Verification",
      description: "Our team verifies your documents digitally within 24 hours.",
    },
    {
      icon: CheckCircle,
      step: "03",
      title: "Instant Approval",
      description: "Get approval notification with personalized loan offers.",
    },
    {
      icon: CreditCard,
      step: "04",
      title: "Fast Disbursement",
      description: "Funds transferred directly to your bank account.",
    },
  ];

  return (
    <section className="py-20 md:py-28 trust-gradient">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-4">
            How It Works
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Simple 4-Step Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From application to disbursement — transparent, fast, and hassle-free
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {/* Connector Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border">
                    <div className="absolute right-0 w-2 h-2 rounded-full bg-primary -translate-y-[3px] glow-primary" />
                  </div>
                )}

                <div className="relative neo-card p-6 text-center group card-hover">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full glow-primary">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto rounded-full neo-card-inset flex items-center justify-center mb-5 mt-4 group-hover:glow-primary transition-all duration-300">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
