import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, EyeOff, Fingerprint, Smartphone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Login - PYRME Consulting</title>
        <meta name="description" content="Securely login to your PYRME Consulting account to manage your loan applications." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 flex items-center justify-center py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              {/* Logo/Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-xl bg-primary flex items-center justify-center mb-4 shadow-glow">
                  <Shield className="w-8 h-8 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
                <p className="text-muted-foreground">Sign in to manage your loan applications</p>
              </div>

              {/* Login Card */}
              <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <Tabs defaultValue="password" className="w-full">
                  <TabsList className="w-full grid grid-cols-2 rounded-none border-b border-border bg-muted/50">
                    <TabsTrigger value="password" className="rounded-none data-[state=active]:bg-card">
                      <Lock className="w-4 h-4 mr-2" />
                      Password
                    </TabsTrigger>
                    <TabsTrigger value="otp" className="rounded-none data-[state=active]:bg-card">
                      <Smartphone className="w-4 h-4 mr-2" />
                      OTP
                    </TabsTrigger>
                  </TabsList>

                  <div className="p-6">
                    <TabsContent value="password" className="mt-0">
                      <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                          <Label>Email or Phone</Label>
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="Enter email or phone number"
                              className="input-secure pr-10"
                            />
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Password</Label>
                            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                              Forgot password?
                            </Link>
                          </div>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="input-secure pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                          {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="otp" className="mt-0">
                      <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                          <Label>Mobile Number</Label>
                          <div className="relative">
                            <Input
                              type="tel"
                              placeholder="Enter 10-digit mobile number"
                              className="input-secure pr-10"
                            />
                            <Smartphone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                          {isLoading ? "Sending OTP..." : "Send OTP"}
                        </Button>
                      </form>
                    </TabsContent>

                    {/* Divider */}
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    {/* Biometric Login */}
                    <Button variant="outline" className="w-full" size="lg">
                      <Fingerprint className="w-5 h-5 mr-2" />
                      Biometric Login
                    </Button>
                  </div>
                </Tabs>

                {/* Security Footer */}
                <div className="px-6 py-4 bg-muted/50 border-t border-border">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Lock className="w-3 h-3" />
                    <span>Protected by 256-bit SSL encryption</span>
                  </div>
                </div>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{" "}
                <Link to="/apply" className="text-primary font-medium hover:underline">
                  Apply for a loan
                </Link>
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Login;
