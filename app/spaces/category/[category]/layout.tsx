import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${category} Properties in Jaipur`,
    description: `Find the best ${category.toLowerCase()} properties and Rental Spaces accommodations across India. Verified listings with detailed information, amenities, and instant booking.`,
    openGraph: {
      title: `${category} Properties`,
      description: `Discover ${category.toLowerCase()} properties and Rental Spaces accommodations across major Indian cities.`,
      type: 'website',
    },
    alternates: {
      canonical: `https://roomyo.in/spaces/category/${params.category}`,
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 