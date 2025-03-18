import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privileges & Benefits',
  description: 'Discover exclusive privileges and benefits for Roomyo residents. From premium amenities to special services, explore what makes Roomyo your perfect living choice.',
  openGraph: {
    title: 'Privileges & Benefits',
    description: 'Discover exclusive privileges and benefits for Roomyo residents. From premium amenities to special services, explore what makes Roomyo your perfect living choice.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://roomyo.in/privileges'
  }
};

export default function PrivilegesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 