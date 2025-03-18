import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s - Roomyo',
  defaultTitle: 'Roomyo - Find Your Perfect Space',
  description: 'Roomyo helps you find and book the perfect space for your needs. Browse through our collection of spaces, read reviews, and make informed decisions.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://roomyo.in/',
    siteName: 'Roomyo',
    images: [
      {
        url: 'https://roomyo.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Roomyo - Find Your Perfect Space',
      },
    ],
  },
  twitter: {
    handle: '@roomyo',
    site: '@roomyo',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'spaces, booking, rooms, accommodation, property listing, real estate',
    },
    {
      name: 'author',
      content: 'Roomyo',
    },
  ],
};

export default config; 