import { analytics, app } from './firebase';
import { logEvent, getAnalytics, Analytics } from 'firebase/analytics';
import { 
  getAuth, 
  connectAuthEmulator 
} from 'firebase/auth';

export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  averageSessionDuration: string;
  bounceRate: string;
  topPages: Array<{
    path: string;
    views: number;
  }>;
  userEngagement: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  geographicData: Array<{
    country: string;
    users: number;
  }>;
}

// Function to track admin analytics page view
export const trackAdminAnalyticsView = () => {
  if (analytics) {
    logEvent(analytics, 'admin_analytics_view');
  }
};

// Function to get analytics data from Firebase
export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  if (!analytics) {
    throw new Error('Analytics not initialized');
  }

  try {
    // Get the Firebase Analytics instance
    const analyticsInstance = getAnalytics(app);

    // Initialize Google Analytics Data API client
    // Note: You'll need to enable the Google Analytics Data API in your Google Cloud Console
    // and set up the necessary credentials
    const response = await fetch('/api/analytics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    
    // Return mock data as fallback
    return {
      pageViews: 0,
      uniqueVisitors: 0,
      averageSessionDuration: '0m 0s',
      bounceRate: '0%',
      topPages: [],
      userEngagement: {
        daily: 0,
        weekly: 0,
        monthly: 0
      },
      deviceBreakdown: {
        desktop: 0,
        mobile: 0,
        tablet: 0
      },
      geographicData: []
    };
  }
}; 