import * as React from "react";
import TimelineItem from "../components/experience/TimelineItem";
import { experienceData } from "../data/experienceData";
import PageHeader from "../components/PageHeader";

const RAIL_LEFT = "1.25rem";

export default function Experience() {
  const nodeMap = React.useRef<Record<string, HTMLDivElement | null>>({});

  // Active = which dot should be orange
  const [activeId, setActiveId] = React.useState<string>(experienceData[0]?.id ?? "");
  const [selected, setSelected] = React.useState<string>(experienceData[0]?.id ?? "");

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

    ignoreInViewUntilRef.current = Date.now() + 900;

    setActiveId(id);
    setSelected(id);

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }, []);

  const onSelectJump = (id: string) => {
    jumpTo(id);
  };

  const onItemInView = React.useCallback((id: string) => {
    if (Date.now() < ignoreInViewUntilRef.current) return;
  }, []);

  const JumpSelect = ({ id }: { id: string }) => (
    <div className="w-full sm:w-auto">
      <label className="block text-sm font-semibold opacity-90" htmlFor={id}>
        Jump to year/company
      </label>
      <select
        id={id}
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
  );

  return (
    <section className="p-6 sm:p-10">
      <div className="mx-auto max-w-4xl">
        <PageHeader
          title="Experience"
          description="Reverse-chronological timeline of roles and impact."
          // Desktop dropdown goes in the header-right (desktop only)
          right={
            <div className="hidden sm:block">
              <JumpSelect id="jump" />
            </div>
          }
          // Mobile dropdown lives ONLY in the collapsible
          mobileCollapsibleLabel="Jump to"
          mobileCollapsible={<JumpSelect id="jump-mobile" />}
        />

        {/* Timeline */}
        <div className="relative mt-10">
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