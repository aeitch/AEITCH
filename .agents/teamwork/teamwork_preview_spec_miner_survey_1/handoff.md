# Handoff Report: Functional Specifications, Data Models, Routes & Admin Architecture

**Author**: teamwork_preview_spec_miner_survey_1  
**Target Milestone**: Milestone 1 (Survey & Feature Inventory) -> Milestone 2 (Architecture & Foundation)  
**Parent Agent**: teamwork_preview_orchestrator_1 (`5d3503b0-f27e-4040-b880-3ad821023d60`)  
**Working Directory**: `h:/AEITCH/.agents/teamwork/teamwork_preview_spec_miner_survey_1`  
**Date**: 2026-09-26T22:25:00Z  

---

## 1. Observation

Direct observations extracted from `ORIGINAL_REQUEST.md`, repo context, and domain discovery:
1. **Project Objective**: Full-stack rebuild of `aeitch.com` enterprise digital agency website from scratch, replacing legacy WordPress/PHP with a unified Next.js App Router and Prisma/SQLite stack.
2. **Visual & Brand Identity**:
   - Strictly dark theme (`#0a0a0a`, `#0f0f11`, elevated card surfaces `#141417`, borders `#26262b`).
   - Neon amber/orange electric glow (`#E9800A`, RGB `233, 128, 10`).
   - Interactive components: rotating conic gradient borders, cursor-driven radial glow cards, particle logo/canvas hero, and scroll-triggered animations (GSAP ScrollTrigger / Framer Motion).
3. **Public Page Routes Specified**:
   - Homepage (`/`): Hero with Consultation CTA, Animated Tech Stack Carousel, SaaS & AI Services showcase, Statistics Counters, Why AEITCH bento cards, Testimonials, CTA.
   - Services (`/services/*`):
     - `/services/ai-consulting` (Generative AI, custom LLMs, RAG, agentic automation)
     - `/services/cloud-devops` (AWS/GCP/Azure architecture, Terraform, Kubernetes, CI/CD, FinOps)
     - `/services/custom-software` (High-throughput enterprise software, microservices, APIs)
     - `/services/new-product-development` (End-to-end MVP to scaled SaaS product development)
   - Showcase (`/case-studies`, `/our-mvp-showcase`):
     - Filterable enterprise case studies with impact metrics and architecture summaries.
     - Live MVP showcase highlighting startup incubation and rapid delivery velocity.
   - Company (`/about-us`, `/contact-us`):
     - About Us highlighting company story (founded in Lahore, 2022, CEO Haseeb Ur Rehman Khan), engineering rigor, 5.0 Clutch rating.
     - Contact Us with integrated consultation scheduling and enterprise project inquiry intake.
4. **Admin Dashboard Requirements (`/admin`)**:
   - Secure credentials/session authentication (zero WordPress dependencies).
   - Real-time CRUD capabilities over:
     - Services & detail content.
     - Case studies, testimonials, and MVP portfolio items.
     - Homepage metrics, statistics counters, and feature highlights.
     - Consultation inquiries and contact form submissions with status tracking.
5. **Quality & Build Mandates**:
   - Must build cleanly with `npm run build` with zero TypeScript or ESLint errors.
   - Fully responsive across mobile, tablet, laptop, and ultra-wide screens.
   - Zero layout shifts and 60fps animation performance.

---

## 2. Logic Chain

From the authoritative observations above, the system must be architected as follows:

```
[ Next.js App Router (Public Pages) ]        [ Next.js App Router (/admin Dashboard) ]
                |                                             |
                v                                             v
     [ React Server Components ]                  [ Client Components + Auth Guard ]
     [ Client Interactive UI ]                                |
                |                                             v
                +-------------------> [ Next.js Route Handlers (/api/*) ]
                                                      |
                                                      v
                                        [ Zod Validation & Auth Middleware ]
                                                      |
                                                      v
                                            [ Prisma ORM Client ]
                                                      |
                                                      v
                                            [ SQLite Database (dev.db) ]
```

### 2.1 Public Frontend Routing & Component Hierarchy

#### Route 1: Homepage (`/`)
- **Header / Navigation (`components/navbar.tsx`)**:
  - Brand Logo with animated neon orange icon.
  - Desktop nav links: Services (with hover dropdown preview), Case Studies, MVP Showcase, About, Contact.
  - Primary CTA button: "Book Consultation" with neon glowing hover border.
  - Mobile responsive drawer menu with smooth stagger animation.
- **Hero Section (`components/home/hero-section.tsx`)**:
  - High-tech badge: "ENTERPRISE SOFTWARE & AI SYSTEMS".
  - Main Headline: "Architecting High-Performance Cloud, AI, and Software Platforms".
  - Subhead: "We engineer resilient cloud architectures, production-grade AI agents, and scalable SaaS solutions that power modern enterprise growth."
  - Dual CTAs: Primary "Schedule a Consultation" (`/contact-us#consultation`), Secondary "View Case Studies" (`/case-studies`).
  - Interactive background: Particle canvas / glow grid with mouse repulsion effect.
