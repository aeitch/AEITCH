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
  eyebrow: "Engineering Focus",
  heading: "Production-Grade Systems",

  metrics: [
    {
      id: "systems-deployed",
      value: "Core",
      label: "Agentic AI Architectures",
    },
    {
      id: "uptime",
      value: "99.9",
      label: "Target Availability SLA",
      suffix: "%",
    },
    {
      id: "mvp-delivery",
      value: "4–8",
      label: "Week MVP Sprint Cycles",
    },
    {
      id: "code-ownership",
      value: "100",
      label: "Client IP & Code Ownership",
      suffix: "%",
    },
  ],
};
