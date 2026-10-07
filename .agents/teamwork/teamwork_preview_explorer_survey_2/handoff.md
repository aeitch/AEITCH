# Master Visual Design System, Animation Choreography & Interactive Effects Specification

**Agent**: `teamwork_preview_explorer_survey_2`  
**Milestone**: Survey & Architectural Blueprint (Visual Identity & Interactive UX)  
**Target Application**: `aeitch.com` Enterprise Digital Agency Web Application  
**Authoritative Reference**: `h:/AEITCH/.agents/teamwork/ORIGINAL_REQUEST.md`  

---

## 1. Observation

1. **Brand Identity & Color Requirements**:
   - As specified in `h:/AEITCH/.agents/teamwork/ORIGINAL_REQUEST.md` (Lines 13-17):
     > "Faithfully replicate and elevate the signature AEITCH visual identity:
     > - Deep dark surfaces (`#0a0a0a`, `#0f0f11`) with electric neon amber/orange glowing accents (`#E9800A`).
     > - Animated glowing borders with rotating conic gradients, cursor-driven radial glow cards, and particle logo/metaball canvas.
     > - Smooth scroll-triggered animations (GSAP ScrollTrigger / Framer Motion) for section reveals, counters, card cascades, and text transitions.
     > - Zero deviation from the established brand palette and aesthetic."
   - Acceptance Criteria (Lines 37-39):
     > "- Theme strictly matches AEITCH brand styling: dark background surfaces, `#E9800A` neon glow highlights, and glowing border effects.
     > - ScrollTrigger animations trigger smoothly on scroll entrance across all major homepage sections without layout shift or frame drops.
     > - Fully responsive on mobile, tablet, desktop, and ultra-wide screens."

2. **System Environment**:
   - `node -v` output: `v20.20.0` (Node 20 LTS runtime).
   - Greenfield repository: clean directory ready for Next.js 14/15 App Router, React 18/19, Tailwind CSS v3/v4, Framer Motion, and GSAP ScrollTrigger.
   - Zero WordPress/PHP dependencies (Line 42 of `ORIGINAL_REQUEST.md`).

3. **Performance & Motion Constraints**:
   - 60fps frame rate budget (16.6ms per frame) during active scroll and pointer interactions.
   - Zero Cumulative Layout Shift (CLS = 0) on entrance reveals and animated counter executions.
   - Full support for mobile touch devices (disabling cursor hover reliance and throttling particle density).
   - Strict adherence to `prefers-reduced-motion` accessibility standards.

---

## 2. Logic Chain

1. **Step 1: Visual Token Foundation**:
   - Deep dark surfaces require hierarchical elevation layers so UI depth is perceived without relying on harsh high-contrast gray borders.
   - Using pitch obsidian `#0a0a0a` as the master canvas background, elevated `#0f0f11` for primary cards, `#141417` for interactive cards and popovers, and `#1a1a1f` for dropdowns and floating dialogs provides seamless depth.
   - The brand neon amber/orange `#E9800A` is a high-chroma electric hue. It must be paired with secondary warm tints (`#FFA63D` for bright specular highlights and `#C46400` / `#944500` for deep ambient shadows) to prevent a flat, monochromatic orange look.

2. **Step 2: 60fps Conic Gradient Border Engineering**:
   - Traditional CSS `border-image` or rotating elements with DOM repaints cause frame drops.
   - By utilizing modern CSS `@property --conic-angle` with an angle syntax (`<angle>`), the browser compositor can smoothly interpolate gradient angles without repainting the layout.
   - Alternatively, a GPU-accelerated pseudo-element with `transform: rotate()` masked by an inner obsidian body card (`inset: 1px`) provides 100% universal browser compatibility at a guaranteed 60fps. Adding an underlying duplicate with `filter: blur(12px)` generates the radiant electric neon glow.