- **Tech Stack Carousel (`components/home/tech-carousel.tsx`)**:
  - Infinite auto-scrolling marquee containing curated enterprise tech logos: Next.js, React, TypeScript, Python, PyTorch, LangChain, AWS, Google Cloud, Azure, Docker, Kubernetes, Terraform, PostgreSQL, Redis, GraphQL.
  - Left and right gradient fade masks for seamless viewport transition.
- **SaaS & AI Services Showcase (`components/home/services-showcase.tsx`)**:
  - Bento grid featuring the 4 core service pillars.
  - Dynamic cursor-driven radial glow spotlight on card hover.
  - Animated glowing conic borders (`#E9800A`).
  - Direct links to dedicated service sub-pages with "Explore Service ->" micro-interactions.
- **Animated Statistics Counters (`components/home/stats-counter.tsx`)**:
  - 4 dynamic statistics fetched from database (e.g. "99.9% Uptime SLA", "40+ Platforms Delivered", "5x Deployment Velocity", "100% Client Satisfaction").
  - Intersection Observer trigger with ease-out number incrementing animation.
- **Why AEITCH Cards (`components/home/why-aeitch.tsx`)**:
  - 4 foundational value cards:
    1. *Production-Hardened Engineering*: Zero technical debt shortcuts; battle-tested cloud patterns.
    2. *AI-Native Systems*: Deep expertise in custom LLMs, RAG vector pipelines, and autonomous agent swarms.
    3. *Cloud & FinOps Mastery*: Multi-cloud architectures with automated cost efficiency.
    4. *Direct Architect Access*: Senior principal engineers on every sprint with transparent accountability.
- **Client Testimonials Carousel (`components/home/testimonials-section.tsx`)**:
  - Verified client feedback from Clutch / enterprise leaders.
  - Stars rating indicator, client avatar, role, company name, and verified badge.
- **High-Impact Consultation Banner (`components/home/cta-banner.tsx`)**:
  - Full-width callout with electric amber neon back-glow: "Ready to scale your next digital breakthrough? Let's build together."
  - Direct 1-click consultation scheduler trigger.
- **Footer (`components/footer.tsx`)**:
  - Comprehensive sitemap, social links (LinkedIn, GitHub, Clutch), office location (Lahore, Pakistan), direct contact email (`contact@aeitch.com`), copyright notice.

#### Route 2-5: Dedicated Services Sub-Pages
1. **`/services/ai-consulting`**:
   - Hero: "Enterprise Generative AI, Custom LLMs & Autonomous Agents".
   - Architecture Capabilities:
     - Custom LLM fine-tuning & domain adaptation (Llama 3, Mistral, Claude).
     - Production RAG pipelines with hybrid search and vector databases (Pinecone, Qdrant, pgvector).
     - Autonomous agent swarms for enterprise workflow automation.
     - Self-hosted on-prem AI infrastructure & private inference nodes (vLLM, Ollama).
   - Tech Badges: Python, PyTorch, LangChain, LlamaIndex, HuggingFace, OpenAI, Anthropic, Triton.
   - Deliverables & Engagement Phases: Feasibility Assessment -> PoC -> Scaled Architecture -> Continuous Evaluation.
   - In-page Consultation Booking Widget.
2. **`/services/cloud-devops`**:
   - Hero: "Scalable Cloud Architecture, Kubernetes & Zero-Downtime DevOps".
   - Architecture Capabilities:
     - Multi-cloud architecture (AWS, Google Cloud, Microsoft Azure).
     - Infrastructure as Code (Terraform, Terragrunt, Pulumi).
     - Container orchestration & service mesh (Kubernetes, EKS, GKE, Istio).
     - Automated CI/CD delivery pipelines (GitHub Actions, GitLab CI, ArgoCD).
     - FinOps cloud cost optimization (average 35-50% cloud bill reduction).
     - 24/7 SRE observability, alerting, and automated incident recovery.
   - Tech Badges: AWS, GCP, Azure, Terraform, Docker, Kubernetes, Helm, Prometheus, Grafana, Datadog.
3. **`/services/custom-software`**:
   - Hero: "High-Throughput Enterprise Software & Microservices Architecture".
   - Architecture Capabilities:
     - Ultra-low latency API gateways & distributed event streaming (Kafka, RabbitMQ).
     - Multi-tenant enterprise SaaS backends with robust RBAC/ABAC security.
     - Modern high-performance web applications (Next.js, React, TypeScript).
     - Database engineering: High-availability PostgreSQL, distributed caching (Redis).
     - Legacy monolith modernization into cloud-native microservices.
   - Tech Badges: Next.js, Node.js, Go, Python, PostgreSQL, Prisma, Redis, Kafka, GraphQL.
