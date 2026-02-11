import type { PageProps } from "../types/pages";
import profileImage from "../images/profile/profile.jpg";
import HomeBlurb from "../components/HomeBlurb";

export default function Home({ onGoWork, onGoContact }: PageProps) {
  return (
    <section className="p-6 sm:p-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-start">
          <img
            src={profileImage}
            alt="Daniel Starks"
            className="h-28 w-28 rounded-full object-cover border border-border"
          />

          <div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              Daniel Starks
            </h1>
            <p className="mt-2 text-lg opacity-90">
              Software Engineering Manager • UI/UX-focused Front-End Developer
            </p>
            <HomeBlurb />

            <div className="mt-4 flex flex-wrap gap-2">
              {["React", "TypeScript", "Design Systems", "Accessibility"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-3 py-1 text-sm opacity-90"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onGoWork}
                className="rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
              >
                View Work
              </button>
              <button
                type="button"
                onClick={onGoContact}
                className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}