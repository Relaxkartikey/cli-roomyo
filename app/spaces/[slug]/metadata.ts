import { Metadata } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateProductMetadata } from '@/lib/metadata';

interface SpacePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: SpacePageProps): Promise<Metadata> {
  // Extract property ID from slug
  const propertyId = params.slug.split('-').pop();
  
  if (!propertyId) {
    return {
      title: 'Space Not Found - Roomyo',
      description: 'The requested space could not be found.',
    };
  }

  try {
    // Fetch property data from Firebase
    const propertyRef = doc(db, 'properties', propertyId);
    const propertySnap = await getDoc(propertyRef);
    
    if (!propertySnap.exists()) {
      return {
        title: 'Space Not Found - Roomyo',
        description: 'The requested space could not be found.',
      };
    }

    const property = propertySnap.data();
    const price = property.prices?.[0]?.price || '';
    const currency = 'INR';

    const metadata = generateProductMetadata(
      property.name,
      property.description || `Find your perfect space in ${property.location}. ${property.amenities?.join(', ')}.`,
      `/spaces/${params.slug}`,
      property.images?.[0],
      price,
      currency
    );

    return {
      ...metadata,
      title: `${property.name} - Roomyo`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Space Details - Roomyo',
      description: 'View details about this space.',
    };
  }
} 