# SEO Action Checklist for Founder / Human (AEITCH SMC PVT LTD)

This document contains tasks that require external human credentials, DNS management, Google Search Console actions, or real business data input.

---

## 1. Explanation of Google Search Console Issues (From Your Screenshots)

In your Google Search Console screenshots:
1. **"63.6K Not indexed / 75 Indexed" (All known pages)**
2. **"1.05K Not indexed / 1 Indexed" (All submitted pages)**
3. **"Submitted sitemap: https://aeitch.com/sitemap.xml (10 discovered pages)"**

### Why did this happen?
- **Wildcard Soft-404 Crawl Trap**: Previously, `vercel.json` redirected all unknown URLs back to `index.html` with an HTTP 200 status code. Whenever scrapers, bots, or legacy URLs visited non-existent pages (e.g., `aeitch.com/random-page`, query parameters, old WordPress paths), Vercel returned HTTP 200 with the homepage content. Googlebot flagged these as "Soft 404" and "Duplicate without user-selected canonical", bloating the indexed queue to 63,600+ phantom URLs.
- **Apex vs. Canonical WWW**: The submitted sitemap was `https://aeitch.com/sitemap.xml` (apex), but the canonical site is `https://www.aeitch.com/`.
- **Client-Side SPA Shell**: The original site served an empty `<div id="root"></div>` to search engine crawlers without JavaScript execution, causing Google to struggle indexing submitted pages.

### How We Fixed It in the Codebase:
1. **Static Prerendering (SSG)**: Every single route (all 29 pages) is now pre-rendered into static HTML during build. Googlebot gets instant, full HTML with titles, descriptions, H1s, and JSON-LD without running JS.
2. **True HTTP 404**: The wildcard catch-all rewrite was removed. Vercel now serves `dist/404.html` with a true HTTP 404 status. Over the next few crawl cycles, Googlebot will see the 404 headers and flush out all 63.6K phantom URLs.
3. **New Canonical Sitemap**: `sitemap.xml` now strictly contains the 27 clean canonical 200 pages hosted on `https://www.aeitch.com/`.

---

## 2. Immediate Google Search Console Actions (Founder Steps)

Follow these steps directly inside Google Search Console:

### Step 2.1: Update Sitemaps
1. Go to **Google Search Console** > **Sitemaps** (left menu).
2. Look at the existing submitted sitemap (`https://aeitch.com/sitemap.xml`).
3. Under **Add a new sitemap**, enter:
   ```text
   sitemap.xml
   ```
   (or `https://www.aeitch.com/sitemap.xml` depending on whether you are viewing the Domain Property or URL-prefix Property).
4. Click **SUBMIT**.
5. GSC will fetch the new sitemap containing all 27 canonical pages.

### Step 2.2: Validate Fixes on Page Indexing
1. In the left menu, click **Pages** (under Indexing).
2. Scroll down to **Why pages aren't indexed**.
3. Click into **Soft 404** (if listed):
   - Click the **Validate Fix** button at the top.
4. Click into **Duplicate without user-selected canonical** (if listed):
   - Click the **Validate Fix** button.
5. Click into **Not found (404)** (if listed):
   - Click the **Validate Fix** button.
   *(Note: It is completely normal for Google to report 404s for old deleted URLs. A real 404 is Google's intended signal to remove dead pages from search results).*

### Step 2.3: Priority URL Inspection & Request Indexing
In the top search bar ("Inspect any URL in 'aeitch.com'"):
1. Enter `https://www.aeitch.com/` -> Click **Test Live URL** -> Click **Request Indexing**.
2. Enter `https://www.aeitch.com/services/ai-automation` -> **Test Live URL** -> **Request Indexing**.
3. Enter `https://www.aeitch.com/services/product-development` -> **Test Live URL** -> **Request Indexing**.
4. Enter `https://www.aeitch.com/services/devops-cloud` -> **Test Live URL** -> **Request Indexing**.
5. Enter `https://www.aeitch.com/services/custom-software` -> **Test Live URL** -> **Request Indexing**.

---

## 3. External Entity Disambiguation Footprint (Stop Google Autocorrect)

Google currently suggests "Did you mean: switch" because "AEITCH" is a new brand entity. To establish the entity Knowledge Graph consensus across the web, create and align these free profiles:

- [ ] **LinkedIn Company Page**:
  - Name: `AEITCH`
  - Legal Subtitle: `AEITCH SMC PVT LTD`
  - Tagline: `Enterprise AI & Software Engineering Collective`
  - Website: `https://www.aeitch.com`
  - Industry: `Software Development` / `IT Services and IT Consulting`
- [ ] **Crunchbase Organization Profile**:
  - Entity Name: `AEITCH SMC PVT LTD`
  - Short Description: `AEITCH is an enterprise engineering collective architecting autonomous AI agent systems, full-cycle SaaS products, resilient cloud infrastructure, and custom high-throughput software.`
  - Website: `https://www.aeitch.com`
- [ ] **Clutch.co Free Agency Profile**:
  - Entity Name: `AEITCH SMC PVT LTD`
  - Focus: Artificial Intelligence, Cloud & DevOps, Custom Software Development
  - Website: `https://www.aeitch.com`
- [ ] **GoodFirms Profile**:
  - Entity Name: `AEITCH`
  - Website: `https://www.aeitch.com`
- [ ] **GitHub Organization**:
  - Profile URL: `https://github.com/aeitch`
  - Bio: `Enterprise AI & Software Engineering Collective`
  - Website: `https://www.aeitch.com`
- [ ] **Wellfound (AngelList)**:
  - Create free hiring/agency profile for `AEITCH`.

---

## 4. Real Business Proof Needed (Hard Rule 1 Compliance)

All generic or unverified claims have been converted to qualitative architecture patterns with `[[FOUNDER TO PROVIDE: ...]]` placeholders. Provide verified details for:

- [ ] **Real Client Case Studies**:
  - Replace placeholders in `src/pages/casestudies/CaseStudiesPage.tsx` with genuine client projects once signed off.
  - When real client projects are populated, remove `noindex={true}` from `CaseStudiesPage.tsx` and flip `isCanonical200` to `true` in `src/entry-server.tsx`.
- [ ] **Verified Guarantees / Metrics**:
  - If you wish to publish specific SLAs (e.g. 99.9% uptime or quantified cost savings), provide verified client documentation.
- [ ] **Registered Office Address (Optional)**:
  - If you want a physical address displayed on `/contact`, `/about`, and in the `Organization` JSON-LD schema, provide your official registered business address.
- [ ] **Google Analytics 4**:
  - If you want GA4 web tracking, provide your Measurement ID (`G-XXXXXXXXXX`).
