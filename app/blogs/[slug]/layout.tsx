import { Metadata } from 'next';
import { getFirebaseMetadata } from '@/lib/seo/firebase-metadata';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const metadata = await getFirebaseMetadata('blog', params.slug);
    
    if (!metadata) {
      return {
        title: 'Blog Post',
        description: 'Read our latest blog post about real estate and Rental Spaces accommodation insights on Roomyo.',
        openGraph: {
          title: 'Blog Post | Roomyo',
          description: 'Read our latest blog post about real estate and Rental Spaces accommodation insights on Roomyo.',
          type: 'article',
          url: `https://roomyo.in/blogs/${params.slug}`,
          images: [
            {
              url: '/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Roomyo Blog Post',
            },
          ],
        },
        alternates: {
          canonical: `https://roomyo.in/blogs/${params.slug}`
        }
      };
    }

    return metadata;
  } catch (error) {
    console.error('Error fetching blog metadata:', error);
    return {
      title: 'Blog Post',
      description: 'Read our latest blog post about real estate and Rental Spaces accommodation insights on Roomyo.',
      openGraph: {
        title: 'Blog Post | Roomyo',
        description: 'Read our latest blog post about real estate and Rental Spaces accommodation insights on Roomyo.',
        type: 'article',
        url: `https://roomyo.in/blogs/${params.slug}`,
        images: [
          {
            url: '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Roomyo Blog Post',
          },
        ],
      },
      alternates: {
        canonical: `https://roomyo.in/blogs/${params.slug}`
      }
    };
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 