import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginData = z.infer<typeof loginSchema>;
type SignupData = z.infer<typeof signupSchema>;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, user, isLoading: authLoading } = useAuth();

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const signupForm = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard");
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (data: LoginData) => {
    setIsLoading(true);
    const { error } = await signIn(data.email, data.password);
    setIsLoading(false);

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
    navigate("/dashboard");
  };

  const handleSignup = async (data: SignupData) => {
    setIsLoading(true);
    const { error } = await signUp(data.email, data.password, data.fullName);
    setIsLoading(false);

    if (error) {
      let message = error.message;
      if (error.message.includes("already registered")) {
        message = "This email is already registered. Please login instead.";
      }
      toast({
        title: "Signup Failed",
        description: message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Account Created!",
      description: "Welcome to PYRME Consulting. You can now access your dashboard.",
    });
    navigate("/dashboard");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Login" : "Sign Up"} - PYRME Consulting</title>
        <meta name="description" content="Login or sign up to access your PYRME Consulting dashboard." />
      </Helmet>

      <div className="min-h-screen flex bg-background">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 hero-gradient items-center justify-center p-12">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl neo-card flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">PYRME</h1>
                <p className="text-sm text-muted-foreground">CONSULTING</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Compare Loans. Save Money. Get Funded.
            </h2>
            <p className="text-muted-foreground mb-8">
              Access exclusive loan offers from 15+ partner banks. Compare rates, track applications, and get personalized assistance.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 neo-card-inset p-4 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <span className="text-foreground">Compare offers from multiple banks</span>
              </div>
              <div className="flex items-center gap-3 neo-card-inset p-4 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <span className="text-foreground">Track your application status</span>
              </div>
              <div className="flex items-center gap-3 neo-card-inset p-4 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                <span className="text-foreground">Get personalized RM support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
              <div className="w-10 h-10 rounded-xl neo-card flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">PYRME</h1>
                <p className="text-xs text-muted-foreground">CONSULTING</p>
              </div>
            </div>

            <div className="neo-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                {isLogin
                  ? "Enter your credentials to access your account"
                  : "Sign up to start comparing loan offers"}
              </p>

              {/* Toggle */}
              <div className="flex neo-card-inset rounded-xl p-1 mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                    isLogin ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                    !isLogin ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Sign Up
                </button>
              </div>

              {isLogin ? (
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Email</Label>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="neo-input border-0 pl-10"
                        {...loginForm.register("email")}
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="text-xs text-destructive">{loginForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Password</Label>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="neo-input border-0 pl-10"
                        {...loginForm.register("password")}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-xs text-destructive">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full neo-button border-0 bg-primary hover:bg-primary/90" size="lg">
                    {isLoading ? "Signing in..." : "Sign In"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              ) : (
                <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Full Name</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="John Doe"
                        className="neo-input border-0 pl-10"
                        {...signupForm.register("fullName")}
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                    {signupForm.formState.errors.fullName && (
                      <p className="text-xs text-destructive">{signupForm.formState.errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Email</Label>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="neo-input border-0 pl-10"
                        {...signupForm.register("email")}
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                    {signupForm.formState.errors.email && (
                      <p className="text-xs text-destructive">{signupForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Password</Label>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="neo-input border-0 pl-10"
                        {...signupForm.register("password")}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                    {signupForm.formState.errors.password && (
                      <p className="text-xs text-destructive">{signupForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="neo-input border-0 pl-10"
                        {...signupForm.register("confirmPassword")}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                    {signupForm.formState.errors.confirmPassword && (
                      <p className="text-xs text-destructive">{signupForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full neo-button border-0 bg-primary hover:bg-primary/90" size="lg">
                    {isLoading ? "Creating account..." : "Create Account"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
