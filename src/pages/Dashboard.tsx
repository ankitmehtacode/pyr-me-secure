import { Helmet } from "react-helmet-async";
import { FileText, Search, CheckCircle, CreditCard, Clock, AlertCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  // Mock application data
  const application = {
    id: "PYR-12345678",
    status: "under_review",
    submittedAt: "December 8, 2024",
    lastUpdate: "14 mins ago",
    amount: "₹5,00,000",
    tenure: "36 months",
    currentStage: 2,
  };

  const stages = [
    {
      id: 1,
      title: "Application Received",
      description: "Your application has been submitted successfully",
      icon: FileText,
      status: "completed",
      timestamp: "Dec 8, 2024 - 10:30 AM",
    },
    {
      id: 2,
      title: "Document Verification",
      description: "Our team is verifying your documents",
      icon: Search,
      status: "current",
      timestamp: "In Progress",
    },
    {
      id: 3,
      title: "Credit Assessment",
      description: "Evaluating your credit profile",
      icon: AlertCircle,
      status: "pending",
      timestamp: "Pending",
    },
    {
      id: 4,
      title: "Approval",
      description: "Final approval from our underwriting team",
      icon: CheckCircle,
      status: "pending",
      timestamp: "Pending",
    },
    {
      id: 5,
      title: "Disbursement",
      description: "Funds transferred to your account",
      icon: CreditCard,
      status: "pending",
      timestamp: "Pending",
    },
  ];

  const getStageStyles = (status: string) => {
    switch (status) {
      case "completed":
        return {
          circle: "bg-success text-success-foreground",
          line: "bg-success",
          text: "text-success",
        };
      case "current":
        return {
          circle: "bg-primary text-primary-foreground animate-pulse",
          line: "bg-border",
          text: "text-primary",
        };
      default:
        return {
          circle: "bg-muted text-muted-foreground",
          line: "bg-border",
          text: "text-muted-foreground",
        };
    }
  };

  return (
    <>
      <Helmet>
        <title>Track Application - PYRME Consulting</title>
        <meta name="description" content="Track your loan application status in real-time with PYRME Consulting." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Page Header */}
          <section className="bg-primary py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Track Your Application
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Monitor your loan application status in real-time
              </p>
            </div>
          </section>

          {/* Search Section */}
          <section className="py-8 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto flex gap-3">
                <Input
                  placeholder="Enter Application ID (e.g., PYR-12345678)"
                  className="input-secure"
                  defaultValue={application.id}
                />
                <Button>Track</Button>
              </div>
            </div>
          </section>

          {/* Application Status */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                {/* Application Card */}
                <div className="bg-card rounded-xl border border-border shadow-sm p-6 mb-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-border">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Application ID</span>
                      <p className="text-lg font-mono font-semibold text-foreground">{application.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Last updated: {application.lastUpdate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Status</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-trust animate-pulse" />
                        <span className="text-sm font-medium text-foreground">Under Review</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Submitted</span>
                      <p className="text-sm font-medium text-foreground mt-1">{application.submittedAt}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Amount</span>
                      <p className="text-sm font-medium text-foreground mt-1">{application.amount}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Tenure</span>
                      <p className="text-sm font-medium text-foreground mt-1">{application.tenure}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-8">Application Progress</h2>

                  <div className="relative">
                    {stages.map((stage, index) => {
                      const styles = getStageStyles(stage.status);
                      const isLast = index === stages.length - 1;

                      return (
                        <div key={stage.id} className="relative flex gap-4 pb-8 last:pb-0">
                          {/* Connector Line */}
                          {!isLast && (
                            <div
                              className={cn(
                                "absolute left-5 top-10 w-0.5 h-[calc(100%-2rem)]",
                                styles.line
                              )}
                            />
                          )}

                          {/* Icon Circle */}
                          <div
                            className={cn(
                              "relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                              styles.circle
                            )}
                          >
                            <stage.icon className="w-5 h-5" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 pt-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className={cn("font-medium", styles.text)}>{stage.title}</h3>
                                <p className="text-sm text-muted-foreground mt-0.5">{stage.description}</p>
                              </div>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {stage.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Help Card */}
                <div className="mt-8 p-6 bg-muted/50 rounded-xl border border-border text-center">
                  <h3 className="font-medium text-foreground mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our support team is available 24/7 to assist you with your application.
                  </p>
                  <Button variant="outline">Contact Support</Button>
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

export default Dashboard;
