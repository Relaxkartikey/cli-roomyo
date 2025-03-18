import { NextResponse } from 'next/server';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    const baseUrl = 'https://roomyo.in';
    const staticPages = [
      '',
      '/about',
      '/contact',
      '/blogs',
      '/spaces',
      '/list-property',
      '/privacy-policy',
      '/terms-conditions',
    ];

    // Generate static pages sitemap
    const staticUrls = staticPages.map(page => ({
      loc: `${baseUrl}${page}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: page === '' ? 1.0 : 0.8,
    }));

    // Fetch spaces
    const spacesRef = collection(db, 'properties');
    const spacesQuery = query(spacesRef, where('status', '==', 'Published'));
    const spacesSnapshot = await getDocs(spacesQuery);
    
    const spaceUrls = spacesSnapshot.docs.map(doc => {
      const data = doc.data();
      const slug = `${data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${
        data.location.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      }-${doc.id}`.replace(/(^-|-$)/g, "");
      
      return {
        loc: `${baseUrl}/spaces/${slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.7,
      };
    });

    // Fetch blogs
    const blogsRef = collection(db, 'blogs');
    const blogsQuery = query(blogsRef, where('status', '==', 'Published'));
    const blogsSnapshot = await getDocs(blogsQuery);
    
    const blogUrls = blogsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        loc: `${baseUrl}/blogs/${data.slug}`,
        lastmod: new Date(data.updatedAt || data.createdAt).toISOString(),
        changefreq: 'weekly',
        priority: 0.6,
      };
    });

    // Combine all URLs
    const allUrls = [...staticUrls, ...spaceUrls, ...blogUrls];

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
  ${allUrls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('')}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
} 