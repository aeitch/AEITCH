import React from 'react';
import { Link } from '../../router/Router';

export interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  align?: 'left' | 'center';
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  align = 'left',
  className = '',
}) => {
  const allItems = [{ label: 'Home', path: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://www.aeitch.com${item.path === '/' ? '' : item.path}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`w-full flex ${align === 'center' ? 'justify-center' : 'justify-start'} ${className}`}
      >
        <ol className="inline-flex items-center flex-wrap gap-2 py-1 px-3.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-[12px] font-poppins text-white/50 shadow-sm">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={item.path} className="inline-flex items-center gap-2">
                {index > 0 && (
                  <svg
                    className="w-3 h-3 text-white/30 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
                {isLast ? (
                  <span
                    className="text-white/90 font-medium truncate max-w-[200px] sm:max-w-[320px]"
                    aria-current="page"
                    title={item.label}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="text-white/60 hover:text-white transition-colors duration-200 no-underline shrink-0"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
