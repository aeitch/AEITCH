# Empirical Challenge Report: Milestone M3 Interactive Features & Choreography

**Author**: `teamwork_preview_challenger_m3_2` (Roles: `critic`, `specialist`)  
**Milestone**: M3 - Interactive Homepage & Choreography  
**Working Directory**: `h:/AEITCH/.agents/teamwork/teamwork_preview_challenger_m3_2`  
**Parent Agent**: `5d3503b0-f27e-4040-b880-3ad821023d60` (teamwork_preview_orchestrator)  
**Date**: 2026-09-27T00:48:30Z  
**Verdict**: **REQUEST_CHANGES**

---

## 1. Observation

### Obs 1: Infinite Tech Stack Marquee Missing 7 of 15 Required Technologies
In `src/components/home/tech-carousel.tsx`, lines 11–31 define `TECH_ITEMS`:
```typescript
const TECH_ITEMS: TechItem[] = [
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Laravel', category: 'Backend Framework' },
  { name: 'Python', category: 'AI & Data Engineering' },
  { name: 'AWS Cloud', category: 'Cloud Infrastructure' },
  { name: 'OpenAI', category: 'Generative AI' },
  { name: 'Docker', category: 'Containerization' },
  { name: 'GitHub Actions', category: 'CI/CD Automation' },
  { name: 'Terraform', category: 'Infrastructure as Code' },
  { name: 'TensorFlow', category: 'Machine Learning' },
  { name: 'React', category: 'Frontend' },
  { name: 'PyTorch', category: 'Deep Learning' },
  { name: 'Node.js', category: 'Runtime Platform' },
  { name: 'Express', category: 'API Microservices' },
  { name: 'MongoDB', category: 'Database Systems' },
  { name: 'Next.js', category: 'Enterprise Full-Stack' },
  { name: 'Kubernetes', category: 'Cluster Orchestration' },
  { name: 'GitLab', category: 'DevSecOps Pipeline' },
  { name: 'GitHub', category: 'Source Ecosystem' },
  { name: 'Ansible', category: 'Configuration Automation' },
];
```
- **Required 15 technologies**: `Next.js, React, TypeScript, Python, PyTorch, LangChain, AWS, Google Cloud, Azure, Docker, Kubernetes, Terraform, PostgreSQL, Redis, GraphQL`.
- **Actual contents**:
  - Missing entirely: `TypeScript`, `LangChain`, `Google Cloud`, `Azure`, `PostgreSQL`, `Redis`, `GraphQL` (7 of 15 missing).
  - Renamed: `AWS` is named `AWS Cloud`.
  - Extraneous technologies added: `Vue.js`, `Laravel`, `OpenAI`, `GitHub Actions`, `TensorFlow`, `Node.js`, `Express`, `MongoDB`, `GitLab`, `GitHub`, `Ansible`.
- **Pause-on-hover**: Present in line 52: `group-hover:[animation-play-state:paused]`.

### Obs 2: Testimonials Carousel Navigation & Avatar Fallback Failures
In `src/components/home/testimonials-section.tsx`:
- Lines 145–161 lack avatar image rendering and initials fallback when `avatarUrl` is null or missing:
  ```tsx
  {/* Client Info Bar */}
  <div className="mt-10 pt-8 border-t border-[#2e374b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg text-white">
          {current.clientName}
        </span>
  ...
  ```
- Running vitest stress test `tests/components/m3-homepage-stress.test.tsx` fails with:
  ```
  FAIL tests/components/m3-homepage-stress.test.tsx > Milestone 3 Empirical Stress Challenge: Database Resilience & Graceful Fallbacks > TestimonialsSection: Single testimonial edge case handles null avatar and boundary navigation without crashing
  TestingLibraryElementError: Unable to find an element with the text: SF.
  
  FAIL tests/components/m3-homepage-stress.test.tsx > Milestone 3 Empirical Stress Challenge: Database Resilience & Graceful Fallbacks > TestimonialsSection: Multi-slide carousel circular wrap-around forward and backward stress test
  TestingLibraryElementError: Unable to find an element with the text: Charlie Gamma.
  ```

