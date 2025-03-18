import { FAQItem } from '@/app/types/faq';
import Script from 'next/script';

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  // Generate JSON-LD for FAQ
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Rest of your FAQ component */}
    </>
  );
} 