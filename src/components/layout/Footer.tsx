import { Link } from "react-router-dom";
import { Shield, Lock, CheckCircle, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Trust Badges */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-sm neo-card px-4 py-2">
              <Shield className="w-5 h-5 text-success" />
              <span className="text-muted-foreground">RBI Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm neo-card px-4 py-2">
              <Lock className="w-5 h-5 text-trust" />
              <span className="text-muted-foreground">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-sm neo-card px-4 py-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-muted-foreground">256-bit SSL Encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl neo-card flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground">PYRME</span>
                <span className="text-xs block text-muted-foreground uppercase tracking-widest">Consulting</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for transparent, secure, and efficient loan processing. Bank-grade security for your financial future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">Quick Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/apply" className="hover:text-primary transition-colors">Apply for Loan</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Track Application</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Personal Loans</li>
              <li>Business Loans</li>
              <li>Home Loans</li>
              <li>Loan Against Property</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>1800-000-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@pyrme.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* RBI Disclaimer */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-4">
            <p className="text-xs text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              <strong className="text-foreground">RBI Disclaimer:</strong> PYRME Consulting is a loan facilitation platform and not a lender. 
              We partner with RBI-regulated banks and NBFCs to provide loan services. All loans are subject to 
              credit approval and terms & conditions of the respective lending partners. Interest rates, processing 
              fees, and other charges vary based on the loan type and borrower profile.
            </p>
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} PYRME Consulting. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
