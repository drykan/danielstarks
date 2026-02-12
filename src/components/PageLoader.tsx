import { motion, useReducedMotion } from "framer-motion";

type Props = {
  label?: string;
};

export default function PageLoader({ label = "Loading…" }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="pointer-events-none absolute inset-0 grid place-items-center bg-cream/70">
        <div className="rounded-xl bg-cream px-4 py-3 text-sm font-semibold">
          {label}
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center bg-cream/70">
      <div className="rounded-2xl bg-cream px-6 py-5 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Fun orbit loader */}
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 rounded-full opacity-70" />
            <motion.div
              className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-accent"
              style={{ x: "-50%", y: "-50%" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            >
              {/* offset dot from center by translating inside a rotating container */}
              <div className="h-2.5 w-2.5 -translate-y-5 rounded-full bg-accent" />
            </motion.div>
          </div>

          {/* Text */}
          <div className="leading-tight">
            <div className="text-sm font-semibold text-accent">Loading</div>
            <div className="text-xs opacity-70">Swapping pages…</div>
          </div>
        </div>
      </div>
    </div>
  );
}