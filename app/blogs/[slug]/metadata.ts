import { Metadata } from 'next';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  try {
    // Fetch blog data from Firebase
    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef, where('slug', '==', params.slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        title: 'Blog Not Found - Roomyo',
        description: 'The requested blog post could not be found.',
      };
    }

    const blog = querySnapshot.docs[0].data();
    const imageUrl = blog.coverImage || '/og-image.jpg';

    return {
      title: `${blog.title} - Roomyo`,
      description: blog.excerpt || blog.content.substring(0, 160),
      openGraph: {
        title: blog.title,
        description: blog.excerpt || blog.content.substring(0, 160),
        images: [imageUrl],
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.excerpt || blog.content.substring(0, 160),
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post - Roomyo',
      description: 'Read our latest blog posts about property and accommodation.',
    };
  }
} 