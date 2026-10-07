## 2026-09-27T03:55:00Z

Milestone: M2 - Design System & UI Primitives
Exclusive File Ownership:
- src/app/globals.css
- src/app/layout.tsx
- src/components/layout/navbar.tsx
- src/components/layout/footer.tsx
- src/components/layout/mobile-nav.tsx
- src/components/ui/glowing-conic-border.tsx (and/or GlowingConicCard.tsx)
- src/components/ui/radial-glow-card.tsx (and/or SpotlightCard.tsx)
- src/components/ui/particle-canvas.tsx (and/or HeroParticleCanvas.tsx)
- src/components/ui/animated-counter.tsx
- src/components/ui/scroll-reveal.tsx (ScrollReveal, StaggerContainer, StaggerItem)
- src/components/ui/button.tsx
- src/components/ui/badge.tsx
- src/components/ui/input.tsx

Tasks:
1. Implement full global styles in `src/app/globals.css`:
   - Modern CSS `@property --conic-angle` with angle syntax for GPU interpolation.
   - Obsidian void canvas (`#0a0a0a`), elevated card surfaces (`#0f0f11`, `#141417`), neon orange accent (`#E9800A`), specular flame (`#FFA63D`).
   - Custom AEITCH neon scrollbar and selection styling.
   - Text glow utilities (`text-glow`, `text-glow-intense`).
2. Build layout components:
   - `src/components/layout/navbar.tsx`: Sticky navigation with AEITCH geometric logo, desktop nav links (Services with dropdown preview, Case Studies, MVP Showcase, About, Contact), glowing "Book Consultation" CTA button, and mobile menu toggle.
   - `src/components/layout/mobile-nav.tsx`: Animated slide-out navigation drawer with stagger animation.
   - `src/components/layout/footer.tsx`: Enterprise agency footer with brand description, service links, company links, contact info (`contact@aeitch.com`, Lahore, Pakistan), social badges, and copyright.
3. Build the core interactive primitives per the survey_2 blueprint:
   - `src/components/ui/glowing-conic-border.tsx`: Rotating conic gradient border with dual layers (sharp 1px border beam + blurred bloom aura) and hover acceleration.
   - `src/components/ui/radial-glow-card.tsx`: Cursor-driven radial gradient spotlight tracking `--mouse-x` and `--mouse-y` via passive `requestAnimationFrame` DOM style updates with zero React re-renders.
   - `src/components/ui/particle-canvas.tsx`: Ultra-optimized HTML5 2D canvas with high-DPI scaling (`devicePixelRatio`), electrostatic pointer repulsion, dynamic proximity line vectors, and `IntersectionObserver` auto-pausing.
   - `src/components/ui/animated-counter.tsx`: High-performance counter using `easeOutExpo` math driven by `requestAnimationFrame`, triggered by `IntersectionObserver` with zero CLS.
   - `src/components/ui/scroll-reveal.tsx`: Reusable Framer Motion entrance wrappers (`ScrollReveal`, `StaggerContainer`, `StaggerItem`) with smooth cubic-bezier easing.
   - `src/components/ui/button.tsx`, `badge.tsx`, `input.tsx`: High-tech UI elements with neon orange focus and hover glow.
4. Integrate with `src/app/layout.tsx`:
   - Wire Navbar, Footer, and dark theme metadata into the root layout so all pages inherit the signature theme.
5. Verify build health:
   - Run `npx tsc --noEmit` and `npm run build` to confirm zero TypeScript errors and clean compilation.
6. Write your handoff report to `h:/AEITCH/.agents/teamwork/teamwork_preview_worker_m2/handoff.md`.
When finished, notify parent via send_message.
