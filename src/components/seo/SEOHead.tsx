import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

const BASE_URL = 'https://aeitch.com';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  schema,
}) => {
  useEffect(() => {
    // 1. Update Title
    const originalTitle = document.title;
    document.title = title;

    // Helper to get or create a tag
    const getOrCreateMeta = (attr: 'name' | 'property', key: string): HTMLMetaElement => {
      let meta = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
      }
      return meta;
    };

    // Helper to get or create link[rel="canonical"]
    const getOrCreateCanonical = (): HTMLLinkElement => {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      return link;
    };

    const canonicalUrl = `${BASE_URL}${canonicalPath === '/' ? '' : canonicalPath}`;

    // 2. Set Meta Description
    const metaDesc = getOrCreateMeta('name', 'description');
    const prevDesc = metaDesc.getAttribute('content');
    metaDesc.setAttribute('content', description);

    // 3. Set Canonical Link
    const canonicalLink = getOrCreateCanonical();
    const prevCanonical = canonicalLink.getAttribute('href');
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Set OpenGraph tags
    const ogTitle = getOrCreateMeta('property', 'og:title');
    ogTitle.setAttribute('content', title);

    const ogDesc = getOrCreateMeta('property', 'og:description');
    ogDesc.setAttribute('content', description);

    const ogUrl = getOrCreateMeta('property', 'og:url');
    ogUrl.setAttribute('content', canonicalUrl);

    const ogTypeTag = getOrCreateMeta('property', 'og:type');
    ogTypeTag.setAttribute('content', ogType);

    // 5. Set Twitter tags
    const twTitle = getOrCreateMeta('name', 'twitter:title');
    twTitle.setAttribute('content', title);

    const twDesc = getOrCreateMeta('name', 'twitter:description');
    twDesc.setAttribute('content', description);

    // 6. Set page-specific JSON-LD Schema
    let scriptTag: HTMLScriptElement | null = null;
    if (schema) {
      scriptTag = document.getElementById('route-schema') as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'route-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    }

    return () => {
      document.title = originalTitle;
      if (prevDesc) metaDesc.setAttribute('content', prevDesc);
      if (prevCanonical) canonicalLink.setAttribute('href', prevCanonical);
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [title, description, canonicalPath, ogType, schema]);

  return null;
};

export default SEOHead;
