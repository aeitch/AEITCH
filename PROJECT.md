# Project: aeitch.com Greenfield Rebuild

## Architecture
The application is architected as an ultra-premium, full-stack Next.js 15 App Router web application backed by SQLite via Prisma ORM. It completely replaces the legacy WordPress/PHP system with a high-performance, single-codebase architecture.

### Technology Stack
- **Framework**: Next.js 15 (App Router, Server Components + Client Islands)
- **Language**: TypeScript 5 with strict type checking
- **Styling**: Tailwind CSS 3.4 with custom design tokens (`#0a0a0a`, `#0f0f11`, `#E9800A`)
- **Animation & Motion**: Framer Motion 12, CSS `@property --conic-angle` GPU interpolation, HTML5 2D Canvas for particles
- **Database & ORM**: SQLite (`prisma/dev.db`) + Prisma ORM 6.4 (singleton client on `globalThis`)
- **Authentication**: Pure JS `jose` (Web Crypto JWT session cookies) + `bcryptjs` (salt-hashing) with Edge Middleware guard
- **Validation**: Zod 3.24 schemas for all form and API inputs
- **Icons**: Lucide React 1.48

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Architecture & Scaffolding | Dependencies, TypeScript config, Tailwind config, Next.js config | M1 | survey_3 |
| 2 | SQLite Data Models & Prisma ORM | Prisma schema with 6 models: AdminUser, Service, CaseStudy, Testimonial, MetricCounter, Inquiry | M1 | survey_1 |
| 3 | Database Seeding Script | Populate default admin, 4 services, 4 case studies, 4 metrics, testimonials | M1 | survey_1 |
| 4 | Authentication Utilities & Edge Middleware | Pure JS JWT cookie session, password hashing, and /admin edge guard | M1 | survey_3 |
| 5 | Input Validation Schemas | Zod schemas for contact, consultation, admin login, and CRUD models | M1 | survey_1 |
| 6 | Brand Design Tokens & Neon Orange Palette | Obsidian void (`#0a0a0a`), surface elevations, neon amber/orange (`#E9800A`), specular flame (`#FFA63D`) | M2 | survey_2 |
| 7 | Conic Gradient Animated Borders | 60fps GPU rotating conic gradient border component with accelerated hover | M2 | survey_2 |
| 8 | Cursor-Driven Radial Glow Cards | Non-blocking pointer spotlight updating CSS custom properties | M2 | survey_2 |
| 9 | Hero Particle Canvas Component | High-DPI HTML5 2D canvas with electrostatic repulsion & vector lines | M2 | survey_2 |
| 10 | Animated Counter Component | Eased numeric counter using easeOutExpo and IntersectionObserver (CLS = 0) | M2 | survey_2 |
| 11 | Scroll-Triggered Reveal Wrappers | Smooth entrance transitions, card cascades, and stagger containers | M2 | survey_2 |
| 12 | Global Layout & Navigation | Sticky navbar with consultation CTA, mobile drawer, comprehensive footer | M2 | survey_1 |
| 13 | Interactive Homepage Hero | Hero with particle canvas, high-tech badge, headline, and consultation CTA | M3 | ORIGINAL_REQUEST R2 |
| 14 | Infinite Tech Stack Marquee | Auto-scrolling enterprise tech logos with gradient edge fade masks | M3 | ORIGINAL_REQUEST R2 |
| 15 | SaaS & AI Services Bento Grid | 4 core service cards with radial glow hover and conic borders | M3 | ORIGINAL_REQUEST R2 |
| 16 | Homepage Animated Statistics Counters | Live data counters for uptime, deliveries, velocity, satisfaction | M3 | ORIGINAL_REQUEST R2 |
| 17 | Why AEITCH Bento Cards | 4 interactive value cards with dark neon aesthetics | M3 | ORIGINAL_REQUEST R2 |
| 18 | Client Testimonials Carousel | Verified client reviews with ratings, avatars, and company badges | M3 | ORIGINAL_REQUEST R2 |
| 19 | High-Impact Consultation CTA Banner | Electric orange glowing callout banner with direct scheduler trigger | M3 | ORIGINAL_REQUEST R2 |
| 20 | Dedicated Service: AI Consulting | `/services/ai-consulting`: Generative AI, LLMs, RAG pipelines, agents | M4 | ORIGINAL_REQUEST R2 |
| 21 | Dedicated Service: Cloud & DevOps | `/services/cloud-devops`: Multi-cloud, Terraform, Kubernetes, FinOps | M4 | ORIGINAL_REQUEST R2 |
| 22 | Dedicated Service: Custom Software | `/services/custom-software`: High-throughput APIs, microservices, SaaS | M4 | ORIGINAL_REQUEST R2 |
| 23 | Dedicated Service: MVP Development | `/services/new-product-development`: 8-week rapid MVP build framework | M4 | ORIGINAL_REQUEST R2 |
| 24 | Case Studies Gallery & Details | `/case-studies` filterable gallery and `/case-studies/[slug]` deep dive | M4 | ORIGINAL_REQUEST R2 |
| 25 | MVP Showcase Gallery | `/our-mvp-showcase`: Startup incubator showcase with demo links | M4 | ORIGINAL_REQUEST R2 |
| 26 | About Us Page | `/about-us`: AEITCH story, culture, leadership, 5.0 Clutch rating | M4 | ORIGINAL_REQUEST R2 |
| 27 | Contact Us & Consultation Scheduler | `/contact-us`: Dual-mode consultation scheduler and project scoping form | M4 | ORIGINAL_REQUEST R2 |
| 28 | Public Intake API Endpoints | `POST /api/contact` & `POST /api/consultation` with bot honeypot | M4 | survey_1 |
| 29 | Public Content APIs | `GET /api/services`, `/api/case-studies`, `/api/testimonials`, `/api/metrics` | M4 | survey_1 |
| 30 | Admin Authentication Portal | `/admin/login` and `/api/admin/login`, `/api/admin/logout`, `/api/admin/me` | M5 | ORIGINAL_REQUEST R3 |
| 31 | Admin Dashboard Overview | `/admin`: KPI stats cards, recent inquiries table with status switcher | M5 | ORIGINAL_REQUEST R3 |
| 32 | Admin Services CRUD | `/admin/services` & `[id]`: Create, edit, delete, toggle active, sort | M5 | ORIGINAL_REQUEST R3 |
| 33 | Admin Case Studies CRUD | `/admin/case-studies` & `[id]`: Create, edit, delete case studies & MVPs | M5 | ORIGINAL_REQUEST R3 |
| 34 | Admin Testimonials CRUD | `/admin/testimonials` & `[id]`: Create, edit, delete client testimonials | M5 | ORIGINAL_REQUEST R3 |
| 35 | Admin Metrics CRUD | `/admin/metrics` & `[id]`: Real-time editing of homepage statistics numbers | M5 | ORIGINAL_REQUEST R3 |
| 36 | Admin Inquiries CRM | `/admin/inquiries` & `[id]`: Filterable lead inbox, status workflow, notes | M5 | ORIGINAL_REQUEST R3 |
| 37 | End-to-End Automated Test Suite | Vitest unit/component/API suite + E2E Playwright test harness | M6 | survey_3 |
| 38 | Clean Production Build Verification | Zero TypeScript or lint errors on `npm run build` | M6 | ORIGINAL_REQUEST |
| 39 | Forensic Integrity Audit | Systematic runtime check verifying authentic database logic & no facades | M6 | Integrity Policy |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Foundation & Core Infrastructure | Dependencies, Prisma schema, DB seed, Auth utilities, Edge middleware, Zod schemas | none | DONE (Verified: 63 tests pass, clean audit) |
| M2 | Design System & UI Primitives | Global CSS, design tokens, Navbar, Footer, Conic border, Radial glow, Particle canvas, Counter | M1 | DONE (Verified: 47 tests pass, clean audit) |
| M3 | Interactive Homepage & Choreography | Homepage hero, tech carousel, services showcase, stats counters, Why AEITCH, testimonials, CTA | M2 | IN_PROGRESS (worker: a1312383) |
| M4 | Multi-Page Routes & Public APIs | 4 service detail pages, case studies & MVP showcase, about-us, contact-us with scheduler, public APIs | M3 | PLANNED |
| M5 | Headless Admin Dashboard | Admin auth, overview, Services CRUD, Case studies CRUD, Testimonials CRUD, Metrics CRUD, Inquiries CRM | M4 | PLANNED |
| M6 | E2E Testing, Adversarial Hardening & Audit | 100% E2E test pass, clean `npm run build`, adversarial hardening, forensic integrity audit | M5 | PLANNED |