### Obs 3: Animated Statistics Counters CLS Layout Analysis
In `src/components/ui/animated-counter.tsx`, lines 113–120:
```tsx
return (
  <span
    ref={elementRef}
    className={cn('inline-block font-mono font-bold tracking-tight text-white tabular-nums', className)}
  >
    {prefix}
    {displayValue}
    {suffix}
  </span>
);
```
- In `src/components/home/stats-counter.tsx`, lines 117–125:
```tsx
<div className="font-black tracking-tight text-white font-sans text-4xl sm:text-5xl lg:text-6xl">
  <AnimatedCounter
    value={numericValue}
    duration={2200}
    prefix={metric.prefix || ''}
    suffix={metric.suffix || ''}
    decimals={metric.value.includes('.') ? 1 : 0}
  />
</div>
```
- **Assessment**: The span uses `tabular-nums` ensuring fixed glyph widths per digit, but the counter starts at `0` (1 character) and counts up to `100` (3 characters). Because no minimum character width (e.g. `min-w-[3ch]` or fixed container width) is reserved, the inline span dynamically expands horizontally from ~1ch to ~3ch as it animates, pushing the suffix (`%` or `+`) rightward by 2 character widths during scroll entrance.

### Obs 4: Test Suite Health (`npm test`)
Running `node ./node_modules/vitest/vitest.mjs run` produced:
```
Test Files  5 failed (5)
Tests       28 failed | 47 passed (75)
```
Specifically in `tests/components/homepage.test.tsx`:
```
Test Files  1 failed (1)
Tests       12 failed | 2 passed (14)
```
- Fails on `TechCarousel` because `TypeScript`, `LangChain`, etc. are missing.
- Fails on `HeroSection` because headline and CTAs do not match expected project specification.
- Fails on `ServicesShowcase`, `WhyAeitch`, `StatsCounter`, and `CtaBanner` due to component drift.

### Obs 5: Production Build Health (`npm run build` and `npx tsc --noEmit`)
1. Running `npm run build`:
   - Command: `prisma generate && next build`
   - Result: Exited with code 1.
   - Error: `[Error: ENOENT: no such file or directory, rename 'H:\AEITCH\.next\export\500.html' -> 'H:\AEITCH\.next\server\pages\500.html']`.
   - In addition, whenever background processes hold `query_engine-windows.dll.node`, `prisma generate` fails with `EBUSY / EPERM: operation not permitted, rename 'query_engine-windows.dll.node'`.
2. Running `node ./node_modules/typescript/bin/tsc --noEmit`:
   - Result: Exited with code 1.
   - Error:
     ```
     error TS6053: File 'H:/AEITCH/.next/types/app/page.ts' not found.
     error TS6053: File 'H:/AEITCH/.next/types/cache-life.d.ts' not found.
     error TS6053: File 'H:/AEITCH/.next/types/routes.d.ts' not found.
     error TS6053: File 'H:/AEITCH/.next/types/validator.ts' not found.
     ```

---

## 2. Logic Chain

1. **Tech Stack Verification (Point 1)**:
   - Observation 1 demonstrates that `TECH_ITEMS` in `src/components/home/tech-carousel.tsx` does not include `TypeScript`, `LangChain`, `Google Cloud`, `Azure`, `PostgreSQL`, `Redis`, and `GraphQL`.
   - Therefore, the requirement to include all 15 specific enterprise technologies is empirically NOT satisfied.

2. **Testimonials Carousel Verification (Point 2)**:
   - Observation 2 demonstrates that `src/components/home/testimonials-section.tsx` lacks initials avatar fallbacks when `avatarUrl` is null.
   - Furthermore, stress-testing multi-slide circular navigation in `tests/components/m3-homepage-stress.test.tsx` fails to render `Charlie Gamma` on sequential forward progression.
   - Therefore, testimonials carousel slide transitions and boundary fallbacks fail stress testing.

