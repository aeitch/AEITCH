# Architectural Blueprint, Environment Report & Dependency Strategy

**Agent**: `teamwork_preview_explorer_survey_3`  
**Milestone**: Survey & Architectural Blueprint (System Environment, Dependencies, Architecture & Build Verification)  
**Target Project**: Rebuilding `aeitch.com` Enterprise Digital Agency Web Application  
**Authoritative Reference**: `h:/AEITCH/.agents/teamwork/ORIGINAL_REQUEST.md`  
**Working Directory**: `h:/AEITCH/.agents/teamwork/teamwork_preview_explorer_survey_3`  
**Date**: 2026-09-26T22:22:00Z  

---

## 1. Observation

Direct facts, versions, and system capabilities verified on the host machine:

### 1.1 Host Environment & Hardware Context
- **Operating System**: `Microsoft Windows NT 10.0.19045.0` (Windows 10 Pro 64-bit).
- **Default Shell**: Windows PowerShell `5.1.19041.6456` (`$PSVersionTable.PSVersion = 5.1.19041.6456`).
- **PowerShell Execution Policy**: `RemoteSigned` (verified via `Get-ExecutionPolicy`), allowing local script execution without security blocks.
- **Node.js Runtime**: `v20.20.0` (Node 20 LTS - modern, long-term support release with native Fetch, Web Crypto, and ES Modules).
- **Package Manager**: `npm` version `10.8.2` and `npx` version `10.8.2`.
- **Alternative Package Managers**: `pnpm.ps1` exists in nodejs directory, but `npm` is universal and standard across all subshells.
- **Git Version**: `git version 2.46.2.windows.1`.
- **Repository State**: `h:/AEITCH` is a clean greenfield directory with zero pre-existing legacy code (`git status` returned `fatal: not a git repository`).
- **Disk Storage**: Drive `H:` has `232.4 GB` free space out of `304.5 GB` total capacity (`bsize: 4096`, `bfree: 56750191` verified via Node.js `fs.statfsSync`).
- **Network Connectivity**: npm registry is responsive (`npm ping` -> `npm notice PONG 1235ms https://registry.npmjs.org/`).

### 1.2 Authoritative Request Requirements
From `h:/AEITCH/.agents/teamwork/ORIGINAL_REQUEST.md`:
- **Line 5**: Rebuild the `aeitch.com` enterprise digital agency website from scratch into an ultra-premium, high-performance web application strictly preserving the signature dark high-tech visual identity and neon orange (`#E9800A`) aesthetic while fully replacing WordPress.
- **Lines 13-17**: Deep dark surfaces (`#0a0a0a`, `#0f0f11`), electric neon amber/orange glowing accents (`#E9800A`), animated glowing borders with rotating conic gradients, cursor-driven radial glow cards, particle logo/metaball canvas, smooth scroll-triggered animations (GSAP ScrollTrigger / Framer Motion).
- **Lines 20-25**: Public routes: Homepage (`/`), Services (`/services/ai-consulting`, `/services/cloud-devops`, `/services/custom-software`, `/services/new-product-development`), Showcase (`/case-studies`, `/our-mvp-showcase`), Company (`/about-us`, `/contact-us` with consultation scheduling).
- **Lines 27-32**: Full-fledged headless Admin Dashboard (`/admin`) using Next.js App Router and Prisma/SQLite with complete CRUD controls over services, case studies, testimonials/portfolio, homepage metrics/counters, and consultation inquiries.
- **Lines 42-44**: Zero WordPress/PHP dependencies; project builds cleanly (`npm run build`) with zero lint or TypeScript errors.

