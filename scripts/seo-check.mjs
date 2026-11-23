import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const sitemapPath = path.resolve(distDir, 'sitemap.xml');
const ssrEntryPath = path.resolve(rootDir, 'dist-ssr', 'entry-server.js');

async function runSeoAudit() {
  console.log('🔍 Starting Strict Autonomous SEO Quality Gate...\n');

  if (!fs.existsSync(distDir)) {
    console.error('❌ dist/ directory not found. Please build first.');
    process.exit(1);
  }

  if (!fs.existsSync(ssrEntryPath)) {
    console.error('❌ dist-ssr/entry-server.js not found.');
    process.exit(1);
  }

  const { getAllRoutes } = await import(`file://${ssrEntryPath}?t=${Date.now()}`);
  const routes = getAllRoutes();

  let sitemapContent = '';
  if (fs.existsSync(sitemapPath)) {
    sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  } else {
    console.warn('⚠️ dist/sitemap.xml not found during check.');
  }

  const titlesSet = new Map();
  const descriptionsSet = new Map();
  const h1Set = new Map();

  let totalErrors = 0;
  let totalWarnings = 0;
  let passedPages = 0;

  for (const route of routes) {
    const filePath = path.join(distDir, route.outputPath);
    const pageErrors = [];
    const pageWarnings = [];

    if (!fs.existsSync(filePath)) {
      console.error(`❌ [${route.path}] Output file missing: dist/${route.outputPath}`);
      totalErrors++;
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf-8');
    const fileSizeKb = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);

    if (html.length < 5000) {
      pageErrors.push(`HTML payload too small (${fileSizeKb} KB), may indicate failed prerender`);
    }

    // 1. Title validation
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (!title) {
      pageErrors.push('Missing <title>');
    } else {
      if (title.length < 45 || title.length > 70) {
        pageWarnings.push(`Title length ${title.length} chars (ideal: 50-65): "${title}"`);
      }
      if (!title.includes('AEITCH')) {
        pageErrors.push(`Title lacks brand entity "AEITCH": "${title}"`);
      }
      if (titlesSet.has(title)) {
        pageErrors.push(`Duplicate title (conflicts with ${titlesSet.get(title)}): "${title}"`);
      } else {
        titlesSet.set(title, route.path);
      }
    }

    // 2. Meta description validation
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
    const description = descMatch ? descMatch[1].trim() : '';
    if (!description) {
      pageErrors.push('Missing <meta name="description">');
    } else {
      if (description.length < 110 || description.length > 170) {
        pageWarnings.push(`Meta description length ${description.length} chars (ideal: 120-165)`);
      }
      if (descriptionsSet.has(description)) {
        pageErrors.push(`Duplicate meta description (conflicts with ${descriptionsSet.get(description)})`);
      } else {
        descriptionsSet.set(description, route.path);
      }
    }

    // 3. Canonical validation
    const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"\s*\/?>/i);
    const canonical = canonMatch ? canonMatch[1].trim() : '';
    if (!canonical) {
      pageErrors.push('Missing <link rel="canonical">');
    } else if (canonical !== route.canonical) {
      pageErrors.push(`Canonical mismatch: expected "${route.canonical}", found "${canonical}"`);
    } else if (!canonical.startsWith('https://www.aeitch.com')) {
      pageErrors.push(`Canonical host must be https://www.aeitch.com: "${canonical}"`);
    }

    // 4. OpenGraph and Twitter tags
    if (!html.includes('property="og:title"')) pageWarnings.push('Missing og:title');
    if (!html.includes('property="og:description"')) pageWarnings.push('Missing og:description');
    if (!html.includes('property="og:url"')) pageWarnings.push('Missing og:url');
    if (!html.includes('name="twitter:title"')) pageWarnings.push('Missing twitter:title');

    // 5. H1 heading hierarchy
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    if (h1Matches.length === 0) {
      pageErrors.push('Missing <h1> heading');
    } else if (h1Matches.length > 1) {
      pageErrors.push(`Multiple <h1> headings found (${h1Matches.length})`);
    } else {
      const h1Text = h1Matches[0][1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
      if (!h1Text) {
        pageErrors.push('Empty <h1> heading');
      } else if (h1Set.has(h1Text)) {
        pageWarnings.push(`Duplicate <h1> with ${h1Set.get(h1Text)}: "${h1Text}"`);
      } else {
        h1Set.set(h1Text, route.path);
      }
    }

    // 6. JSON-LD validation
    const jsonLdMatches = [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
    if (jsonLdMatches.length === 0) {
      pageErrors.push('Missing JSON-LD structured data');
    } else {
      for (const m of jsonLdMatches) {
        try {
          const parsed = JSON.parse(m[1]);
          if (!parsed['@context'] && !parsed['@graph']) {
            pageWarnings.push('JSON-LD schema lacks @context or @graph');
          }
        } catch (e) {
          pageErrors.push(`Malformed JSON-LD payload: ${e.message}`);
        }
      }
    }

    // 7. Sitemap & Indexability consistency
    if (route.noindex) {
      if (!html.includes('name="robots"') || !html.includes('noindex')) {
        pageErrors.push('Expected noindex robots meta tag for unindexed route');
      }
      if (sitemapContent && sitemapContent.includes(`<loc>${route.canonical}</loc>`)) {
        pageErrors.push(`Noindex route "${route.canonical}" must NOT appear in sitemap.xml`);
      }
    } else {
      if (html.includes('content="noindex')) {
        pageErrors.push('Indexed route incorrectly contains noindex directive');
      }
      if (sitemapContent && !sitemapContent.includes(`<loc>${route.canonical}</loc>`)) {
        pageErrors.push(`Canonical 200 route missing from sitemap.xml: "${route.canonical}"`);
      }
    }

    if (pageErrors.length > 0) {
      console.log(`❌ [${route.path}] FAILED:`);
      pageErrors.forEach((e) => console.log(`     • ERROR: ${e}`));
      totalErrors += pageErrors.length;
    } else if (pageWarnings.length > 0) {
      console.log(`⚠️  [${route.path}] PASSED WITH WARNINGS:`);
      pageWarnings.forEach((w) => console.log(`     • WARN:  ${w}`));
      totalWarnings += pageWarnings.length;
      passedPages++;
    } else {
      console.log(`✅ [${route.path}] PASSED (${fileSizeKb} KB, title: "${title.slice(0, 38)}...")`);
      passedPages++;
    }
  }

  console.log('\n======================================================');
  console.log(`📊 SEO Quality Gate Summary:`);
  console.log(`   Total Pages Audited: ${routes.length}`);
  console.log(`   Passed:              ${passedPages} / ${routes.length}`);
  console.log(`   Errors:              ${totalErrors}`);
  console.log(`   Warnings:            ${totalWarnings}`);
  console.log('======================================================\n');

  if (totalErrors > 0) {
    console.error(`🚨 SEO Check failed with ${totalErrors} error(s). Halting build.`);
    process.exit(1);
  } else {
    console.log('🎉 All pages passed autonomous SEO quality checks!');
    const ssrDir = path.resolve(rootDir, 'dist-ssr');
    if (fs.existsSync(ssrDir)) {
      try {
        fs.rmSync(ssrDir, { recursive: true, force: true });
      } catch {}
    }
    const originalTemplate = path.resolve(distDir, 'index.original.html');
    if (fs.existsSync(originalTemplate)) {
      try {
        fs.rmSync(originalTemplate, { force: true });
      } catch {}
    }
  }
}

runSeoAudit().catch((err) => {
  console.error('Audit crashed:', err);
  process.exit(1);
});
