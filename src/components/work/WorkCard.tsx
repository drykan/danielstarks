import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import type { WorkItem } from "../../data/workData";

type Props = {
  item: WorkItem;
  expanded: boolean;
  onToggle: () => void;
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold opacity-90">
      {children}
    </span>
  );
}

function Carousel({ images, title }: { images: string[]; title: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">("loading");

  const total = images.length;
  const src = images[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  React.useEffect(() => {
    setIndex(0);
  }, [total]);

  // Whenever the slide changes, show loader again until the new image loads
  React.useEffect(() => {
    setStatus("loading");
  }, [src]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-cream">
  <div className="relative w-full h-[clamp(14rem,40vh,26rem)]">
    {/* Image (always present; no opacity toggling = no flash) */}
    <img
      key={src}
      src={src}
      alt={`${title} — image ${index + 1} of ${total}`}
      className="h-full w-full object-contain"
      loading="lazy"
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("error")}
    />

    {/* Skeleton overlay fades out after image loads */}
    <AnimatePresence initial={false}>
      {status !== "loaded" && (
        <motion.div
          key="skeleton"
          className="absolute inset-0 bg-muted"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div className="h-full w-full animate-pulse bg-muted" />

          <div className="absolute bottom-3 right-3 rounded-md border border-border bg-cream/90 px-2 py-1 text-xs font-semibold backdrop-blur">
            {status === "error" ? "Failed to load" : "Loading…"}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>

  {total > 1 && (
    <>
      <button
        type="button"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-md border border-border bg-cream/90 p-2 backdrop-blur hover:bg-muted"
        aria-label="Previous image"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-border bg-cream/90 p-2 backdrop-blur hover:bg-muted"
        aria-label="Next image"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </>
  )}
</div>

  );
}


export default function WorkCard({ item, expanded, onToggle }: Props) {
  const reduce = useReducedMotion();

  const hero = item.images?.[0];

  return (
    <article className="rounded-2xl border border-border bg-cream">
      {/* Header Row */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left"
        aria-expanded={expanded}
      >
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
          {/* Image (hero) */}
          <div className="w-full sm:w-[18rem]">
            <div className="relative overflow-hidden rounded-xl border border-border bg-muted">
              <div className="aspect-[16/10] w-full">
                {hero ? (
                  <img
                    src={hero}
                    alt={`${item.title} preview`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-sm opacity-70">
                    Image placeholder
                  </div>
                )}
              </div>

              {item.images.length > 1 && (
                <div className="absolute bottom-2 right-2 rounded-md border border-border bg-cream/90 px-2 py-1 text-xs font-semibold backdrop-blur">
                  +{item.images.length - 1}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{item.title}</h2>
                {(item.year || item.role) && (
                  <div className="mt-1 text-sm opacity-75">
                    {item.year ? item.year : null}
                    {item.year && item.role ? " • " : null}
                    {item.role ? item.role : null}
                  </div>
                )}
              </div>

              <motion.span
                className="mt-1 inline-flex items-center justify-center rounded-md border border-border bg-cream p-2"
                animate={reduce ? undefined : { rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                aria-hidden="true"
              >
                <ChevronDown size={18} />
              </motion.span>
            </div>

            <p className="mt-3 leading-relaxed opacity-85">{item.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <div className="mt-3 text-xs opacity-70">
              {expanded ? "Click to collapse" : "Click to expand"}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded  Carousel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={reduce ? { height: "auto", opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="px-5 pb-5"
          >
            {item.images.length >= 1 && (
              <Carousel images={item.images} title={item.title} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}