export type WorkItem = {
  id: string;
  title: string;
  description: string;
  year?: string;
  role?: string;
  tags: string[];
  images: string[]; // use imported URLs or relative strings
};

export const workData: WorkItem[] = [
  {
    id: "advantage",
    title: "Advantage Rent-a-Car",
    role: "Web Designer | Frontend UI Development",
    description:
      "Worked with Agency to design, develop and implement the website. Responsible for designing: terms and conditions, privacy policies, vehicle pages, reservation flows, blog, and In The News.",
    tags: ["Wordpress", "Drupal", "HTML", "CSS", "Javascript", "Adobe CC", "UI Design"],
    images: [
      new URL("../images/work/Design_AdvantageBC.jpg", import.meta.url).toString(),
      new URL("../images/work/Web_advantage1.jpg", import.meta.url).toString(),
      new URL("../images/work/Web_advantage2.jpg", import.meta.url).toString(),
    ],
  },
  {
    id: "wyche",
    title: "Wyche & Associates",
    role: "Frontend UI Development",
    description:
      "This is a website that was designed in Photoshop previously and needed to be built into a desktop/responsive website. I was responsible for designing the responsive site along with building and publishing the site to the web.",
    tags: ["HTML", "CSS", "Javascript"],
    images: [
      new URL("../images/work/wyche1.jpg", import.meta.url).toString(),
    ]
  },
  {
    id: "training1",
    title: "Training Mobile & Desktop App",
    role: "Web and App Design | Frontend UI Development",
    description:
      "This is the training course for a training application that I designed and developed. It was built to be responsive and displayed on mobile, tablet, and desktop platforms.",
    tags: ["HTML", "CSS", "Javascript", "UI Design", "Prototyping", "Adobe CC"],
    images: [
      new URL("../images/work/UI_TrainingApp1.jpg", import.meta.url).toString(),
      new URL("../images/work/UI_TrainingApp2.jpg", import.meta.url).toString(),
      new URL("../images/work/UI_TrainingApp3.jpg", import.meta.url).toString(),
    ],
  },
  {
    id: "abila1",
    title: "Interaction Design",
    role: "UI Design",
    description:
      "Enterprise fundraising and donor applications. I worked with developers to design and prototype out forms, tables, and donor tracking and monitoring.",
    tags: ["HTML", "CSS", "Javascript", "UI Design", "Prototyping", "Adobe CC"],
    images: [
      new URL("../images/work/Interaction_Design1.png", import.meta.url).toString(),
      new URL("../images/work/UI_FundraisingSoftware1.jpg", import.meta.url).toString(),
    ],
  },
  {
    id: "loveyourskin",
    title: "Branding",
    role: "Graphic Design & Branding",
    description:
      "Worked with clients to help fulfill branding needs. This would include logos, flyers, business cards, advertisements, menus, websites and more.",
    tags: ["HTML", "CSS", "Javascript", "UI Design", "Prototyping", "Adobe CC"],
    images: [
      new URL("../images/work/Design_LoveYourSkin.jpg", import.meta.url).toString(),
      new URL("../images/work/Design_Logo_LittlePet.png", import.meta.url).toString(),
    ],
  },
];
