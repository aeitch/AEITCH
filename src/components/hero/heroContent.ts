// TODO(AEITCH): Brand and copy definitions for AEITCH website
// Replace these values when ready to swap in AEITCH custom copy

export interface StatItem {
  id: string;
  word: string;
  stat: string;
  label: string;
}

export interface StateTheme {
  id: string;
  name: string;
  word: string;
  videoSrc: string;
  accentColor: string;
  tagBorderColor: string;
  backlightGradient: string;
  buttonBg: string;
  secondaryBtnBg: string;
  cardActiveBg: string;
  cardActiveBorder: string;
  cardStatColor: string;
  cardLabelColor: string;
}

export interface HeroContentData {
  tagText: string;
  headingLine1: string;
  headingPrefix: string;
  rotatingWords: string[];
  subtitle: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  caseStudy: {
    badge: string;
    title: string;
    href: string;
  };
  stats: StatItem[];
  themes: StateTheme[];
}

export const heroContent: HeroContentData = {
  // Brand tag
  tagText: "Humans behind AI",

  // Main hero heading line 1
  headingLine1: "AEITCH for",

  // Leading prefix on heading line 2 (blank as line 1 is "AEITCH for")
  headingPrefix: "",

  // 4 services synchronized with typewriter and stat cards
  rotatingWords: [
    "AI Automation",
    "Product Development",
    "DevOps & Cloud",
    "Custom Software",
  ],

  // Engaging one-liner subtitle driving visitors to get in touch with AEITCH
  subtitle: "From intelligent automation to scalable cloud infrastructure, AEITCH engineers mission-critical digital systems built for hypergrowth. Connect with our engineering team to transform your technology today.",

  // Primary call to action button
  primaryCTA: {
    label: "Get Your Infra Ready!",
    href: "/contact#contact-form",
  },

  // Latest case study card (desktop only)
  caseStudy: {
    badge: "Latest case study",
    title: "Support Pilot — Multichannel AI Customer Assistant",
    href: "./case-studies/supportpilot",
  },

  // 4 synchronized service cards
  stats: [
    {
      id: "stat-ai-automation",
      word: "AI Automation",
      stat: "AI Automation",
      label: "Workflows, agentic systems & integration",
    },
    {
      id: "stat-product-dev",
      word: "Product Development",
      stat: "Product Development",
      label: "Full-lifecycle MVPs, SaaS & platforms",
    },
    {
      id: "stat-devops-cloud",
      word: "DevOps & Cloud",
      stat: "DevOps & Cloud",
      label: "Kubernetes, CI/CD & zero-downtime infra",
    },
    {
      id: "stat-custom-software",
      word: "Custom Software",
      stat: "Custom Software",
      label: "High-performance bespoke enterprise systems",
    },
  ],

  // 4 synced state themes (Yellow Lightning, Green Shield, Pink Flower, Blue Pebble)
  themes: [
    {
      id: "productivity",
      name: "AI Automation",
      word: "AI Automation",
      videoSrc: "/videos/video-53.mp4", // Yellow state video (Bolt)
      accentColor: "rgb(247, 192, 89)",
      tagBorderColor: "rgba(171, 135, 73, 0.5)",
      backlightGradient:
        "radial-gradient(50% 50% at 50% 50%, rgb(247, 192, 89) 0%, rgb(0, 0, 0) 100%)",
      buttonBg: "rgb(247, 192, 89)",
      secondaryBtnBg: "rgba(247, 192, 89, 0.15)",
      cardActiveBg:
        "linear-gradient(0deg, rgba(247, 192, 89, 0.2) 0%, rgba(247, 192, 89, 0.1) 100%)",
      cardActiveBorder: "rgba(247, 192, 89, 0.2)",
      cardStatColor: "rgb(247, 192, 89)",
      cardLabelColor: "rgb(242, 196, 97)",
    },
    {
      id: "protection",
      name: "Product Development",
      word: "Product Development",
      videoSrc: "/videos/video-55.mp4", // Green state video (Shield)
      accentColor: "rgb(118, 227, 220)",
      tagBorderColor: "rgb(9, 61, 58)",
      backlightGradient:
        "radial-gradient(50% 50% at 50% 50%, rgb(118, 227, 220) 0%, rgb(0, 0, 0) 100%)",
      buttonBg: "rgb(118, 227, 220)",
      secondaryBtnBg: "rgba(118, 227, 220, 0.15)",
      cardActiveBg:
        "linear-gradient(0deg, rgba(47, 194, 184, 0.2) 0%, rgba(47, 194, 184, 0.1) 100%)",
      cardActiveBorder: "rgba(47, 194, 184, 0.2)",
      cardStatColor: "rgb(118, 227, 220)",
      cardLabelColor: "rgb(242, 196, 97)",
    },
    {
      id: "creativity",
      name: "DevOps & Cloud",
      word: "DevOps & Cloud",
      videoSrc: "/videos/video-48.mp4", // Pink flower
      accentColor: "rgb(255, 156, 170)",
      tagBorderColor: "rgb(79, 19, 53)",
      backlightGradient:
        "radial-gradient(50% 50% at 50% 50%, rgb(255, 156, 170) 0%, rgb(0, 0, 0) 100%)",
      buttonBg: "rgb(255, 156, 170)",
      secondaryBtnBg: "rgba(252, 106, 128, 0.15)",
      cardActiveBg:
        "linear-gradient(0deg, rgba(252, 106, 128, 0.2) 0%, rgba(252, 106, 128, 0.1) 100%)",
      cardActiveBorder: "rgba(252, 106, 128, 0.2)",
      cardStatColor: "rgb(255, 156, 170)",
      cardLabelColor: "rgb(242, 196, 97)",
    },
    {
      id: "flexibility",
      name: "Custom Software",
      word: "Custom Software",
      videoSrc: "/videos/video-51.mp4", // Blue pebble
      accentColor: "rgb(116, 200, 252)",
      tagBorderColor: "rgb(6, 59, 92)",
      backlightGradient:
        "radial-gradient(50% 50% at 50% 50%, rgb(116, 200, 252) 0%, rgb(0, 0, 0) 100%)",
      buttonBg: "rgb(116, 200, 252)",
      secondaryBtnBg: "rgba(116, 200, 252, 0.15)",
      cardActiveBg:
        "linear-gradient(0deg, rgba(116, 200, 252, 0.2) 0%, rgba(116, 200, 252, 0.1) 100%)",
      cardActiveBorder: "rgba(116, 200, 252, 0.2)",
      cardStatColor: "rgb(116, 200, 252)",
      cardLabelColor: "rgb(242, 196, 97)",
    },
  ],
};
