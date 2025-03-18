import { PropertyMetadata, BlogMetadata, SearchMetadata } from '@/app/types/seo';
import { generateCanonicalUrl } from './config';

export function generatePropertyMetadata(property: any): PropertyMetadata {
  const title = `${property.name} | ${property.location} | ${property.category}`;
  
  return {
    title,
    description: `Discover ${property.name} in ${property.location}. ${property.description?.slice(0, 150)}...`,
    openGraph: {
      title,
      description: `Find your perfect space at ${property.name} in ${property.location}. ${property.description?.slice(0, 150)}...`,
      images: property.images?.[0] ? [{ url: property.images[0] }] : undefined,
    },
    alternates: {
      canonical: `https://roomyo.in/spaces/${property.slug}`
    },
    propertyDetails: {
      price: property.price,
      location: property.location,
      type: property.type,
      amenities: property.amenities,
    },
  };
}

export function generateBlogMetadata(blog: any): BlogMetadata {
  return {
    title: blog.title,
    description: blog.excerpt || blog.content?.slice(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.content?.slice(0, 160),
      type: 'article',
      publishedTime: new Date(blog.createdAt).toISOString(),
      authors: ['Roomyo'],
      tags: blog.tags,
      images: [
        {
          url: blog.featuredImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    alternates: {
      canonical: generateCanonicalUrl(`/blogs/${blog.slug}`),
    },
    blogDetails: {
      author: 'Roomyo',
      publishDate: new Date(blog.createdAt).toISOString(),
      readTime: blog.readTime,
      tags: blog.tags,
    },
  };
}

export function generateSearchMetadata(params: URLSearchParams): SearchMetadata {
  const location = params.get('location');
  const type = params.get('type');
  const price = params.get('price');

  const title = [
    'Properties',
    location && `in ${location}`,
    type && `- ${type}`,
    price && `under ₹${price}`,
  ].filter(Boolean).join(' ');

  return {
    title,
    description: `Find ${type || 'properties'} ${location ? `in ${location}` : ''} on Roomyo. Browse verified listings with photos, amenities, and detailed information.`,
    robots: {
      index: false,
      follow: true,
    },
    searchParams: {
      location: location || undefined,
      type: type || undefined,
      price: price || undefined,
    },
  };
} 