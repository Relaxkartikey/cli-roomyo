"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import ProtectedRoute from '@/components/ProtectedRoute';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CATEGORIES, ROOM_TYPES, PRICE_PERIODS, DEFAULT_PRIVILEGES } from '@/app/types/property';
import Cookies from 'js-cookie';
import { Plus, MapPin, Building2, Tag, LogOut, FileText } from 'lucide-react';
import Link from 'next/link';
import Loader from '@/components/Loader';
import { format } from 'date-fns';

// Add test data constants
const TEST_DATA = {
  names: [
    "Luxury 3BHK Apartment with Pool",
    "Modern Studio near Metro",
    "Cozy 2BHK Family Home",
    "Premium 4BHK Penthouse",
    "Student-Friendly 1BHK"
  ],
  categories: [
    "Rent Roomyo",
    "Roomyo Space",
    "Roomyo Family",
    "Other"
  ],
  locations: [
    "Malviya Nagar, Jaipur",
    "C-Scheme, Jaipur",
    "Vaishali Nagar, Jaipur",
    "Raja Park, Jaipur",
    "Mansarovar, Jaipur"
  ],
  roomTypes: [
    "1BHK",
    "2BHK",
    "3BHK",
    "Studio",
    "4BHK Penthouse"
  ],
  descriptions: [
    "Luxurious and spacious apartment featuring modern amenities, perfect for families. Located in a prime area with easy access to schools, markets, and public transport.",
    "Contemporary living space with state-of-the-art facilities. Ideal for young professionals seeking comfort and convenience in the heart of the city.",
    "Beautiful property with excellent ventilation and natural light. Surrounded by parks and recreational areas, perfect for a peaceful lifestyle."
  ],
  addresses: [
    "123, Sunrise Avenue, Near City Mall, Malviya Nagar, Jaipur, Rajasthan 302017",
    "45-B, Green Park Colony, Behind Central Park, C-Scheme, Jaipur, Rajasthan 302001",
    "789, Pearl Residency, Near Metro Station, Vaishali Nagar, Jaipur, Rajasthan 302021"
  ],
  mapUrls: [
    "https://maps.google.com/?q=26.8505,75.8057",
    "https://maps.google.com/?q=26.9124,75.7873",
    "https://maps.google.com/?q=26.9115,75.7271"
  ],
  amenities: [
    "Air Conditioning",
    "24/7 Security",
    "Power Backup",
    "Parking",
    "Gym",
    "Swimming Pool",
    "Club House",
    "Children's Play Area",
    "Garden",
    "Elevator"
  ],
  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  ],
  hosts: [
    { name: "Rahul Sharma", position: "Property Manager", phone: "+91 98765 43210", email: "rahul@example.com" },
    { name: "Priya Singh", position: "Owner", phone: "+91 87654 32109", email: "priya@example.com" },
    { name: "Amit Kumar", position: "Site Supervisor", phone: "+91 76543 21098", email: "amit@example.com" }
  ]
};

interface Price {
  type: string;
  price: string;
  pricePeriod: string;
}

interface Privilege {
  icon: string;
  title: string;
  description: string;
  isCustom?: boolean;
}

interface Property {
  id?: string;
  name: string;
  location: string;
  category: string;
  customCategory?: string;
  prices: Price[];
  amenities: string[];
  images: string[];
  description: string;
  privileges: Privilege[];
  fullAddress: string;
  roomType: string;
  mapLocation: string;
  host: {
    name: string;
    phone?: string;
    email?: string;
    position: string;
  };
}

interface DashboardCard {
  title: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  onClick?: () => void;
}

