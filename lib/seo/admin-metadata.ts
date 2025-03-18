import { Metadata } from 'next';

export function generateAdminMetadata(section: string, action?: string): Metadata {
  const baseTitle = 'Admin Dashboard';
  let title = baseTitle;

  switch (section) {
    case 'blogs':
      title = `${action ? `${action} Blog` : 'Blog Management'} | ${baseTitle}`;
      break;
    case 'properties':
      title = `${action ? `${action} Property` : 'Property Management'} | ${baseTitle}`;
      break;
    case 'analytics':
      title = `Analytics | ${baseTitle}`;
      break;
    case 'media':
      title = `Media Library | ${baseTitle}`;
      break;
    default:
      title = baseTitle;
  }

  return {
    title,
    description: 'Roomyo Administration Dashboard',
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
    alternates: {
      canonical: null, // Prevent canonical URLs for admin pages
    },
  };
} 