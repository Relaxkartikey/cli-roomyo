import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Roomyo for any queries about Rental Spaces accommodations or rental properties. Our team is here to help you find your perfect living space.',
  openGraph: {
    title: 'Contact Roomyo - Get Help with Property & Rental Spaces Booking',
    description: 'Get in touch with Roomyo for any queries about Rental Spaces accommodations or rental properties. Our team is here to help you find your perfect living space.',
    type: 'website',
    url: 'https://roomyo.in/contact',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Roomyo',
      },
    ],
  },
  alternates: {
    canonical: 'https://roomyo.in/contact'
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 