3. **Statistics Counters CLS Verification (Point 3)**:
   - Observation 3 shows that while vertical layout shift is controlled via line-height and `tabular-nums`, horizontal layout shift of the suffix (`%` / `+`) occurs because digit count grows from 1 to 3 characters without a reserved `min-width`.

4. **Build and Test Suite Verification (Point 4)**:
   - Observations 4 & 5 demonstrate that `npm test` fails with 28 broken tests (12 of 14 failing in `homepage.test.tsx`), `npx tsc --noEmit` fails due to missing `.next/types`, and `npm run build` fails with code 1 (`ENOENT: rename 500.html` and Prisma engine file locks).
   - Therefore, the build health criteria from `ORIGINAL_REQUEST.md` and `PROJECT.md` are not met.

---

## 3. Caveats

- In JSDOM test runs, `HTMLCanvasElement.prototype.getContext` outputs standard JSDOM warnings; these warnings are expected and handled gracefully by null-checks.
- The `ui-primitives.test.tsx` test timed out once under extreme CPU contention during parallel execution of all test suites, but passed cleanly (16/16) in isolation.

---

## 4. Conclusion

**Verdict: REQUEST_CHANGES**

Milestone M3 cannot be approved in its current state. The following remediation items are required:
1. **Restore all 15 required technologies** in `src/components/home/tech-carousel.tsx`:
   `Next.js`, `React`, `TypeScript`, `Python`, `PyTorch`, `LangChain`, `AWS`, `Google Cloud`, `Azure`, `Docker`, `Kubernetes`, `Terraform`, `PostgreSQL`, `Redis`, `GraphQL`. Remove non-standard additions or harmonize with the 15-item specification.
2. **Fix `TestimonialsSection`**:
   - Re-introduce client avatar image rendering and initials fallback avatar when `avatarUrl` is absent.
   - Fix navigation state update to guarantee reliable circular wrap-around across all slides.
3. **Harmonize Homepage Components with Test Expectations**:
   - Align `HeroSection`, `ServicesShowcase`, `StatsCounter`, `WhyAeitch`, and `CtaBanner` with `tests/components/homepage.test.tsx` and `tests/components/m3-homepage-stress.test.tsx`.
4. **Fix Production Build**:
   - Resolve `.next/export/500.html` ENOENT rename issue during static page export.
   - Ensure clean `npm test` (0 failures), `npx tsc --noEmit` (0 errors), and `npm run build` (exit code 0).

---

## 5. Verification Method

To independently reproduce and verify these findings:

1. **Verify Marquee Technologies**:
   Inspect `src/components/home/tech-carousel.tsx` lines 11–31 to verify the missing technologies.
   Run:
   ```powershell
   node -e "const code = require('fs').readFileSync('src/components/home/tech-carousel.tsx', 'utf8'); const required = ['Next.js', 'React', 'TypeScript', 'Python', 'PyTorch', 'LangChain', 'AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'PostgreSQL', 'Redis', 'GraphQL']; const missing = required.filter(t => !code.includes(t)); console.log('Missing:', missing);"
   ```
   *Expected Output*: Displays missing technologies: `['TypeScript', 'LangChain', 'Google Cloud', 'Azure', 'PostgreSQL', 'Redis', 'GraphQL']`.

2. **Run Test Suites**:
   ```powershell
   node ./node_modules/vitest/vitest.mjs run tests/components/homepage.test.tsx
   node ./node_modules/vitest/vitest.mjs run tests/components/m3-homepage-stress.test.tsx
   ```
   *Expected Output*: Fails with 12 errors in `homepage.test.tsx` and carousel errors in `m3-homepage-stress.test.tsx`.

3. **Run TypeScript Check & Build**:
   ```powershell
   node ./node_modules/typescript/bin/tsc --noEmit
   npm run build
   ```
   *Expected Output*: Both commands exit with code 1.
