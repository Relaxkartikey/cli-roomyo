import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Your Property',
  description: 'List your Rental Spaces or rental property on Roomyo. Reach thousands of potential tenants, manage your listings easily, and grow your property business.',
  openGraph: {
    title: 'List Your Property on Roomyo - Free Property Listing',
    description: 'List your Rental Spaces or rental property on Roomyo. Reach thousands of potential tenants, manage your listings easily, and grow your property business.',
    type: 'website',
    url: 'https://roomyo.in/list-property',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'List Property on Roomyo',
      },
    ],
  },
  alternates: {
    canonical: 'https://roomyo.in/list-property'
  }
};

export default function ListPropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 