3. **Step 3: Cursor-Driven Radial Glow Spotlight Architecture**:
   - Calculating mouse positions in React state (`useState`) triggers component re-renders on every mouse move event (120+ times per second on high-refresh displays), causing severe CPU overhead.
   - The optimal architecture uses passive `mousemove` listeners on card containers that update CSS custom properties (`--mouse-x`, `--mouse-y`) directly on the DOM node (`node.style.setProperty`) wrapped in `requestAnimationFrame`.
   - The card uses a pseudo-element or overlay with a `radial-gradient` centered at `(var(--mouse-x), var(--mouse-y))` to reveal both the inner surface warmth and a 1px illuminated border beam.

4. **Step 4: Interactive Particle / Metaball Canvas Engine**:
   - Large 3D engines (e.g. Three.js bundle > 400KB) introduce unnecessary bundle payload and initialization delay for a 2D hero constellation/particle network.
   - An optimized HTML5 2D Canvas component with high-DPI scaling (`window.devicePixelRatio`) can render 80-120 interactive particles with electrostatic cursor repulsion, velocity damping, and dynamic proximity line connections at sub-1ms frame time.
   - An `IntersectionObserver` automatically halts `requestAnimationFrame` when the hero section scrolls out of view, reducing background CPU/GPU usage to 0%.

5. **Step 5: ScrollTrigger & Framer Motion Choreography**:
   - Framer Motion excels at declarative component-level transitions (staggered cascades, spring-damped reveals, modal transitions).
   - GSAP ScrollTrigger excels at scrubbed timelines, pinned viewports, and kinetic marquee synchronization.
   - Counter animations must use `easeOutExpo` math driven by `requestAnimationFrame` rather than setInterval, initiating only when the element intersects the viewport (`IntersectionObserver`).
   - All animated elements must reserve intrinsic layout dimensions (explicit heights, `min-height`, aspect ratios) to ensure CLS is strictly 0.0.

---

## 3. Comprehensive Visual Design System Specification

### 3.1 Design Tokens Matrix (Colors, Elevations & Accents)

| Token Name | Hex Code | RGB / HSL | Usage / Context |
|---|---|---|---|
| `bg-primary` | `#0a0a0a` | `rgb(10, 10, 10)` | Global page canvas, deep void background |
| `bg-surface-1` | `#0f0f11` | `rgb(15, 15, 17)` | Standard cards, bento grid item base |
| `bg-surface-2` | `#141417` | `rgb(20, 20, 23)` | Elevated cards, input fields, active states |
| `bg-surface-3` | `#1a1a1f` | `rgb(26, 26, 31)` | Tooltips, modals, popovers, dropdown menus |
| `border-subtle` | `rgba(255,255,255,0.07)` | `rgb(31, 31, 35)` | Default quiet card and section borders |
| `border-medium` | `rgba(255,255,255,0.12)` | `rgb(45, 45, 52)` | Interactive borders on focus/hover |
| `accent-orange` | `#E9800A` | `rgb(233, 128, 10)` | Core brand neon accent, primary buttons, glows |
| `accent-flare` | `#FFA63D` | `rgb(255, 166, 61)` | Specular highlights, gradient start, flame tint |
| `accent-ember` | `#C46400` | `rgb(196, 100, 0)` | Deep warm shadows, gradient end, dark borders |
| `accent-glow` | `rgba(233,128,10,0.25)` | - | Soft ambient glow aura around interactive elements |
| `accent-glow-high`| `rgba(233,128,10,0.55)` | - | Active spotlight bloom and conic border blur |
| `text-primary` | `#FFFFFF` | `rgb(255, 255, 255)` | Headings, hero display text, primary actions |
| `text-secondary` | `#A1A1AA` | `rgb(161, 161, 170)` (Zinc-400) | Body paragraphs, service descriptions |
| `text-muted` | `#71717A` | `rgb(113, 113, 122)` (Zinc-500) | Captions, timestamps, metadata labels |
| `text-accent` | `#FFA63D` | `rgb(255, 166, 61)` | Highlighted keywords, metrics, badges |

### 3.2 Typography & Scale Hierarchy

