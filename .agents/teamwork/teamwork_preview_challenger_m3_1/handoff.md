# Empirical Challenge Report: Milestone M3 - Interactive Homepage & Choreography

**Author**: `teamwork_preview_challenger_m3_1`  
**Milestone**: M3 - Interactive Homepage & Choreography  
**Date**: 2026-09-27T05:47:00+05:00  
**Parent Agent**: `5d3503b0-f27e-4040-b880-3ad821023d60` (teamwork_preview_orchestrator)  
**Working Directory**: `h:/AEITCH/.agents/teamwork/teamwork_preview_challenger_m3_1`  
**Verdict**: **REQUEST_CHANGES**

---

## 1. Observation

1. **TypeScript Typecheck Failure (`npx tsc --noEmit`)**:
   - Command: `npx tsc --noEmit`
   - Exit code: `1`
   - Verbatim error output:
     ```
     src/components/home/stats-counter.tsx(124,25): error TS2322: Type '{ end: number; duration: number; decimals: number; }' is not assignable to type 'IntrinsicAttributes & AnimatedCounterProps'.
       Property 'end' does not exist on type 'IntrinsicAttributes & AnimatedCounterProps'.
     ```
   - Exact location: `src/components/home/stats-counter.tsx` line 123–127:
     ```tsx
     <AnimatedCounter
       end={numericValue}
       duration={2200}
       decimals={metric.value.includes('.') ? 1 : 0}
     />
     ```
   - Interface contract: `src/components/ui/animated-counter.tsx` lines 6–13 defines:
     ```typescript
     export interface AnimatedCounterProps {
       value: number;
       duration?: number;
       prefix?: string;
       suffix?: string;
       decimals?: number;
       className?: string;
     }
     ```
     The prop name is `value`, NOT `end`.

2. **Next.js Production Build Failure (`npm run build`)**:
   - Command: `npm run build` (or `npx next build --no-lint`)
   - Exit code: `1`
   - Verbatim compilation log:
     ```
     Failed to compile.

     ./src/components/home/stats-counter.tsx:124:25
     Type error: Type '{ end: number; duration: number; decimals: number; }' is not assignable to type 'IntrinsicAttributes & AnimatedCounterProps'.
       Property 'end' does not exist on type 'IntrinsicAttributes & AnimatedCounterProps'.

       122 |                       )}
       123 |                       <AnimatedCounter
     > 124 |                         end={numericValue}
           |                         ^
       125 |                         duration={2200}
       126 |                         decimals={metric.value.includes('.') ? 1 : 0}
       127 |                       />
     Next.js build worker exited with code: 1 and signal: null
     ```

3. **CTA Navigation Routing Breach in `src/components/home/cta-banner.tsx`**:
   - Requirement in `DISPATCH.md` and `ORIGINAL_REQUEST.md`: CTA must be "Schedule a Consultation" with destination `/contact-us#consultation`.
   - Observed code in `src/components/home/cta-banner.tsx` lines 81–101:
     ```tsx
     <a
       href="https://calendar.app.google/KFZ2Eh8495no3X9s6"
       target="_blank"
       rel="noopener noreferrer"
       className="..."
     >
       ...
       Request Technical Consultation
       ...
     </a>

     <Link
       href="/contact-us"
       className="..."
     >
       Get In Touch →
     </Link>
     ```
   - The primary CTA routes externally to `https://calendar.app.google/KFZ2Eh8495no3X9s6` with label "Request Technical Consultation", and secondary button routes to `/contact-us`, completely omitting the `/contact-us#consultation` route target.

4. **Component Test Suite Failure (`tests/components/homepage.test.tsx`)**:
   - Command: `npx vitest run tests/components/homepage.test.tsx`
   - Exit code: `1`
   - Test Results: `12 failed | 2 passed (14 tests)`
   - Major failures include:
     - `Home Section: HeroSection`: CTA button text and styling mismatch
     - `Home Section: ServicesShowcase`: Services titles and route links mismatch
     - `Home Section: StatsCounter`: Expected 4 default metrics (`Enterprise Uptime SLA`, `Production Platforms Shipped`, etc.) were replaced by 3 unaligned metrics (`Years of Experience`, `products launched globally`, `client retention`)
     - `Home Section: CtaBanner`: Missing `ENGINEERING AVAILABILITY • Q4 2026 ACTIVE` and `Schedule a Consultation`
     - `Full HomePage Integration`: Test timeout / failure

5. **Automated Stress Test Suite Execution (`tests/components/m3-homepage-stress.test.tsx`)**:
   - Created automated stress suite in `tests/components/m3-homepage-stress.test.tsx` covering:
     - Strict CTA href assertions (`/contact-us#consultation`, `/case-studies`, `/services/*`)
     - Live SQLite Prisma query assertions against `dev.db`
     - Database empty table fallback resilience
     - Database connection error handling
     - Testimonial carousel wrap-around bounds
   - Automated run confirmed:
     - 10 tests failed due to CTA destination drift in `cta-banner.tsx`, service slug mismatches in `services-showcase.tsx`, and 3 vs 4 fallback metrics in `stats-counter.tsx`.

