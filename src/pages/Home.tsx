import type { PageProps } from "../types/pages";
import profileImage from "../images/profile/profile.jpg";
import HomeBlurb from "../components/home/HomeBlurb";

export default function Home() {
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
              UI/UX-focused Front-End Developer | Software Engineering Manager
            </p>

            <HomeBlurb />
          </div>
        </div>
      </div>
    </section>
  );
}