import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const ssrEntryPath = path.resolve(rootDir, 'dist-ssr', 'entry-server.js');

async function prerender() {
  console.log('🚀 Starting Static Site Prerendering (SSG)...');

  if (!fs.existsSync(distDir)) {
    console.error('❌ dist/ directory not found. Run "vite build" first.');
    process.exit(1);
  }

  if (!fs.existsSync(ssrEntryPath)) {
    console.error('❌ dist-ssr/entry-server.js not found. Run "vite build --ssr src/entry-server.tsx --outDir dist-ssr" first.');
    process.exit(1);
  }

  const templatePath = path.join(distDir, 'index.html');
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');

  // Dynamically import entry-server
  const { render, getAllRoutes } = await import(`file://${ssrEntryPath}?t=${Date.now()}`);
  const routes = getAllRoutes();

  console.log(`📄 Found ${routes.length} routes to prerender.\n`);

  for (const route of routes) {
    const { path: routePath, outputPath, title, description, canonical, noindex, ogType } = route;
    const { html: renderedBody } = render(routePath);

    let finalHtml = templateHtml;

    // 1. Replace #root content
    finalHtml = finalHtml.replace(
      /<div id="root">[\s\S]*?<\/div>/,
      `<div id="root">${renderedBody}</div>`
    );

    // 2. Replace <title>
    finalHtml = finalHtml.replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${title}</title>`
    );

    // 3. Replace <meta name="description" ...>
    finalHtml = finalHtml.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${description}" />`
    );

    // 4. Replace <link rel="canonical" ...>
    finalHtml = finalHtml.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonical}" />`
    );

    // 5. Replace Open Graph tags
    finalHtml = finalHtml.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${title}" />`
    );
    finalHtml = finalHtml.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${description}" />`
    );
    finalHtml = finalHtml.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${canonical}" />`
    );
    if (ogType) {
      finalHtml = finalHtml.replace(
        /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:type" content="${ogType}" />`
      );
    }

    // 6. Replace Twitter tags
    finalHtml = finalHtml.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${title}" />`
    );
    finalHtml = finalHtml.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${description}" />`
    );

    // 7. Handle noindex if specified
    if (noindex) {
      if (!finalHtml.includes('name="robots"')) {
        finalHtml = finalHtml.replace(
          '</head>',
          '  <meta name="robots" content="noindex, follow" />\n  </head>'
        );
      }
    }

    const targetFilePath = path.join(distDir, outputPath);
    const targetDir = path.dirname(targetFilePath);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetFilePath, finalHtml, 'utf-8');
    console.log(`  ✓ Prerendered: ${routePath.padEnd(52)} -> dist/${outputPath} (${(finalHtml.length / 1024).toFixed(1)} KB)`);
  }

  console.log('\n✅ All routes successfully prerendered into static HTML.');
}

prerender().catch((err) => {
  console.error('❌ Prerendering failed:', err);
  process.exit(1);
});
