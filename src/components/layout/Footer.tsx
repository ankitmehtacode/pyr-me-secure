import { Link } from "react-router-dom";
import { Shield, Lock, CheckCircle, Mail, Phone, MapPin, ArrowRight, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prymeLogo from "@/assets/pryme-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: "Personal Loan", href: "/apply?type=personal" },
    { label: "Business Loan", href: "/apply?type=business" },
    { label: "Home Loan", href: "/apply?type=home" },
    { label: "Loan Against Property", href: "/apply?type=lap" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/#process" },
    { label: "Partner Banks", href: "/#partners" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Grievance Redressal", href: "/grievance" },
    { label: "RBI Guidelines", href: "/rbi-guidelines" },
  ];

  const toolLinks = [
    { label: "EMI Calculator", href: "/apply#emi-calculator" },
    { label: "Eligibility Checker", href: "/apply" },
    { label: "Document Checklist", href: "/documents" },
    { label: "Compare Loans", href: "/apply" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Trust Badges */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-5 h-5 text-success" />
              <span className="text-background/80">RBI Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Lock className="w-5 h-5 text-trust" />
              <span className="text-background/80">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-background/80">256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-background/80">GDPR Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company Info - Spans 2 cols on lg */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <img src={prymeLogo} alt="PRYME" className="h-10 brightness-0 invert" />
            </Link>
            <p className="text-sm text-background/70 leading-relaxed max-w-xs">
              Your trusted partner for transparent, secure, and efficient loan processing. Compare rates from 15+ banks and get the best deal.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-background">Stay Updated</p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="h-10 bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-primary"
                />
                <Button size="sm" className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground px-4">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-background/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background">Tools</h4>
            <ul className="space-y-3">
              {toolLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-background/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-background/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <a href="tel:1800-000-0000" className="text-sm text-background/70 hover:text-primary transition-colors block">
                    1800-000-0000
                  </a>
                  <span className="text-xs text-background/50">Toll-free, 9 AM - 9 PM</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <a href="mailto:support@pryme.in" className="text-sm text-background/70 hover:text-primary transition-colors">
                  support@pryme.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-background/70">
                  Mumbai, Maharashtra, India
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright & Legal Links */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <p className="text-xs text-background/50">
                © {currentYear} PRYME Consulting. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-xs text-background/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RBI Disclaimer */}
          <div className="mt-6 pt-6 border-t border-background/10">
            <p className="text-xs text-background/40 leading-relaxed max-w-5xl">
              <strong className="text-background/60">Disclaimer:</strong> PRYME is a loan comparison and facilitation platform and not a lender. 
              We partner with RBI-regulated banks and NBFCs to provide loan services. All loans are subject to 
              credit approval and terms & conditions of the respective lending partners. Interest rates, processing 
              fees, and other charges vary based on the loan type and borrower profile. The information provided 
              on this website is for general informational purposes only and should not be considered as financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
