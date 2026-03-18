import * as React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  title: string;
  description?: string;
  right?: React.ReactNode;

  /** Content that appears under the title/description (desktop) */
  children?: React.ReactNode;

  /** Optional: mobile-only collapsible content (e.g., filters, jump dropdown, contact links) */
  mobileCollapsibleLabel?: string;
  mobileCollapsible?: React.ReactNode;

  /** Optional: extra classes */
  className?: string;
};

export default function PageHeader({
  title,
  description,
  right,
  children,
  mobileCollapsibleLabel = "Options",
  mobileCollapsible,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const [open, setOpen] = React.useState(false);

  const hasMobileCollapsible = Boolean(mobileCollapsible);

  return (
    <div
      className={[
        // sticky only on desktop so it never fights the MobileHeader
        "sm:sticky sm:top-0 z-30",
        "border-b border-border bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80",
        "py-4",
        className ?? "",
      ].join(" ")}
    >
      <div className="mx-auto max-w-4xl">
        {/* Top row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h1>
            {description ? (
              <p className="mt-2 max-w-2xl opacity-85">{description}</p>
            ) : null}
          </div>

          {right ? <div>{right}</div> : null}
        </div>

        {/* Desktop inline area */}
        {children ? <div className="mt-4 hidden sm:block">{children}</div> : null}

        {/* Mobile collapsible (optional) */}
        {hasMobileCollapsible ? (
          <div className="mt-3 sm:hidden">
            <Collapsible.Root open={open} onOpenChange={setOpen}>
              <Collapsible.Trigger asChild>
                <button
                  type="button"
                  className={[
                    "w-full rounded-md border border-border bg-cream px-3 py-2 text-sm font-semibold",
                    "inline-flex items-center justify-between",
                    "hover:bg-muted",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
                  ].join(" ")}
                  aria-label={mobileCollapsibleLabel}
                >
                  <span>{mobileCollapsibleLabel}</span>
                  <motion.span
                    animate={reduce ? undefined : { rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    aria-hidden="true"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
              </Collapsible.Trigger>

              <AnimatePresence initial={false}>
                {open && (
                  <Collapsible.Content asChild forceMount>
                    <motion.div
                      initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={reduce ? { height: "auto", opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 rounded-xl border border-border bg-cream p-3">
                        {mobileCollapsible}
                      </div>
                    </motion.div>
                  </Collapsible.Content>
                )}
              </AnimatePresence>
            </Collapsible.Root>
          </div>
        ) : null}
      </div>
    </div>
  );
}