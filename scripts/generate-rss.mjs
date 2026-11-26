import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const distDir = path.resolve(rootDir, 'dist');
const ssrEntryPath = path.resolve(rootDir, 'dist-ssr', 'entry-server.js');

const SITE_URL = 'https://www.aeitch.com';

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeCdata(html = '') {
  return String(html).replace(/\]\]>/g, ']]]]><![CDATA[>');
}

function toRfc822(isoDate) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? new Date().toUTCString() : date.toUTCString();
}

function articleToHtml(article) {
  const articleUrl = `${SITE_URL}/insights/${article.slug}`;
  const parts = [];

  if (article.summaryBox) {
    parts.push(`<blockquote><p><strong>Executive Summary:</strong> ${escapeXml(article.summaryBox.coreTakeaway)}</p>`);
    if (article.summaryBox.keyPoints?.length) {
      parts.push('<ul>');
      for (const pt of article.summaryBox.keyPoints) {
        parts.push(`<li>${escapeXml(pt)}</li>`);
      }
      parts.push('</ul>');
    }
    parts.push('</blockquote>');
  }

  if (article.content?.lead) {
    parts.push(`<p>${escapeXml(article.content.lead)}</p>`);
  }

  for (const section of article.content?.sections || []) {
    parts.push(`<h2>${escapeXml(section.heading)}</h2>`);
    if (section.subheading) {
      parts.push(`<h3>${escapeXml(section.subheading)}</h3>`);
    }
    for (const p of section.paragraphs || []) {
      parts.push(`<p>${escapeXml(p)}</p>`);
    }
    if (section.codeSnippet?.code) {
      if (section.codeSnippet.caption) {
        parts.push(`<p><em>${escapeXml(section.codeSnippet.caption)}</em></p>`);
      }
      parts.push(`<pre><code>${escapeXml(section.codeSnippet.code)}</code></pre>`);
    }
    if (section.comparisonTable?.headers?.length) {
      parts.push('<table><thead><tr>');
      for (const h of section.comparisonTable.headers) {
        parts.push(`<th>${escapeXml(h)}</th>`);
      }
      parts.push('</tr></thead><tbody>');
      for (const row of section.comparisonTable.rows || []) {
        parts.push('<tr>');
        for (const cell of row) {
          parts.push(`<td>${escapeXml(cell)}</td>`);
        }
        parts.push('</tr>');
      }
      parts.push('</tbody></table>');
    }
  }

  if (article.content?.references?.length) {
    parts.push('<h2>References</h2><ul>');
    for (const ref of article.content.references) {
      parts.push(`<li><a href="${escapeXml(ref.url)}">${escapeXml(ref.title)}</a> — ${escapeXml(ref.annotation)}</li>`);
    }
    parts.push('</ul>');
  }

  parts.push(`<p>Originally published at <a href="${articleUrl}">${articleUrl}</a>.</p>`);
  return parts.join('\n');
}

async function generateRss() {
  console.log('📡 Generating RSS 2.0 Feed (rss.xml)...');

  if (!fs.existsSync(ssrEntryPath)) {
    console.error('❌ dist-ssr/entry-server.js not found. Run "npm run build:ssr" first.');
    process.exit(1);
  }

  const { INSIGHTS_ARTICLES } = await import(`file://${ssrEntryPath}?t=${Date.now()}`);

  if (!Array.isArray(INSIGHTS_ARTICLES) || INSIGHTS_ARTICLES.length === 0) {
    console.error('❌ No articles found in INSIGHTS_ARTICLES.');
    process.exit(1);
  }

  const sortedArticles = [...INSIGHTS_ARTICLES].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  const lastBuildDate = toRfc822(sortedArticles[0].publishDate);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">\n';
  xml += '  <channel>\n';
  xml += '    <title>AEITCH Technical Insights</title>\n';
  xml += `    <link>${SITE_URL}/insights</link>\n`;
  xml += '    <description>Production architecture blueprints, private enterprise RAG, multi-agent orchestration, Kubernetes FinOps, and GEO insights from AEITCH.</description>\n';
  xml += '    <language>en-us</language>\n';
  xml += `    <lastBuildDate>${lastBuildDate}</lastBuildDate>\n`;
  xml += `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />\n`;

  for (const article of sortedArticles) {
    const articleUrl = `${SITE_URL}/insights/${article.slug}`;
    const summaryText = article.summaryBox?.coreTakeaway
      ? `${article.metaDescription} — ${article.summaryBox.coreTakeaway}`
      : article.metaDescription;
    const htmlBody = articleToHtml(article);

    xml += '    <item>\n';
    xml += `      <title>${escapeXml(article.title)}</title>\n`;
    xml += `      <link>${articleUrl}</link>\n`;
    xml += `      <guid isPermaLink="true">${articleUrl}</guid>\n`;
    xml += `      <pubDate>${toRfc822(article.publishDate)}</pubDate>\n`;
    xml += `      <category>${escapeXml(article.category)}</category>\n`;
    xml += `      <description>${escapeXml(summaryText)}</description>\n`;
    xml += `      <content:encoded><![CDATA[${escapeCdata(htmlBody)}]]></content:encoded>\n`;
    xml += '    </item>\n';
  }

  xml += '  </channel>\n';
  xml += '</rss>\n';

  const publicRss = path.join(publicDir, 'rss.xml');
  fs.writeFileSync(publicRss, xml, 'utf-8');
  console.log(`  ✓ Wrote ${sortedArticles.length} items to public/rss.xml`);

  if (fs.existsSync(distDir)) {
    const distRss = path.join(distDir, 'rss.xml');
    fs.writeFileSync(distRss, xml, 'utf-8');
    console.log(`  ✓ Wrote ${sortedArticles.length} items to dist/rss.xml`);
  }

  console.log('✅ RSS feed successfully generated.\n');
}

generateRss().catch((err) => {
  console.error('❌ RSS generation failed:', err);
  process.exit(1);
});
