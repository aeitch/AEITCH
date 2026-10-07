# Original User Request

## Initial Request — 2026-09-26T22:12:01Z

Rebuild the aeitch.com enterprise digital agency website from scratch into an ultra-premium, high-performance web application featuring custom scroll-triggered animations and an integrated backend administrative dashboard to manage services, case studies, and page content, strictly preserving the signature dark high-tech visual identity and neon orange (#E9800A) aesthetic while fully replacing WordPress.

Working directory: h:/AEITCH
Integrity mode: development

## Requirements

### R1. Signature Theme & Scroll-Trigger Choreography
Faithfully replicate and elevate the signature AEITCH visual identity:
- Deep dark surfaces (`#0a0a0a`, `#0f0f11`) with electric neon amber/orange glowing accents (`#E9800A`).
- Animated glowing borders with rotating conic gradients, cursor-driven radial glow cards, and particle logo/metaball canvas.
- Smooth scroll-triggered animations (GSAP ScrollTrigger / Framer Motion) for section reveals, counters, card cascades, and text transitions.
- Zero deviation from the established brand palette and aesthetic.

### R2. Homepage-First Architecture & Multi-Page Migration
- Implement the pixel-perfect, interactive Home Page including Hero with Consultation CTA, Animated Tech Stack Carousel, SaaS & AI Services showcase, Animated Statistics Counters, Why AEITCH interactive glowing cards, and Testimonial sections.
- Structure modular page routes ready for all remaining sub-pages:
  - Services: AI Consulting (`/services/ai-consulting`), Cloud & DevOps (`/services/cloud-devops`), Custom Software (`/services/custom-software`), New Product Development (`/services/new-product-development`).
  - Showcase: Case Studies (`/case-studies`) and MVP Showcase (`/our-mvp-showcase`).
  - Company: About Us (`/about-us`) and Contact Us (`/contact-us`) with consultation scheduling integration.

### R3. Custom Full-Fledged Headless Admin Dashboard (Zero WordPress)
- Build a dedicated, secure administrative dashboard (`/admin`) using Next.js App Router and Prisma/SQLite.
- Complete CRUD controls for:
  - Services & service detail pages
  - Case studies, testimonials, and portfolio items
  - Homepage metrics, counters, and highlights
  - Consultation inquiry and contact form management

## Acceptance Criteria

### Visual Fidelity & ScrollTrigger Animations
- [ ] Theme strictly matches AEITCH brand styling: dark background surfaces, `#E9800A` neon glow highlights, and glowing border effects.
- [ ] ScrollTrigger animations trigger smoothly on scroll entrance across all major homepage sections without layout shift or frame drops.
- [ ] Fully responsive on mobile, tablet, desktop, and ultra-wide screens.

### Dashboard & Functionality
- [ ] Zero WordPress / PHP dependencies; fully powered by Next.js and Prisma.
- [ ] Functional admin dashboard with authenticated access allowing real-time edits to site services, case studies, and page content.
- [ ] Project builds cleanly (`npm run build`) with zero lint or TypeScript errors.
