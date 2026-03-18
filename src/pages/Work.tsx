// src/pages/Work.tsx
import * as React from "react";
import WorkCard from "../components/work/WorkCard";
import { workData } from "../data/workData";
import PageHeader from "../components/PageHeader";

function uniqSorted(list: string[]) {
  return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b));
}

export default function Work() {
  const allTags = React.useMemo(() => {
    const tags = workData.flatMap((w) => w.tags);
    return uniqSorted(tags);
  }, []);

  const [activeTags, setActiveTags] = React.useState<string[]>([]);
  const [openId, setOpenId] = React.useState<string | null>(workData[0]?.id ?? null);

  const filtered = React.useMemo(() => {
    if (activeTags.length === 0) return workData;

    // AND filter: must include every selected tag
    return workData.filter((w) => activeTags.every((t) => w.tags.includes(t)));
  }, [activeTags]);

  // If the currently open card is filtered out, close it
  React.useEffect(() => {
    if (!openId) return;
    const stillVisible = filtered.some((x) => x.id === openId);
    if (!stillVisible) setOpenId(null);
  }, [filtered, openId]);

  const toggleTag = (tag: string) => {
    setActiveTags((cur) => (cur.includes(tag) ? cur.filter((t) => t !== tag) : [...cur, tag]));
  };

  const clearTags = () => setActiveTags([]);

  const Filters = (
    <div className="flex flex-wrap items-center gap-2">
      {allTags.map((tag) => {
        const pressed = activeTags.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={[
              "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
              pressed ? "border-accent bg-accent/15" : "border-border hover:bg-muted",
            ].join(" ")}
            aria-pressed={pressed}
          >
            {tag}
          </button>
        );
      })}

      {activeTags.length > 0 && (
        <button
          type="button"
          onClick={clearTags}
          className="ml-1 rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-muted"
        >
          Clear
        </button>
      )}
    </div>
  );

  return (
    <section className="p-6 sm:p-10">
      <div className="mx-auto max-w-4xl">
        <PageHeader
          title="Work"
          description="Selected projects across design, web, and visual work. Click a card to expand."
          right={
            <div className="text-sm opacity-80">
              Showing <span className="font-semibold">{filtered.length}</span> /{" "}
              <span className="font-semibold">{workData.length}</span>
            </div>
          }
          mobileCollapsibleLabel="Filters"
          mobileCollapsible={Filters}
        >
          {Filters}
        </PageHeader>

        {/* Content */}
        <div>
          {filtered.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-border bg-cream p-6">
              <h2 className="text-lg font-semibold tracking-tight">No matches</h2>
              <p className="mt-2 opacity-85">
                Try removing a filter or clicking <span className="font-semibold">Clear</span>.
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              {filtered.map((item) => (
                <WorkCard
                  key={item.id}
                  item={item}
                  expanded={openId === item.id}
                  onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}