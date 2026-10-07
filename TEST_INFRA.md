# E2E Test Infra: aeitch.com

## Test Philosophy
- Opaque-box, requirement-driven derived from `ORIGINAL_REQUEST.md`.
- Zero coupling to internal component implementations; test user journeys, visual contracts, API responses, database persistence, and admin state mutations.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial Testing + Real-World Workload Testing.

---

## Feature Inventory & Test Tier Matrix

| # | Feature | Requirement Source | Tier 1 (Coverage) | Tier 2 (BVA/Corner) | Tier 3 (Cross-Feature) | Tier 4 (Real-World) |
|---|---------|-------------------|:-----------------:|:-------------------:|:---------------------:|:-------------------:|
| 1 | Signature Dark & Neon Theme | ORIGINAL_REQUEST R1 | 5 | 5 | ✓ | ✓ |
| 2 | Conic Gradient Animated Borders | ORIGINAL_REQUEST R1 | 5 | 5 | ✓ | ✓ |
| 3 | Cursor-Driven Radial Glow Cards | ORIGINAL_REQUEST R1 | 5 | 5 | ✓ | ✓ |
| 4 | Hero Particle Canvas Network | ORIGINAL_REQUEST R1 | 5 | 5 | ✓ | ✓ |
| 5 | ScrollTrigger & Reveal Transitions | ORIGINAL_REQUEST R1 | 5 | 5 | ✓ | ✓ |
| 6 | Animated Statistics Counters | ORIGINAL_REQUEST R2 | 5 | 5 | ✓ | ✓ |
| 7 | Homepage Sections & CTA Integration | ORIGINAL_REQUEST R2 | 5 | 5 | ✓ | ✓ |
| 8 | Dedicated Service: AI Consulting | ORIGINAL_REQUEST R2 | 5 | 5 | ✓ | ✓ |
| 9 | Dedicated Service: Cloud & DevOps | ORIGINAL_REQUEST R2 | 5 | 5 | ✓ | ✓ |
| 10 | Dedicated Service: Custom Software | ORIGINAL_REQUEST R2 | 5 | 5 | ✓ | ✓ |
| 11 | Dedicated Service: MVP Development | ORIGINAL_REQUEST R2 | 5 | 5 | ✓ | ✓ |
| 12 | Case Studies & MVP Showcase | ORIGINAL_REQUEST R2 | 5 | 5 | ✓ | ✓ |
| 13 | About Us & Agency Identity | ORIGINAL_REQUEST R2 | 5 | 5 | ✓ | ✓ |
| 14 | Contact Us & Consultation Scheduler | ORIGINAL_REQUEST R2 | 5 | 5 | ✓ | ✓ |
| 15 | Public Intake API & Honeypot | ORIGINAL_REQUEST R2 | 5 | 5 | ✓ | ✓ |
| 16 | Admin Auth & Edge JWT Middleware | ORIGINAL_REQUEST R3 | 5 | 5 | ✓ | ✓ |
| 17 | Admin Services CRUD | ORIGINAL_REQUEST R3 | 5 | 5 | ✓ | ✓ |
| 18 | Admin Case Studies CRUD | ORIGINAL_REQUEST R3 | 5 | 5 | ✓ | ✓ |
| 19 | Admin Testimonials CRUD | ORIGINAL_REQUEST R3 | 5 | 5 | ✓ | ✓ |
| 20 | Admin Metrics CRUD | ORIGINAL_REQUEST R3 | 5 | 5 | ✓ | ✓ |
| 21 | Admin Inquiries CRM & Workflow | ORIGINAL_REQUEST R3 | 5 | 5 | ✓ | ✓ |

---

## Test Architecture
- **Unit & Component Runner**: Vitest (`npm test`) with jsdom environment
- **API & Integration Tests**: Vitest integration tests exercising Next.js Route Handlers with real Prisma SQLite instance
- **End-to-End Tests**: Playwright (`npx playwright test` or Node test runner)
- **Directory Layout**:
  - `tests/unit/`: Zod schemas, JWT authentication, formatters
  - `tests/components/`: Interactive components, radial glow mouse movement, animated counter triggers
  - `tests/api/`: Public APIs, contact form submissions, bot honeypots, admin CRUD endpoints
  - `tests/e2e/`: Full browser navigation, consultation bookings, authenticated admin modifications

---

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Enterprise Client Consultation Flow | Hero CTA -> Service Exploration -> /contact-us booking -> Database persistence | High |
| 2 | Admin Real-Time Service Modification | Admin login -> Create new Service -> Public /services update -> Public homepage bento card reflection | High |
| 3 | Bot Attack & Malformed Form Handling | Honeypot trigger, XSS in form inputs, invalid email, past date rejection | Medium |
| 4 | Admin Inquiry Progression Lifecycle | Client submits inquiry -> Admin reviews in /admin/inquiries -> Updates status to CONTACTED -> Adds internal notes | High |
| 5 | Live Metric Counter Live Editing | Admin updates "Uptime SLA" from 99.9% to 99.99% -> Homepage counter dynamically reflects update | High |

---

## Coverage Thresholds
- **Tier 1 (Feature Coverage)**: ≥5 test cases per feature (105+ cases)
- **Tier 2 (Boundary & Corner Cases)**: ≥5 test cases per feature (105+ cases)
- **Tier 3 (Cross-Feature Combinations)**: ≥25 pairwise interaction cases
- **Tier 4 (Real-World Scenarios)**: ≥5 end-to-end integration workflows
- **Total Minimum Target**: ≥240 test cases across unit, component, API, and E2E suites.
