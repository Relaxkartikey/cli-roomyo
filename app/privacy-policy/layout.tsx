import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Roomyo protects and handles your personal information. Read our comprehensive privacy policy to understand data collection, usage, and your privacy rights.',
  openGraph: {
    title: 'Privacy Policy - Data Protection & Security at Roomyo',
    description: 'Learn how Roomyo protects and handles your personal information. Read our comprehensive privacy policy to understand data collection, usage, and your privacy rights.',
    type: 'website',
    url: 'https://roomyo.in/privacy-policy',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Roomyo Privacy Policy',
      },
    ],
  },
  alternates: {
    canonical: 'https://roomyo.in/privacy-policy'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 