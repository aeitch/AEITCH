# Empirical Challenge & Stress-Test Report: Milestone M2 Interactive Components

**Agent**: `teamwork_preview_challenger_m2_1`  
**Milestone**: M2 (Design System & UI Primitives)  
**Role**: EMPIRICAL CHALLENGER (`critic`, `specialist`)  
**Verdict**: **REQUEST_CHANGES**  
**Authoritative Reference**: `h:/AEITCH/.agents/teamwork/ORIGINAL_REQUEST.md`, `PROJECT.md`, `teamwork_preview_worker_m2/handoff.md`  

---

## 1. Observation

We authored and executed an adversarial empirical stress-test suite consisting of 21 tests in `tests/components/m2-interactive-stress.test.tsx` targeting `RadialGlowCard`, `AnimatedCounter`, and `ParticleCanvas`, alongside verifying the baseline suite of 16 tests in `tests/components/ui-primitives.test.tsx` and 40 database tests in `tests/adversarial/run-all-adversarial.ts`.

### Finding 1 (CRITICAL): Temporal Dead Zone (TDZ) ReferenceError in `ParticleCanvas`
- **File**: `h:/AEITCH/src/components/ui/particle-canvas.tsx`
- **Lines**: 119–127
- **Code**:
  ```tsx
  119:     // Auto-pause RAF loop when scrolled out of viewport
  120:     const observer = new IntersectionObserver(([entry]) => {
  121:       isVisible = entry.isIntersecting;
  122:       if (isVisible && !animFrameRef.current) {
  123:         render();
  124:       }
  125:     });
  126:     observer.observe(canvas);
  127: 
  128:     const render = () => {
  ```
- **Verbatim Error**:
  ```
  ReferenceError: Cannot access 'render' before initialization
   ❯ MockIntersectionObserver.callback src/components/ui/particle-canvas.tsx:123:9
      121|       isVisible = entry.isIntersecting;
      122|       if (isVisible && !animFrameRef.current) {
      123|         render();
         |         ^
      124|       }
      125|     });
   ❯ MockIntersectionObserver.observe tests/setup.ts:32:12
   ❯ src/components/ui/particle-canvas.tsx:126:14
  ```
- **Empirical Demonstration**: In test `3.2` of `tests/components/m2-interactive-stress.test.tsx`, whenever `getContext('2d')` returns a valid context and an `IntersectionObserver` dispatches its initial intersection synchronously on `.observe(canvas)`, referencing `render` throws an unhandled `ReferenceError` that crashes component mounting.

---

### Finding 2 (HIGH): `hasAnimatedRef` Permanently Locks Out Subsequent `value` Prop Updates in `AnimatedCounter`
- **File**: `h:/AEITCH/src/components/ui/animated-counter.tsx`
- **Lines**: 30, 83–91, 96
- **Code**:
  ```tsx
  30:   const hasAnimatedRef = useRef<boolean>(false);
  ...
  83:     const observer = new IntersectionObserver(
  84:       ([entry]) => {
  85:         if (entry.isIntersecting && !hasAnimatedRef.current) {
  86:           hasAnimatedRef.current = true;
  87:           startAnimation();
  88:         }
  89:       },
  90:       { threshold: 0.25 }
  91:     );
  ...
  96:   }, [value, duration, decimals]);
  ```
- **Empirical Behavior**: In test `2.8` of `tests/components/m2-interactive-stress.test.tsx`, rendering `<AnimatedCounter value={100} />` animates to `100`. When the parent component re-renders with `<AnimatedCounter value={200} />`, `useEffect` re-runs with `value = 200`, but because `hasAnimatedRef.current` is permanently `true`, `startAnimation()` is skipped. The component remains indefinitely frozen at `100` (`expect(screen.queryByText('200')).toBeNull()`).

---

### Finding 3 (MEDIUM): Missing `cancelAnimationFrame` on Unmount in `AnimatedCounter`
- **File**: `h:/AEITCH/src/components/ui/animated-counter.tsx`
- **Lines**: 68–70, 95
- **Code**:
  ```tsx
  68:         if (progress < 1) {
  69:           requestAnimationFrame(step);
  70:         }
  ...
  95:     return () => observer.disconnect();
  ```
