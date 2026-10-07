# Milestone 3 Review & Adversarial Challenge Report

**Author**: `teamwork_preview_reviewer_m3_2`  
**Milestone**: M3 - Interactive Homepage & Choreography  
**Roles**: `reviewer`, `critic`  
**Parent Agent**: `5d3503b0-f27e-4040-b880-3ad821023d60` (teamwork_preview_orchestrator)  
**Working Directory**: `h:/AEITCH/.agents/teamwork/teamwork_preview_reviewer_m3_2`  
**Date**: 2026-09-27T00:50:00Z  

---

## Review Summary

**Verdict**: **REQUEST_CHANGES**  
**Overall Risk Assessment**: **HIGH**

---

## 1. Observation

### Observation 1: Test Suite Regressions & Failures in `tests/components/homepage.test.tsx`
- **Command Executed**: `node node_modules/vitest/vitest.mjs run tests/components/homepage.test.tsx`
- **Result**: FAILED with exit code 1.
- **Verbatim Error 1**:
  ```
  FAIL tests/components/homepage.test.tsx > Home Section: CtaBanner > renders callout banner, headline, and consultation trigger link
  TestingLibraryElementError: Unable to find an element with the text: /ENGINEERING AVAILABILITY • Q4 2026 ACTIVE/i.
  ```
- **Verbatim Error 2**:
  ```
  FAIL tests/components/homepage.test.tsx > Full HomePage Integration > renders the complete assembled interactive homepage
  TestingLibraryElementError: Unable to find an element with the text: /ENTERPRISE SOFTWARE & AI SYSTEMS/i.
  ```

### Observation 2: Architectural Contract Drift & External Hardcoding
- **Contract Defined in `ORIGINAL_REQUEST.md` (R2) & `PROJECT.md` (Features 13, 19)**:
  - Homepage CTA must integrate with internal scheduling and contact routes: `/contact-us#consultation` and `/case-studies`.
  - Signature dark theme (`#0a0a0a`, `#0f0f11`, `#E9800A`).
  - 7 discrete homepage sections assembled in `src/app/page.tsx`.
- **Observed in Codebase**:
  - `src/components/home/hero-section.tsx` (lines 80-87) and `src/components/home/cta-banner.tsx` (lines 81-88): Hardcoded external link to `https://calendar.app.google/KFZ2Eh8495no3X9s6` rather than internal Next.js App Router links (`/contact-us#consultation`).
  - `src/app/page.tsx` (lines 80-86): Assembles 9 sections instead of the 7 contracted sections, introducing `IndustriesSection` and `CaseStudiesPreview`.
  - `src/components/home/stats-counter.tsx`: Metric labels were changed to `DITTO_METRICS` ("Years of Experience", "products launched globally", "client retention") which conflicted with `tests/components/homepage.test.tsx` asserting the 4 primary enterprise metrics ("Enterprise Uptime SLA", "Production Platforms Shipped", "Deployment Velocity Gain", "Client Satisfaction Score").

### Observation 3: Build & Concurrency Failure on `npm run build`
- **Command Executed**: `npm run build`
- **Result**: FAILED with exit code 1.
- **Verbatim Error**:
  ```
  > aeitch-web@1.0.0 build
  > prisma generate && next build

  Environment variables loaded from .env
  Prisma schema loaded from prisma\schema.prisma
  Error: 
  EPERM: operation not permitted, rename 'H:\AEITCH\node_modules\.prisma\client\query_engine-windows.dll.node.tmp2188' -> 'H:\AEITCH\node_modules\.prisma\client\query_engine-windows.dll.node'
  ```
- **File System / OS Observation**:
  - Windows file locking prevents overwriting `query_engine-windows.dll.node` while background node processes or concurrent builds hold an open handle to the binary.

### Observation 4: Component Responsiveness & CLS Analysis
- **Responsive Layout**:
  - Breakpoints across mobile (`< 640px`), tablet (`640px - 1024px`), and desktop (`> 1024px`) correctly utilize Tailwind classes (`sm:`, `md:`, `lg:`).
  - Primary hero CTAs stack cleanly on mobile (`flex-col sm:flex-row w-full sm:w-auto`).
  - TechCarousel handles narrow screens with an animated marquee viewport with edge-gradient masks (`mask-marquee-edges`).
- **Cumulative Layout Shift (CLS)**:
  - `AnimatedCounter` (`src/components/ui/animated-counter.tsx`): Correctly enforces `tabular-nums` so numbers take equal monospace character width, preventing jitter. Parent cards enforce `min-h-[200px]` to maintain vertical stability.
  - Potential CLS Risk: In `src/components/home/testimonials-section.tsx`, client avatars use raw HTML `<img>` elements without explicit `width` and `height` HTML attributes (relying solely on Tailwind classes `h-13 w-13`), which can cause layout shifts during image load prior to CSS execution.

---

## 2. Logic Chain

1. **Step 1 (Test Suite Integrity)**:
   - Observation 1 demonstrates that running `tests/components/homepage.test.tsx` fails on multiple assertions.
   - The test assertions accurately reflect the requirements specified in `PROJECT.md` and `teamwork_preview_worker_m3/handoff.md`.
   - The failures stem directly from alterations made to `HeroSection`, `CtaBanner`, and `StatsCounter`, which drifted away from the agreed contract.

