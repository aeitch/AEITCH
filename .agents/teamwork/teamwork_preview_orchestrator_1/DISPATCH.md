# Dispatch Log

## 2026-09-26T22:12:44Z
From Sentinel (Caller ID: 371d0f9d-79ed-4824-96d0-c7deb617fd68):
Rebuild the aeitch.com enterprise digital agency website from scratch into an ultra-premium, high-performance web application featuring custom scroll-triggered animations and an integrated backend administrative dashboard to manage services, case studies, and page content, strictly preserving the signature dark high-tech visual identity and neon orange (#E9800A) aesthetic while fully replacing WordPress.

Key Requirements:
1. R1. Signature Theme & Scroll-Trigger Choreography:
   - Deep dark surfaces (`#0a0a0a`, `#0f0f11`) with electric neon amber/orange glowing accents (`#E9800A`).
   - Animated glowing borders with rotating conic gradients, cursor-driven radial glow cards, and particle logo/metaball canvas.
   - Smooth scroll-triggered animations (GSAP ScrollTrigger / Framer Motion) for section reveals, counters, card cascades, and text transitions.
   - Zero deviation from established brand palette and aesthetic.
2. R2. Homepage-First Architecture & Multi-Page Migration:
   - Pixel-perfect, interactive Home Page: Hero with Consultation CTA, Animated Tech Stack Carousel, SaaS & AI Services showcase, Animated Statistics Counters, Why AEITCH interactive glowing cards, Testimonial sections.
   - Full modular page routes:
     - Services: `/services/ai-consulting`, `/services/cloud-devops`, `/services/custom-software`, `/services/new-product-development`
     - Showcase: `/case-studies`, `/our-mvp-showcase`
     - Company: `/about-us`, `/contact-us` with consultation scheduling integration
3. R3. Custom Full-Fledged Headless Admin Dashboard (Zero WordPress):
   - Secure admin dashboard (`/admin`) using Next.js App Router and Prisma/SQLite.
   - Complete CRUD controls for Services & detail pages, Case studies & testimonials & portfolio items, Homepage metrics/counters/highlights, Consultation inquiry and contact form management.
4. Acceptance Criteria:
   - Dark surfaces, #E9800A neon glow highlights, glowing border effects.
   - ScrollTrigger animations trigger smoothly on scroll entrance across all major homepage sections without layout shift or frame drops.
   - Fully responsive on mobile, tablet, desktop, ultra-wide.
   - Zero WordPress/PHP dependencies; Next.js + Prisma.
   - Functional admin dashboard with authenticated access allowing real-time edits to site services, case studies, page content.
   - Project builds cleanly (`npm run build`) with zero lint or TypeScript errors.
