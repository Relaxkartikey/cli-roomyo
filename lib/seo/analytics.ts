import { RoomyoMetadata } from '@/app/types/seo';
import { logEvent, Analytics } from 'firebase/analytics';
import { analytics } from '@/lib/firebase';
import { Metadata } from 'next';

// Helper function to safely log events
function safeLogEvent(analyticsInstance: Analytics | null, eventName: string, eventParams?: Record<string, any>) {
  if (!analyticsInstance) {
    console.warn('Analytics not initialized');
    return;
  }
  logEvent(analyticsInstance, eventName as any, eventParams);
}

export function trackMetadata(metadata: RoomyoMetadata, path: string) {
  // Track page view with metadata
  safeLogEvent(analytics, 'page_view', {
    page_path: path,
    page_title: metadata.title,
    page_description: metadata.description,
  });

  // Track specific metadata based on type
  if ('propertyDetails' in metadata && metadata.propertyDetails) {
    safeLogEvent(analytics, 'view_property', {
      property_location: metadata.propertyDetails.location,
      property_type: metadata.propertyDetails.type,
      property_price: metadata.propertyDetails.price,
    });
  }

  if ('blogDetails' in metadata && metadata.blogDetails) {
    safeLogEvent(analytics, 'view_blog', {
      blog_author: metadata.blogDetails.author,
      blog_publish_date: metadata.blogDetails.publishDate,
      blog_tags: metadata.blogDetails.tags?.join(','),
    });
  }

  if ('searchParams' in metadata && metadata.searchParams) {
    safeLogEvent(analytics, 'search', {
      search_location: metadata.searchParams.location,
      search_type: metadata.searchParams.type,
      search_price: metadata.searchParams.price,
    });
  }
}

export async function trackPageView(path: string, metadata: Metadata) {
  try {
    safeLogEvent(analytics, 'page_view', {
      page_path: path,
      page_title: metadata.title,
      page_description: metadata.description,
      canonical_url: metadata.alternates?.canonical,
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

export async function trackPropertyView(propertyId: string, propertyData: any) {
  try {
    safeLogEvent(analytics, 'property_view', {
      property_id: propertyId,
      property_title: propertyData.title,
      property_location: propertyData.location,
      property_type: propertyData.type,
      property_category: propertyData.category,
    });
  } catch (error) {
    console.error('Error tracking property view:', error);
  }
}

export async function trackBlogView(blogId: string, blogData: any) {
  try {
    safeLogEvent(analytics, 'blog_view', {
      blog_id: blogId,
      blog_title: blogData.title,
      blog_category: blogData.category,
      blog_author: blogData.author,
    });
  } catch (error) {
    console.error('Error tracking blog view:', error);
  }
}

export async function trackSearch(query: string, results: number) {
  try {
    safeLogEvent(analytics, 'search', {
      search_term: query,
      results_count: results,
    });
  } catch (error) {
    console.error('Error tracking search:', error);
  }
} 