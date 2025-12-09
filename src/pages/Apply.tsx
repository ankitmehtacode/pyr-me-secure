import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Shield, Clock, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoanApplicationForm from "@/components/loan/LoanApplicationForm";
import EMICalculator from "@/components/loan/EMICalculator";

const Apply = () => {
  const [loanAmount, setLoanAmount] = useState(500000);

  return (
    <>
      <Helmet>
        <title>Apply for Loan - PYRME Consulting</title>
        <meta
          name="description"
          content="Apply for a personal, business, or home loan with PYRME Consulting. Quick approval, competitive rates, and secure processing."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Page Header */}
          <section className="bg-primary py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Apply for a Loan
                </h1>
                <p className="text-primary-foreground/80 text-lg mb-6">
                  Complete your application in under 5 minutes. Get approval within 24 hours.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/90">
                    <Shield className="w-4 h-4 text-trust" />
                    <span>Secure & Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/90">
                    <Clock className="w-4 h-4 text-trust" />
                    <span>5 Min Application</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/90">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>24 Hour Approval</span>
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
                  <LoanApplicationForm onAmountChange={setLoanAmount} />
                </div>

                {/* Sidebar - EMI Calculator */}
                <div className="lg:sticky lg:top-24">
                  <EMICalculator loanAmount={loanAmount} />
                  
                  {/* HDFC Comparison Card */}
                  <div className="mt-6 p-4 bg-muted/50 rounded-xl border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">HDFC Standard Comparison</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Our rates are benchmarked against HDFC Bank's standard personal loan rates. 
                      You're getting competitive pricing with faster processing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Apply;
