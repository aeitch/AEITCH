# Worker M2 Remediation Workspace
Target: Apply fixes identified by Challenger 1 for Milestone 2:
1. Fix TDZ bug in src/components/ui/particle-canvas.tsx (move render definition above observer.observe)
2. Fix dynamic value prop updates and cancelAnimationFrame on unmount in src/components/ui/animated-counter.tsx
3. Run vitest and next build to confirm 100% pass across all tests.