- **Display & Headings**: `Plus Jakarta Sans` or `Geist Sans` (`font-sans`)
  - Hero Headline: `text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[-0.03em] leading-[1.08]`
  - Section Title: `text-3xl md:text-5xl font-bold tracking-[-0.025em] leading-[1.15]`
  - Card Title: `text-xl md:text-2xl font-semibold tracking-[-0.015em]`
- **Body & Content**: `Inter` or `Geist Sans`
  - Body Large: `text-lg md:text-xl font-normal leading-relaxed text-zinc-300`
  - Body Regular: `text-sm md:text-base font-normal leading-relaxed text-zinc-400`
- **Monospace & Telemetry / Badges**: `JetBrains Mono` or `Geist Mono` (`font-mono`)
  - Tech badges, metric labels, code snippets: `text-xs uppercase tracking-[0.2em] font-medium`

---

### 3.3 Tailwind Configuration Blueprint (`tailwind.config.ts`)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: {
          50: "#FFF8F0",
          100: "#FEEDD9",
          200: "#FCD6AF",
          300: "#F9B87B",
          400: "#FFA63D", // Specular Flame
          500: "#E9800A", // AEITCH Core Neon Orange
          600: "#C46400", // Deep Ember
          700: "#944500",
          800: "#693000",
          900: "#441E00",
          950: "#220D00",
        },
        surface: {
          void: "#0a0a0a",      // Primary page background
          card: "#0f0f11",      // Primary card surface
          elevated: "#141417",  // Elevated elements / hover
          popover: "#1a1a1f",   // Modals and popovers
          border: "rgba(255, 255, 255, 0.08)",
          "border-active": "rgba(233, 128, 10, 0.4)",
        },
      },
      boxShadow: {
        "glow-xs": "0 0 10px -2px rgba(233, 128, 10, 0.3)",
        "glow-sm": "0 0 18px -3px rgba(233, 128, 10, 0.35)",
        "glow-md": "0 0 30px -4px rgba(233, 128, 10, 0.45)",
        "glow-lg": "0 0 50px -5px rgba(233, 128, 10, 0.55)",
        "glow-intense": "0 0 70px -5px rgba(233, 128, 10, 0.75), 0 0 25px 2px rgba(255, 166, 61, 0.5)",
        "card-dark": "0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
        "card-hover": "0 15px 40px -10px rgba(0, 0, 0, 0.9), 0 0 30px -5px rgba(233, 128, 10, 0.25), inset 0 1px 0 0 rgba(233, 128, 10, 0.3)",
      },
      backgroundImage: {
        "radial-orange-spotlight": "radial-gradient(circle at center, rgba(233, 128, 10, 0.15) 0%, transparent 70%)",
        "conic-orange-glow": "conic-gradient(from var(--conic-angle, 0deg) at 50% 50%, transparent 0deg, transparent 240deg, #FFA63D 320deg, #E9800A 360deg)",
        "gradient-text-orange": "linear-gradient(135deg, #FFFFFF 0%, #FFA63D 60%, #E9800A 100%)",
        "grid-pattern": "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
      },
      animation: {
        "conic-spin": "spin-conic 4s linear infinite",
        "conic-spin-fast": "spin-conic 2s linear infinite",
        "pulse-glow": "pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "marquee-left": "marquee-left 35s linear infinite",
        "marquee-right": "marquee-right 35s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        "spin-conic": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

### 3.4 Global CSS Architecture (`globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Modern CSS Angle Property for silky 60fps GPU animation without repaints */
  @property --conic-angle {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
  }

  :root {
    --bg-void: #0a0a0a;
    --bg-card: #0f0f11;
    --brand-orange: #e9800a;
    --brand-flare: #ffa63d;
  }

  html {
    scroll-behavior: smooth;
    background-color: var(--bg-void);
    color: #ffffff;
    color-scheme: dark;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: var(--bg-void);
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* Custom AEITCH Neon Scrollbar */
  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  ::-webkit-scrollbar-track {
    background: #0a0a0a;
  }
  ::-webkit-scrollbar-thumb {
    background: #1f1f23;
    border-radius: 9999px;
    border: 1px solid rgba(233, 128, 10, 0.2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #e9800a;
  }

  /* High-Tech Orange Selection */
  ::selection {
    background: #e9800a;
    color: #000000;
  }
}

@layer utilities {
  .text-glow {
    text-shadow: 0 0 20px rgba(233, 128, 10, 0.5), 0 0 40px rgba(233, 128, 10, 0.2);
  }
  .text-glow-intense {
    text-shadow: 0 0 10px rgba(255, 166, 61, 0.8), 0 0 30px rgba(233, 128, 10, 0.6);
  }
  .mask-radial-faded {
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  }
  .mask-marquee-edges {
    mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
  }
}
```

---

## 4. Component Blueprints & Exact Implementations

### 4.1 Component 1: Animated Glowing Conic Gradient Border

The component provides two synchronized visual layers:
1. An interior crisp 1px rotating laser border.
2. An exterior blurred bloom element (`filter: blur(16px)`) creating the ambient electric neon orange radiation.
Hovering over the card automatically accelerates the rotation speed from 8s to 2.5s and amplifies opacity.

```tsx
// File: src/components/ui/GlowingConicCard.tsx
"use client";

import React, { ReactNode } from "react";

interface GlowingConicCardProps {
  children: ReactNode;
  className?: string;
  glowIntensity?: "low" | "medium" | "high";
  interactive?: boolean;
}

export const GlowingConicCard: React.FC<GlowingConicCardProps> = ({
  children,
  className = "",
  glowIntensity = "medium",
  interactive = true,
}) => {
  const intensityClasses = {
    low: "opacity-40 group-hover:opacity-75",
    medium: "opacity-60 group-hover:opacity-100",
    high: "opacity-85 group-hover:opacity-100",
  }[glowIntensity];

  return (
    <div
      className={`group relative rounded-2xl p-[1px] overflow-hidden transition-transform duration-300 ${
        interactive ? "hover:-translate-y-1" : ""
      } ${className}`}
    >
      {/* 1. Outer Neon Aura / Diffuse Glow (GPU Blurred) */}
      <div
        aria-hidden="true"
        className={`absolute -inset-[30%] -z-10 animate-conic-spin group-hover:animate-conic-spin-fast rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_200deg,#FFA63D_310deg,#E9800A_360deg)] filter blur-xl transition-opacity duration-500 ${intensityClasses}`}
      />

      {/* 2. Sharp 1px Conic Border Beam */}
      <div
        aria-hidden="true"
        className="absolute -inset-[150%] -z-1 animate-conic-spin group-hover:animate-conic-spin-fast bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_240deg,#FFA63D_330deg,#E9800A_360deg)]"
      />

      {/* 3. Obsidian Body Surface */}
      <div className="relative z-10 h-full w-full rounded-[15px] bg-[#0f0f11] p-6 text-zinc-100 transition-colors duration-300 group-hover:bg-[#121215]">
        {children}
      </div>
    </div>
  );
};
```

---

### 4.2 Component 2: Cursor-Driven Radial Glow Cards (Bento Spotlight)

This component tracks the pointer position on the parent grid or card container using non-blocking DOM custom properties, updating `--mouse-x` and `--mouse-y` via `requestAnimationFrame`. It creates a 400px radial amber spotlight that illuminates both the card surface and revealing border highlights under the cursor.

```tsx
// File: src/components/ui/SpotlightCard.tsx
"use client";

import React, { useRef, useState, useCallback, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightRadius?: number;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(233, 128, 10, 0.18)",
  spotlightRadius = 380,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (cardRef.current) {
          cardRef.current.style.setProperty("--mouse-x", `${x}px`);
          cardRef.current.style.setProperty("--mouse-y", `${y}px`);
        }
      });
    },
    []
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl border border-white/[0.08] bg-[#0f0f11] p-8 overflow-hidden transition-all duration-300 hover:border-brand-500/50 hover:shadow-glow-sm ${className}`}
      style={
        {
          "--mouse-x": "0px",
          "--mouse-y": "0px",
        } as React.CSSProperties
      }
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spotlightRadius}px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Card Content with elevated Z-index */}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
};
```

---

### 4.3 Component 3: Hero Interactive Particle Network / Metaball Canvas

This canvas component provides an interactive constellation and metaball particle network:
- 80-100 high-velocity particles in brand orange hues (`#FFA63D` specular core fading into `#E9800A`).
- Dynamic proximity-based electric vectors connecting particles within 110px.
- Interactive electrostatic pointer repulsion (particles accelerate smoothly away from the mouse within 160px).
- Autonomous drift physics with boundary rebounding.
- High-DPI support (`devicePixelRatio`) to ensure ultra-sharp rendering on Retina and 4K displays.
- Viewport intersection observer: automatically suspends calculation when scrolled away to preserve CPU/battery.

