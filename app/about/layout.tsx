import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Roomyo - your trusted platform for finding Rental Spaces accommodations and rental properties in India. Discover our mission, values, and commitment to helping you find your perfect home.',
  openGraph: {
    title: 'About Roomyo - Your Trusted Property & Rental Spaces Platform in India',
    description: 'Learn about Roomyo - your trusted platform for finding Rental Spaces accommodations and rental properties in India. Discover our mission, values, and commitment to helping you find your perfect home.',
    type: 'website',
    url: 'https://roomyo.in/about',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Roomyo',
      },
    ],
  },
  alternates: {
    canonical: 'https://roomyo.in/about'
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 