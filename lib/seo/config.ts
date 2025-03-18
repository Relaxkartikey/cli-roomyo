import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://roomyo.in'),
  title: {
    default: 'Roomyo - Find Your Perfect Property & Rental Spaces Accommodation',
    template: '%s | Roomyo'
  },
  description: 'Roomyo is your trusted platform for finding the perfect property or Rental Spaces accommodation across major Indian cities. Easy booking, verified listings, and hassle-free experience.',
  keywords: ['real estate', 'Rental Spaces accommodation', 'property rental', 'house hunting', 'rental properties', 'paying guest', 'India', 'accommodation'],
  openGraph: {
    type: 'website',
    siteName: 'Roomyo',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Roomyo - Property & Rental Spaces Booking',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'Roomyo', url: 'https://roomyo.in' }],
  creator: 'Roomyo',
  publisher: 'Roomyo Pvt. Ltd.',
};

export const generateCanonicalUrl = (path: string): string => {
  return `https://roomyo.in${path}`;
}; 