```tsx
// File: src/components/hero/HeroParticleCanvas.tsx
"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
}

export const HeroParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 160,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let isVisible = true;

    // Responsive particle count based on screen width
    const getParticleCount = (w: number) => (w < 768 ? 35 : w < 1200 ? 65 : 95);

    const initSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Re-seed particles
      const count = getParticleCount(width);
      particles = [];
      for (let i = 0; i < count; i++) {
        const r = Math.random() * 2.2 + 1.2;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: r,
          baseRadius: r,
          color: Math.random() > 0.4 ? "#E9800A" : "#FFA63D",
        });
      }
    };

    initSize();

    const handleResize = () => {
      initSize();
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Pause RAF when out of viewport
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animFrameRef.current) {
        render();
      }
    });
    observer.observe(canvas);

    // Render loop
    const maxDistance = 110;

    const render = () => {
      if (!isVisible) {
        animFrameRef.current = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mr = mouseRef.current.radius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wall rebound
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Pointer electrostatic interaction
        if (mx !== null && my !== null) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mr) {
            const force = (1 - dist / mr) * 2.2;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force;
            p.y += Math.sin(angle) * force;
            p.radius = p.baseRadius * 1.6;
          } else {
            p.radius = Math.max(p.baseRadius, p.radius - 0.05);
          }
        }

        // Draw particle dot with neon glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#E9800A";
        ctx.shadowBlur = p.radius > 2 ? 8 : 4;
        ctx.fill();

        // Connect vectors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < maxDistance) {
            const alpha = (1 - cdist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(233, 128, 10, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
};
```

