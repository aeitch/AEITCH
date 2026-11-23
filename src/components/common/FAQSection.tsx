import React, { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  accentColor?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about our engineering approach, deliverables, and engagement models.',
  items,
  accentColor = '#F7C059',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="relative z-10 w-full py-14 sm:py-18 desktop:py-24 px-4 sm:px-6 tablet:px-12 desktop:px-[80px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-8 sm:gap-12">
        <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
          <span
            className="font-poppins text-[12px] font-semibold tracking-widest uppercase"
            style={{ color: accentColor }}
          >
            Engineering Transparency
          </span>
          <h2 className="font-sans font-normal text-[28px] sm:text-[38px] desktop:text-[44px] tracking-tight text-white leading-tight">
            {title}
          </h2>
          <p className="font-poppins text-white/65 text-[14.5px] sm:text-[16px] max-w-[620px] leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3.5 sm:gap-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border transition-all duration-300 overflow-hidden bg-white/[0.02]"
                style={{
                  borderColor: isOpen ? `${accentColor}40` : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left gap-4 hover:bg-white/[0.02] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-poppins font-medium text-[15px] sm:text-[17px] text-white">
                    {item.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border text-[13px] transition-transform duration-300"
                    style={{
                      borderColor: `${accentColor}40`,
                      color: accentColor,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2 text-white/70 font-poppins text-[13.5px] sm:text-[15px] leading-relaxed border-t border-white/[0.04]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