---

## Code Layout
```
h:/AEITCH/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── logo.svg
│   └── images/
├── src/
│   ├── middleware.ts
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── services/
│   │   ├── case-studies/
│   │   ├── our-mvp-showcase/
│   │   ├── about-us/
│   │   ├── contact-us/
│   │   ├── admin/
│   │   └── api/
│   ├── components/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── ui/
│   │   ├── forms/
│   │   └── admin/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── validations.ts
│   │   └── utils.ts
│   └── types/
└── tests/
    ├── setup.ts
    ├── unit/
    ├── components/
    ├── api/
    └── e2e/
```

---

## Interface Contracts

### 1. Database Singleton (`src/lib/prisma.ts`)
```typescript
import { PrismaClient } from '@prisma/client';
export const prisma: PrismaClient;
```

### 2. Authentication Utilities (`src/lib/auth.ts`)
```typescript
export interface AdminSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}
export function signAdminToken(payload: AdminSessionPayload): Promise<string>;
export function verifyAdminToken(token: string): Promise<AdminSessionPayload | null>;
export function getAdminSession(): Promise<AdminSessionPayload | null>;
```

### 3. Edge Guard (`src/middleware.ts`)
- Matches: `/admin/:path*`, `/api/admin/:path*`
- Whitelists: `/admin/login`, `/api/admin/login`
- Cookie: `aeitch_admin_session`

