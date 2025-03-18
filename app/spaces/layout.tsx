import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Properties & Rental Spaces Accommodations',
  description: 'Find the perfect Rental Spaces accommodation or rental property across major Indian cities. Browse verified listings with detailed information, amenities, and instant booking options.',
  openGraph: {
    title: 'Properties & Rental Spaces Accommodations | Roomyo',
    description: 'Find the perfect Rental Spaces accommodation or rental property across major Indian cities. Browse verified listings with detailed information, amenities, and instant booking options.',
    type: 'website',
    url: 'https://roomyo.in/spaces',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Roomyo Properties',
      },
    ],
  },
  alternates: {
    canonical: 'https://roomyo.in/spaces'
  }
};

export default function SpacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 