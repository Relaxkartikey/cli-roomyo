import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { location: string } }): Promise<Metadata> {
  const location = params.location
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Properties & Rental Spaces in ${location}`,
    description: `Find the best properties and Rental Spaces accommodations in ${location}. Explore verified listings with photos, amenities, and detailed information. Book your perfect space today!`,
    openGraph: {
      title: `Properties and Rental Spaces in ${location}`,
      description: `Looking for properties or Rental Spaces in ${location}? Explore our verified listings with detailed information and easy booking process.`,
      type: 'website',
    },
    alternates: {
      canonical: `https://roomyo.in/spaces/location/${params.location}`,
    },
  };
}

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 