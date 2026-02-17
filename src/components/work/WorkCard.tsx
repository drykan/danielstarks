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

  // zoom / pan
  const [zoomed, setZoomed] = React.useState(false);
  const [scale, setScale] = React.useState(2);
  const [panKey, setPanKey] = React.useState(0); // remount to reset drag position

  const total = images.length;
  const src = images[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // Measure viewport for numeric drag constraints
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const [vp, setVp] = React.useState({ w: 0, h: 0 });

  React.useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setVp({ w: r.width, h: r.height });
    });

    ro.observe(el);

    // initialize immediately
    const r = el.getBoundingClientRect();
    setVp({ w: r.width, h: r.height });

    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    setIndex(0);
  }, [total]);

  // loader on slide change
  React.useEffect(() => {
    setStatus("loading");
    setZoomed(false);
    setScale(2);
    setPanKey((k) => k + 1);
  }, [src]);

  // Esc to exit zoom
  React.useEffect(() => {
    if (!zoomed) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomed(false);
        setScale(2);
        setPanKey((k) => k + 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomed]);

  const canZoom = status === "loaded";

  const toggleZoom = () => {
    if (!canZoom) return;
    setZoomed((z) => !z);
    setScale((s) => (zoomed ? 2 : s)); // when exiting, reset scale
    setPanKey((k) => k + 1);
  };

  const zoomIn = () => {
    if (!canZoom) return;
    setZoomed(true);
    setScale((s) => Math.min(4, Number((s + 0.5).toFixed(2))));
  };

  const zoomOut = () => {
    if (!canZoom) return;
    setScale((s) => {
      const nextScale = Math.max(1, Number((s - 0.5).toFixed(2)));
      if (nextScale <= 1) {
        setZoomed(false);
        // optional: reset to default for next zoom session
        return 2;
      }
      return nextScale;
    });
  };

  // Numeric constraints based on scale + viewport
  const rangeX = zoomed ? Math.max(0, ((scale - 1) * vp.w) / 2) : 0;
  const rangeY = zoomed ? Math.max(0, ((scale - 1) * vp.h) / 2) : 0;

  return (
    <div className="mt-4">
      <div className="relative overflow-hidden rounded-xl border border-border bg-cream">
        <div
          ref={viewportRef}
          className="relative w-full h-[clamp(14rem,40vh,26rem)] overflow-hidden"
        >
          {/* Image (drag the transform reliably with numeric constraints) */}
          <motion.img
            key={`${src}-${panKey}`}
            src={src}
            alt={`${title} — image ${index + 1} of ${total}`}
            className={[
              "absolute inset-0 h-full w-full",
              "object-contain",
              zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
            ].join(" ")}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
            onDoubleClick={toggleZoom}
            style={{ touchAction: zoomed ? "none" : "auto" }}
            animate={{ scale: zoomed ? scale : 1 }}
            transition={
              reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28 }
            }
            drag={zoomed}
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={{
              left: -rangeX,
              right: rangeX,
              top: -rangeY,
              bottom: rangeY,
            }}
          />

          {/* Skeleton overlay fades out after load */}
          <AnimatePresence initial={false}>
            {status !== "loaded" && (
              <motion.div
                key="skeleton"
                className="pointer-events-none absolute inset-0 bg-muted"
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

          {/* Zoom controls (only when loaded) */}
          {status === "loaded" && (
            <div className="absolute right-2 top-2 flex items-center gap-2">
              {!zoomed ? (
                <button
                  type="button"
                  onClick={toggleZoom}
                  className="rounded-md border border-border bg-cream/90 px-3 py-1 text-xs font-semibold backdrop-blur hover:bg-muted"
                  aria-label="Zoom image"
                  title="Zoom (double-click image also works)"
                >
                  Zoom
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={zoomOut}
                    className="rounded-md border border-border bg-cream/90 px-3 py-1 text-xs font-semibold backdrop-blur hover:bg-muted"
                    aria-label="Zoom out"
                    title="Zoom out"
                  >
                    −
                  </button>

                  <button
                    type="button"
                    onClick={zoomIn}
                    className="rounded-md border border-border bg-cream/90 px-3 py-1 text-xs font-semibold backdrop-blur hover:bg-muted"
                    aria-label="Zoom in"
                    title="Zoom in"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={toggleZoom}
                    className="rounded-md border border-border bg-cream/90 px-3 py-1 text-xs font-semibold backdrop-blur hover:bg-muted"
                    aria-label="Exit zoom"
                    title="Exit zoom (Esc)"
                  >
                    Exit
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Carousel arrows */}
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

      {/* Dots */}
      {total > 1 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {images.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={[
                  "h-2.5 w-2.5 rounded-full border",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
                  active ? "bg-accent border-accent" : "bg-cream border-border hover:bg-muted",
                ].join(" ")}
                aria-label={`Go to image ${i + 1}`}
                aria-current={active ? "true" : undefined}
              />
            );
          })}
          <div className="ml-2 text-xs opacity-70">
            {index + 1} / {total}
          </div>
        </div>
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