import { memo, useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import cashNote from "@/assets/cash-note.png";

gsap.registerPlugin();

interface CashBill {
  id: number;
  x: number;
  y: number;
  rotation: number;
  rotateX: number;
  rotateY: number;
  scale: number;
  delay: number;
  duration: number;
}

const generateBills = (count: number): CashBill[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -20 - Math.random() * 60,
    rotation: Math.random() * 360 - 180,
    rotateX: Math.random() * 40 - 20,
    rotateY: Math.random() * 40 - 20,
    scale: 0.5 + Math.random() * 0.7,
    delay: Math.random() * 0.8,
    duration: 1.2 + Math.random() * 1,
  }));

const BILLS = generateBills(18);

const SplashScreen = memo(({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const [phase, setPhase] = useState<"cash" | "text" | "exit">("cash");

  // Cash phase → text phase
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 1800);
    return () => clearTimeout(t1);
  }, []);

  // Text animation with GSAP SplitType
  useGSAP(
    () => {
      if (phase !== "text" || !headlineRef.current || !subRef.current) return;

      const split = new SplitType(headlineRef.current, { types: "chars" });

      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setPhase("exit"), 1200);
        },
      });

      tl.from(split.chars, {
        y: 80,
        opacity: 0,
        rotateX: -90,
        stagger: 0.04,
        duration: 0.7,
        ease: "back.out(1.7)",
      }).from(
        subRef.current,
        { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

      return () => split.revert();
    },
    { scope: containerRef, dependencies: [phase] }
  );

  // Exit → complete
  useEffect(() => {
    if (phase === "exit") {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          ref={containerRef}
          key="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 50% 40%, hsl(148 40% 8%), hsl(0 0% 3%))",
          }}
        >
          {/* Cash rain */}
          {BILLS.map((bill) => (
            <motion.img
              key={bill.id}
              src={cashNote}
              alt=""
              className="absolute pointer-events-none"
              style={{
                width: `${bill.scale * 140}px`,
                left: `${bill.x}%`,
                perspective: "600px",
                transformStyle: "preserve-3d",
              }}
              initial={{
                y: `${bill.y}vh`,
                rotate: bill.rotation,
                rotateX: bill.rotateX,
                rotateY: bill.rotateY,
                opacity: 0,
                scale: bill.scale,
              }}
              animate={{
                y: "110vh",
                rotate: bill.rotation + (Math.random() > 0.5 ? 180 : -180),
                rotateX: bill.rotateX + 30,
                rotateY: bill.rotateY - 20,
                opacity: [0, 1, 1, 0.6],
                scale: bill.scale,
              }}
              transition={{
                duration: bill.duration,
                delay: bill.delay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          ))}

          {/* Glowing center flare */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
            style={{ background: "hsl(148 62% 42%)" }}
          />

          {/* Text reveal */}
          {phase === "text" && (
            <div className="relative z-10 text-center px-6">
              <h1
                ref={headlineRef}
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4"
                style={{
                  letterSpacing: "-0.04em",
                  lineHeight: "1.1",
                  color: "white",
                  perspective: "800px",
                }}
              >
                Get Loans with PRYME
              </h1>
              <p
                ref={subRef}
                className="text-lg md:text-xl font-medium opacity-0"
                style={{ color: "hsl(148 62% 55%)" }}
              >
                Your trusted consulting partner
              </p>
            </div>
          )}
        </motion.div>
      ) : (
        /* Fade-out overlay */
        <motion.div
          key="fade"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{ background: "hsl(0 0% 3%)" }}
        />
      )}
    </AnimatePresence>
  );
});

SplashScreen.displayName = "SplashScreen";
export default SplashScreen;
