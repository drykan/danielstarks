import * as React from "react";
import { useInViewOnce } from "../../lib/useInViewOnce";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";
import type { ExperienceItem } from "../../data/experienceData";

type Props = {
  item: ExperienceItem;
  railLeft: string; // shared x for line/dot
  isActive: boolean;
  onDotClick: (id: string) => void;
  onRegister?: (id: string, el: HTMLDivElement | null) => void;
  onInView?: (id: string) => void;
};

export default function TimelineItem({
  item,
  railLeft,
  isActive,
  onDotClick,
  onRegister,
  onInView,
}: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.35 });

  React.useEffect(() => {
    if (inView) onInView?.(item.id);
  }, [inView, item.id, onInView]);

  const setRefs = React.useCallback(
    (el: HTMLDivElement | null) => {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      onRegister?.(item.id, el);
    },
    [onRegister, item.id, ref]
  );

  const show = reducedMotion ? true : inView;

  return (
    <div
      ref={setRefs}
      className={[
        "relative pl-12",
        "scroll-mt-32",
        "transition-all duration-700",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
      data-experience-id={item.id}
    >
      {/* Dot button (centered on the rail) */}
      <button
        type="button"
        onClick={() => onDotClick(item.id)}
        className={[
          "absolute top-7 -translate-x-1/2",
          "h-4 w-4 rounded-full border",
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
          isActive
            ? "bg-accent border-accent"
            : "bg-cream border-border hover:bg-muted",
        ].join(" ")}
        style={{ left: railLeft }}
        aria-label={`Jump to ${item.company} (${item.dates})`}
        aria-current={isActive ? "true" : undefined}
      />

      <article className="rounded-xl border border-border bg-cream p-5">
        <header className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold tracking-tight">
            {item.title} <span className="opacity-70">|</span> {item.company}
          </h3>
          <div className="text-sm opacity-80">
            {item.location} • {item.dates}
          </div>
        </header>

        <p className="mt-4 leading-relaxed opacity-90">{item.summary}</p>
      </article>
    </div>
  );
}