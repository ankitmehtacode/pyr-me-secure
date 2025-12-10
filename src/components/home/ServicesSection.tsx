import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Home, Building2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      icon: Wallet,
      title: "Personal Loan",
      description: "Quick disbursement for your personal needs. Flexible EMIs starting from ₹2,000/month.",
      rate: "10.5%",
      maxAmount: "₹40 Lakh",
      href: "/apply?type=personal",
    },
    {
      icon: Briefcase,
      title: "Business Loan",
      description: "Fuel your business growth with competitive rates and minimal documentation.",
      rate: "12%",
      maxAmount: "₹2 Crore",
      href: "/apply?type=business",
    },
    {
      icon: Home,
      title: "Home Loan",
      description: "Make your dream home a reality with industry-best interest rates.",
      rate: "8.5%",
      maxAmount: "₹5 Crore",
      href: "/apply?type=home",
    },
    {
      icon: Building2,
      title: "Loan Against Property",
      description: "Unlock the value of your property with high loan-to-value ratios.",
      rate: "9.5%",
      maxAmount: "₹3 Crore",
      href: "/apply?type=lap",
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-4">
            Our Services
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Financial Solutions for Every Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of loan products designed to meet your unique requirements
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="group neo-card p-6 card-hover overflow-hidden relative"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl neo-card-inset flex items-center justify-center mb-5 group-hover:glow-primary transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Starting at</span>
                    <p className="text-lg font-bold text-primary">{service.rate} p.a.</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Up to</span>
                    <p className="text-lg font-bold text-foreground">{service.maxAmount}</p>
                  </div>
                </div>

                {/* CTA */}
                <Button asChild variant="ghost" className="p-0 h-auto font-medium text-primary hover:text-trust group/btn">
                  <Link to={service.href} className="flex items-center gap-2">
                    Apply Now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
