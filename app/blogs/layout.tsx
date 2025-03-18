import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs & Articles',
  description: 'Read the latest blogs and articles about real estate, Rental Spaces accommodations, and rental properties in India. Get expert insights, tips, and market updates.',
  openGraph: {
    title: 'Real Estate & Rental Spaces Accommodation Blogs | Roomyo',
    description: 'Read the latest blogs and articles about real estate, Rental Spaces accommodations, and rental properties in India. Get expert insights, tips, and market updates.',
    type: 'website',
    url: 'https://roomyo.in/blogs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Roomyo Blogs',
      },
    ],
  },
  alternates: {
    canonical: 'https://roomyo.in/blogs'
  }
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 