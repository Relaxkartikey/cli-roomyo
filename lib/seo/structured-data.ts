export function generatePropertyStructuredData(property: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: property.title,
    description: property.description,
    image: property.featuredImage,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'INR',
      availability: property.isAvailable ? 'InStock' : 'OutOfStock',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
      addressRegion: property.city,
      addressCountry: 'IN',
    },
    amenityFeature: property.amenities?.map((amenity: string) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
    })),
  };
}

export function generateBlogStructuredData(blog: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt || blog.content?.slice(0, 160),
    image: blog.featuredImage,
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.createdAt).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Roomyo',
      url: 'https://roomyo.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Roomyo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://roomyo.in/logo.png',
      },
    },
    keywords: blog.tags?.join(', '),
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Roomyo',
    url: 'https://roomyo.in',
    logo: 'https://roomyo.in/logo.png',
    sameAs: [
      'https://facebook.com/roomyo',
      'https://twitter.com/roomyo',
      'https://instagram.com/roomyo',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-XXXXXXXXXX',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  };
} 