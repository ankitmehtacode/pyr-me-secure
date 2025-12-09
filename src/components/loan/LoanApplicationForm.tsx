import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Briefcase, CheckCircle, XCircle, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// Validation schemas
const personalInfoSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please verify the PAN format to ensure encryption standards"),
  dob: z.string().min(1, "Date of birth is required"),
});

const financialInfoSchema = z.object({
  employmentType: z.string().min(1, "Employment type is required"),
  monthlyIncome: z.number().min(15000, "Minimum income requirement is ₹15,000"),
  loanAmount: z.number().min(100000, "Minimum loan amount is ₹1,00,000").max(5000000, "Maximum loan amount is ₹50,00,000"),
  loanPurpose: z.string().min(1, "Loan purpose is required"),
  existingEMI: z.number().min(0, "EMI cannot be negative"),
});

type PersonalInfo = z.infer<typeof personalInfoSchema>;
type FinancialInfo = z.infer<typeof financialInfoSchema>;

interface LoanApplicationFormProps {
  onAmountChange?: (amount: number) => void;
}

const LoanApplicationForm = ({ onAmountChange }: LoanApplicationFormProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const personalForm = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
  });

  const financialForm = useForm<FinancialInfo>({
    resolver: zodResolver(financialInfoSchema),
    mode: "onChange",
    defaultValues: {
      monthlyIncome: 50000,
      loanAmount: 500000,
      existingEMI: 0,
    },
  });

  const handlePersonalSubmit = (data: PersonalInfo) => {
    setStep(2);
  };

  const handleFinancialSubmit = async (data: FinancialInfo) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    toast({
      title: "Application Submitted Successfully",
      description: "Your loan application has been received. We'll contact you within 24 hours.",
    });
    setStep(3);
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Financial Details", icon: Briefcase },
    { number: 3, title: "Review", icon: CheckCircle },
  ];

  const InputWithValidation = ({
    label,
    error,
    isValid,
    isSecure,
    ...props
  }: {
    label: string;
    error?: string;
    isValid?: boolean;
    isSecure?: boolean;
  } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="relative">
        <Input
          {...props}
          className={cn(
            "pr-10 input-secure",
            error && "border-destructive focus:ring-destructive",
            isValid && "border-success focus:ring-success"
          )}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isSecure && <Lock className="w-4 h-4 text-muted-foreground" />}
          {error && <XCircle className="w-4 h-4 text-destructive" />}
          {isValid && !error && <CheckCircle className="w-4 h-4 text-success" />}
        </div>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm">
      {/* Progress Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                  step >= s.number
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                )}
              >
                {step > s.number ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <s.icon className="w-5 h-5" />
                )}
              </div>
              <span
                className={cn(
                  "ml-3 text-sm font-medium hidden sm:block",
                  step >= s.number ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s.title}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-12 sm:w-20 h-0.5 mx-4",
                    step > s.number ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {step === 1 && (
          <form onSubmit={personalForm.handleSubmit(handlePersonalSubmit)} className="space-y-5">
            <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
            
            <InputWithValidation
              label="Full Name (as per PAN)"
              placeholder="Enter your full name"
              isSecure
              isValid={personalForm.formState.dirtyFields.fullName && !personalForm.formState.errors.fullName}
              error={personalForm.formState.errors.fullName?.message}
              {...personalForm.register("fullName")}
            />

            <InputWithValidation
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              isValid={personalForm.formState.dirtyFields.email && !personalForm.formState.errors.email}
              error={personalForm.formState.errors.email?.message}
              {...personalForm.register("email")}
            />

            <InputWithValidation
              label="Mobile Number"
              type="tel"
              placeholder="10-digit mobile number"
              isSecure
              isValid={personalForm.formState.dirtyFields.phone && !personalForm.formState.errors.phone}
              error={personalForm.formState.errors.phone?.message}
              {...personalForm.register("phone")}
            />

            <InputWithValidation
              label="PAN Number"
              placeholder="ABCDE1234F"
              isSecure
              isValid={personalForm.formState.dirtyFields.pan && !personalForm.formState.errors.pan}
              error={personalForm.formState.errors.pan?.message}
              {...personalForm.register("pan", { 
                onChange: (e) => e.target.value = e.target.value.toUpperCase() 
              })}
            />

            <InputWithValidation
              label="Date of Birth"
              type="date"
              isSecure
              isValid={personalForm.formState.dirtyFields.dob && !personalForm.formState.errors.dob}
              error={personalForm.formState.errors.dob?.message}
              {...personalForm.register("dob")}
            />

            <Button type="submit" className="w-full" size="lg">
              Continue to Financial Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={financialForm.handleSubmit(handleFinancialSubmit)} className="space-y-5">
            <h3 className="text-lg font-semibold text-foreground mb-4">Financial Details</h3>

            <div className="space-y-2">
              <Label>Employment Type</Label>
              <Select onValueChange={(v) => financialForm.setValue("employmentType", v)}>
                <SelectTrigger className="input-secure">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salaried">Salaried</SelectItem>
                  <SelectItem value="self-employed">Self Employed</SelectItem>
                  <SelectItem value="business">Business Owner</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
              {financialForm.formState.errors.employmentType && (
                <p className="text-xs text-destructive">{financialForm.formState.errors.employmentType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Monthly Income (₹)</Label>
              <Input
                type="number"
                placeholder="50000"
                className="input-secure"
                {...financialForm.register("monthlyIncome", { valueAsNumber: true })}
              />
              {financialForm.formState.errors.monthlyIncome && (
                <p className="text-xs text-destructive">{financialForm.formState.errors.monthlyIncome.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Loan Amount Required (₹)</Label>
              <Input
                type="number"
                placeholder="500000"
                className="input-secure"
                {...financialForm.register("loanAmount", { 
                  valueAsNumber: true,
                  onChange: (e) => onAmountChange?.(parseInt(e.target.value) || 0)
                })}
              />
              {financialForm.formState.errors.loanAmount && (
                <p className="text-xs text-destructive">{financialForm.formState.errors.loanAmount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Purpose of Loan</Label>
              <Select onValueChange={(v) => financialForm.setValue("loanPurpose", v)}>
                <SelectTrigger className="input-secure">
                  <SelectValue placeholder="Select loan purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal Use</SelectItem>
                  <SelectItem value="medical">Medical Emergency</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="home-renovation">Home Renovation</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                </SelectContent>
              </Select>
              {financialForm.formState.errors.loanPurpose && (
                <p className="text-xs text-destructive">{financialForm.formState.errors.loanPurpose.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Existing Monthly EMIs (₹)</Label>
              <Input
                type="number"
                placeholder="0"
                className="input-secure"
                {...financialForm.register("existingEMI", { valueAsNumber: true })}
              />
              {financialForm.formState.errors.existingEMI && (
                <p className="text-xs text-destructive">{financialForm.formState.errors.existingEMI.message}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Submitting..." : "Submit Application"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Application Submitted!</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Your loan application has been received. Our team will review your application and contact you within 24 hours.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm">
              <span className="text-muted-foreground">Application ID:</span>
              <span className="font-mono font-semibold text-foreground">PYR-{Date.now().toString().slice(-8)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Security Footer */}
      <div className="px-6 py-4 bg-muted/50 border-t border-border rounded-b-xl">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="w-3 h-3" />
          <span>Your data is encrypted with 256-bit SSL and processed securely</span>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationForm;
