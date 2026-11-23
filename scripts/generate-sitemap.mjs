import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const distDir = path.resolve(rootDir, 'dist');
const ssrEntryPath = path.resolve(rootDir, 'dist-ssr', 'entry-server.js');

const ROUTE_SOURCE_MAP = {
  '/': 'src/pages/home/HomePage.tsx',
  '/services/ai-automation': 'src/pages/services/AIAutomationPage.tsx',
  '/services/product-development': 'src/config/servicesData.ts',
  '/services/devops-cloud': 'src/config/servicesData.ts',
  '/services/custom-software': 'src/config/servicesData.ts',
  '/solutions': 'src/pages/solutions/SolutionsPage.tsx',
  '/about': 'src/pages/about/AboutPage.tsx',
  '/pricing': 'src/pages/pricing/PricingPage.tsx',
  '/contact': 'src/pages/contact/ContactPage.tsx',
  '/insights': 'src/data/insightsArticles.ts',
  '/stack': 'src/data/stackPages.ts',
};

function getGitLastMod(filePath) {
  try {
    const stdout = execSync(`git log -1 --format=%cs -- "${filePath}"`, {
      cwd: rootDir,
      encoding: 'utf-8',
    }).trim();
    if (stdout && /^\d{4}-\d{2}-\d{2}$/.test(stdout)) {
      return stdout;
    }
  } catch {
    // fallback if git command fails
  }
  return '2026-11-20';
}

function getPriority(routePath) {
  if (routePath === '/') return '1.0';
  if (routePath.startsWith('/services/')) return '0.9';
  if (routePath === '/insights' || routePath === '/stack') return '0.8';
  if (routePath.startsWith('/insights/') || routePath.startsWith('/stack/')) return '0.7';
  if (routePath === '/solutions' || routePath === '/about' || routePath === '/pricing' || routePath === '/contact') return '0.8';
  return '0.6';
}

function getChangeFreq(routePath) {
  if (routePath === '/' || routePath.startsWith('/services/')) return 'weekly';
  if (routePath === '/insights' || routePath === '/stack') return 'daily';
  if (routePath.startsWith('/insights/') || routePath.startsWith('/stack/')) return 'monthly';
  return 'monthly';
}

async function generateSitemap() {
  console.log('🗺️ Generating Canonical XML Sitemap...');

  if (!fs.existsSync(ssrEntryPath)) {
    console.error('❌ dist-ssr/entry-server.js not found.');
    process.exit(1);
  }

  const { getAllRoutes } = await import(`file://${ssrEntryPath}?t=${Date.now()}`);
  const routes = getAllRoutes();

  // Filter only canonical 200 routes (strictly exclude noindex like /case-studies and /404)
  const canonicalRoutes = routes.filter((r) => r.isCanonical200 === true && !r.noindex);

  console.log(`Found ${canonicalRoutes.length} canonical 200 URLs for sitemap.`);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const route of canonicalRoutes) {
    let sourceFile = ROUTE_SOURCE_MAP[route.path];
    if (!sourceFile) {
      if (route.path.startsWith('/insights/')) sourceFile = 'src/data/insightsArticles.ts';
      else if (route.path.startsWith('/stack/')) sourceFile = 'src/data/stackPages.ts';
      else sourceFile = 'src/App.tsx';
    }

    const lastmod = getGitLastMod(sourceFile);
    const priority = getPriority(route.path);
    const changefreq = getChangeFreq(route.path);

    xml += '  <url>\n';
    xml += `    <loc>${route.canonical}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  const publicSitemap = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemap, xml, 'utf-8');
  console.log(`  ✓ Wrote ${canonicalRoutes.length} URLs to public/sitemap.xml`);

  if (fs.existsSync(distDir)) {
    const distSitemap = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distSitemap, xml, 'utf-8');
    console.log(`  ✓ Wrote ${canonicalRoutes.length} URLs to dist/sitemap.xml`);
  }

  console.log('✅ Canonical XML Sitemap successfully generated.\n');
}

generateSitemap().catch((err) => {
  console.error('❌ Sitemap generation failed:', err);
  process.exit(1);
});