- **Empirical Behavior**: In test `2.9` of `tests/components/m2-interactive-stress.test.tsx`, unmounting `AnimatedCounter` mid-animation does not cancel the scheduled `requestAnimationFrame(step)`. `cancelSpy` confirms `cancelAnimationFrame` was not called, allowing `step` and `setDisplayValue` to execute on the next frame after unmount.

---

### Finding 4 (OBSERVATION & ASSESSMENT): Boundary Clamping Behavior in `RadialGlowCard`
- **File**: `h:/AEITCH/src/components/ui/radial-glow-card.tsx`
- **Lines**: 24–36
- **Code**:
  ```tsx
  24:   const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
  25:     if (!cardRef.current) return;
  26:     const rect = cardRef.current.getBoundingClientRect();
  27:     const x = e.clientX - rect.left;
  28:     const y = e.clientY - rect.top;
  29: 
  30:     if (rafId.current) cancelAnimationFrame(rafId.current);
  31:     rafId.current = requestAnimationFrame(() => {
  32:       if (cardRef.current) {
  33:         cardRef.current.style.setProperty('--mouse-x', `${x}px`);
  34:         cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  35:       }
  36:     });
  37:   }, []);
  ```
- **Empirical Behavior**: In test `1.3` of `tests/components/m2-interactive-stress.test.tsx`, moving the pointer outside card bounds (e.g. `clientX: 50` on a card with `left: 100`) sets `--mouse-x: -50px` and `--mouse-y: -60px`. Coordinates are NOT clamped to `[0, rect.width]` or `[0, rect.height]`.
- **Architectural Analysis**: In CSS `radial-gradient(...)`, negative coordinates or coordinates beyond bounds are valid CSS `<length>` values. Because the card container has `overflow: hidden`, this allows the 380px radial spotlight to bloom and smoothly fade off the edges as the cursor exits, rather than unnaturally snapping the light source to `0px`.
- **Zero Re-Render & RAF Coalescing Verification**:
  - Test `1.2` verified that firing 500 rapid mouse movements coalesces via `cancelAnimationFrame(rafId.current)` into a single frame execution with exactly 0 React state re-renders.

---

### Finding 5 (CONFIRMED PASSES): Mathematical Oracles & Core Mechanics
- `AnimatedCounter`:
  - `easeOutExpo` formula `1 - 2^(-10 * p)` verified across 100 monotonic intervals: 0 at p=0, ~50% at p=0.1, 96.875% at p=0.5, >99.8% at p=0.9, and exactly 1 at p=1 (Test `2.1`).
  - Formatting with `$1,000,000,000 ARR`, `#0 items`, `-42 pts`, `99.95%`, and trailing zero preservation `99.90%` verified (Tests `2.2`, `2.3`, `2.4`).
  - Monospace and tabular numbers layout shift prevention classes (`tabular-nums font-mono inline-block`) verified (Test `2.5`).
  - Accessibility: `prefers-reduced-motion: reduce` verified to bypass RAF and immediately render formatted final value (Test `2.7`).
- `ParticleCanvas`:
  - Context null fallback: returns gracefully without throwing (Test `3.1`).
  - DPR calculation: caps DPR at 2.0 when `window.devicePixelRatio = 3.5` (Test `3.3`).
  - Electrostatic repulsion: linear drop-off `(1 - dist / mr) * 2.2` and directional angle `Math.atan2(dy, dx)` pushing particles away from cursor verified. Singularity `dist === 0` safely handled with `dist > 0` condition preventing NaN or division by zero (Test `3.4`).
  - Proximity line vector connections: threshold `maxDistance = 110` and alpha gradient `(1 - cdist / 110) * 0.22` verified (Test `3.5`).
  - Dynamic density scaling: `< 640px` (30 particles), `< 1024px` (60 particles), `>= 1024px` (90 particles) verified (Test `3.6`).
  - Component alias parity: `HeroParticleCanvas === ParticleCanvas` verified (Test `3.7`).

---

## 2. Logic Chain