2. **Step 2 (Contractual Integrity & Link Architecture)**:
   - Observation 2 reveals that internal routing requirements from `ORIGINAL_REQUEST.md` (R2: "Contact Us (`/contact-us`) with consultation scheduling integration") were bypassed by hardcoding `https://calendar.app.google/KFZ2Eh8495no3X9s6`.
   - Introducing external links in place of internal Next.js routes breaks the single-page application experience, bypasses the internal `/contact-us` scheduler component, and breaks component regression tests.

3. **Step 3 (Build Execution Stability)**:
   - Observation 3 shows that `npm run build` fails reliably when file locks on `query_engine-windows.dll.node` occur.
   - Although the TypeScript code itself can pass type checking (`npx tsc --noEmit`), the build pipeline requires a reliable script execution that does not fail under standard CI/local runs.

4. **Step 4 (CLS & Performance Verification)**:
   - Observation 4 confirms that while typography and grid systems are fully responsive, image loading in testimonials poses a layout shift hazard. Switching to Next.js `<Image>` or specifying explicit dimension attributes will ensure deterministic CLS = 0.

---

## 3. Caveats

1. **E2E Playwright Tests**:
   - End-to-end browser integration testing with Playwright was not performed in this review as it is formally scheduled for Milestone M6 in `PROJECT.md`.
2. **Headless Canvas Warning**:
   - Vitest JSDOM environment outputs standard warnings regarding `HTMLCanvasElement.prototype.getContext`, but `ParticleCanvas` handles this gracefully with null-checking and does not throw.

---

## 4. Findings & Adversarial Challenges

### [Critical] Finding 1: Broken Component Test Assertions & Copy Drift
- **Where**: `src/components/home/cta-banner.tsx`, `src/components/home/hero-section.tsx`, `src/app/page.tsx`
- **Why**: Modifications to the components replaced standard copy and badges with alternative text, causing `tests/components/homepage.test.tsx` to fail.
- **Suggestion**: Align the homepage components with the tested specification in `tests/components/homepage.test.tsx` (restore `ENGINEERING AVAILABILITY • Q4 2026 ACTIVE`, `ENTERPRISE SOFTWARE & AI SYSTEMS`, and internal consultation links) or formally update both the tests and specification to match.

### [Major] Finding 2: External Hardcoded Consultation Link Bypassing Next.js Router
- **Where**: `src/components/home/hero-section.tsx:81`, `src/components/home/cta-banner.tsx:82`
- **Why**: Links point directly to external `https://calendar.app.google/KFZ2Eh8495no3X9s6` instead of the internal `/contact-us#consultation` route required by `ORIGINAL_REQUEST.md` R2.
- **Suggestion**: Use internal Next.js `Link href="/contact-us#consultation"` for primary CTA actions.

### [Major] Finding 3: `npm run build` Failure Due to Windows DLL Lock Contention
- **Where**: `package.json` (`"build": "prisma generate && next build"`)
- **Why**: When any process is accessing `@prisma/client`, `prisma generate` fails with `EPERM` trying to rename the active query engine binary.
- **Suggestion**: In environments where the client is already generated, decouple regeneration or ensure processes releasing the handle before building.

### [Minor] Finding 4: Avatar Layout Shift Risk in Testimonials
- **Where**: `src/components/home/testimonials-section.tsx:184`
- **Why**: Raw `<img>` tag without explicit `width` and `height` attributes can cause minor CLS before CSS layout is computed.
- **Suggestion**: Use Next.js `<Image width={52} height={52} />` or explicit HTML dimension attributes.

---

## 5. Verified Claims vs Unverified Items

- [x] Responsive layout across mobile, tablet, and desktop breakpoints -> **VERIFIED (Pass)**
- [x] Conic gradient and radial glow styling matching dark neon palette -> **VERIFIED (Pass)**
- [x] Tabular numbers and vertical height stabilization in AnimatedCounter -> **VERIFIED (Pass)**
- [x] Marquee infinite animation with edge fade masks -> **VERIFIED (Pass)**
- [ ] 100% clean pass on `tests/components/homepage.test.tsx` -> **FAILED (2 test failures)**
- [ ] Clean execution on `npm run build` -> **FAILED (EPERM file lock error)**

---

## 6. Conclusion

Milestone 3 presents high-quality visual aesthetics, responsive bento grids, and smooth motion primitives. However, because `npm test` fails with multiple assertion errors in `tests/components/homepage.test.tsx`, external hardcoded links violate the internal routing specification, and `npm run build` fails cleanly, the milestone cannot be approved in its current state.

**Verdict**: **REQUEST_CHANGES**

---

## 7. Verification Method

To verify the required fixes:

1. **Verify Component Tests**:
   ```powershell
   npx vitest run tests/components/homepage.test.tsx
   ```
   *Pass Condition*: All 14 tests pass with 0 failures.

2. **Verify TypeScript Typecheck**:
   ```powershell
   npx tsc --noEmit
   ```
   *Pass Condition*: Exit code 0, 0 errors.

3. **Verify Production Build**:
   ```powershell
   npm run build
   ```
   *Pass Condition*: Clean static generation of all pages with exit code 0.
