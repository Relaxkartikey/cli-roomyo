'use client';

import { useEffect, useState, Fragment } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getAnalyticsData, trackAdminAnalyticsView, type AnalyticsData } from '@/lib/analytics-utils';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Loader from '@/components/Loader';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const IS_DEV = process.env.NODE_ENV === 'development';

interface ErrorState {
  open: boolean;
  title: string;
  message: string;
  code?: string;
  status?: number;
}

export default function AnalyticsPage() {
  const { user, loading: authLoading } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorState>({
    open: false,
    title: '',
    message: ''
  });

  const closeErrorDialog = () => {
    setError(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching analytics data...');
        
        let headers = {};
        
        // In development mode, we can skip token auth if needed
        if (IS_DEV && !user) {
          console.log('Development mode: proceeding without auth token');
        } else {
          // Get the Firebase ID token if user is logged in
          if (!user) {
            setError({
              open: true,
              title: 'Authentication Required',
              message: 'You must be logged in as an admin to view analytics data.',
              code: 'AUTH_REQUIRED'
            });
            setIsLoading(false);
            return;
          }
          
          // Get the Firebase ID token
          try {
            const idToken = await user.getIdToken(true); // Force refresh token
            headers = {
              'Authorization': `Bearer ${idToken}`
            };
            console.log('Added authorization header');
          } catch (tokenError) {
            console.error('Error getting ID token:', tokenError);
            setError({
              open: true,
              title: 'Authentication Error',
              message: 'Failed to get authentication token. Please try logging out and back in.',
              code: 'TOKEN_ERROR'
            });
            setIsLoading(false);
            return;
          }
        }

        // Make the API request
        const response = await fetch('/api/analytics', { headers })
          .catch(fetchError => {
            throw new Error('Network error when connecting to analytics API. Please check your connection.');
          });

        // Parse the JSON response
        const data = await response.json().catch(() => {
          throw new Error('Invalid response from analytics API. Please try again later.');
        });

        // Handle error responses
        if (!response.ok) {
          setError({
            open: true,
            title: data.error || 'API Error',
            message: data.details || 'Failed to fetch analytics data',
            code: data.code || 'API_ERROR',
            status: response.status
          });
          setIsLoading(false);
          return;
        }

        // Handle success
        console.log('Analytics data received successfully');
        setAnalyticsData(data);
        trackAdminAnalyticsView();
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setError({
          open: true,
          title: 'Error Loading Analytics',
          message: error instanceof Error ? error.message : 'An unknown error occurred',
          code: 'CLIENT_ERROR'
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      fetchData();
    }
  }, [user, authLoading]);

  if (authLoading) {
    return <Loader />;
  }

  if (!user && !IS_DEV) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Please log in to access analytics</h1>
        <Link href="/admin/login" className="text-blue-500 hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error.open) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-semibold mb-4 text-red-600">Error Loading Analytics</h1>
        <p className="text-gray-700 mb-4">{error.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
        <Link href="/admin/dashboard" className="mt-4 text-blue-500 hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-4">No analytics data available</h1>
          <Link href="/admin/dashboard" className="text-blue-500 hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your website performance and user engagement</p>
          </div>
          <Link
            href="/admin/dashboard"
            className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Page Views"
            value={analyticsData.pageViews.toLocaleString()}
            description="Total page views"
          />
          <MetricCard
            title="Unique Visitors"
            value={analyticsData.uniqueVisitors.toLocaleString()}
            description="Unique website visitors"
          />
          <MetricCard
            title="Avg. Session Duration"
            value={analyticsData.averageSessionDuration}
            description="Time spent on site"
          />
          <MetricCard
            title="Bounce Rate"
            value={analyticsData.bounceRate}
            description="Single page sessions"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Pages Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Top Pages</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.topPages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="path" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Device Breakdown</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(analyticsData.deviceBreakdown).map(([key, value]) => ({
                      name: key,
                      value
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(analyticsData.deviceBreakdown).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* User Engagement */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">User Engagement</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-gray-600">Daily Active Users</p>
              <p className="text-2xl font-semibold">{analyticsData.userEngagement.daily.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Weekly Active Users</p>
              <p className="text-2xl font-semibold">{analyticsData.userEngagement.weekly.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Monthly Active Users</p>
              <p className="text-2xl font-semibold">{analyticsData.userEngagement.monthly.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Geographic Data */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Geographic Distribution</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.geographicData.map((item) => (
                  <tr key={item.country}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.users.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {((item.users / analyticsData.uniqueVisitors) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Error Dialog */}
      <Transition appear show={error.open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeErrorDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-start justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {error.title}
                    </Dialog.Title>
                    <button
                      type="button"
                      className="ml-auto bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={closeErrorDialog}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {error.message}
                    </p>
                    {error.code && (
                      <p className="mt-2 text-xs text-gray-500">
                        Error code: {error.code} {error.status ? `(${error.status})` : ''}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeErrorDialog}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function MetricCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-semibold mt-2">{value}</p>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
    </div>
  );
} 