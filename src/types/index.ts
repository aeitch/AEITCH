export * from './auth';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  fullContent: string;
  icon: string;
  features: string[];
  techStack: string[];
  order: number;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CaseStudyMetric {
  metric: string;
  label: string;
}

export type ShowcaseType = 'CASE_STUDY' | 'MVP_SHOWCASE';

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  clientIndustry: string;
  type: ShowcaseType | string;
  summary: string;
  challenge: string;
  solution: string;
  results: CaseStudyMetric[];
  techStack: string[];
  coverImage?: string | null;
  liveUrl?: string | null;
  order: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  avatarUrl?: string | null;
  quote: string;
  rating: number;
  verified: boolean;
  order: number;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface MetricCounterItem {
  id: string;
  label: string;
  value: string;
  prefix: string;
  suffix: string;
  description?: string | null;
  icon?: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type InquiryStatus = 'NEW' | 'CONTACTED' | 'IN_DISCUSSION' | 'CONVERTED' | 'ARCHIVED';

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  serviceRequested?: string | null;
  budgetRange?: string | null;
  timeline?: string | null;
  message: string;
  meetingDate?: string | null;
  meetingTime?: string | null;
  status: InquiryStatus | string;
  notes?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
}