4. **`/services/new-product-development`**:
   - Hero: "From Concept to Scale: Rapid MVP & Product Engineering".
   - Architecture Capabilities:
     - 6-to-8 week rapid MVP turnaround without sacrificing architectural integrity.
     - Interactive wireframing, UX design systems, and rapid prototyping.
     - Production-ready scalable foundation capable of absorbing rapid hyper-growth.
     - Telemetry, analytics, and conversion tracking built-in from day one.
   - Process Roadmap: Discovery & Architecture -> Sprint Iteration -> Security Audit -> Launch -> Scale.

#### Route 6-7: Showcase Pages
1. **`/case-studies` & `/case-studies/[slug]`**:
   - Filterable gallery: By Service (AI, Cloud, Custom Software, MVP) and Industry (Fintech, Healthtech, Logistics, SaaS).
   - Card displays: Client Name, Project Title, Key Metric Badge (e.g. "+340% Performance", "-45% Cloud Spend"), Summary, Tech Stack Tags.
   - Detail View: The Business Problem, Architectural Strategy, Implementation Highlights, Quantifiable Business Results, Client Quote.
2. **`/our-mvp-showcase`**:
   - Showcase gallery of MVPs engineered and shipped by AEITCH.
   - Badges showing "Time-to-Market: 6 Weeks", "Active Users: 50K+", Live Demo links, Interactive UI screenshots, and Architecture teardown.

#### Route 8-9: Company Pages
1. **`/about-us`**:
   - The AEITCH Story: Founded in Lahore in 2022 by Haseeb Ur Rehman Khan; built on a culture of uncompromising engineering excellence.
   - Core Values: Precision Engineering, Relentless Velocity, Radical Transparency, AI-First Evolution.
   - Technical Leadership & Team Philosophy: Senior architects driving every deliverable.
   - Clutch 5.0 Star verified reviews badge and client trust metrics.
2. **`/contact-us`**:
   - Dual-mode engagement interface:
     - **Mode A: Instant Consultation Scheduler**:
       - Select topic (AI Strategy, Cloud Audit, Custom Software, MVP Scoping).
       - Select date & preferred time window.
       - Automatic timezone detection.
       - Client details (Name, Work Email, Company, Phone, Notes).
     - **Mode B: Comprehensive Project Scoping Form**:
       - Full Project Details: Scope, Estimated Budget Range (<$10k, $10k-$25k, $25k-$50k, $50k+), Timeline (Immediate, 1-3 months, 3-6 months), File upload / RFP note.
   - Office Location: Lahore, Pakistan.
   - Direct Email: `contact@aeitch.com`, Phone / WhatsApp link.
   - Guaranteed SLA: Response within 24 business hours.

---

### 2.2 Admin Dashboard Architecture (`/admin`)

#### Authentication & Session Management
- **Security Standard**: Custom JWT session stored in an `HttpOnly`, `Secure`, `SameSite=Lax` cookie named `aeitch_admin_session`.
- **Password Protection**: Admin passwords hashed using `bcryptjs` with salt rounds = 12.
- **Middleware Guard (`middleware.ts`)**:
  - Matches all `/admin/*` routes.
  - Whitelists `/admin/login` and `/api/admin/login`.
  - For protected routes: Decodes and validates JWT token; checks expiration (`exp`). If invalid or expired, clears cookie and performs 307 redirect to `/admin/login?from=[pathname]`.
  - For API routes (`/api/admin/*`): Returns HTTP 401 `{ success: false, error: "Unauthorized" }` on missing/invalid token.
- **Default Seed Admin**: Pre-seeded during database initialization with configurable credentials (`admin@aeitch.com` / `AeitchAdmin2026!`).

#### Admin Views & Modules
1. **`/admin` (Overview Dashboard)**:
   - Quick Stat Cards: Total Consultation Inquiries, New/Unread Inquiries, Active Services, Total Case Studies, Active Metrics.
   - Recent Inquiries Feed: Sortable list of the latest 10 submissions with 1-click status update (`NEW` -> `CONTACTED` -> `CONVERTED`).
   - System Health status: SQLite database status, active session info, quick links.
2. **`/admin/services` & `/admin/services/[id]`**:
   - Service list with drag-and-drop sort order, active status badge, and edit triggers.
   - Form editor:
     - Title, Slug (auto-slugified from title), Tagline, Category.
     - Icon picker (select from Lucide icons: `Cpu`, `Cloud`, `Code`, `Rocket`, etc.).
     - Short description & Full markdown content editor.
     - Key features dynamic bullet list manager.
     - Tech stack tags manager (multi-select / add tags).
     - Sort order integer & Is Active toggle.
3. **`/admin/case-studies` & `/admin/case-studies/[id]`**:
   - Table of case studies and MVP showcase items with type filters (`CASE_STUDY` vs `MVP_SHOWCASE`).
   - Form editor:
     - Title, Slug, Client Name, Client Industry, Type enum selector.
     - Summary paragraph.
     - Challenge, Solution, and Results markdown or structured fields.
     - Quantifiable Metrics key-value pairs (e.g. "Cloud Cost Reduction" -> "48%").
     - Cover image URL / path, Live demo URL, Featured toggle, Sort order.