---

## 2. Logic Chain

1. **From Observation 1 to Typecheck Failure**:
   - `src/components/ui/animated-counter.tsx` declares `interface AnimatedCounterProps { value: number; ... }`.
   - `src/components/home/stats-counter.tsx` at line 124 renders `<AnimatedCounter end={numericValue} ... />`.
   - Because `end` is not a recognized prop on `AnimatedCounterProps`, `tsc` emits `TS2322`.
   - Therefore, `npx tsc --noEmit` fails with exit code 1.

2. **From Observation 2 to Build Failure**:
   - Next.js invokes TypeScript type-checking during production build.
   - Next.js encounters the fatal `TS2322` in `stats-counter.tsx`.
   - Therefore, `npm run build` exits with code 1, blocking production deployment.

3. **From Observation 3 to CTA Specification Breach**:
   - The user dispatch explicitly specified:
     > "Write and run automated stress tests verifying all CTA links: 'Schedule a Consultation' (`/contact-us#consultation`), 'Explore Case Studies' (`/case-studies`), and the 4 service links (`/services/ai-consulting`, `/services/cloud-devops`, `/services/custom-software`, `/services/new-product-development`)."
   - In `cta-banner.tsx`, the consultation CTA links to an external Google Calendar URL instead of `/contact-us#consultation`.
   - Therefore, the CTA routing requirement is violated.

4. **From Observations 4 & 5 to Test Regressions**:
   - The test suite in `tests/components/homepage.test.tsx` and the challenger stress suite in `tests/components/m3-homepage-stress.test.tsx` both fail.
   - 12 out of 14 homepage tests fail.
   - Therefore, the codebase does not meet the acceptance criteria of Milestone M3.

---

## 3. Caveats

1. **Prisma SQLite Queries**:
   - The live Prisma integration logic itself in `src/app/page.tsx` (`prisma.metricCounter.findMany` and `prisma.testimonial.findMany`) executes properly against `prisma/dev.db` when the database is seeded. The failure is not in SQLite connectivity, but in component typing, CTA routing, and fallback metric alignment.
2. **Review-Only Constraint**:
   - In accordance with the Challenger role constraints (`Review-only — do NOT modify implementation code`), no source code files in `src/` were edited. Remediation must be performed by the worker.

---

## 4. Conclusion

**Verdict**: **REQUEST_CHANGES**

Milestone M3 cannot be approved in its current state. The following remediation is required:

1. **Fix `src/components/home/stats-counter.tsx`**:
   - Change `end={numericValue}` to `value={numericValue}` on `<AnimatedCounter />`.
   - Ensure the 4 default fallback metrics match the seeded database metrics (`Enterprise Uptime SLA`, `Production Platforms Shipped`, `Deployment Velocity Gain`, `Client Satisfaction Score`).
2. **Fix `src/components/home/cta-banner.tsx`**:
   - Restore the primary CTA button label to "Schedule a Consultation" and href strictly to `/contact-us#consultation`.
3. **Align `services-showcase.tsx` and `why-aeitch.tsx`**:
   - Ensure all 4 service pillar links strictly route to `/services/ai-consulting`, `/services/cloud-devops`, `/services/custom-software`, and `/services/new-product-development`.
4. **Verify Green Build and Tests**:
   - Ensure `npx tsc --noEmit` exits with code 0.
   - Ensure `npm run build` completes successfully.
   - Ensure all tests in `tests/components/homepage.test.tsx` and `tests/components/m3-homepage-stress.test.tsx` pass 100%.

---

## 5. Verification Method

To independently reproduce and verify these findings:

1. **Verify TypeScript Failure**:
   ```powershell
   npx tsc --noEmit
   ```
   *Actual Result*: Exits with code 1, reporting `TS2322` on line 124 of `src/components/home/stats-counter.tsx`.

2. **Verify Production Build Failure**:
   ```powershell
   npx next build --no-lint
   ```
   *Actual Result*: Exits with code 1 during `Checking validity of types...` with fatal error on `stats-counter.tsx`.

3. **Verify Component Test Failures**:
   ```powershell
   npx vitest run tests/components/homepage.test.tsx
   ```
   *Actual Result*: Exits with code 1; 12/14 tests fail.

4. **Inspect CTA Routing in `cta-banner.tsx`**:
   - Inspect line 82 of `src/components/home/cta-banner.tsx`.
   - Observe `href="https://calendar.app.google/KFZ2Eh8495no3X9s6"` instead of `/contact-us#consultation`.
