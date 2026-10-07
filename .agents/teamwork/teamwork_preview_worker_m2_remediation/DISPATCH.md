## 2026-09-27T00:02:33Z
You are teamwork_preview_worker_m2_remediation.
Your working directory is h:/AEITCH/.agents/teamwork/teamwork_preview_worker_m2_remediation.
You MUST read the authoritative user request at h:/AEITCH/.agents/teamwork/ORIGINAL_REQUEST.md before starting work.
You MUST read the Challenger 1 report and remediation instructions at:
h:/AEITCH/.agents/teamwork/teamwork_preview_challenger_m2_1/handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Task:
Remediate the two specific issues identified in Milestone 2 interactive components:
1. Fix Temporal Dead Zone in `src/components/ui/particle-canvas.tsx`:
   Move the `const render = () => { ... }` function definition ABOVE `const observer = new IntersectionObserver(...)` so `render` is fully initialized before `observer.observe(canvas)` is called.
2. Fix `src/components/ui/animated-counter.tsx`:
   - Support dynamic `value` prop changes: inside `useEffect`, if `hasAnimatedRef.current` is true, trigger `startAnimation()`.
   - Store the animation frame ID in `const rafId = useRef<number | null>(null)`, assign `rafId.current = requestAnimationFrame(step)`, and in the cleanup return function call `if (rafId.current) cancelAnimationFrame(rafId.current)`.
3. Verification:
   - Run `npx vitest run tests/components` and ensure all 37 tests pass (including `tests/components/m2-interactive-stress.test.tsx`).
   - Run `npx tsc --noEmit` and `npm run build` and `npm run lint` to verify zero errors or warnings.
   - Run `npx tsx tests/adversarial/run-all-adversarial.ts` to confirm 40/40 database tests pass with zero leaks.
4. Document all changes and test outputs in `h:/AEITCH/.agents/teamwork/teamwork_preview_worker_m2_remediation/handoff.md` and notify parent via send_message.