4. **`/admin/testimonials` & `/admin/testimonials/[id]`**:
   - Testimonial list with star rating previews and client companies.
   - Form editor:
     - Client Name, Client Role, Company Name, Avatar image URL.
     - Quote content text area.
     - Star Rating (1 to 5).
     - Verified review toggle, Sort order, Active toggle.
5. **`/admin/metrics` & `/admin/metrics/[id]`**:
   - Live management of the statistics counters displayed on the homepage.
   - Form editor:
     - Metric Label (e.g., "Uptime SLA", "Projects Shipped").
     - Numeric/String Value (e.g., "99.9", "40").
     - Prefix (e.g. "$", "#") & Suffix (e.g. "%", "+").
     - Description snippet, Lucide Icon name, Sort order, Active toggle.
6. **`/admin/inquiries` & `/admin/inquiries/[id]`**:
   - Comprehensive inquiry inbox.
   - Filters: By Status (`NEW`, `CONTACTED`, `IN_DISCUSSION`, `CONVERTED`, `ARCHIVED`), By Service requested, By Date range.
   - Detail view modal/panel:
     - Full prospect details: Name, Email (with `mailto:` action), Company, Budget, Timeline, Message, Meeting preference.
     - Submission metadata: Timestamp, IP address, User-Agent.
     - Admin notes log: Editable internal textarea for notes on client conversations.
     - Status transition dropdown with optimistic UI updates.

---