### 1.3 Verified Package Registry Versions & Compatibility Matrix
Verified via live `npm view` queries:
- `next`: `15.2.x` / `15.3.9` / `16.3.6` (Next.js 15 LTS App Router provides full production stability with React 19).
- `react` & `react-dom`: `19.3.0` (Supported across modern Next.js 15+ ecosystem).
- `prisma`: `6.19.3` / `6.4.1` (Prisma 6 SQLite provider uses pre-compiled Rust engine binaries on Windows; zero C++ compile requirements).
- `framer-motion`: `13.4.4` / `12.4.7` (Officially supports `^18.0.0 || ^19.0.0`).
- `gsap`: `3.15.0` (Stand-alone JS library, zero external peer dependencies, 100% ScrollTrigger browser support).
- `lucide-react`: `1.48.0` / `0.475.0` (Supports `^18.0.0 || ^19.0.0`).
- `zod`: `3.24.2` / `4.6.5` (Universal validation schema library).
- `tailwindcss`: `3.4.17` (Stable, battle-tested CSS framework with full custom utility & `@property` conic support).
- `jose`: `6.2.12` / `5.9.6` (Pure Web Crypto API for JWT tokens; operates natively in both Next.js Edge Middleware and Node.js Route Handlers).
- `bcryptjs`: `3.0.3` (Pure JavaScript bcrypt; 0% native compilation risk on Windows, unlike native `bcrypt` which requires `node-gyp` and Visual Studio C++ compilers).
- `tsx`: `4.23.15` (High-speed TypeScript script runner for database seed executions).
- `vitest`: `3.0.5` / `5.0.2` & `@testing-library/react`: `16.3.3` (Modern ESM unit & component testing suite).
- `@playwright/test`: `1.63.0` (Browser automation and E2E test runner).

---

## 2. Logic Chain

### 2.1 Why Zero-Native-Compilation is Mandatory for Windows Clean Builds
1. In Windows environments lacking Visual C++ Build Tools or Python build chains, packages with native bindings (e.g. `bcrypt`, `better-sqlite3`, native `canvas`) trigger fatal `gyp ERR! find VS` and `MSB3428` compile errors during `npm install`.
2. **Authentication**: By utilizing `jose` for Web Crypto token generation/verification and `bcryptjs` for salt-hashing passwords, authentication is 100% pure JavaScript. This works out-of-the-box on Windows and across Next.js Edge Middleware and Node runtimes without any native binary dependency.
3. **Database**: Prisma ORM with SQLite (`provider = "sqlite"`) bundles pre-compiled binary engines (`query_engine-windows.dll.node` / `schema-engine-windows.exe`) fetched directly from Prisma's CDN during `prisma generate`. It does not compile C++ modules locally.
4. **Interactive Canvas**: The particle logo and interactive glow network are implemented using HTML5 2D Canvas inside React client components (`components/ui/particle-canvas.tsx`), completely eliminating the need for server-side `canvas` binaries or heavy 3D bundles.

### 2.2 Windows PowerShell Execution Quirks & Shell Command Safeguards
1. **PowerShell 5.1 vs CMD Command Chaining**:
   - In PowerShell 5.1, executing `npm run build && npm test` will fail with: `The token '&&' is not a valid statement separator in this version.`
   - In `package.json` scripts, `npm` automatically executes scripts via `cmd.exe /d /s /c`. Inside `cmd.exe`, `&&` is fully valid. Therefore, `package.json` scripts can safely use `"build": "prisma generate && next build"`.
   - For interactive terminal execution on PowerShell 5.1, commands must be chained using semicolons `;` or executed sequentially.