### 4. Public API Contracts
- `POST /api/contact`: Accepts `{ name, email, company?, serviceRequested?, budgetRange?, timeline?, message, meetingDate?, meetingTime?, website_hp? }`, returns `{ success: true, inquiryId: string }`.
- `GET /api/services`: Returns `{ success: true, data: Service[] }`.
- `GET /api/case-studies`: Returns `{ success: true, data: CaseStudy[] }`.
- `GET /api/metrics`: Returns `{ success: true, data: MetricCounter[] }`.
- `GET /api/testimonials`: Returns `{ success: true, data: Testimonial[] }`.

### 5. Admin API Contracts
- `POST /api/admin/login`: Accepts `{ email, password }`, returns `{ success: true, user }` and sets HttpOnly cookie.
- `POST /api/admin/logout`: Clears session cookie.
- `GET/POST /api/admin/services`: List/Create services.
- `PUT/DELETE /api/admin/services/[id]`: Update/Delete service.
- `GET/POST /api/admin/case-studies`: List/Create case studies.
- `PUT/DELETE /api/admin/case-studies/[id]`: Update/Delete case study.
- `GET/POST /api/admin/testimonials`: List/Create testimonials.
- `PUT/DELETE /api/admin/testimonials/[id]`: Update/Delete testimonial.
- `GET/POST /api/admin/metrics`: List/Create metric counters.
- `PUT/DELETE /api/admin/metrics/[id]`: Update/Delete metric counter.
- `GET /api/admin/inquiries`: Query inquiries with filter & pagination.
- `PATCH /api/admin/inquiries/[id]`: Update status (`NEW` -> `CONTACTED` -> `CONVERTED`) or admin notes.