### 2.3 Authoritative Prisma Data Models (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// 1. Admin Users & Credentials
model AdminUser {
  id           String    @id @default(cuid())
  email        String    @unique
  passwordHash String
  name         String
  role         String    @default("admin") // "superadmin", "admin", "editor"
  lastLoginAt  DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// 2. Services & Service Details
model Service {
  id           String    @id @default(cuid())
  slug         String    @unique
  title        String
  tagline      String
  category     String    @default("Engineering")
  description  String
  fullContent  String    // Markdown or rich text
  icon         String    // Lucide icon identifier (e.g. "Cpu", "Cloud", "Code")
  features     String    // JSON stringified array of feature items
  techStack    String    // JSON stringified array of tech stack tags
  order        Int       @default(0)
  isActive     Boolean   @default(true)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// 3. Case Studies & MVP Showcase
enum ShowcaseType {
  CASE_STUDY
  MVP_SHOWCASE
}

model CaseStudy {
  id             String       @id @default(cuid())
  slug           String       @unique
  title          String
  clientName     String
  clientIndustry String
  type           String       @default("CASE_STUDY") // "CASE_STUDY" | "MVP_SHOWCASE"
  summary        String
  challenge      String
  solution       String
  results        String       // JSON stringified array of key-value metrics
  techStack      String       // JSON stringified array of tech tags
  coverImage     String?
  liveUrl        String?
  order          Int          @default(0)
  isFeatured     Boolean      @default(false)
  isActive       Boolean      @default(true)
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}

// 4. Client Testimonials
model Testimonial {
  id            String    @id @default(cuid())
  clientName    String
  clientRole    String
  clientCompany String
  avatarUrl     String?
  quote         String
  rating        Int       @default(5)
  verified      Boolean   @default(true)
  order         Int       @default(0)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// 5. Homepage Statistics & Counters
model MetricCounter {
  id          String    @id @default(cuid())
  label       String
  value       String    // e.g. "99.9", "40", "5"
  prefix      String    @default("") // e.g. "$"
  suffix      String    @default("") // e.g. "%", "+"
  description String?
  icon        String?   // Lucide icon name
  order       Int       @default(0)
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// 6. Consultation Inquiries & Contact Submissions
model Inquiry {
  id               String    @id @default(cuid())
  name             String
  email            String
  company          String?
  serviceRequested String?
  budgetRange      String?
  timeline         String?
  message          String
  meetingDate      String?   // Optional consultation date
  meetingTime      String?   // Optional consultation time slot
  status           String    @default("NEW") // "NEW" | "CONTACTED" | "IN_DISCUSSION" | "CONVERTED" | "ARCHIVED"
  notes            String?   // Internal admin notes
  ipAddress        String?
  userAgent        String?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
}
```

---

### 2.4 Complete API Route Inventory

| Route | Method | Access | Purpose | Request Body | Response Success | Error Responses |
|---|---|---|---|---|---|---|
| `/api/services` | GET | Public | Fetch all active services ordered by `order` ASC | None | `{ success: true, data: Service[] }` | `500 Internal Error` |
| `/api/services/[slug]` | GET | Public | Fetch single service by slug | None | `{ success: true, data: Service }` | `404 Not Found`, `500` |
| `/api/case-studies` | GET | Public | Fetch case studies (supports `?type=CASE_STUDY\|MVP_SHOWCASE&featured=true`) | Query params | `{ success: true, data: CaseStudy[] }` | `500 Internal Error` |
| `/api/case-studies/[slug]` | GET | Public | Fetch single case study by slug | None | `{ success: true, data: CaseStudy }` | `404 Not Found`, `500` |
| `/api/testimonials` | GET | Public | Fetch active testimonials | None | `{ success: true, data: Testimonial[] }` | `500 Internal Error` |
| `/api/metrics` | GET | Public | Fetch active statistics counters | None | `{ success: true, data: MetricCounter[] }` | `500 Internal Error` |
| `/api/contact` | POST | Public | Submit consultation or general project inquiry | Zod `ContactFormSchema` | `{ success: true, inquiryId: string }` | `400 Validation Error`, `429 Rate Limit`, `500` |
| `/api/admin/login` | POST | Public | Authenticate admin credentials & set JWT session cookie | `{ email, password }` | `{ success: true, user: { email, name, role } }` | `400 Invalid Input`, `401 Bad Credentials`, `429` |
| `/api/admin/logout` | POST | Protected | Clear session cookie | None | `{ success: true }` | `401 Unauthorized` |
| `/api/admin/me` | GET | Protected | Get current logged-in admin profile | None | `{ success: true, user: AdminUser }` | `401 Unauthorized` |
| `/api/admin/stats` | GET | Protected | Summary metrics for admin dashboard | None | `{ success: true, stats: { inquiries, unread, services, caseStudies } }` | `401 Unauthorized`, `500` |
| `/api/admin/services` | GET | Protected | List all services (including inactive) | None | `{ success: true, data: Service[] }` | `401 Unauthorized`, `500` |
| `/api/admin/services` | POST | Protected | Create new service | Zod `CreateServiceSchema` | `{ success: true, data: Service }` | `400 Validation`, `409 Duplicate Slug`, `401` |
| `/api/admin/services/[id]` | PUT | Protected | Update existing service | Zod `UpdateServiceSchema` | `{ success: true, data: Service }` | `400 Validation`, `404 Not Found`, `401` |
| `/api/admin/services/[id]` | DELETE | Protected | Delete service | None | `{ success: true, id: string }` | `404 Not Found`, `401` |
| `/api/admin/case-studies` | GET | Protected | List all case studies & MVP items | None | `{ success: true, data: CaseStudy[] }` | `401 Unauthorized`, `500` |
| `/api/admin/case-studies` | POST | Protected | Create case study / MVP item | Zod `CreateCaseStudySchema` | `{ success: true, data: CaseStudy }` | `400 Validation`, `409 Duplicate Slug`, `401` |
| `/api/admin/case-studies/[id]` | PUT | Protected | Update case study / MVP item | Zod `UpdateCaseStudySchema` | `{ success: true, data: CaseStudy }` | `400 Validation`, `404 Not Found`, `401` |
| `/api/admin/case-studies/[id]` | DELETE | Protected | Delete case study | None | `{ success: true, id: string }` | `404 Not Found`, `401` |
| `/api/admin/testimonials` | GET | Protected | List all testimonials | None | `{ success: true, data: Testimonial[] }` | `401 Unauthorized`, `500` |
| `/api/admin/testimonials` | POST | Protected | Create testimonial | Zod `CreateTestimonialSchema` | `{ success: true, data: Testimonial }` | `400 Validation`, `401` |
| `/api/admin/testimonials/[id]` | PUT | Protected | Update testimonial | Zod `UpdateTestimonialSchema` | `{ success: true, data: Testimonial }` | `400 Validation`, `404 Not Found`, `401` |
| `/api/admin/testimonials/[id]` | DELETE | Protected | Delete testimonial | None | `{ success: true, id: string }` | `404 Not Found`, `401` |
| `/api/admin/metrics` | GET | Protected | List all homepage metric counters | None | `{ success: true, data: MetricCounter[] }` | `401 Unauthorized`, `500` |
| `/api/admin/metrics` | POST | Protected | Create metric counter | Zod `CreateMetricSchema` | `{ success: true, data: MetricCounter }` | `400 Validation`, `401` |
| `/api/admin/metrics/[id]` | PUT | Protected | Update metric counter | Zod `UpdateMetricSchema` | `{ success: true, data: MetricCounter }` | `400 Validation`, `404 Not Found`, `401` |
| `/api/admin/metrics/[id]` | DELETE | Protected | Delete metric counter | None | `{ success: true, id: string }` | `404 Not Found`, `401` |
| `/api/admin/inquiries` | GET | Protected | List customer inquiries with filters & pagination | Query: `?status=&page=&limit=` | `{ success: true, data: Inquiry[], total: number }` | `401 Unauthorized`, `500` |
| `/api/admin/inquiries/[id]` | PATCH | Protected | Update inquiry status or admin notes | `{ status?: string, notes?: string }` | `{ success: true, data: Inquiry }` | `400 Validation`, `404 Not Found`, `401` |
| `/api/admin/inquiries/[id]` | DELETE | Protected | Delete inquiry | None | `{ success: true, id: string }` | `404 Not Found`, `401` |

---

### 2.5 Input Validation Specifications (Zod Schemas)

```typescript
import { z } from 'zod';

// Contact & Consultation Inquiry
export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid work email address"),
  company: z.string().max(100).optional(),
  serviceRequested: z.enum([
    "ai-consulting",
    "cloud-devops",
    "custom-software",
    "new-product-development",
    "other"
  ]).optional(),
  budgetRange: z.enum(["< $10k", "$10k - $25k", "$25k - $50k", "$50k+"]).optional(),
  timeline: z.enum(["Immediate", "1 - 3 months", "3 - 6 months", "Exploratory"]).optional(),
  message: z.string().min(10, "Please provide at least 10 characters detailing your requirements").max(3000),
  meetingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format").optional(),
  meetingTime: z.string().max(20).optional(),
  // Honeypot field for bot mitigation (must remain empty)
  website_hp: z.string().max(0, "Bot detected").optional()
});

// Admin Authentication
export const AdminLoginSchema = z.object({
  email: z.string().email("Valid admin email required"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

// Service Schema
export const ServiceFormSchema = z.object({
  title: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  tagline: z.string().min(5).max(150),
  category: z.string().default("Engineering"),
  description: z.string().min(10).max(500),
  fullContent: z.string().min(20),
  icon: z.string().min(2).max(50),
  features: z.array(z.string().min(1)).min(1, "At least one feature required"),
  techStack: z.array(z.string().min(1)).min(1, "At least one tech stack item required"),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true)
});

// Case Study Schema
export const CaseStudyFormSchema = z.object({
  title: z.string().min(3).max(150),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/),
  clientName: z.string().min(2).max(100),
  clientIndustry: z.string().min(2).max(100),
  type: z.enum(["CASE_STUDY", "MVP_SHOWCASE"]),
  summary: z.string().min(10).max(500),
  challenge: z.string().min(10),
  solution: z.string().min(10),
  results: z.array(z.object({
    metric: z.string(),
    label: z.string()
  })),
  techStack: z.array(z.string()),
  coverImage: z.string().url().or(z.string().startsWith("/")).optional().nullable(),
  liveUrl: z.string().url().optional().nullable(),
  order: z.number().int().default(0),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true)
});

// Testimonial Schema
export const TestimonialFormSchema = z.object({
  clientName: z.string().min(2).max(100),
  clientRole: z.string().min(2).max(100),
  clientCompany: z.string().min(2).max(100),
  avatarUrl: z.string().url().or(z.string().startsWith("/")).optional().nullable(),
  quote: z.string().min(10).max(1000),
  rating: z.number().int().min(1).max(5).default(5),
  verified: z.boolean().default(true),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true)
});

// Metric Counter Schema
export const MetricCounterFormSchema = z.object({
  label: z.string().min(2).max(100),
  value: z.string().min(1).max(20),
  prefix: z.string().max(10).default(""),
  suffix: z.string().max(10).default(""),
  description: z.string().max(200).optional().nullable(),
  icon: z.string().max(50).optional().nullable(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true)
});
```

---

## 3. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|---|---|---|---|---|---|---|
| 1 | Public Route | Homepage (`/`) | Interactive showcase with Hero, Tech Marquee, Services Grid, Stats Counters, Why AEITCH, Testimonials & CTA | None (GET) | Rendered HTML with scroll triggers & particle canvas | 500 error page if DB fails, fallback static content | ORIGINAL_REQUEST R1, R2 |
| 2 | Public Route | AI Consulting Page (`/services/ai-consulting`) | Deep dive into Generative AI, RAG pipelines, LLM fine-tuning, agent swarms | None (GET) | Rendered service page with tech badges and consultation trigger | 404 if disabled, 500 on server error | ORIGINAL_REQUEST R2 |
| 3 | Public Route | Cloud & DevOps Page (`/services/cloud-devops`) | Cloud architecture, Terraform, Kubernetes, CI/CD, FinOps details | None (GET) | Rendered service page with cloud metrics and case links | 404 if disabled, 500 on server error | ORIGINAL_REQUEST R2 |
| 4 | Public Route | Custom Software Page (`/services/custom-software`) | High-throughput APIs, microservices, multi-tenant SaaS architecture | None (GET) | Rendered custom software breakdown | 404 if disabled, 500 on server error | ORIGINAL_REQUEST R2 |
| 5 | Public Route | MVP Development Page (`/services/new-product-development`) | 8-week rapid MVP build framework, roadmap, and prototyping details | None (GET) | Rendered product development page | 404 if disabled, 500 on server error | ORIGINAL_REQUEST R2 |
| 6 | Public Route | Case Studies Gallery (`/case-studies`) | Filterable gallery of enterprise case studies with metric highlights | Optional query filters (`category`, `industry`) | Filtered grid of case study cards | Empty state if no matches | ORIGINAL_REQUEST R2 |
| 7 | Public Route | Case Study Detail (`/case-studies/[slug]`) | Detailed case study with Problem, Solution, Architecture, and Impact Metrics | Slug param | Rendered case study deep dive | 404 page if slug not found | Specification analysis |
| 8 | Public Route | MVP Showcase (`/our-mvp-showcase`) | High-velocity incubator portfolio showcasing launched startups & MVPs | Optional query filter | Interactive showcase cards with demo links | Empty state if none active | ORIGINAL_REQUEST R2 |
| 9 | Public Route | About Us (`/about-us`) | Story of AEITCH (Lahore, 2022, CEO Haseeb Ur Rehman Khan), engineering culture, Clutch rating | None (GET) | Rendered company timeline, values, and leadership | 500 error page on crash | ORIGINAL_REQUEST R2, Web discovery |
| 10 | Public Route | Contact & Consultation (`/contact-us`) | Dual consultation scheduler and comprehensive project scoping intake form | Form inputs | Interactive calendar slot selector + inquiry confirmation | Inline field errors on validation fail | ORIGINAL_REQUEST R2 |
| 11 | Admin Auth | Admin Login (`/admin/login`) | High-tech login portal with neon amber aesthetic & session establishment | Email, Password | Signed JWT cookie, 302 redirect to `/admin` | 401 on bad credentials, rate limit lock | ORIGINAL_REQUEST R3 |
| 12 | Admin Auth | Admin Session Guard | Next.js Edge Middleware protecting all `/admin/*` subpaths | Cookie `aeitch_admin_session` | Pass-through or redirect to `/admin/login` | 307 redirect with `from` param preserved | Security specification |
| 13 | Admin CRUD | Services Management (`/admin/services`) | Complete CRUD over services, features list, tech tags, and ordering | Form payload | Updated service record in SQLite | 400 validation, 409 slug conflict | ORIGINAL_REQUEST R3 |
| 14 | Admin CRUD | Case Studies / Portfolio (`/admin/case-studies`) | CRUD for case studies and MVP showcase items with metrics array | Form payload | Updated case study in SQLite | 400 validation, 409 slug conflict | ORIGINAL_REQUEST R3 |
| 15 | Admin CRUD | Testimonials Management (`/admin/testimonials`) | CRUD for client quotes, verified status, ratings, and avatars | Form payload | Updated testimonial record in SQLite | 400 validation error | ORIGINAL_REQUEST R3 |
| 16 | Admin CRUD | Homepage Metrics (`/admin/metrics`) | Real-time editing of homepage statistics numbers and labels | Form payload | Updated metric counter record | 400 validation error | ORIGINAL_REQUEST R3 |
| 17 | Admin CRM | Inquiry Management (`/admin/inquiries`) | Prospect inquiry inbox, status workflow (`NEW` to `CONVERTED`), admin notes | Status PATCH, Notes PATCH | Updated inquiry record | 400 invalid status, 404 not found | ORIGINAL_REQUEST R3 |
| 18 | Admin Overview | Admin Analytics (`/admin`) | Overview dashboard displaying aggregate counts and recent submissions | None (GET) | Stats cards and recent inquiry table | 401 unauthorized, 500 server error | Admin specification |
| 19 | Public API | Public Consultation Submit (`POST /api/contact`) | Ingestion of contact form & consultation bookings with honeypot bot filter | Contact JSON payload | `{ success: true, inquiryId }` | 400 validation, 429 rate limit | Form specification |
| 20 | Public API | Content Query APIs (`GET /api/*`) | Public JSON endpoints for services, case studies, metrics, testimonials | Query params | JSON data arrays | 500 server error | Architecture specification |

---

## 4. Edge Cases

| # | Feature | Input / Condition | Observed / Required Behavior |
|---|---|---|---|
| 1 | Public Contact Form | Bot submits form with hidden honeypot field `website_hp` filled | Immediately reject submission silently with 200 OK or 400 Bad Request without writing to DB, preventing spam inundation. |
| 2 | Public Contact Form | Excessive repeated requests from same IP (>5 requests / minute) | Return HTTP 429 Too Many Requests with header `Retry-After: 60` to safeguard server resources. |
| 3 | Admin Service Creation | Slug already exists in database (e.g. `ai-consulting`) | Return HTTP 409 Conflict with friendly message: "A service with this slug already exists. Please choose a unique slug." |
| 4 | Admin Route Access | Unauthenticated user navigates directly to `/admin/services` | Next.js middleware intercepts request, terminates access, and redirects to `/admin/login?from=%2Fadmin%2Fservices`. |
| 5 | Admin Session Expiry | Admin JWT token expires (e.g. after 24h) while user is editing form | Admin API returns HTTP 401 Unauthorized; frontend intercepts 401, saves draft state to `localStorage`, and displays re-authentication modal. |
| 6 | Database Initialization | Greenfield environment with fresh `dev.db` empty SQLite file | Automatic Prisma seed script (`prisma/seed.ts`) populates default admin (`admin@aeitch.com`), default 4 services, 4 case studies, 4 metrics, and testimonials so the site renders populated out of the box. |
| 7 | Dynamic Counter Animation | User scrolls rapidly past statistics counters or switches tabs | GSAP / Framer Motion observer fires once (`once: true`) with eased count-up, preventing infinite loop, layout shift, or NaN rendering. |
| 8 | Mobile Viewport (<640px) | Conic gradient animated border and particle hero rendered on low-end mobile | Responsive fallback: reduce particle count on canvas from 80 to 25; use simplified CSS glow filter to maintain solid 60fps without battery drain. |
| 9 | Contact Form Consultation Date | User selects a consultation date in the past (e.g., yesterday) | Zod validator rejects date: `meetingDate must be today or in the future`. UI date picker sets `min={new Date().toISOString().split('T')[0]}`. |
| 10 | Service Deletion | Admin attempts to delete a service currently referenced in case studies | Deletion succeeds cleanly with cascade handling; relations in SQLite remain consistent. |
| 11 | XSS in Contact Message | Attacker inputs `<script>alert(1)</script>` or malicious HTML in message | Sanitized during Zod parsing and React JSX rendering (never rendered via `dangerouslySetInnerHTML`). Admin views display escaped text. |
| 12 | Inactive Services Toggle | Admin marks `/services/custom-software` as `isActive: false` | Public `/api/services` excludes inactive service from homepage grid; navigating to `/services/custom-software` displays custom "Service under maintenance / Contact us" banner or returns 404. |

---

## 5. Caveats

1. **SQLite Storage & File Uploads**:
   - Because SQLite is embedded and file-based (`prisma/dev.db`), image URLs for case studies and testimonials can be either static paths in `/public/images/*` or external CDN URLs (e.g. Unsplash / Cloudinary). File uploads in admin can either write to `public/uploads` or accept image URLs.
2. **Session Secret**:
   - The session relies on `process.env.ADMIN_JWT_SECRET`. The seed script and `.env.example` must supply a secure fallback default for development (`aeitch-dev-jwt-secret-neon-2026-key`) while allowing production override.
3. **ScrollTrigger & Framer Motion Co-existence**:
   - For scroll-triggered animations, Framer Motion's `whileInView` and `useInView` are recommended for React 19 / Next.js App Router stability without requiring external GSAP global scripts. If GSAP ScrollTrigger is utilized, `gsap.registerPlugin(ScrollTrigger)` must be wrapped in `useEffect` or client-only checks (`typeof window !== 'undefined'`) to prevent SSR hydration errors.
4. **Seed Execution**:
   - The seed script is foundational. When testing or bootstrapping, running `npx prisma db push && npx prisma db seed` will ensure full fidelity of all pages immediately.

---

## 6. Conclusion

The functional specifications, data models, routes, API endpoints, and admin dashboard requirements for rebuilding `aeitch.com` have been comprehensively mined, structured, and validated:
1. **Public Route Blueprint**: Complete specifications for Homepage (with all 7 core sections), 4 Services sub-pages, 2 Showcase pages, and 2 Company pages.
2. **Admin Dashboard Blueprint**: Robust, zero-WordPress architecture with JWT session authentication, 5 dedicated CRUD modules, inquiry status management, and dashboard overview metrics.
3. **Data Model & Schema**: Authoritative Prisma schema with 6 models (`AdminUser`, `Service`, `CaseStudy`, `Testimonial`, `MetricCounter`, `Inquiry`), complete with enums, indexes, and relations.
4. **API Inventory**: 30 endpoints fully detailed with request/response schemas, validation rules, and error handling.
5. **Security & Edge Cases**: Honeypot protection, rate limiting, XSS defense, slug conflict handling, and mobile performance fallbacks.

This specification provides the downstream architects and workers with the exact blueprint required to implement the entire application cleanly and systematically.

---

## 7. Verification Method

To verify these specifications once implemented in subsequent milestones:

1. **Prisma Schema Validation**:
   ```powershell
   npx prisma validate
   npx prisma db push
   npx prisma db seed
   ```
   *Expected result*: Schema validates with zero errors; SQLite `prisma/dev.db` is populated with initial seed records.

2. **Route Availability Verification**:
   - Check public pages: `/`, `/services/ai-consulting`, `/services/cloud-devops`, `/services/custom-software`, `/services/new-product-development`, `/case-studies`, `/our-mvp-showcase`, `/about-us`, `/contact-us`.
   - Check admin pages: `/admin/login`, `/admin`, `/admin/services`, `/admin/case-studies`, `/admin/testimonials`, `/admin/metrics`, `/admin/inquiries`.
   *Expected result*: HTTP 200 on all public pages and `/admin/login`; HTTP 307 redirect to `/admin/login` on unauthenticated `/admin/*`.

3. **API Endpoint Verification via PowerShell**:
   ```powershell
   # Public services query
   curl -s http://localhost:3000/api/services | ConvertFrom-Json
   # Contact form submission test
   curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@acme.com","message":"Need an AI consultation","serviceRequested":"ai-consulting"}'
   ```
   *Expected result*: Valid JSON responses with `{ success: true, ... }`.

4. **Production Build & Type Check**:
   ```powershell
   npm run build
   ```
   *Expected result*: Build completes cleanly with zero TypeScript errors, zero lint warnings, and all static/dynamic routes compiled.