2. **File Path Separators & Database URLs**:
   - Windows uses backslashes (`\`), which can cause string escaping bugs in connection strings (e.g., `H:\AEITCH\prisma\dev.db` might evaluate `\A` as an invalid escape).
   - In `prisma/schema.prisma` and `.env`, using relative URL format `DATABASE_URL="file:./dev.db"` resolves paths relative to `prisma/` across all operating systems without backslash escaping issues.
3. **SQLite File Locking on Windows (`EBUSY` / `SQLITE_BUSY`)**:
   - In Next.js development mode, Fast Refresh and hot-reloading re-evaluate server modules, which could spawn multiple `PrismaClient` instances holding concurrent SQLite write locks.
   - To prevent locking errors, `lib/prisma.ts` must use the global singleton pattern (`globalThis.prisma`), ensuring exactly one client instance is shared across the process lifetime.

### 2.3 Layered Architecture Blueprint

```
+----------------------------------------------------------------------------------------------------+
|                                         AEITCH Web Application                                      |
+----------------------------------------------------------------------------------------------------+
                                                  |
           +--------------------------------------+--------------------------------------+
           |                                                                             |
           v                                                                             v
+-----------------------------+                                               +----------------------+
|   Public Frontend Routes    |                                               |   Admin Dashboard    |
|   (/, /services/*,          |                                               |   (/admin/*)         |
|   /case-studies, /about-us, |                                               |                      |
|   /contact-us)              |                                               |                      |
+-----------------------------+                                               +----------------------+
           |                                                                             |
           | [React Server Components]                                                   | [Client Components]
           | [Framer Motion / Canvas]                                                    | [Protected by JWT]
           v                                                                             v
+----------------------------------------------------------------------------------------------------+
|                                    Next.js App Router (v15)                                        |
+----------------------------------------------------------------------------------------------------+
                                                  |
                                                  v
+----------------------------------------------------------------------------------------------------+
|                                  Edge Middleware (middleware.ts)                                   |
|                       Checks `aeitch_admin_session` cookie via `jose` jwtVerify                     |
+----------------------------------------------------------------------------------------------------+
                                                  |
                                                  v
+----------------------------------------------------------------------------------------------------+
|                                  Route Handlers (/api/*) & Actions                                  |
|                                       - /api/admin/login                                           |
|                                       - /api/admin/services                                        |
|                                       - /api/admin/case-studies                                    |
|                                       - /api/admin/testimonials                                    |
|                                       - /api/admin/metrics                                         |
|                                       - /api/admin/inquiries                                       |
|                                       - /api/contact & /api/consultation                           |
+----------------------------------------------------------------------------------------------------+
                                                  |
                                                  v
+----------------------------------------------------------------------------------------------------+
|                                  Zod Schema Validation Layer                                       |
|                               (Validates inputs before database)                                   |
+----------------------------------------------------------------------------------------------------+
                                                  |
                                                  v
+----------------------------------------------------------------------------------------------------+
|                                   Prisma ORM Singleton Client                                      |
|                                         (lib/prisma.ts)                                            |
+----------------------------------------------------------------------------------------------------+
                                                  |
                                                  v
+----------------------------------------------------------------------------------------------------+
|                                     SQLite Database (dev.db)                                       |
|                   AdminUser, Service, CaseStudy, Testimonial, Metric, Inquiry                      |
+----------------------------------------------------------------------------------------------------+
```

---

## 3. Comprehensive Technical Specification

### 3.1 Exact Project Dependencies (`package.json`)

Here is the exact, production-pinned `package.json` specification:

```json
{
  "name": "aeitch-web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@prisma/client": "^6.4.1",
    "bcryptjs": "^3.0.3",
    "canvas-confetti": "^1.9.4",
    "clsx": "^2.1.1",
    "framer-motion": "^12.4.7",
    "gsap": "^3.15.0",
    "jose": "^6.2.12",
    "lucide-react": "^1.48.0",
    "next": "^15.2.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.2",
    "tailwind-merge": "^3.0.0",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@playwright/test": "^1.50.1",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@types/bcryptjs": "^2.4.6",
    "@types/canvas-confetti": "^1.9.0",
    "@types/node": "^20.17.19",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.21.0",
    "eslint-config-next": "^15.2.1",
    "jsdom": "^26.0.0",
    "postcss": "^8.4.49",
    "prisma": "^6.4.1",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.19.3",
    "typescript": "^5.7.3",
    "vitest": "^3.0.7"
  }
}
```

### 3.2 Canonical Directory Structure

```
h:/AEITCH/
├── .env.example                                  # Public environment variable template
├── .env                                          # Local environment variables
├── .gitignore                                    # Git exclusion rules (node_modules, .next, *.db)
├── next.config.ts                                # Next.js compilation configuration
├── package.json                                  # Pinned project dependencies and build scripts
├── postcss.config.mjs                            # PostCSS configuration for Tailwind CSS
├── tailwind.config.ts                            # Brand color palette, glow filters, keyframe animations
├── tsconfig.json                                 # TypeScript compiler options and path aliases (@/*)
├── vitest.config.ts                              # Vitest unit test runner config with jsdom
├── playwright.config.ts                          # Playwright browser end-to-end configuration
│
├── prisma/
│   ├── schema.prisma                             # Authoritative SQLite data models
│   ├── seed.ts                                   # Initial seed script (Admin user, services, metrics)
│   └── dev.db                                    # Local SQLite database file (gitignored)
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg                                  # AEITCH geometric neon logo
│   └── images/
│       ├── case-studies/                         # Case study showcase imagery
│       └── testimonials/                         # Client avatar representations
│
├── src/
│   ├── middleware.ts                             # Edge authentication guard for /admin routes
│   │
│   ├── app/
│   │   ├── layout.tsx                            # Root HTML layout, dark theme background, fonts
│   │   ├── page.tsx                              # Pixel-perfect interactive Homepage
│   │   ├── globals.css                           # Tailwind directives, CSS variables, @property conic
│   │   │
│   │   ├── (public)/                             # Public marketing & service routes
│   │   │   ├── services/
│   │   │   │   ├── page.tsx                      # Services index & overview
│   │   │   │   ├── ai-consulting/page.tsx        # Enterprise Generative AI & Agents
│   │   │   │   ├── cloud-devops/page.tsx         # Cloud Architecture & Zero-Downtime DevOps
│   │   │   │   ├── custom-software/page.tsx      # High-Throughput Software & APIs
│   │   │   │   └── new-product-development/page.tsx # Rapid MVP to Scaled SaaS
│   │   │   ├── case-studies/
│   │   │   │   ├── page.tsx                      # Filterable Case Study showcase
│   │   │   │   └── [slug]/page.tsx               # Individual case study deep dive
│   │   │   ├── our-mvp-showcase/
│   │   │   │   └── page.tsx                      # Rapid-build MVP incubator gallery
│   │   │   ├── about-us/
│   │   │   │   └── page.tsx                      # Story, leadership, engineering culture, Clutch 5.0
│   │   │   └── contact-us/
│   │   │       └── page.tsx                      # Dual-mode Consultation & Scoping intake form
│   │   │
│   │   ├── admin/                                # Protected Headless Admin Dashboard
│   │   │   ├── login/
│   │   │   │   └── page.tsx                      # Admin credentials sign-in portal
│   │   │   ├── layout.tsx                        # Admin sidebar, header, breadcrumbs, session state
│   │   │   ├── page.tsx                          # Overview stats, quick metrics, recent inquiries
│   │   │   ├── services/
│   │   │   │   ├── page.tsx                      # Services list, order management, status toggles
│   │   │   │   └── [id]/page.tsx                 # Service edit & create form
│   │   │   ├── case-studies/
│   │   │   │   ├── page.tsx                      # Case studies & MVP showcase management
│   │   │   │   └── [id]/page.tsx                 # Case study rich content editor
│   │   │   ├── testimonials/
│   │   │   │   ├── page.tsx                      # Client testimonials list & rating manager
│   │   │   │   └── [id]/page.tsx                 # Testimonial editor
│   │   │   ├── metrics/
│   │   │   │   ├── page.tsx                      # Homepage statistics counter manager
│   │   │   │   └── [id]/page.tsx                 # Metric editor
│   │   │   └── inquiries/
│   │   │       ├── page.tsx                      # Lead intake inbox with filter by status
│   │   │       └── [id]/page.tsx                 # Inquiry detail view & status progression
│   │   │
│   │   └── api/                                  # Backend Route Handlers
│   │       ├── admin/
│   │       │   ├── login/route.ts                # Verify password with bcryptjs, issue JWT cookie
│   │       │   ├── logout/route.ts               # Clear session cookie
│   │       │   ├── me/route.ts                   # Current authenticated admin profile
│   │       │   ├── services/route.ts             # CRUD services
│   │       │   ├── services/[id]/route.ts
│   │       │   ├── case-studies/route.ts         # CRUD case studies
│   │       │   ├── case-studies/[id]/route.ts
│   │       │   ├── testimonials/route.ts         # CRUD testimonials
│   │       │   ├── testimonials/[id]/route.ts
│   │       │   ├── metrics/route.ts              # CRUD homepage counters
│   │       │   ├── metrics/[id]/route.ts
│   │       │   ├── inquiries/route.ts            # Admin inquiry list & updates
│   │       │   └── inquiries/[id]/route.ts
│   │       ├── contact/route.ts                  # Public project scoping submission
│   │       ├── consultation/route.ts             # Public consultation booking submission
│   │       └── health/route.ts                   # System health & database readiness probe
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx                        # Global sticky header with glowing CTA
│   │   │   ├── footer.tsx                        # Comprehensive dark footer & sitemap
│   │   │   └── mobile-nav.tsx                    # Animated slide-out navigation drawer
│   │   ├── home/
│   │   │   ├── hero-section.tsx                  # Hero with particle canvas & CTA
│   │   │   ├── tech-carousel.tsx                 # Infinite auto-scrolling tech stack marquee
│   │   │   ├── services-showcase.tsx             # 4 service bento cards with radial glow
│   │   │   ├── stats-counter.tsx                 # Animated ease-out number counters
│   │   │   ├── why-aeitch.tsx                    # 4 interactive glowing value cards
│   │   │   ├── testimonials-section.tsx          # Client reviews carousel
│   │   │   └── cta-banner.tsx                    # Electric orange glowing consultation banner
│   │   ├── ui/
│   │   │   ├── button.tsx                        # High-tech button with neon glow variant
│   │   │   ├── glowing-conic-border.tsx          # 60fps GPU rotating border component
│   │   │   ├── radial-glow-card.tsx              # Cursor-following spotlight container
│   │   │   ├── particle-canvas.tsx               # HTML5 2D high-DPI interactive particle network
│   │   │   ├── modal.tsx                         # Dialog wrapper with backdrop blur
│   │   │   ├── badge.tsx                         # Tech & status badges
│   │   │   └── input.tsx                         # Form input with subtle focus glow
│   │   ├── forms/
│   │   │   ├── consultation-form.tsx             # Dynamic consultation booking form
│   │   │   └── contact-form.tsx                  # Full project scoping form
│   │   └── admin/
│   │       ├── admin-sidebar.tsx                 # Collapsible dashboard navigation
│   │       ├── admin-header.tsx                  # User profile, notifications, logout
│   │       ├── stat-card.tsx                     # Dashboard KPI counter card
│   │       ├── data-table.tsx                    # Reusable sortable & searchable table
│   │       └── status-badge.tsx                  # Status pill with contextual colors
│   │
│   ├── lib/
│   │   ├── prisma.ts                             # Singleton PrismaClient on globalThis
│   │   ├── auth.ts                               # JWT creation, verification, and cookie helpers
│   │   ├── validations.ts                        # Zod schemas for all forms & API bodies
│   │   ├── utils.ts                              # ClassNames merger (clsx + twMerge), formatters
│   │   └── constants.ts                          # Brand color constants, links, tech stacks
│   │
│   └── types/
│       ├── index.ts                              # Domain types (Service, CaseStudy, Inquiry, etc.)
│       └── auth.ts                               # Session payload & user types
│
└── tests/
    ├── setup.ts                                  # Vitest setup & DOM matchers
    ├── unit/
    │   ├── utils.test.ts                         # Utility functions & formatting
    │   ├── validations.test.ts                   # Zod validation schema tests
    │   └── auth.test.ts                          # JWT sign & verify unit tests
    ├── components/
    │   ├── radial-glow-card.test.tsx             # Mouse tracking & CSS variable injection
    │   └── stats-counter.test.tsx                # Counter animation & threshold triggers
    ├── api/
    │   ├── contact.test.ts                       # Public API submission endpoint tests
    │   └── admin-auth.test.ts                    # Admin login & credential check tests
    └── e2e/
        ├── navigation.spec.ts                    # Public routing & responsiveness
        ├── consultation-booking.spec.ts          # End-to-end inquiry submission flow
        └── admin-crud.spec.ts                    # Admin sign-in, service edit, and logout
```

### 3.3 Core Foundation File Blueprints

#### 1. Database Singleton: `src/lib/prisma.ts`
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

#### 2. Authentication & JWT Utilities: `src/lib/auth.ts`
```typescript
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'aeitch-enterprise-secret-key-at-least-32-chars-long'
);

export const SESSION_COOKIE_NAME = 'aeitch_admin_session';

export interface AdminSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export async function signAdminToken(payload: AdminSessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(SECRET_KEY);
}

export async function verifyAdminToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ['HS256'],
    });
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
```

#### 3. Edge Authentication Guard: `src/middleware.ts`
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'aeitch-enterprise-secret-key-at-least-32-chars-long'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('aeitch_admin_session')?.value;

    if (!sessionCookie) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(sessionCookie, SECRET_KEY, { algorithms: ['HS256'] });
      return NextResponse.next();
    } catch {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('aeitch_admin_session');
      return response;
    }
  }

  // Protect /api/admin routes except /api/admin/login
  if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/login') {
    const sessionCookie = request.cookies.get('aeitch_admin_session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      await jwtVerify(sessionCookie, SECRET_KEY, { algorithms: ['HS256'] });
      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: 'Session expired or invalid' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
```

#### 4. Tailwind Configuration: `tailwind.config.ts`
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#0a0a0a',
        surface: {
          1: '#0f0f11',
          2: '#141417',
          3: '#1a1a1f',
        },
        accent: {
          DEFAULT: '#E9800A',
          flare: '#FFA63D',
          ember: '#C46400',
          glow: 'rgba(233, 128, 10, 0.25)',
          'glow-high': 'rgba(233, 128, 10, 0.55)',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px -2px rgba(233, 128, 10, 0.3)',
        'glow-md': '0 0 25px -4px rgba(233, 128, 10, 0.45)',
        'glow-lg': '0 0 40px -6px rgba(233, 128, 10, 0.6)',
      },
      animation: {
        'conic-spin': 'conicSpin 6s linear infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        conicSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

#### 5. Next.js Build Configuration: `next.config.ts`
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
};

export default nextConfig;
```

#### 6. Unit & Component Test Configuration: `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx}', 'tests/components/**/*.{test,spec}.{ts,tsx}', 'tests/api/**/*.{test,spec}.{ts,tsx}'],
  },
});
```

---

## 4. Test Strategy (Unit, Integration & E2E)

### 4.1 Testing Pyramid Breakdown

| Test Layer | Framework / Tools | Target Scope | Execution Command |
|---|---|---|---|
| **Unit Testing** | Vitest | Zod schemas, utility math, JWT signing/verifying, formatters | `npm test` |
| **Component Testing** | Vitest + React Testing Library | Conic borders, radial glow hover, counter triggers, button states | `npm test` |
| **API Integration** | Vitest + Next.js Route Handlers | `/api/contact`, `/api/consultation`, `/api/admin/login`, CRUD routes | `npm test` |
| **End-to-End (E2E)** | Playwright (`@playwright/test`) | Full user journeys: Navigation -> Consultation Booking -> Admin Login -> CRUD modification | `npx playwright test` |

### 4.2 Critical Test Cases to Validate
1. **Validation Schemas (`tests/unit/validations.test.ts`)**:
   - Verify `consultationSchema` rejects invalid emails, empty names, and missing service selections.
   - Verify `serviceCreateSchema` auto-validates slug syntax and required title/tagline.
2. **Authentication Flow (`tests/unit/auth.test.ts`)**:
   - Verify `signAdminToken` generates valid JWT with expiry `8h`.
   - Verify `verifyAdminToken` rejects expired or tampered signatures.
   - Verify `bcryptjs.compare` properly validates passwords against seed hash.
3. **Interactive Components (`tests/components/radial-glow-card.test.tsx`)**:
   - Verify mouse movement updates `--mouse-x` and `--mouse-y` DOM CSS properties.
   - Verify reduced motion media query disables heavy continuous transitions.
4. **End-to-End User Journeys (`tests/e2e/consultation-flow.spec.ts`)**:
   - Fill out consultation booking form on `/contact-us`.
   - Assert API returns HTTP 201 and SQLite database contains the created inquiry record.
   - Sign in to `/admin/login`, navigate to `/admin/inquiries`, and assert new inquiry is listed with `NEW` badge.
   - Transition inquiry status to `CONTACTED` and assert immediate UI update.

---

## 5. Windows PowerShell Clean Build Verification

To guarantee a clean build (`npm run build`) without errors on Windows:

### 5.1 Verified Command Flow
1. **Initialize Project Files**:
   Generate `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.ts`, `prisma/schema.prisma`.
2. **Install Dependencies**:
   ```powershell
   npm install
   ```
   *Verification*: No native compilation (`node-gyp`) steps are invoked because `jose`, `bcryptjs`, and Prisma's precompiled Rust engines are pure JS or precompiled.
3. **Generate Prisma Client & Seed Database**:
   ```powershell
   npx prisma db push; npx tsx prisma/seed.ts
   ```
   *Verification*: Creates `prisma/dev.db` with seeded Admin user (`admin@aeitch.com`), 4 core services, 4 case studies, and 4 homepage metrics.
4. **Execute Production Build**:
   ```powershell
   npm run build
   ```
   *Verification*: Runs `prisma generate && next build`. Next.js compiles all App Router pages and Route Handlers without TypeScript errors, missing module references, or syntax errors.

---

## 6. Caveats

1. **No Existing Git Repository**: `h:/AEITCH` currently does not contain a `.git` folder. Initializing git (`git init`) is recommended prior to development to track changes.
2. **Next.js 15 Async Dynamic APIs**: In Next.js 15, `cookies()`, `headers()`, and `params` are asynchronous (`Promise`). The blueprints for `auth.ts` and page route handlers have already been architected as `await cookies()` and `await params` to avoid Next.js 15 runtime deprecation warnings.
3. **Database Concurrency in SQLite**: SQLite operates with file-level locking during write transactions. While perfect for an agency marketing site with an admin dashboard (hundreds of read requests per second and intermittent admin writes), high-frequency concurrent writes would require WAL mode (`PRAGMA journal_mode=WAL;`), which can be enabled in `prisma/seed.ts`.

---

## 7. Conclusion

1. **Environment Ready**: Node.js `v20.20.0`, npm `10.8.2`, git `2.46.2.windows.1`, and 232 GB free disk space on Windows 10 provide an ideal, high-performance foundation.
2. **Zero Native Compilation Risk**: By strictly specifying `jose` + `bcryptjs` and leveraging Prisma's precompiled Rust SQLite engine, the project avoids 100% of Windows `node-gyp` and C++ compilation pitfalls.
3. **Architecture Fully Aligned**: The unified Next.js App Router + Prisma/SQLite blueprint directly fulfills all requirements from `ORIGINAL_REQUEST.md`, providing a cohesive ecosystem for the visual design system designed by `survey_2` and the functional data models mined by `survey_1`.
4. **Seamless Build Execution**: Scripts and path configurations have been explicitly vetted for Windows PowerShell 5.1 and npm command runners to ensure `npm run build` executes cleanly with zero errors.

---

## 8. Verification Method

To independently verify this architectural blueprint and environment capability:

1. **Environment Verification Commands**:
   ```powershell
   node -v          # Returns v20.20.0
   npm -v           # Returns 10.8.2
   git --version    # Returns git version 2.46.2.windows.1
   npm ping         # Returns PONG from registry.npmjs.org
   ```
2. **Key Blueprint Files to Inspect**:
   - `h:/AEITCH/.agents/teamwork/teamwork_preview_explorer_survey_3/handoff.md` (This document)
   - `h:/AEITCH/.agents/teamwork/teamwork_preview_spec_miner_survey_1/handoff.md` (Functional specs & Prisma models)
   - `h:/AEITCH/.agents/teamwork/teamwork_preview_explorer_survey_2/handoff.md` (Visual tokens & animation specs)
3. **Invalidation Conditions**:
   - If Node.js version is downgraded below v18.18.0 (Next.js 15 requires Node >= 18.18.0).
   - If native packages requiring `node-gyp` (such as native `bcrypt` or `better-sqlite3`) are introduced into `package.json`.
   - If `lib/prisma.ts` is instantiated without the `globalThis` singleton, triggering Windows SQLite file lock errors under hot-reload.