interface StatsCard {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

// Add a helper function for safe date formatting
const formatDate = (timestamp: number | undefined) => {
  if (!timestamp || isNaN(timestamp)) return 'N/A';
  try {
    return format(timestamp, 'MMM d, yyyy');
  } catch (error) {
    return 'Invalid Date';
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [localities, setLocalities] = useState<{ id: string; name: string }[]>([]);
  const [stats, setStats] = useState({
    properties: 0,
    localities: 0,
    categories: 0,
    blogs: 0
  });
  const [recentProperties, setRecentProperties] = useState<any[]>([]);
  const [recentLocalities, setRecentLocalities] = useState<any[]>([]);
  const [recentCategories, setRecentCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState<Property>({
    name: '',
    location: '',
    category: 'Roomyo Spaces',
    prices: [{ type: '', price: '', pricePeriod: 'monthly' }],
    amenities: [],
    images: [''],
    description: '',
    privileges: [],
    fullAddress: '',
    roomType: '',
    mapLocation: '',
    host: {
      name: '',
      phone: '',
      email: '',
      position: '',
    },
  });

  const [newAmenity, setNewAmenity] = useState('');
  const [newPrivilege, setNewPrivilege] = useState({ title: '', description: '', icon: 'star' });

  // Function to update last activity timestamp
  const updateActivity = () => {
    setLastActivity(Date.now());
    localStorage.setItem('lastActivity', Date.now().toString());
  };

  // Handle user logout
  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('lastActivity');
      Cookies.remove('auth-token');
      router.push('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }, [router]);

  const fetchProperties = async () => {
    try {
      const propertiesSnapshot = await getDocs(collection(db, 'properties'));
      setStats(prev => ({ ...prev, properties: propertiesSnapshot.size }));
      
      // Fetch recent items
      const recentPropertiesQuery = query(
        collection(db, 'properties'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      
      const recentPropsSnapshot = await getDocs(recentPropertiesQuery);
      setRecentProperties(recentPropsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchLocalities = async () => {
    try {
      const localitiesSnapshot = await getDocs(collection(db, 'localities'));
      setStats(prev => ({ ...prev, localities: localitiesSnapshot.size }));
      
      // Fetch recent items
      const recentLocalitiesQuery = query(
        collection(db, 'localities'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      
      const recentLocsSnapshot = await getDocs(recentLocalitiesQuery);
      setRecentLocalities(recentLocsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching localities:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      setStats(prev => ({ ...prev, categories: categoriesSnapshot.size }));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const blogsCollection = collection(db, 'blogs');
      const querySnapshot = await getDocs(blogsCollection);
      const blogCount = querySnapshot.size;
      
      setStats(prev => ({ ...prev, blogs: blogCount }));
      
      if (querySnapshot.docs.length > 0) {
        const recentBlogs = querySnapshot.docs
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.title,
              date: data.createdAt,
              url: `/admin/dashboard/blogs`
            };
          })
          .sort((a, b) => (b.date || 0) - (a.date || 0))
          .slice(0, 3);
        
        setRecentCategories(recentBlogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        await fetchProperties();
        await fetchLocalities();
        await fetchCategories();
        await fetchBlogs();
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
    
    const interval = setInterval(() => {
      const inactiveTime = Date.now() - lastActivity;
      if (inactiveTime > 30 * 60 * 1000) { // 30 minutes
        handleLogout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [lastActivity, handleLogout]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        handleLogout();
      }
    });

    return () => unsubscribe();
  }, [handleLogout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Remove any undefined fields and empty privileges from the formData
      const cleanFormData = {
        ...formData,
        privileges: formData.privileges.filter(p => p.title && p.description), // Filter out empty privileges
      };

      const dataToSave = Object.fromEntries(
        Object.entries(cleanFormData).filter(([_, value]) => value !== undefined)
      );

      if (editingProperty?.id) {
        await updateDoc(doc(db, 'properties', editingProperty.id), dataToSave);
      } else {
        await addDoc(collection(db, 'properties'), dataToSave);
      }
      fetchProperties();
      setIsAddingProperty(false);
      setEditingProperty(null);
      setFormData({
        name: '',
        location: '',
        category: 'Roomyo Spaces',
        prices: [{ type: '', price: '', pricePeriod: 'monthly' }],
        amenities: [],
        images: [''],
        description: '',
        privileges: [],
        fullAddress: '',
        roomType: '',
        mapLocation: '',
        host: {
          name: '',
          phone: '',
          email: '',
          position: '',
        },
      });
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteDoc(doc(db, 'properties', id));
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData(property);
    setIsAddingProperty(true);
  };

  const formatPrice = (value: string) => {
    // Remove all non-digits
    const number = value.replace(/[^0-9]/g, '');
    // Format with commas
    const formatted = Number(number).toLocaleString('en-IN');
    // Add ₹ symbol
    return `₹${formatted}`;
  };

  const getRandomItem = <T,>(array: T[] | readonly T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getRandomPrice = () => {
    const basePrice = Math.floor(Math.random() * 50000) + 10000;
    return formatPrice(basePrice.toString());
  };

  const handleAutofill = () => {
    const randomAmenities = TEST_DATA.amenities
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 6) + 3);

    const randomImages = TEST_DATA.images
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);

    const randomHost = getRandomItem(TEST_DATA.hosts);

    const autofillData: Property = {
      name: getRandomItem(TEST_DATA.names),
      location: getRandomItem(TEST_DATA.locations),
      category: getRandomItem(CATEGORIES),
      roomType: getRandomItem(TEST_DATA.roomTypes),
      prices: [
        { type: "Base Price", price: getRandomPrice(), pricePeriod: "monthly" },
        { type: "Premium", price: getRandomPrice(), pricePeriod: "monthly" }
      ],
      amenities: randomAmenities,
      images: randomImages,
      description: getRandomItem(TEST_DATA.descriptions),
      privileges: DEFAULT_PRIVILEGES.slice(0, Math.floor(Math.random() * 3) + 2),
      fullAddress: getRandomItem(TEST_DATA.addresses),
      mapLocation: getRandomItem(TEST_DATA.mapUrls),
      host: randomHost
    };

    setFormData(autofillData);
  };

  const navigationCards: DashboardCard[] = [
    {
      title: 'Property',
      icon: <Building2 className="w-6 h-6" />,
      href: '/admin/dashboard/property',
      color: 'bg-blue-500'
    },
    {
      title: 'Locality',
      icon: <MapPin className="w-6 h-6" />,
      href: '/admin/dashboard/localities',
      color: 'bg-green-500'
    },
    {
      title: 'Category',
      icon: <Tag className="w-6 h-6" />,
      href: '/admin/dashboard/category',
      color: 'bg-purple-500'
    },
    {
      title: 'Blogs',
      icon: <FileText className="w-6 h-6" />,
      href: '/admin/dashboard/blogs',
      color: 'bg-orange-500'
    },
    {
      title: 'Log Out',
      icon: <LogOut className="w-6 h-6" />,
      href: '#',
      color: 'bg-red-500'
    }
  ];

  const statsCards: StatsCard[] = [
    {
      title: 'Total Properties',
      count: stats.properties,
      icon: <Building2 className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Total Localities',
      count: stats.localities,
      icon: <MapPin className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Total Categories',
      count: stats.categories,
      icon: <Tag className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Total Blogs',
      count: stats.blogs,
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-medium text-gray-900">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {navigationCards.filter(card => card.title !== 'Log Out').map((card, idx) => (
              <Link
                key={idx}
                href={card.href}
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow transition-all"
              >
                <div className={`p-2 rounded-lg ${
                  card.title === 'Property' ? 'bg-blue-50 text-blue-600' :
                  card.title === 'Locality' ? 'bg-green-50 text-green-600' :
                  card.title === 'Category' ? 'bg-purple-50 text-purple-600' :
                  'bg-orange-50 text-orange-600'
                }`}>
                  {card.icon}
                </div>
                <span className="font-medium text-gray-900">{card.title}</span>
              </Link>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${card.color}`}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{card.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{card.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Items Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Properties */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-medium text-gray-900">Recent Properties</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {recentProperties.slice(0, 5).map((property: any) => (
                  <div key={property.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      {property.images?.[0] && (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={property.images[0]}
                            alt={property.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{property.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <p className="text-sm text-gray-500">{property.location}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium text-primary">
                            {property.prices?.[0]?.price}
                          </span>
                          <span className="text-xs text-gray-500">
                            {property.prices?.[0]?.type}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        property.status === 'Available' ? 'bg-green-50 text-green-700' :
                        property.status === 'Sold' ? 'bg-blue-50 text-blue-700' :
                        'bg-gray-50 text-gray-700'
                      }`}>
                        {property.status}
                      </span>
                    </div>
                  </div>
                ))}
                {recentProperties.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No properties found
                  </div>
                )}
              </div>
            </div>

            {/* Recent Blogs */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-medium text-gray-900">Recent Blogs</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {recentCategories.slice(0, 5).map((blog: any) => (
                  <div key={blog.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{blog.name}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDate(blog.date)}
                        </p>
                      </div>
                      <Link
                        href={blog.url}
                        className="text-primary hover:text-primary/80"
                      >
                        <FileText className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
                {recentCategories.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No blogs found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
} 