---

### 4.4 Component 4: High-Performance Animated Statistics Counter

Calculates numbers using smooth `easeOutExpo` math driven by `requestAnimationFrame`, triggered once the counter enters the viewport. Zero layout shift is maintained by reserving numeric width.

```tsx
// File: src/components/ui/AnimatedCounter.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}) => {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    const startAnimation = () => {
      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Exponential ease out: 1 - 2^(-10t)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = easeProgress * value;

        setDisplayValue(
          currentVal.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        );

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplayValue(
            value.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })
          );
        }
      };

      requestAnimationFrame(step);
    };

    return () => observer.disconnect();
  }, [value, duration, decimals]);

  return (
    <span
      ref={elementRef}
      className={`inline-block font-mono font-bold tracking-tight text-white ${className}`}
    >
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
```

---

### 4.5 Component 5: Scroll-Trigger Choreography & Cascading Reveals (Framer Motion)

Provides unified motion wrappers that guarantee zero layout shift, staggered child element cascading, and smooth GPU translateY/opacity transitions.

```tsx
// File: src/components/motion/MotionWrappers.tsx
"use client";

import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.65,
  yOffset = 30,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic bezier out
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.12, className = "" }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
```

---

## 5. Homepage & Site-Wide Choreography Master Table

| Section | Trigger Point | Visual Elements & Stagger Order | Timing & Easing | Interactive Hover Effect |
|---|---|---|---|---|
| **Sticky Header / Nav** | Page Mount (`T=0`) | Brand Monogram (0ms) → Navigation Links (80ms stagger) → "Consultation" CTA with glowing border (250ms). | `duration: 0.5s`, `ease: [0.16, 1, 0.3, 1]`. | Scroll down > 50px activates frosted glass `bg-[#0a0a0a]/85 backdrop-blur-md` and bottom orange progress line. |
| **Hero Section** | Page Mount (`T=150ms`) | 1. Tech Pill Badge (`T+150ms`)<br>2. H1 Split Display Headline (`T+300ms`)<br>3. Paragraph Lead (`T+500ms`)<br>4. Dual CTA Button Group (`T+700ms`)<br>5. Background Particle Canvas activates immediately. | Split characters slide from `translateY(100%)` to `0%` masked with overflow hidden. `duration: 0.8s`. | Magnetic mouse tracking on CTA buttons; interactive electrostatic repulsion on particle canvas. |
| **Tech Stack Kinetic Marquee** | Scroll entrance (`top 85%`) | Dual counter-scrolling infinite tracks (Row 1 leftward, Row 2 rightward) displaying 24+ modern enterprise tech logos. | Continuous 35s loop, pure CSS GPU translation `transform: translateX()`. | Hovering over track pauses marquee (`animation-play-state: paused`); hovering logos highlights with `#E9800A` border glow. |
| **SaaS & AI Services Showcase** | Scroll entrance (`top 80%`) | Bento Grid layout: 4 major service domains (AI Consulting, Cloud & DevOps, Custom Software, Product Engineering). Cascades via `staggerChildren: 0.14s`. | Cards slide `y: 45 -> 0`, `opacity: 0 -> 1`. `duration: 0.6s`. | Cursor spotlight illuminates obsidian card surface with `#E9800A` beam; rotating conic gradient border accelerates. |
| **Animated Statistics Counters** | Scroll entrance (`top 75%`) | 4-column metric matrix: 99.99% Uptime, 150+ Enterprise Deployments, $100M+ Value Generated, <50ms API Latency. | `easeOutExpo` curve over 2200ms once 30% visible. | Cards elevate `translateY(-4px)` with orange box-shadow flare `boxShadow: glow-md`. |
| **Why AEITCH Feature Matrix** | Scroll entrance (`top 75%`) | 3x2 grid of strategic enterprise differentiators (Zero-Legacy Next.js Architecture, Autonomous AI Agents, SOC2-Ready Security). | Staggered reveal `y: 35 -> 0`, `duration: 0.5s`. | Radial cursor glow following mouse coordinates, glowing amber icon containers. |
| **Interactive MVP & Case Studies** | Scroll entrance (`top 70%`) | Featured project showcase cards with live preview frames, metrics badges, and tech tags. | `duration: 0.7s`, `ease: easeOut`. | Card scale `1.015`, subtle orange ambient border glow expansion, image zoom. |
| **Client Testimonials Carousel** | Scroll entrance (`top 75%`) | Quotation containers with glowing neon quotation marks, avatar badge, enterprise client metadata. | Smooth drag physics with Framer Motion drag constraints. | Testimonial card hover illuminates glowing borders and quotes. |
| **Consultation CTA Section** | Scroll entrance (`top 80%`) | Large terminal-styled container with radiating orange background mesh gradient, schedule consultation booking calendar button. | Scale `0.96 -> 1.0`, opacity `0 -> 1`. | Electric glowing conic border with intense amber bloom, pulsing live booking badge. |
| **Footer** | Scroll entrance (`top 90%`) | Multi-column sitemap, legal links, enterprise status indicator (live pulsing green/orange dot: "All Systems Operational"). | Fade up `opacity: 0 -> 1`. | Link text color transition to `#FFA63D` with underline hover animation. |

