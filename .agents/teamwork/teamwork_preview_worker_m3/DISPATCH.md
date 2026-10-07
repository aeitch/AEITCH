## 2026-09-27T00:15:00Z
You are teamwork_preview_worker_m3.
Your working directory is h:/AEITCH/.agents/teamwork/teamwork_preview_worker_m3.
You MUST read the authoritative user request at h:/AEITCH/.agents/teamwork/ORIGINAL_REQUEST.md before starting work.
You should also read the project specification at h:/AEITCH/PROJECT.md and the survey reports:
- h:/AEITCH/.agents/teamwork/teamwork_preview_explorer_survey_2/handoff.md
- h:/AEITCH/.agents/teamwork/teamwork_preview_spec_miner_survey_1/handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Milestone: M3 - Interactive Homepage & Choreography
Exclusive File Ownership:
- src/app/page.tsx
- src/components/home/hero-section.tsx
- src/components/home/tech-carousel.tsx
- src/components/home/services-showcase.tsx
- src/components/home/stats-counter.tsx
- src/components/home/why-aeitch.tsx
- src/components/home/testimonials-section.tsx
- src/components/home/cta-banner.tsx
- tests/components/homepage.test.tsx

Tasks:
1. Implement the complete interactive Homepage in `src/app/page.tsx` and `src/components/home/*`:
   - `hero-section.tsx`: Hero section featuring `ParticleCanvas` (or `HeroParticleCanvas`), high-tech badge "ENTERPRISE SOFTWARE & AI SYSTEMS", bold display headline "Architecting High-Performance Cloud, AI, and Software Platforms", subhead, dual CTAs: Primary "Schedule a Consultation" (`/contact-us#consultation`), Secondary "Explore Case Studies" (`/case-studies`).
   - `tech-carousel.tsx`: Infinite auto-scrolling tech stack marquee with Next.js, React, TypeScript, Python, PyTorch, LangChain, AWS, Google Cloud, Azure, Docker, Kubernetes, Terraform, PostgreSQL, Redis, GraphQL with gradient edge fade masks.
   - `services-showcase.tsx`: Bento grid of the 4 core service pillars (AI Consulting, Cloud & DevOps, Custom Software, Rapid MVP) utilizing `SpotlightCard` / `RadialGlowCard` and `GlowingConicCard` / `GlowingConicBorder`. Direct links to `/services/*` with "Explore Service ->" interactions.
   - `stats-counter.tsx`: Live statistics dynamically fetched from SQLite `MetricCounter` table (or fallback defaults from seed) using `AnimatedCounter` with zero Cumulative Layout Shift (CLS = 0).
   - `why-aeitch.tsx`: 4 glowing bento value cards (Production-Hardened Engineering, AI-Native Systems, Cloud & FinOps Mastery, Direct Architect Access) with dark neon aesthetics.
   - `testimonials-section.tsx`: Verified client feedback carousel fetched from SQLite `Testimonial` table with star ratings, client avatars, role, company name, and verified badges.
   - `cta-banner.tsx`: Electric amber neon glowing callout banner with direct consultation scheduler trigger.
2. Ensure smooth scroll-triggered choreography using `ScrollReveal`, `StaggerContainer`, and `StaggerItem` across all sections without layout shift or frame drops.
3. Ensure full responsive design across mobile, tablet, laptop, and ultra-wide screens.
4. Author comprehensive component tests in `tests/components/homepage.test.tsx` verifying section rendering, CTAs, links, and props.
5. Verify build health:
   - `npx tsc --noEmit` (zero errors)
   - `npm test` (all tests pass)
   - `npm run build` (Next.js compiled successfully)
   - `npm run lint` (zero warnings/errors)
6. Write your handoff report to `h:/AEITCH/.agents/teamwork/teamwork_preview_worker_m3/handoff.md`.
When finished, notify parent via send_message.
