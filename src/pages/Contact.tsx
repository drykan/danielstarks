import * as React from "react";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";

export default function Contact() {
  // TODO: replace these with your real links
  const email = "drykan@gmail.com";
  const linkedInUrl = "https://www.linkedin.com/in/daniel-starks937/";

  return (
    <section className="p-6 sm:p-10">
      <div className="mx-auto max-w-4xl">
        <header>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Contact</h1>
          <p className="mt-2 max-w-2xl leading-relaxed opacity-85">
            I’m always open to conversations around front-end engineering, design systems, and UI
            architecture. If you’re building something thoughtful and scalable, I’d love to hear
            about it.
          </p>
        </header>

        <div className="mt-10 rounded-2xl border border-border bg-cream p-6 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Email */}
            <a
              href={`mailto:${email}`}
              className={[
                "group inline-flex items-center justify-between gap-3 rounded-xl border border-border bg-cream px-4 py-4",
                "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-cream">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-semibold">Email</div>
                  <div className="text-xs opacity-70">{email}</div>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-semibold opacity-80 group-hover:opacity-100">
                Compose <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "group inline-flex items-center justify-between gap-3 rounded-xl border border-border bg-cream px-4 py-4",
                "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-cream">
                  <Linkedin size={18} aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-semibold">LinkedIn</div>
                  <div className="text-xs opacity-70">Connect with me</div>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-semibold opacity-80 group-hover:opacity-100">
                Open <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </a>
          </div>

          <div className="mt-6 border-t border-border pt-5 text-sm opacity-80">
            Prefer email? That’s usually the fastest way to reach me.
          </div>
        </div>
      </div>
    </section>
  );
}