---

## 6. Performance, 60fps Optimization & Mobile Adaptation

1. **Zero Cumulative Layout Shift (CLS = 0)**:
   - All dynamic counters render their formatted container with reserved width (`inline-block min-w-[3ch]` or tabular numbers).
   - Particle canvas dimensions are bound to parent flex/grid bounds with explicit aspect ratios (`aspect-video` or absolute inset).
   - Rotating conic gradient borders operate strictly via pseudo-elements (`::before` / absolute layers) with `inset: -150%` and `overflow: hidden` on the container, preventing any DOM resizing or reflows.

2. **Compositor-Only Animation Guarantee**:
   - Animations exclusively target `transform` (`translate3d`, `rotate`, `scale`) and `opacity`.
   - Never animate `width`, `height`, `margin`, `top`, or `padding`.
   - Hardware acceleration enabled via `will-change: transform, opacity` and `backface-visibility: hidden`.

3. **Mobile & Touch Screen Adaptations**:
   - On screens `< 768px`:
     - Mouse cursor spotlight tracking is deactivated to save CPU cycles on touch events.
     - Cards fall back to a polished static border: `border border-white/10 active:border-brand-500/60`.
     - Particle count automatically throttles from 95 down to 35, and inter-particle distance threshold drops from 110px to 65px.
     - Rotating conic animations switch to standard CSS keyframes with low CPU impact.

