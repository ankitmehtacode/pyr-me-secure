import { Star, Quote } from "lucide-react";
import CircularGallery from "@/components/ui/CircularGallery";

const TestimonialsSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Business Owner",
      location: "Mumbai",
      avatar: "RK",
      rating: 5,
      quote: "PRYME made my business loan application seamless. Got approval in just 24 hours with the best interest rate in the market. Highly recommend!",
      loanType: "Business Loan",
      amount: "₹25 Lakh",
      // Professional stock photo placeholders
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "IT Professional",
      location: "Bangalore",
      avatar: "PS",
      rating: 5,
      quote: "The EMI calculator helped me plan my finances perfectly. Transparent process, no hidden charges. Best decision I made for my home loan.",
      loanType: "Home Loan",
      amount: "₹75 Lakh",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop&auto=format",
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Doctor",
      location: "Ahmedabad",
      avatar: "AP",
      rating: 5,
      quote: "Exceptional service! The RM assigned to me was knowledgeable and helped me get a better rate than what I was offered elsewhere.",
      loanType: "Personal Loan",
      amount: "₹10 Lakh",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop&auto=format",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Entrepreneur",
      location: "Hyderabad",
      avatar: "SR",
      rating: 5,
      quote: "Comparing multiple banks in one place saved me hours of research. The cashback offer was a pleasant bonus!",
      loanType: "Loan Against Property",
      amount: "₹50 Lakh",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop&auto=format",
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Government Employee",
      location: "Delhi",
      avatar: "VS",
      rating: 5,
      quote: "Simple, fast, and reliable. The document upload process was smooth, and I received my loan within a week.",
      loanType: "Personal Loan",
      amount: "₹5 Lakh",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&auto=format",
    },
  ];

  // Format items for CircularGallery
  const galleryItems = testimonials.map((t) => ({
    image: t.image,
    text: `"${t.quote.substring(0, 80)}..." — ${t.name}, ${t.role}`,
  }));

  return (
    <section className="py-20 md:py-28 section-gradient overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about their experience with PRYME
          </p>
        </div>

        {/* Circular Gallery */}
        <div className="h-[400px] md:h-[500px] w-full max-w-6xl mx-auto">
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="hsl(var(--foreground))"
            borderRadius={0.08}
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-8 mt-12">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-trust text-trust" />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">4.9/5</span>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">10,000+</span> Happy Customers
          </div>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <div className="text-sm text-muted-foreground hidden sm:block">
            <span className="font-semibold text-foreground">₹500Cr+</span> Loans Disbursed
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
