const technicalSkills = [
  "HTML5, CSS3, JavaScript",
  "React, TypeScript",
  "Radix UI, PrimeReact, Bootstrap",
  "TailwindCSS, SASS, LESS, PostCSS",
  "Component-based architecture",
  "Responsive & accessible web development",
  "Design system development & maintenance",
  "Figma, Adobe Creative Cloud",
  "UI/UX design & prototyping",
  "WCAG / 508 Compliance",
  "Git | GitHub | Bitbucket",
];

const leadershipSkills = [
  "Software engineering leadership",
  "Cross-functional collaboration (Product, Design, QA)",
  "Code review standards & best practices",
  "Mentorship & team development",
  "Agile / Scrum methodologies",
];

export default function HomeBlurb() {
  return (
    <div className="mt-6 max-w-3xl">
      {/* Summary */}
      <div className="space-y-3">
        <p className="text-lg leading-relaxed opacity-90">
          Experienced front-end engineer and technical leader specializing in
          modern web development, UI/UX design, and technical leadership.
        </p>

        <p className="leading-relaxed opacity-85">
          Proven ability to lead cross-functional teams, manage multiple
          projects, and deliver scalable web applications using modern
          JavaScript frameworks. Strong background in React, TypeScript,
          accessibility, and design systems, with a focus on clean architecture,
          maintainable code, and collaborative product delivery.
        </p>
      </div>

      {/* Skills */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">
          Skills & Competencies
        </h2>
        <p className="mt-2 max-w-2xl text-sm opacity-80">
          A snapshot of the tools and practices I use to ship polished,
          accessible, maintainable web applications.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Technical */}
          <section className="rounded-xl border border-border bg-cream p-5">
            <h3 className="text-lg font-semibold tracking-tight">Technical</h3>
            <ul className="mt-4 space-y-2 text-sm opacity-90">
              {technicalSkills.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[0.4rem] h-1.5 w-1.5 rounded-full bg-cream-fg opacity-70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Leadership */}
          <section className="rounded-xl border border-border bg-cream p-5">
            <h3 className="text-lg font-semibold tracking-tight">Leadership</h3>
            <ul className="mt-4 space-y-2 text-sm opacity-90">
              {leadershipSkills.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[0.4rem] h-1.5 w-1.5 rounded-full bg-cream-fg opacity-70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Personal */}
      <div className="mt-12 rounded-xl border border-border bg-muted p-6">
        <h2 className="text-xl font-semibold tracking-tight">Beyond the Code</h2>
        <p className="mt-3 leading-relaxed opacity-85">
          If you’ve made it this far, here’s a little about me beyond the tech.
          My wife and I adopt retired racing Greyhounds, and they’ve become the
          best furbabies we could ask for. Outside of work, I enjoy hiking,
          camping, and backpacking, getting out on the golf course, PC gaming
          (definitely not a console person), and spending time 3D printing or
          woodworking. 
          <br /> 
          Always happy to connect and chat.
        </p>
      </div>
    </div>
  );
}