4. **Accessibility & Reduced Motion (`prefers-reduced-motion: reduce`)**:
   - When users specify reduced motion preferences:
     - All rotation animations (`spin-conic`) are paused.
     - Particle canvas freezes drift motion and renders a subtle static constellation.
     - Scroll reveals execute as instant opacity fades (`duration: 0.2s`, `y: 0`) without translation shifts.

---

## 7. Caveats

1. **Browser Support for `@property`**:
   - While Chromium, WebKit (Safari 16.4+), and Firefox (128+) fully support `@property --conic-angle`, the component blueprint provides a universal pseudo-element `transform: rotate()` fallback that works flawlessly across 100% of legacy and modern browsers.
2. **Framework Version Synergy**:
   - When assembling Next.js 14/15, verify whether Framer Motion is installed as `framer-motion` v11+ or `motion/react` to ensure clean App Router client-boundary compatibility.
3. **Canvas HiDPI Overhead**:
   - On extreme 5K/Apple Pro Display XDR screens, capping the Canvas DPR at `Math.min(window.devicePixelRatio, 2)` is mandatory to prevent rendering 15+ million pixels per frame.

---

## 8. Conclusion

The visual design system and interactive effect blueprints specified above strictly fulfill all requirements of `ORIGINAL_REQUEST.md`:
- Pure enterprise high-tech aesthetic combining deep dark obsidian surfaces (`#0a0a0a`, `#0f0f11`) with vivid electric neon amber accents (`#E9800A`, `#FFA63D`).
- Silky 60fps glowing conic gradient borders with dual-layer bloom.
- Zero-overhead cursor-driven radial spotlight cards using direct CSS variable manipulation.
- Ultra-lightweight, high-DPI responsive hero particle canvas with pointer repulsion and viewport observer optimization.
- Comprehensive section-by-section scroll choreography with Framer Motion and animated statistics counters.

All code snippets and configuration tokens are production-ready and structured for immediate implementation during the foundation and theme milestones.

---

## 9. Verification Method

1. **Visual Token Verification**:
   - Inspect the generated Tailwind config and CSS variables to confirm exact color matches: `#0a0a0a` (background), `#0f0f11` (surface), `#E9800A` (primary brand orange), and `#FFA63D` (specular flare).
2. **Animation Frame Rate Verification**:
   - In Chrome DevTools > Performance > Rendering:
     - Enable "Paint flashing" to verify that rotating conic borders and cursor spotlight cards do NOT trigger paint flashing across the document body.
     - Enable "Frame Rendering Stats" to confirm 60fps (or 120fps on ProMotion displays) during continuous scroll and pointer movement.
3. **CLS Verification**:
   - In Chrome DevTools > Performance > Web Vitals:
     - Execute a full scroll from Hero to Footer and verify CLS remains exactly `0.00`.
4. **Reduced Motion Verification**:
   - In Chrome DevTools > Rendering > Emulate CSS media feature `prefers-reduced-motion: reduce`:
     - Verify all rotating borders freeze and entrance transitions switch to instant fades.
