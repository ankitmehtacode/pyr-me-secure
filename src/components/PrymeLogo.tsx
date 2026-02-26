import { memo, forwardRef } from "react";

interface PrymeLogoProps {
  className?: string;
  style?: React.CSSProperties;
  showText?: boolean;
}

const PrymeLogo = memo(
  forwardRef<SVGSVGElement, PrymeLogoProps>(({ className, style, showText = true }, ref) => (
    <svg
      ref={ref}
      viewBox={showText ? "0 0 200 80" : "0 0 60 60"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="PRYME"
    >
      <defs>
        <linearGradient id="pryme-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(148, 62%, 42%)" />
          <stop offset="50%" stopColor="hsl(148, 55%, 48%)" />
          <stop offset="100%" stopColor="hsl(42, 85%, 55%)" />
        </linearGradient>
        <linearGradient id="pryme-gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(42, 85%, 50%)" />
          <stop offset="100%" stopColor="hsl(36, 90%, 55%)" />
        </linearGradient>
      </defs>

      {/* P icon mark */}
      <g>
        {/* Vertical bar of P */}
        <rect x="8" y="8" width="10" height="44" rx="5" fill="url(#pryme-grad)" />
        {/* Curve of P */}
        <path
          d="M18 8h14c11 0 20 9 20 20s-9 20-20 20H18V38h14c5.5 0 10-4.5 10-10s-4.5-10-10-10H18V8z"
          fill="url(#pryme-gold)"
        />
      </g>

      {/* PRYME text */}
      {showText && (
        <g>
          <text
            x="68"
            y="40"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="700"
            fontSize="28"
            letterSpacing="3"
            fill="currentColor"
          >
            PRYME
          </text>
        </g>
      )}
    </svg>
  ))
);

PrymeLogo.displayName = "PrymeLogo";
export default PrymeLogo;
