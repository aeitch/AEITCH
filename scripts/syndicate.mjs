import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const ssrEntryPath = path.resolve(rootDir, 'dist-ssr', 'entry-server.js');

const SITE_URL = 'https://www.aeitch.com';
const DEVTO_ORG_USERNAME = process.env.DEVTO_ORG_USERNAME || 'aeitch';
const HASHNODE_HOST = process.env.HASHNODE_HOST || 'aeitch.hashnode.dev';
const IS_DRY_RUN = process.argv.includes('--dry-run');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class HashnodeProRequiredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HashnodeProRequiredError';
  }
}

/**
 * Derive up to 4 clean alphanumeric tags for Dev.to and structured tags for Hashnode.
 */
function deriveTags(article) {
  const categoryMap = {
    'Enterprise AI & Security': ['ai', 'rag', 'security', 'enterprise'],
    'Agent Systems & Architecture': ['ai', 'agents', 'llm', 'architecture'],
    'Product Engineering': ['saas', 'mvp', 'webdev', 'architecture'],
    'Cloud Engineering & FinOps': ['kubernetes', 'devops', 'cloud', 'finops'],
    'Software Architecture': ['architecture', 'microservices', 'cloud', 'devops'],
    'GEO & AI Search Strategy': ['seo', 'ai', 'webdev', 'marketing'],
  };

  const rawTags = categoryMap[article.category] || ['software', 'engineering', 'ai', 'cloud'];
  const devtoTags = rawTags
    .map((t) => t.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(Boolean)
    .slice(0, 4);

  const hashnodeTags = devtoTags.map((slug) => ({
    name: slug.toUpperCase() === 'AI' ? 'AI' : slug.charAt(0).toUpperCase() + slug.slice(1),
    slug,
  }));

  return { devtoTags, hashnodeTags };
}

/**
 * Convert an InsightArticle object into clean GitHub-Flavored Markdown.
 */
function articleToMarkdown(article) {
  const canonicalUrl = `${SITE_URL}/insights/${article.slug}`;
  const pillarUrl = `${SITE_URL}${article.pillarService.path}`;
  const lines = [];

  lines.push(`> *Originally published at [AEITCH Insights](${canonicalUrl}) by ${article.authorByline}.*`);
  lines.push('');

  if (article.summaryBox) {
    lines.push('### Executive Summary');
    lines.push('');
    lines.push(article.summaryBox.coreTakeaway);
    lines.push('');
    for (const point of article.summaryBox.keyPoints || []) {
      lines.push(`- ${point}`);
    }
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  if (article.content?.lead) {
    lines.push(article.content.lead);
    lines.push('');
  }

  for (const section of article.content?.sections || []) {
    lines.push(`## ${section.heading}`);
    lines.push('');

    if (section.subheading) {
      lines.push(`### ${section.subheading}`);
      lines.push('');
    }

    for (const paragraph of section.paragraphs || []) {
      lines.push(paragraph);
      lines.push('');
    }

    if (section.codeSnippet?.code) {
      const lang = section.codeSnippet.language || '';
      if (section.codeSnippet.caption) {
        lines.push(`*${section.codeSnippet.caption}*`);
        lines.push('');
      }
      lines.push(`\`\`\`${lang}`);
      lines.push(section.codeSnippet.code);
      lines.push('```');
      lines.push('');
    }

    if (section.comparisonTable?.headers?.length) {
      const { headers, rows } = section.comparisonTable;
      lines.push(`| ${headers.join(' | ')} |`);
      lines.push(`| ${headers.map(() => '---').join(' | ')} |`);
      for (const row of rows || []) {
        lines.push(`| ${row.join(' | ')} |`);
      }
      lines.push('');
    }
  }

  if (article.content?.references?.length) {
    lines.push('## References & Further Reading');
    lines.push('');
    for (const ref of article.content.references) {
      lines.push(`- [${ref.title}](${ref.url}) — ${ref.annotation}`);
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push(
    `**Explore more from AEITCH:** Read the full interactive blueprint on [AEITCH Insights](${canonicalUrl}) or explore our [${article.pillarService.name}](${pillarUrl}) engineering practice.`
  );

  return lines.join('\n');
}

async function resolveDevtoOrganizationId(headers) {
  if (process.env.DEVTO_ORGANIZATION_ID) {
    return Number(process.env.DEVTO_ORGANIZATION_ID);
  }
  if (!DEVTO_ORG_USERNAME) return null;

  const orgRes = await fetch(`https://dev.to/api/organizations/${DEVTO_ORG_USERNAME}`, { headers });
  if (!orgRes.ok) {
    console.warn(`  ⚠️ Could not resolve Dev.to org "${DEVTO_ORG_USERNAME}" (${orgRes.status}); posting under personal account.`);
    return null;
  }
  const org = await orgRes.json();
  console.log(`  ℹ️ Resolved Dev.to organization: ${org.name} (@${org.username}, id=${org.id})`);
  return org.id || null;
}

async function syndicateToDevto(articles) {
  const apiKey = process.env.DEVTO_API_KEY;
  if (!apiKey) {
    console.log('⏭️  DEVTO_API_KEY not set — skipping Dev.to syndication.');
    return;
  }

  console.log(`🚀 Checking Dev.to (dev.to/${DEVTO_ORG_USERNAME})...`);
  const headers = {
    'api-key': apiKey,
    'Content-Type': 'application/json',
    'User-Agent': 'AEITCH-Syndicator/1.0',
  };

  const organizationId = await resolveDevtoOrganizationId(headers);

  const existingRes = await fetch('https://dev.to/api/articles/me/all?per_page=100', { headers });
  if (!existingRes.ok) {
    throw new Error(`Dev.to fetch failed (${existingRes.status}): ${await existingRes.text()}`);
  }

  const existingArticles = await existingRes.json();
  const existingCanonicals = new Set(
    existingArticles.map((a) => a.canonical_url).filter(Boolean)
  );
  const existingTitles = new Set(existingArticles.map((a) => a.title));

  for (const article of articles) {
    const canonicalUrl = `${SITE_URL}/insights/${article.slug}`;
    if (existingCanonicals.has(canonicalUrl) || existingTitles.has(article.title)) {
      console.log(`  ✓ Already on Dev.to: ${article.slug}`);
      continue;
    }

    const { devtoTags } = deriveTags(article);
    const bodyMarkdown = articleToMarkdown(article);

    const articlePayload = {
      title: article.title,
      published: true,
      body_markdown: bodyMarkdown,
      canonical_url: canonicalUrl,
      description: article.metaDescription,
      tags: devtoTags,
      ...(organizationId ? { organization_id: organizationId } : {}),
    };

    const res = await fetch('https://dev.to/api/articles', {
      method: 'POST',
      headers,
      body: JSON.stringify({ article: articlePayload }),
    });

    if (!res.ok) {
      const errText = await res.text();
      if (res.status === 429) {
        if (process.argv.includes('--retry-rate-limit')) {
          const retryAfter = Number(res.headers.get('retry-after')) || 305;
          console.warn(`  ⏳ Dev.to rate limit reached. Waiting ${retryAfter}s before retrying ${article.slug}...`);
          await sleep(retryAfter * 1000);
          const retryRes = await fetch('https://dev.to/api/articles', {
            method: 'POST',
            headers,
            body: JSON.stringify({ article: articlePayload }),
          });
          if (retryRes.ok) {
            const created = await retryRes.json();
            console.log(`  ✓ Published to Dev.to: ${created.url} (canonical -> ${canonicalUrl})`);
            await sleep(2000);
            continue;
          }
          console.error(`  ❌ Failed Dev.to retry for ${article.slug} (${retryRes.status}): ${await retryRes.text()}`);
        } else {
          console.warn(`  ⏳ Dev.to burst rate limit reached (429). Stopping Dev.to loop — re-run later to publish remaining articles.`);
        }
        break;
      }
      console.error(`  ❌ Failed Dev.to post for ${article.slug} (${res.status}): ${errText}`);
      continue;
    }

    const created = await res.json();
    console.log(`  ✓ Published to Dev.to: ${created.url} (canonical -> ${canonicalUrl})`);
    await sleep(2000);
  }
}

async function hashnodeGraphQL(token, query, variables = {}) {
  const res = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'AEITCH-Syndicator/1.0',
    },
    body: JSON.stringify({ query, variables }),
  });

  const contentType = res.headers.get('content-type') || '';
  if (res.url?.includes('graphql-api-paid-access') || !contentType.includes('application/json')) {
    throw new HashnodeProRequiredError(
      'Hashnode GraphQL API requires Hashnode Pro (post May 2026 policy). Import via https://www.aeitch.com/rss.xml in Hashnode dashboard or upgrade to Pro.'
    );
  }

  const json = await res.json();
  if (!res.ok || json.errors?.length) {
    const errMsg = JSON.stringify(json.errors || json);
    if (errMsg.toLowerCase().includes('pro') || errMsg.toLowerCase().includes('subscription')) {
      throw new HashnodeProRequiredError(`Hashnode GraphQL API requires Pro: ${errMsg}`);
    }
    throw new Error(`Hashnode API error: ${errMsg}`);
  }
  return json.data;
}

async function syndicateToHashnode(articles) {
  const token = process.env.HASHNODE_TOKEN;
  if (!token) {
    console.log('⏭️  HASHNODE_TOKEN not set — skipping Hashnode syndication.');
    return;
  }

  console.log(`🚀 Checking Hashnode (${HASHNODE_HOST})...`);

  try {
    let publicationId = process.env.HASHNODE_PUBLICATION_ID;
    if (!publicationId) {
      const pubData = await hashnodeGraphQL(
        token,
        `query PublicationByHost($host: String!) {
          publication(host: $host) { id title url }
        }`,
        { host: HASHNODE_HOST }
      );
      publicationId = pubData?.publication?.id;

      if (!publicationId) {
        const meData = await hashnodeGraphQL(
          token,
          `query Me {
            me {
              publications(first: 1) {
                edges { node { id url } }
              }
            }
          }`
        );
        const pub = meData?.me?.publications?.edges?.[0]?.node;
        if (!pub?.id) {
          throw new Error('No Hashnode publication found for token. Set HASHNODE_PUBLICATION_ID explicitly.');
        }
        publicationId = pub.id;
        console.log(`  ℹ️ Resolved Hashnode publication: ${pub.url} (${publicationId})`);
      }
    }

    const existingData = await hashnodeGraphQL(
      token,
      `query ExistingPosts($id: ObjectId!) {
        publication(id: $id) {
          posts(first: 50) {
            edges {
              node {
                title
                canonicalUrl
                url
              }
            }
          }
        }
      }`,
      { id: publicationId }
    );

    const existingPosts = existingData?.publication?.posts?.edges?.map((e) => e.node) || [];
    const existingCanonicals = new Set(existingPosts.map((p) => p.canonicalUrl).filter(Boolean));
    const existingTitles = new Set(existingPosts.map((p) => p.title));

    for (const article of articles) {
      const canonicalUrl = `${SITE_URL}/insights/${article.slug}`;
      if (existingCanonicals.has(canonicalUrl) || existingTitles.has(article.title)) {
        console.log(`  ✓ Already on Hashnode: ${article.slug}`);
        continue;
      }

      const { hashnodeTags } = deriveTags(article);
      const contentMarkdown = articleToMarkdown(article);

      const result = await hashnodeGraphQL(
        token,
        `mutation PublishPost($input: PublishPostInput!) {
          publishPost(input: $input) {
            post {
              id
              url
              canonicalUrl
            }
          }
        }`,
        {
          input: {
            title: article.title,
            subtitle: article.metaDescription,
            publicationId,
            contentMarkdown,
            originalArticleURL: canonicalUrl,
            tags: hashnodeTags,
          },
        }
      );

      const published = result?.publishPost?.post;
      console.log(`  ✓ Published to Hashnode: ${published?.url} (canonical -> ${canonicalUrl})`);
      await sleep(2000);
    }
  } catch (err) {
    if (err instanceof HashnodeProRequiredError) {
      console.warn(`  ⚠️ ${err.message}`);
      return;
    }
    throw err;
  }
}

async function run() {
  if (!fs.existsSync(ssrEntryPath)) {
    console.error('❌ dist-ssr/entry-server.js not found. Run "npm run build:ssr" first.');
    process.exit(1);
  }

  const { INSIGHTS_ARTICLES } = await import(`file://${ssrEntryPath}?t=${Date.now()}`);
  if (!Array.isArray(INSIGHTS_ARTICLES) || INSIGHTS_ARTICLES.length === 0) {
    console.error('❌ No articles found in INSIGHTS_ARTICLES.');
    process.exit(1);
  }

  console.log(`📚 Loaded ${INSIGHTS_ARTICLES.length} articles from INSIGHTS_ARTICLES.`);

  if (IS_DRY_RUN) {
    console.log('🧪 Running in --dry-run mode (no API calls will be made):\n');
    for (const article of INSIGHTS_ARTICLES) {
      const canonicalUrl = `${SITE_URL}/insights/${article.slug}`;
      const md = articleToMarkdown(article);
      const { devtoTags } = deriveTags(article);
      console.log(`  • ${article.title}`);
      console.log(`    Canonical: ${canonicalUrl}`);
      console.log(`    Tags: ${devtoTags.join(', ')} | Markdown: ${md.length} chars`);
    }
    console.log('\n✅ Dry run complete.');
    return;
  }

  await syndicateToDevto(INSIGHTS_ARTICLES);
  await syndicateToHashnode(INSIGHTS_ARTICLES);
  console.log('\n✅ Syndication run finished.');
}

run().catch((err) => {
  console.error('❌ Syndication failed:', err);
  process.exit(1);
});
