import { useState, useEffect, useRef, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, User, LogOut, Settings, ChevronDown, Calculator, Home, Briefcase, Building2, Wallet, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import prymeLogo from "@/assets/pryme-logo.png";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_PHONE = "1800-309-4001";
const CONTACT_PHONE_LINK = "tel:18003094001";

const productLinks = [
  { href: "/apply?type=personal", label: "Personal Loan", icon: Wallet, description: "Quick approval, minimal docs" },
  { href: "/apply?type=business", label: "Business Loan", icon: Briefcase, description: "Fuel your business growth" },
  { href: "/apply?type=home", label: "Home Loan", icon: Home, description: "Make your dream home real" },
  { href: "/apply?type=lap", label: "Loan Against Property", icon: Building2, description: "Unlock your property value" },
];

const toolLinks = [
  { href: "/apply#emi-calculator", label: "EMI Calculator", icon: Calculator, description: "Calculate your monthly EMI" },
  { href: "/apply#rewards", label: "Rewards Calculator", icon: Gift, description: "Discover your reward tier" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Compare Loans" },
  { href: "/dashboard", label: "Track Application" },
];

// Mobile menu drawer
const MobileMenu = memo(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  return (
    <div className={cn("lg:hidden fixed inset-0 z-50 transition-all duration-300", isOpen ? "visible" : "invisible")}>
      <div
        className={cn("absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <div className={cn("absolute right-0 top-0 h-full w-[300px] bg-card border-l border-border shadow-xl transition-transform duration-300", isOpen ? "translate-x-0" : "translate-x-full")}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-semibold text-foreground">Menu</span>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted/50">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-64px)]">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Products</p>
            <div className="space-y-1">
              {productLinks.map((item) => (
                <Link key={item.href} to={item.href} onClick={onClose} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Tools</p>
            <div className="space-y-1">
              {toolLinks.map((item) => (
                <Link key={item.href} to={item.href} onClick={onClose} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-trust/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-trust-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Navigate</p>
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} onClick={onClose} className={cn("block p-3 rounded-lg text-sm font-medium transition-all", isActive(link.href) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50")}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            {user ? (
              <div className="space-y-2">
                <Link to="/dashboard" onClick={onClose} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">My Dashboard</span>
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={onClose} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm font-medium">Admin Panel</span>
                  </Link>
                )}
                <button onClick={handleSignOut} className="flex items-center gap-3 p-3 rounded-lg text-destructive hover:bg-destructive/10 w-full">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button asChild variant="primary" className="w-full">
                  <Link to="/auth?mode=signup" onClick={onClose}>Get Started</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/auth" onClick={onClose}>Sign In</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="pt-4 border-t border-border">
            <a href={CONTACT_PHONE_LINK} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{CONTACT_PHONE}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
MobileMenu.displayName = "MobileMenu";

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === "/";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // GSAP-powered glassmorphism & logo dock
  useEffect(() => {
    if (!headerRef.current || !logoRef.current) return;

    const ctx = gsap.context(() => {
      // On homepage: logo starts invisible (it's in the hero), fades in on scroll
      if (isHomePage) {
        gsap.set(logoRef.current, { opacity: 0, scale: 0.6, rotateY: -15 });

        ScrollTrigger.create({
          trigger: "body",
          start: "top top",
          end: "+=200",
          scrub: 0.3,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(logoRef.current, {
              opacity: p,
              scale: 0.6 + p * 0.4,
              rotateY: -15 + p * 15,
            });
            // Glassmorphism intensity
            gsap.set(headerRef.current, {
              backdropFilter: `blur(${p * 20}px) saturate(${100 + p * 80}%)`,
              borderBottomColor: `hsla(214, 32%, 85%, ${p * 0.5})`,
              backgroundColor: `hsla(210, 20%, 98%, ${p * 0.9})`,
            });
            // Noise overlay opacity
            if (noiseRef.current) {
              gsap.set(noiseRef.current, { opacity: p * 0.04 });
            }
          },
        });
      } else {
        // Non-homepage: standard glassmorphism on scroll
        gsap.set(logoRef.current, { opacity: 1, scale: 1, rotateY: 0 });
        ScrollTrigger.create({
          trigger: "body",
          start: "20px top",
          onEnter: () => {
            gsap.to(headerRef.current, {
              backdropFilter: "blur(20px) saturate(180%)",
              backgroundColor: "hsla(210, 20%, 98%, 0.9)",
              borderBottomColor: "hsla(214, 32%, 85%, 0.5)",
              duration: 0.3,
            });
          },
          onLeaveBack: () => {
            gsap.to(headerRef.current, {
              backdropFilter: "blur(0px) saturate(100%)",
              backgroundColor: "transparent",
              borderBottomColor: "transparent",
              duration: 0.3,
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, [isHomePage]);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-transparent border-b border-transparent"
        style={{ willChange: "backdrop-filter, background-color" }}
      >
        {/* Dynamic noise overlay */}
        <div
          ref={noiseRef}
          className="absolute inset-0 pointer-events-none opacity-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        <div className="container relative mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center group" style={{ perspective: "600px" }}>
              <img
                ref={logoRef}
                src={prymeLogo}
                alt="PRYME"
                className="h-11 md:h-12 w-auto object-contain will-change-transform mix-blend-multiply"
                style={{ transformStyle: "preserve-3d" }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-9 px-4 text-sm font-medium text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted/50">
                      Products
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[500px] p-4 bg-card border border-border rounded-xl shadow-lg">
                        <div className="grid grid-cols-2 gap-2">
                          {productLinks.map((item) => (
                            <Link key={item.href} to={item.href} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                <item.icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">{item.label}</p>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-9 px-4 text-sm font-medium text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted/50">
                      Tools
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[300px] p-4 bg-card border border-border rounded-xl shadow-lg">
                        <div className="space-y-2">
                          {toolLinks.map((item) => (
                            <Link key={item.href} to={item.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                              <div className="w-9 h-9 rounded-lg bg-trust/10 flex items-center justify-center shrink-0 group-hover:bg-trust/20 transition-colors">
                                <item.icon className="w-4 h-4 text-trust-foreground" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">{item.label}</p>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(link.href) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary font-medium"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href={CONTACT_PHONE_LINK} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-muted/50">
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">{CONTACT_PHONE}</span>
              </a>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 bg-muted/50 hover:bg-muted">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="max-w-[100px] truncate text-sm">{user.email?.split("@")[0]}</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-card border-border shadow-lg">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        <User className="w-4 h-4 mr-2" />My Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">
                          <Settings className="w-4 h-4 mr-2" />Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-3">
                  <Button asChild variant="ghost" size="sm" className="font-medium">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button asChild variant="primary" size="sm" className="focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
                    <Link to="/auth?mode=signup">Get Started</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-all" aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
});

Header.displayName = "Header";
export default Header;
