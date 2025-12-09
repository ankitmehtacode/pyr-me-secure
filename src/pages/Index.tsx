import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustMonologue from "@/components/home/TrustMonologue";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>PYRME Consulting - Secure Loan Solutions | RBI Compliant</title>
        <meta
          name="description"
          content="Experience transparent loan processing with bank-grade security. Personal loans, business loans, home loans with competitive rates. RBI compliant and ISO 27001 certified."
        />
        <meta name="keywords" content="personal loan, business loan, home loan, loan against property, RBI compliant, secure loan" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <TrustMonologue />
          <ServicesSection />
          <ProcessSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
