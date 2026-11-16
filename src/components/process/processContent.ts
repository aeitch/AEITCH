export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  accentColor: string;
}

export interface ProcessContentData {
  eyebrow: string;
  heading: string;
  subheading: string;
  steps: ProcessStep[];
}

export const processContent: ProcessContentData = {
  eyebrow: "Our Approach",
  heading: "From Idea to Impact",
  subheading:
    "Sprint-based agile development with weekly deliverables. Senior engineers who speak with you build it. Complete transparency from discovery to deployment.",

  steps: [
    {
      id: "discovery",
      number: "01",
      title: "Discovery",
      description:
        "Deep technical audit, architecture planning, and sprint roadmap. We map requirements to deliverables before writing a single line of code.",
      accentColor: "rgb(247, 192, 89)", // Yellow
    },
    {
      id: "design",
      number: "02",
      title: "Design",
      description:
        "System architecture, API contracts, database schemas, and UI/UX prototypes. Technical specifications that eliminate ambiguity.",
      accentColor: "rgb(118, 227, 220)", // Green
    },
    {
      id: "build",
      number: "03",
      title: "Build",
      description:
        "Sprint-based development with automated testing, code reviews, and CI/CD pipelines. Weekly demos with working software.",
      accentColor: "rgb(255, 156, 170)", // Pink
    },
    {
      id: "launch",
      number: "04",
      title: "Launch",
      description:
        "Production deployment, monitoring setup, knowledge transfer, and complete repository handoff. 100% code ownership from day one.",
      accentColor: "rgb(116, 200, 252)", // Blue
    },
  ],
};
