## 2026-09-26T22:21:36Z

You are teamwork_preview_worker_m1.
Your working directory is h:/AEITCH/.agents/teamwork/teamwork_preview_worker_m1.
You MUST read the authoritative user request at h:/AEITCH/.agents/teamwork/ORIGINAL_REQUEST.md before starting work.
You should also read the project specification at h:/AEITCH/PROJECT.md and the survey reports:
- h:/AEITCH/.agents/teamwork/teamwork_preview_explorer_survey_3/handoff.md
- h:/AEITCH/.agents/teamwork/teamwork_preview_spec_miner_survey_1/handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Milestone: M1 - Foundation & Core Infrastructure
Exclusive File Ownership:
- package.json
- tsconfig.json
- next.config.ts
- postcss.config.mjs
- tailwind.config.ts
- .env.example
- .env
- .gitignore
- prisma/schema.prisma
- prisma/seed.ts
- src/lib/prisma.ts
- src/lib/auth.ts
- src/lib/validations.ts
- src/lib/utils.ts
- src/lib/constants.ts
- src/types/index.ts
- src/types/auth.ts
- src/middleware.ts
- src/app/layout.tsx (minimal stub for build if needed)
- src/app/page.tsx (minimal stub for build if needed)
- src/app/globals.css (minimal stub for build if needed)

Tasks:
1. Initialize git repository if not initialized (`git init`).
2. Write package.json, tsconfig.json, next.config.ts, postcss.config.mjs, tailwind.config.ts, .env.example, .env, .gitignore per the survey blueprints. Note: Use pure JS packages (jose, bcryptjs) to guarantee 100% clean builds without node-gyp on Windows.
3. Execute `npm install` and verify dependencies install cleanly.
4. Set up Prisma: Write `prisma/schema.prisma` with SQLite provider and models (AdminUser, Service, CaseStudy, Testimonial, MetricCounter, Inquiry).
5. Run `npx prisma generate` and `npx prisma db push`.
6. Write `prisma/seed.ts` and run `npx tsx prisma/seed.ts` to populate default admin (admin@aeitch.com / AeitchAdmin2026!), 4 services (AI Consulting, Cloud & DevOps, Custom Software, MVP Development), 4 case studies, 4 metrics, testimonials.
7. Implement `src/lib/prisma.ts` (globalThis singleton), `src/lib/auth.ts` (jose JWT sign/verify, cookie management), `src/middleware.ts` (edge JWT guard), `src/lib/validations.ts` (Zod schemas), `src/lib/utils.ts`, `src/types/index.ts`.
8. Create minimal initial layout and page stubs so `npm run build` succeeds cleanly.
9. Execute `npm run build` and document build output.
10. Write your handoff report to `h:/AEITCH/.agents/teamwork/teamwork_preview_worker_m1/handoff.md` with: Observation, Logic Chain, Changes Made, Build/Test Verification Results, Caveats, Conclusion.
When complete, notify parent via send_message.
