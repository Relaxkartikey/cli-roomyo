import { Metadata } from 'next';
import { getFirebaseMetadata } from '@/lib/seo/firebase-metadata';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const metadata = await getFirebaseMetadata('property', params.slug);
    console.log('Fetched metadata:', metadata); // Debug log
    
    if (!metadata) {
      console.log('No metadata found, using fallback'); // Debug log
      return {
        title: 'Property Details',
        description: 'View detailed information about this property listing on Roomyo. Find amenities, location details, and booking options.',
        openGraph: {
          title: 'Property Details | Roomyo',
          description: 'View detailed information about this property listing on Roomyo. Find amenities, location details, and booking options.',
          type: 'website',
          url: `https://roomyo.in/spaces/${params.slug}`,
          images: [
            {
              url: '/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Roomyo Property',
            },
          ],
        },
        alternates: {
          canonical: `https://roomyo.in/spaces/${params.slug}`
        }
      };
    }

    console.log('Returning property metadata with title:', metadata.title); // Debug log
    return {
      title: metadata.title,
      description: metadata.description,
      openGraph: metadata.openGraph,
      alternates: metadata.alternates
    };
  } catch (error) {
    console.error('Error fetching property metadata:', error);
    return {
      title: 'Property Details',
      description: 'View detailed information about this property listing on Roomyo. Find amenities, location details, and booking options.',
      openGraph: {
        title: 'Property Details | Roomyo',
        description: 'View detailed information about this property listing on Roomyo. Find amenities, location details, and booking options.',
        type: 'website',
        url: `https://roomyo.in/spaces/${params.slug}`,
        images: [
          {
            url: '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Roomyo Property',
          },
        ],
      },
      alternates: {
        canonical: `https://roomyo.in/spaces/${params.slug}`
      }
    };
  }
}

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 