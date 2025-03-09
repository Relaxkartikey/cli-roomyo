import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { getAuth } from 'firebase/auth';
import { google } from 'googleapis';
import { headers } from 'next/headers';
import * as path from 'path';
import * as admin from 'firebase-admin';

const analytics = google.analytics('v3');

// Initialize with your service account credentials
const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
const VIEW_ID = process.env.GOOGLE_ANALYTICS_VIEW_ID;

// In development, we'll use more lenient auth checks
const IS_DEV = process.env.NODE_ENV === 'development';

export async function GET() {
  try {
    // Authentication check
    const headersList = headers();
    const authHeader = headersList.get('authorization');

    // Special handling for development mode
    if (IS_DEV) {
      console.log('Running in development mode, bypassing strict auth checks');
      
      // Provide a helpful message if no auth header is provided in dev mode
      if (!authHeader) {
        console.warn('No authorization header in development mode');
        // Return mock data in development if no auth header
        return NextResponse.json({ 
          pageViews: 12500,
          uniqueVisitors: 4800,
          averageSessionDuration: '2m 45s',
          bounceRate: '35.8%',
          topPages: [
            { path: '/', views: 5200 },
            { path: '/properties', views: 3100 },
            { path: '/contact', views: 1800 },
            { path: '/about', views: 1200 },
            { path: '/blogs', views: 1100 }
          ],
          userEngagement: {
            daily: 850,
            weekly: 4200,
            monthly: 15600
          },
          deviceBreakdown: {
            desktop: 45,
            mobile: 48,
            tablet: 7
          },
          geographicData: [
            { country: 'India', users: 3500 },
            { country: 'United States', users: 800 },
            { country: 'United Kingdom', users: 300 },
            { country: 'Canada', users: 200 }
          ]
        });
      }
    } else {
      // In production, require auth header
      if (!authHeader) {
        return NextResponse.json({ 
          error: 'Authentication required', 
          details: 'No authorization header provided',
          code: 'AUTH_HEADER_MISSING'
        }, { status: 401 });
      }
    }

    // Verify Firebase ID token with proper error handling
    try {
      if (authHeader) {
        const idToken = authHeader.split('Bearer ')[1];
        
        // In development, we'll be more lenient with token verification
        if (!IS_DEV) {
          const decodedToken = await auth.verifyIdToken(idToken);
          if (!decodedToken.admin) {
            return NextResponse.json({ 
              error: 'Access denied', 
              details: 'Admin privileges required to view analytics',
              code: 'ADMIN_REQUIRED'
            }, { status: 403 });
          }
        }
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      
      // In development, we'll continue even if token verification fails
      if (!IS_DEV) {
        return NextResponse.json({ 
          error: 'Authentication failed', 
          details: error instanceof Error ? error.message : 'Invalid or expired token',
          code: 'TOKEN_INVALID'
        }, { status: 401 });
      } else {
        console.warn('Token verification failed in development mode, continuing anyway');
      }
    }

    // Set up Google Analytics authentication
    try {
      const keyFilePath = path.resolve(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS || '');
      console.log('Using service account path:', keyFilePath);
      
      const authClient = new google.auth.GoogleAuth({
        keyFile: keyFilePath,
        scopes: SCOPES,
      });

      const client = await authClient.getClient();
      google.options({ auth: client });

      // Get date ranges
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Fetch page views and unique visitors
      const visitsResult = await analytics.data.ga.get({
        'ids': `ga:${VIEW_ID}`,
        'start-date': thirtyDaysAgo.toISOString().split('T')[0],
        'end-date': now.toISOString().split('T')[0],
        'metrics': 'ga:pageviews,ga:users,ga:avgSessionDuration,ga:bounceRate',
        'dimensions': 'ga:date'
      });

      // Fetch top pages
      const topPagesResult = await analytics.data.ga.get({
        'ids': `ga:${VIEW_ID}`,
        'start-date': thirtyDaysAgo.toISOString().split('T')[0],
        'end-date': now.toISOString().split('T')[0],
        'metrics': 'ga:pageviews',
        'dimensions': 'ga:pagePath',
        'sort': '-ga:pageviews',
        'max-results': 5
      });

      // Fetch device breakdown
      const deviceResult = await analytics.data.ga.get({
        'ids': `ga:${VIEW_ID}`,
        'start-date': thirtyDaysAgo.toISOString().split('T')[0],
        'end-date': now.toISOString().split('T')[0],
        'metrics': 'ga:users',
        'dimensions': 'ga:deviceCategory'
      });

      // Fetch geographic data
      const geoResult = await analytics.data.ga.get({
        'ids': `ga:${VIEW_ID}`,
        'start-date': thirtyDaysAgo.toISOString().split('T')[0],
        'end-date': now.toISOString().split('T')[0],
        'metrics': 'ga:users',
        'dimensions': 'ga:country',
        'sort': '-ga:users',
        'max-results': 5
      });

      // Process the results
      const metrics = visitsResult.data.totals?.[0].values || [];
      const topPages = topPagesResult.data.rows?.map(row => ({
        path: row[0],
        views: parseInt(row[1])
      })) || [];
      
      const deviceData = deviceResult.data.rows?.reduce((acc, [device, users]) => {
        acc[device.toLowerCase()] = parseInt(users);
        return acc;
      }, {} as Record<string, number>) || { desktop: 0, mobile: 0, tablet: 0 };

      const geoData = geoResult.data.rows?.map(([country, users]) => ({
        country,
        users: parseInt(users)
      })) || [];

      // Calculate user engagement
      const dailyUsers = parseInt(metrics[1] || '0') / 30; // Average daily users
      const weeklyUsers = dailyUsers * 7;
      const monthlyUsers = parseInt(metrics[1] || '0');

      const analyticsData = {
        pageViews: parseInt(metrics[0] || '0'),
        uniqueVisitors: parseInt(metrics[1] || '0'),
        averageSessionDuration: formatDuration(parseFloat(metrics[2] || '0')),
        bounceRate: `${parseFloat(metrics[3] || '0').toFixed(1)}%`,
        topPages,
        userEngagement: {
          daily: Math.round(dailyUsers),
          weekly: Math.round(weeklyUsers),
          monthly: monthlyUsers
        },
        deviceBreakdown: deviceData,
        geographicData: geoData
      };

      return NextResponse.json(analyticsData);
    } catch (analyticsError) {
      console.error('Error with Google Analytics:', analyticsError);
      // In development, provide mock data even if Google Analytics fails
      if (IS_DEV) {
        console.log('Development mode: returning mock data due to analytics error');
        return NextResponse.json({ 
          pageViews: 12500,
          uniqueVisitors: 4800,
          averageSessionDuration: '2m 45s',
          bounceRate: '35.8%',
          topPages: [
            { path: '/', views: 5200 },
            { path: '/properties', views: 3100 },
            { path: '/contact', views: 1800 },
            { path: '/about', views: 1200 },
            { path: '/blogs', views: 1100 }
          ],
          userEngagement: {
            daily: 850,
            weekly: 4200,
            monthly: 15600
          },
          deviceBreakdown: {
            desktop: 45,
            mobile: 48,
            tablet: 7
          },
          geographicData: [
            { country: 'India', users: 3500 },
            { country: 'United States', users: 800 },
            { country: 'United Kingdom', users: 300 },
            { country: 'Canada', users: 200 }
          ]
        });
      }
      
      return NextResponse.json({ 
        error: 'Analytics API error', 
        details: analyticsError instanceof Error ? analyticsError.message : 'Failed to fetch analytics data',
        code: 'ANALYTICS_API_ERROR'
      }, { status: 502 });
    }
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json({ 
      error: 'Server error', 
      details: error instanceof Error ? error.message : 'An unexpected error occurred',
      code: 'SERVER_ERROR'
    }, { status: 500 });
  }
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
} 