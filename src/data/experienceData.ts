export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  location: string;
  dates: string;
  yearStart: number;
  yearEnd: number;
  summary: string; // full paragraph (your request)
};

export const experienceData: ExperienceItem[] = [
  {
    id: "finch-ai-2023",
    title: "Manager, Software Engineering / UX Developer",
    company: "Finch AI",
    location: "Beavercreek, OH",
    dates: "2023 – 2026",
    yearStart: 2023,
    yearEnd: 2026,
    summary:
      "React developer and Software Engineering Manager for Generative AI products, currently leading the development of a shared design system. Experienced in managing multiple concurrent projects, providing regular feedback to both junior engineers and senior leadership, and partnering closely with product and UX teams. Known for strong cross-functional collaboration and delivering well-integrated, scalable features across teams.",
  },
  {
    id: "3dcloud-marxent-2021",
    title: "Sr Web Developer",
    company: "3d cloud / marxent",
    location: "Dayton, OH",
    dates: "2021 – 2023",
    yearStart: 2021,
    yearEnd: 2023,
    summary:
      "Front-end developer focused on building and maintaining web applications using HTML, CSS, and JavaScript. Worked closely with design and QA teams to implement features, resolve technical issues, and ensure high-quality releases. Regularly handled troubleshooting requests and collaborated directly with clients and customer success teams to deliver reliable, user-focused solutions.",
  },
  {
    id: "cubic-global-defense-2017",
    title: "Web Developer",
    company: "Cubic Global Defense",
    location: "Orlando, FL / Denver, CO",
    dates: "2017 – 2021",
    yearStart: 2017,
    yearEnd: 2021,
    summary:
      "Front-end engineer with experience developing web applications using React, TypeScript, and SCSS. Collaborated closely with engineers to improve software and hardware interfaces, and worked alongside design, product, and Unreal Engine teams to deliver cohesive, high-quality user experiences across platforms.",
  },
  {
    id: "advantage-rentacar-2016",
    title: "Senior Web Designer",
    company: "Advantage Rent-a-Car",
    location: "Orlando, FL",
    dates: "2016 – 2017",
    yearStart: 2016,
    yearEnd: 2017,
    summary:
      "Sole creative and front-end contributor responsible for designing website mockups and interactive prototypes, as well as implementing front-end solutions using WordPress. Led and worked with an agency on the full redesign of our external website, owning the visual design, user experience, and execution from concept through launch.",
  },
  {
    id: "abila-2015",
    title: "Interaction Designer",
    company: "Abila",
    location: "Orlando, FL",
    dates: "2015 – 2016",
    yearStart: 2015,
    yearEnd: 2016,
    summary:
      "UI/UX Designer responsible for rapidly prototyping new data-driven capabilities and designing interactive user interface prototypes. Focused on translating complex workflows into intuitive, usable experiences through iterative design, testing, and close collaboration with engineering and product teams.",
  },
  {
    id: "cubic-ui-2014",
    title: "UI Designer / 3D Artist",
    company: "Cubic Global Defense",
    location: "Orlando, FL",
    dates: "2014 – 2015",
    yearStart: 2014,
    yearEnd: 2015,
    summary:
      "3D Artist and UI Designer responsible for developing user interfaces and web content across multiple platforms, as well as creating immersive 3D training simulations. Led a 2D design team on several training applications, with a strong focus on responsive design, usability, and consistency across devices.",
  },
  {
    id: "carley-2011",
    title: "Graphic Artist",
    company: "Carley Corporation",
    location: "Orlando, FL",
    dates: "2011 – 2014",
    yearStart: 2011,
    yearEnd: 2014,
    summary:
      "Created accurate 3D models for military simulation and designed interactive 2D and 3D graphics to support training and visualization needs.",
  },
  {
    id: "harris-2007",
    title: "Geo-spatial Engineer / Art Lead",
    company: "Harris Corporation",
    location: "Orlando, FL",
    dates: "2007 – 2010",
    yearStart: 2007,
    yearEnd: 2010,
    summary:
      "3D Artist supporting a geo-spatial harbor simulation contract, responsible for creating accurate environmental assets and visualizations used in large-scale maritime training and simulation environments.",
  },
];
