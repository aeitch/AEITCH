import { z } from 'zod';

// Contact & Consultation Inquiry
export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please provide a valid work email address'),
  company: z.string().max(100).optional().nullable(),
  serviceRequested: z
    .enum([
      'cloud-first-product-engineering',
      'platform-engineering-devops',
      'devsecops-ksa-compliance',
      'dedicated-engineering-squads',
      'fintech-digital-banking',
      'giga-projects-smart-infrastructure',
      'enterprise-cloud-migration',
      'high-growth-saas',
      'ai-consulting',
      'cloud-devops',
      'custom-software',
      'new-product-development',
      'other',
    ])
    .optional()
    .nullable(),
  budgetRange: z
    .enum(['< $10k', '$10k - $25k', '$25k - $50k', '$50k+'])
    .optional()
    .nullable(),
  timeline: z
    .enum(['Immediate', '1 - 3 months', '3 - 6 months', 'Exploratory'])
    .optional()
    .nullable(),
  message: z
    .string()
    .min(10, 'Please provide at least 10 characters detailing your requirements')
    .max(3000),
  meetingDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .optional()
    .nullable(),
  meetingTime: z.string().max(20).optional().nullable(),
  // Honeypot field for bot mitigation (must remain empty)
  website_hp: z.string().max(0, 'Bot detected').optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

// Admin Authentication
export const AdminLoginSchema = z.object({
  email: z.string().email('Valid admin email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AdminLoginData = z.infer<typeof AdminLoginSchema>;

// Service Schema
export const ServiceFormSchema = z.object({
  title: z.string().min(2).max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  tagline: z.string().min(5).max(150),
  category: z.string().default('Engineering'),
  description: z.string().min(10).max(500),
  fullContent: z.string().min(20),
  icon: z.string().min(2).max(50),
  features: z.array(z.string().min(1)).min(1, 'At least one feature required'),
  techStack: z.array(z.string().min(1)).min(1, 'At least one tech stack item required'),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export type ServiceFormData = z.infer<typeof ServiceFormSchema>;

// Case Study Schema
export const CaseStudyFormSchema = z.object({
  title: z.string().min(3).max(150),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  clientName: z.string().min(2).max(100),
  clientIndustry: z.string().min(2).max(100),
  type: z.enum(['CASE_STUDY', 'MVP_SHOWCASE']).default('CASE_STUDY'),
  summary: z.string().min(10).max(500),
  challenge: z.string().min(10),
  solution: z.string().min(10),
  results: z.array(
    z.object({
      metric: z.string(),
      label: z.string(),
    })
  ),
  techStack: z.array(z.string()),
  coverImage: z.string().optional().nullable(),
  liveUrl: z.string().url().optional().nullable().or(z.literal('')),
  order: z.number().int().default(0),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export type CaseStudyFormData = z.infer<typeof CaseStudyFormSchema>;

// Testimonial Schema
export const TestimonialFormSchema = z.object({
  clientName: z.string().min(2).max(100),
  clientRole: z.string().min(2).max(100),
  clientCompany: z.string().min(2).max(100),
  avatarUrl: z.string().optional().nullable(),
  quote: z.string().min(10).max(1000),
  rating: z.number().int().min(1).max(5).default(5),
  verified: z.boolean().default(true),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export type TestimonialFormData = z.infer<typeof TestimonialFormSchema>;

// Metric Counter Schema
export const MetricCounterFormSchema = z.object({
  label: z.string().min(2).max(100),
  value: z.string().min(1).max(20),
  prefix: z.string().max(10).default(''),
  suffix: z.string().max(10).default(''),
  description: z.string().max(200).optional().nullable(),
  icon: z.string().max(50).optional().nullable(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export type MetricCounterFormData = z.infer<typeof MetricCounterFormSchema>;

// Inquiry Status / Notes Update Schema
export const InquiryUpdateSchema = z.object({
  status: z
    .enum(['NEW', 'CONTACTED', 'IN_DISCUSSION', 'CONVERTED', 'ARCHIVED'])
    .optional(),
  notes: z.string().optional().nullable(),
});

export type InquiryUpdateData = z.infer<typeof InquiryUpdateSchema>;
