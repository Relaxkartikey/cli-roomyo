import { Metadata } from 'next';

interface GenerateMetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}

export function generateMetadata({
  title,
  description,
  path,
  image = '/og-image.jpg',
  type = 'website',
}: GenerateMetadataProps): Metadata {
  const url = `https://roomyo.in${path}`;
  
  return {
    title: title,
    description,
    openGraph: {
      title: title,
      description,
      url,
      siteName: 'Roomyo',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Helper function to generate article metadata
export function generateArticleMetadata(
  title: string,
  description: string,
  path: string,
  image?: string,
  publishedTime?: string,
  modifiedTime?: string
): Metadata {
  const baseMetadata = generateMetadata({
    title,
    description,
    path,
    image,
    type: 'article',
  });

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
    },
  };
}

// Helper function to generate product metadata
export function generateProductMetadata(
  title: string,
  description: string,
  path: string,
  image?: string,
  price?: string,
  currency?: string
): Metadata {
  const baseMetadata = generateMetadata({
    title,
    description,
    path,
    image,
    type: 'website',
  });

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'website',
      ...(price && currency && { price: { amount: price, currency } }),
    },
  };
} 