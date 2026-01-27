import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentSlide + i + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  return (
    <section className="py-20 md:py-28 section-gradient overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
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

        {/* Slider */}
        <div className="relative max-w-6xl mx-auto">
          {/* Cards Container */}
          <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
            {getVisibleTestimonials().map((testimonial) => (
              <div
                key={`${testimonial.id}-${testimonial.position}`}
                className={`absolute w-full max-w-lg transition-all duration-500 ease-out ${
                  testimonial.position === 0
                    ? "opacity-100 scale-100 z-20 translate-x-0"
                    : testimonial.position === -1
                    ? "opacity-40 scale-90 z-10 -translate-x-[60%] hidden md:block"
                    : "opacity-40 scale-90 z-10 translate-x-[60%] hidden md:block"
                }`}
              >
                <div className="bg-card rounded-xl border border-border p-8 mx-4 shadow-elevated">
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-trust text-trust" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground text-lg leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar with ring-2 ring-white separator */}
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-white shadow-sm">
                        <span className="text-sm font-bold text-primary">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} • {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-primary">{testimonial.loanType}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.amount}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-border hover:bg-muted"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentSlide(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-primary w-8" : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border-border hover:bg-muted"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
