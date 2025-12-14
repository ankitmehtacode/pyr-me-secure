import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Shield, Clock, CheckCircle, TrendingUp, Building2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoanApplicationForm from "@/components/loan/LoanApplicationForm";
import EMICalculator from "@/components/loan/EMICalculator";
import BankComparisonTable from "@/components/loan/BankComparisonTable";
import EligibilityScore from "@/components/loan/EligibilityScore";
import CibilTips from "@/components/loan/CibilTips";
import OffersRewards from "@/components/loan/OffersRewards";
import RequiredDocuments from "@/components/loan/RequiredDocuments";
import BankerContact from "@/components/loan/BankerContact";
import { toast } from "@/hooks/use-toast";

const Apply = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(5);
  const [showComparison, setShowComparison] = useState(false);
  const [applicationData, setApplicationData] = useState<{
    cibilScore: number;
    monthlyIncome: number;
    productType: string;
  } | null>(null);

  // Mock bank offers - in production this would come from an API
  const bankOffers = [
    {
      id: "hdfc",
      bankName: "HDFC Bank",
      maxLoanAmount: 5000000,
      roi: 10.5,
      processingFee: "1% + GST",
      emi: 10724,
      approvalProbability: 85,
      processingTime: "24-48 hours",
      featured: true,
    },
    {
      id: "icici",
      bankName: "ICICI Bank",
      maxLoanAmount: 4000000,
      roi: 10.75,
      processingFee: "1.5% + GST",
      emi: 10799,
      approvalProbability: 78,
      processingTime: "48-72 hours",
    },
    {
      id: "sbi",
      bankName: "State Bank of India",
      maxLoanAmount: 3500000,
      roi: 10.25,
      processingFee: "0.5% + GST",
      emi: 10649,
      approvalProbability: 82,
      processingTime: "3-5 days",
    },
    {
      id: "axis",
      bankName: "Axis Bank",
      maxLoanAmount: 4500000,
      roi: 11.0,
      processingFee: "1.25% + GST",
      emi: 10874,
      approvalProbability: 72,
      processingTime: "48 hours",
    },
  ];

  const handleFormSubmit = (data: any) => {
    setApplicationData({
      cibilScore: data.cibilScore,
      monthlyIncome: data.monthlyIncome,
      productType: data.productType,
    });
    setLoanAmount(data.loanAmount);
    setTenure(data.loanTenure);
    setShowComparison(true);
    
    // Scroll to comparison section
    setTimeout(() => {
      document.getElementById("comparison-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleApplyDirect = (bankId: string) => {
    const bank = bankOffers.find(b => b.id === bankId);
    toast({
      title: "Redirecting to Bank",
      description: `Opening ${bank?.bankName} application page...`,
    });
  };

  const handleApplyWithPyrme = (bankId: string) => {
    const bank = bankOffers.find(b => b.id === bankId);
    toast({
      title: "Application Started",
      description: `Your application with ${bank?.bankName} through PYRME has been initiated. Our RM will contact you shortly.`,
    });
  };

  // Calculate eligibility score based on user data
  const calculateEligibilityScore = () => {
    if (!applicationData) return 70;
    
    let score = 0;
    // CIBIL contribution (40%)
    score += ((applicationData.cibilScore - 300) / 600) * 40;
    // Income-Loan ratio contribution (40%)
    const ratio = loanAmount / (applicationData.monthlyIncome * 12);
    score += Math.max(0, (1 - ratio / 10) * 40);
    // Base score (20%)
    score += 20;
    
    return Math.min(100, Math.round(score));
  };

  return (
    <>
      <Helmet>
        <title>Apply for Loan - PYRME Consulting | Compare Best Loan Offers</title>
        <meta
          name="description"
          content="Compare loan offers from top banks. Apply for personal, business, or home loans with PYRME Consulting. Quick approval, competitive rates, and exclusive rewards."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Page Header */}
          <section className="hero-gradient py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Compare & Apply for Loans
                </h1>
                <p className="text-muted-foreground text-lg mb-6">
                  Get personalized loan offers from 15+ banks. Compare rates, apply instantly.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-foreground/90 neo-card px-4 py-2 rounded-full">
                    <Shield className="w-4 h-4 text-trust" />
                    <span>Secure & Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/90 neo-card px-4 py-2 rounded-full">
                    <Clock className="w-4 h-4 text-trust" />
                    <span>2 Min Application</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/90 neo-card px-4 py-2 rounded-full">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>24 Hour Approval</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/90 neo-card px-4 py-2 rounded-full">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span>15+ Partner Banks</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Application Section */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Form - Takes 2 columns */}
                <div className="lg:col-span-2">
                  <LoanApplicationForm 
                    onAmountChange={setLoanAmount} 
                    onFormSubmit={handleFormSubmit}
                  />
                </div>

                {/* Sidebar */}
                <div className="space-y-6 lg:sticky lg:top-24">
                  <EMICalculator loanAmount={loanAmount} />
                  <CibilTips />
                </div>
              </div>
            </div>
          </section>

          {/* Bank Comparison Section - Shows after form submission */}
          {showComparison && (
            <section id="comparison-section" className="py-12 md:py-16 trust-gradient">
              <div className="container mx-auto px-4">
                <BankComparisonTable
                  offers={bankOffers}
                  loanAmount={loanAmount}
                  tenure={tenure}
                  onApplyDirect={handleApplyDirect}
                  onApplyWithPyrme={handleApplyWithPyrme}
                />
              </div>
            </section>
          )}

          {/* Additional Info Section */}
          {showComparison && applicationData && (
            <section className="py-12 md:py-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <EligibilityScore
                    score={calculateEligibilityScore()}
                    cibilScore={applicationData.cibilScore}
                    monthlyIncome={applicationData.monthlyIncome}
                    loanAmount={loanAmount}
                  />
                  <RequiredDocuments productType={applicationData.productType} />
                  <BankerContact />
                </div>
              </div>
            </section>
          )}

          {/* Offers & Rewards Section */}
          <section className="py-12 md:py-16 trust-gradient">
            <div className="container mx-auto px-4">
              <OffersRewards />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Apply;