1. **Step 1 (From Finding 1)**: `src/components/ui/particle-canvas.tsx` defines `const render = () => { ... }` at line 127, but invokes `observer.observe(canvas)` at line 125 with a callback that invokes `render()`. Under ES6 lexical scoping rules, `const` declarations are not hoisted into initialized memory (Temporal Dead Zone). When any observer callback triggers synchronously or early, calling `render` results in an immediate `ReferenceError: Cannot access 'render' before initialization`. This crashes the component mount.
2. **Step 2 (From Finding 2)**: `src/components/ui/animated-counter.tsx` relies on `hasAnimatedRef.current` to prevent infinite intersection loops. However, `hasAnimatedRef.current` is never reset when the `value` prop changes, and `useEffect` does not handle prop updates for `value`. In any real-world use case where stats numbers are dynamic (e.g. admin metrics, API data refresh, or tab changes), the counter remains permanently stuck at the first observed value.
3. **Step 3 (From Finding 3)**: When `AnimatedCounter` unmounts during animation, the active `requestAnimationFrame` callback remains pending in the browser/JSDOM event loop. When the frame executes, it calls `setDisplayValue` on an unmounted component, which is a known memory leak and React warning trigger.
4. **Step 4 (From Finding 4 & 5)**: `RadialGlowCard` successfully demonstrates zero-rerender RAF coalescing, and its unclamped coordinates are visually superior for radial gradient bloom. The mathematical models in `AnimatedCounter` and `ParticleCanvas` are sound.
5. **Conclusion**: Because Finding 1 (Critical TDZ crash) and Finding 2 (High dynamic prop lock) impair runtime stability and feature correctness, Milestone 2 cannot be approved in its current state without these specific corrections.

---

## 3. Caveats

- **IntersectionObserver Timing**: In standard Chromium/WebKit browsers, native `IntersectionObserver` callbacks are generally dispatched asynchronously on a subsequent microtask/frame, which masked Finding 1 during casual manual testing. However, any polyfill, synthetic test environment, or fast browser layout flush triggers the synchronous callback and crashes.
- **Radial Clamping Alternative Interpretation**: If product requirements strictly mandate clamping cursor coordinates within `[0, width]` and `[0, height]`, `RadialGlowCard` does not currently do so. We tested and documented that passing raw coordinates produces smooth exit gradients, but note this architectural choice.

---

## 4. Conclusion

**Verdict: REQUEST_CHANGES**

The worker must apply the following specific fixes:

### Actionable Remediation 1 (`src/components/ui/particle-canvas.tsx`):
Hoist the `render` function declaration or move `const render = () => { ... }` ABOVE `const observer = new IntersectionObserver(...)` so `render` is fully initialized before `observer.observe(canvas)` is invoked:
```tsx
// Move render definition before observer instantiation:
const render = () => {
  if (!isVisible) {
    animFrameRef.current = null;
    return;
  }
  ...
};

const observer = new IntersectionObserver(([entry]) => {
  isVisible = entry.isIntersecting;
  if (isVisible && !animFrameRef.current) {
    render();
  }
});
observer.observe(canvas);
```

### Actionable Remediation 2 (`src/components/ui/animated-counter.tsx`):
1. Support prop `value` changes by resetting or triggering animation when `value` changes:
```tsx
// Inside useEffect:
if (hasAnimatedRef.current) {
  startAnimation();
}
```
2. Store the animation frame ID in a ref (`rafId = useRef<number | null>(null)`) and cancel it on unmount:
```tsx
const rafId = useRef<number | null>(null);
...
// in step:
if (progress < 1) {
  rafId.current = requestAnimationFrame(step);
}
...
return () => {
  observer.disconnect();
  if (rafId.current) cancelAnimationFrame(rafId.current);
};
```

---

## 5. Verification Method

To independently reproduce all empirical findings:

1. **Run Full Component Test Suite**:
   ```bash
   npx vitest run tests/components --no-file-parallelism
   ```
   *Expected: All 37 tests pass, including the 21 empirical challenge tests in `tests/components/m2-interactive-stress.test.tsx` proving the TDZ error, prop lock, and unmount leak.*

2. **Run TypeScript Compiler**:
   ```bash
   npx tsc --noEmit
   ```
   *Expected: Exit code 0 (zero type errors).*

3. **Run Production Build**:
   ```bash
   npx next build
   ```
   *Expected: Next.js compiles static routes and middleware cleanly with exit code 0.*

4. **Run Database Integrity Regression Suite**:
   ```bash
   npx tsx tests/adversarial/run-all-adversarial.ts
   ```
   *Expected: All 40 adversarial tests pass with 0 database leaks.*
