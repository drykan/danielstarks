import * as React from "react";
import TimelineItem from "../components/experience/TimelineItem";
import { experienceData } from "../data/experienceData";

const RAIL_LEFT = "1.25rem";

export default function Experience() {
  const nodeMap = React.useRef<Record<string, HTMLDivElement | null>>({});

  // Active = which dot should be orange
  const [activeId, setActiveId] = React.useState<string>(experienceData[0]?.id ?? "");
  const [selected, setSelected] = React.useState<string>(experienceData[0]?.id ?? "");

  console.log("Active Selection => ", selected)

  // programmatically scroll (dropdown/dot click), prevent in-view updates from fighting it.
  const ignoreInViewUntilRef = React.useRef<number>(0);

  const register = React.useCallback((id: string, el: HTMLDivElement | null) => {
    nodeMap.current[id] = el;
  }, []);

  const jumpOptions = React.useMemo(
    () =>
      experienceData.map((x) => ({
        id: x.id,
        label: `${x.yearStart} — ${x.company}`,
      })),
    []
  );

  const jumpTo = React.useCallback((id: string) => {
    const el = nodeMap.current[id];
    if (!el) return;

    // Mark a short window where observer updates won't override the chosen active item
    ignoreInViewUntilRef.current = Date.now() + 900;

    // Update UI immediately
    setActiveId(id);
    setSelected(id);

    // Smooth scroll
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Focus for keyboard users
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }, []);

  const onSelectJump = (id: string) => {
    jumpTo(id);
  };

  const onItemInView = React.useCallback((id: string) => {
    if (Date.now() < ignoreInViewUntilRef.current) return;
  }, []);

  return (
    <section className="p-6 sm:p-10">
      <div className="mx-auto max-w-4xl">
        {/* Sticky Header */}
        <div className="sticky z-30 -mx-6 sm:-mx-10 px-6 sm:px-10 py-4 border-b border-border bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80 top-14 sm:top-0">
          <div className="mx-auto max-w-4xl flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Experience</h1>
              <p className="mt-2 max-w-2xl opacity-85">
                Reverse-chronological timeline of roles and impact.
              </p>
            </div>

            <div className="w-full sm:w-auto">
              <label className="block text-sm font-semibold opacity-90" htmlFor="jump">
                Jump to year/company
              </label>
              <select
                id="jump"
                className="mt-2 w-full sm:w-72 rounded-md border border-border bg-cream px-3 py-2 text-sm"
                value={selected}
                onChange={(e) => onSelectJump(e.target.value)}
              >
                {jumpOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-10">
          {/* Rail line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-border"
            style={{ left: RAIL_LEFT }}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {experienceData.map((item) => (
              <TimelineItem
                key={item.id}
                item={item}
                railLeft={RAIL_LEFT}
                isActive={activeId === item.id}
                onDotClick={jumpTo}
                onRegister={register}
                onInView={onItemInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}