export interface Metric {
  id: string;
  value: string;
  label: string;
  suffix?: string;
}

export interface MetricsContentData {
  eyebrow: string;
  heading: string;
  metrics: Metric[];
}

export const metricsContent: MetricsContentData = {
  eyebrow: "Proven at Scale",
  heading: "Engineering Excellence",

  metrics: [
    {
      id: "systems-deployed",
      value: "50+",
      label: "AI Systems Deployed",
    },
    {
      id: "uptime",
      value: "99.99",
      label: "Infrastructure Uptime",
      suffix: "%",
    },
    {
      id: "mvp-delivery",
      value: "8",
      label: "Week MVP Delivery",
    },
    {
      id: "code-ownership",
      value: "100",
      label: "Code Ownership",
      suffix: "%",
    },
  ],
};
