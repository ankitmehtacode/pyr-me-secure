import { Shield, Lock, Key, Eye } from "lucide-react";

const TrustMonologue = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Volatile Memory Processing",
      description: "Your data exists only in temporary memory during processing",
    },
    {
      icon: Key,
      title: "Cryptographic Shredding",
      description: "All data is cryptographically destroyed post-session",
    },
    {
      icon: Eye,
      title: "Zero Visibility Architecture",
      description: "We cannot see your data — by design, not policy",
    },
    {
      icon: Shield,
      title: "Bank-Grade Encryption",
      description: "256-bit AES encryption for all transmissions",
    },
  ];

  return (
    <section className="py-20 md:py-28 trust-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Monologue */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-4">
              Our Promise
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight mb-8">
              Why Trust Us?
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="font-display text-lg md:text-xl text-muted-foreground leading-relaxed italic">
                "In an age of digital noise, we engineer silence. Your data is transient, 
                processed in volatile memory, and cryptographically shredded post-session. 
                We are the fortress for your financial future."
              </p>
            </div>
          </div>

          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 bg-card rounded-xl border border-border shadow-sm card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustMonologue;
