import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const PLACEHOLDERS = [
  "I need a personal loan of ₹5 lakhs...",
  "Compare home loan rates from SBI...",
  "What's my EMI for ₹20 lakhs?",
  "Business loan with lowest interest...",
  "Loan against property in Mumbai...",
];

const SmartInput = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (isFocused && query) return; // pause when user is typing

    const current = PLACEHOLDERS[placeholderIdx];
    const speed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setPlaceholderText(current.slice(0, charIdx + 1));
        if (charIdx + 1 >= current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setPlaceholderText(current.slice(0, charIdx));
        if (charIdx <= 0) {
          setIsDeleting(false);
          setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, placeholderIdx, isFocused, query]);

  // Magnetic spotlight
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/apply?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/apply");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative group"
      >
        {/* Spotlight border */}
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(120px circle at ${spotlightPos.x}px ${spotlightPos.y}px, hsl(var(--primary) / 0.5), transparent 70%)`,
          }}
        />

        {/* Glow on focus */}
        <div
          className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-300 pointer-events-none ${
            isFocused ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--trust) / 0.3), hsl(var(--primary) / 0.4))`,
          }}
        />

        {/* Input container */}
        <div className="relative flex items-center bg-card border border-border rounded-2xl px-4 py-3 md:px-5 md:py-4 shadow-elevated-lg backdrop-blur-sm">
          <Search className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholderText + (isFocused || query ? "" : "|")}
            aria-label="Search for loans, compare rates, or calculate EMI"
            className="flex-1 bg-transparent text-foreground text-base md:text-lg outline-none placeholder:text-muted-foreground/60"
          />
          <button
            type="submit"
            aria-label="Search loans"
            className="shrink-0 ml-2 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-sm"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
          {["Personal Loan", "Home Loan", "EMI Calculator", "Business Loan"].map(
            (tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setQuery(tag);
                  inputRef.current?.focus();
                }}
                className="px-3 py-1 text-xs font-medium text-muted-foreground bg-muted/50 border border-border/50 rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>
    </motion.form>
  );
};

export default SmartInput;
