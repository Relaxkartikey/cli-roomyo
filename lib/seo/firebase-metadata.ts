import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { PropertyMetadata, BlogMetadata } from '@/app/types/seo';
import { generatePropertyMetadata, generateBlogMetadata } from './generators';

export async function getFirebaseMetadata(
  type: 'property' | 'blog',
  slug: string
): Promise<PropertyMetadata | BlogMetadata | null> {
  try {
    // Clean the slug
    const cleanedSlug = slug.trim().toLowerCase();
    console.log('Fetching from collection:', type === 'property' ? 'properties' : 'blogs', 'with cleaned slug:', cleanedSlug);

    // Get the collection reference
    const collectionRef = collection(db, type === 'property' ? 'properties' : 'blogs');
    
    // First try to find by slug field
    const q = query(collectionRef, where('slug', '==', cleanedSlug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      console.log('Found document with data:', data);
      
      if (type === 'property') {
        const metadata = generatePropertyMetadata(data);
        console.log('Generated property metadata:', metadata);
        return metadata;
      } else {
        return generateBlogMetadata(data);
      }
    }

    // If not found by slug, try to find by ID (last part of the slug)
    const id = cleanedSlug.split('-').pop();
    if (id) {
      const docRef = doc(collectionRef, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Found document by ID with data:', data);
        
        if (type === 'property') {
          const metadata = generatePropertyMetadata(data);
          console.log('Generated property metadata:', metadata);
          return metadata;
        } else {
          return generateBlogMetadata(data);
        }
      }
    }

    // If still not found, get all documents to debug
    const allDocs = await getDocs(collectionRef);
    const availableSlugs = allDocs.docs.map(doc => doc.data().slug);
    console.log('No matching document found. Available slugs:', availableSlugs);

    return null;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return null;
  }
} 