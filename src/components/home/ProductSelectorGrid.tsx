import { Link } from "react-router-dom";
import { ArrowRight, Wallet, Briefcase, Home, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductSelectorGrid = () => {
  const products = [
    {
      icon: Wallet,
      title: "Personal Loan",
      description: "Quick disbursement for your personal needs with flexible EMIs.",
      rate: "10.5%",
      maxAmount: "₹40 Lakh",
      tenure: "Up to 5 Years",
      color: "from-emerald-500/10 to-emerald-500/5",
      href: "/apply?type=personal",
    },
    {
      icon: Briefcase,
      title: "Business Loan",
      description: "Fuel your business growth with competitive rates.",
      rate: "12%",
      maxAmount: "₹2 Crore",
      tenure: "Up to 7 Years",
      color: "from-blue-500/10 to-blue-500/5",
      href: "/apply?type=business",
    },
    {
      icon: Home,
      title: "Home Loan",
      description: "Make your dream home a reality with industry-best rates.",
      rate: "8.5%",
      maxAmount: "₹5 Crore",
      tenure: "Up to 30 Years",
      color: "from-violet-500/10 to-violet-500/5",
      href: "/apply?type=home",
    },
    {
      icon: Building2,
      title: "Loan Against Property",
      description: "Unlock the value of your property with high LTV ratios.",
      rate: "9.5%",
      maxAmount: "₹3 Crore",
      tenure: "Up to 15 Years",
      color: "from-amber-500/10 to-amber-500/5",
      href: "/apply?type=lap",
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-4">
            Loan Products
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Financial Solutions for Every Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of loan products designed to meet your unique requirements
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <Link
              key={product.title}
              to={product.href}
              className="group card-elevated p-6 md:p-8 overflow-hidden relative hover-lift"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <product.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2">{product.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-xl">
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Rate from</span>
                    <p className="text-lg font-bold text-primary">{product.rate}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Up to</span>
                    <p className="text-lg font-bold text-foreground">{product.maxAmount}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Tenure</span>
                    <p className="text-sm font-semibold text-foreground">{product.tenure}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                    Apply Now
                  </span>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSelectorGrid;
