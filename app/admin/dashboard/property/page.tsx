"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import ProtectedRoute from '@/components/ProtectedRoute';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CATEGORIES, ROOM_TYPES, PRICE_PERIODS, DEFAULT_PRIVILEGES } from '@/app/types/property';
import Cookies from 'js-cookie';
import { Plus, MapPin, Building2, Tag, LogOut, Pencil, Trash2, MoreVertical, ImageIcon, Upload, Copy } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import Loader from '@/components/Loader';

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
  status: 'Available' | 'Sold' | 'Archived';
  createdAt: number;
  host: {
    name: string;
    phone?: string;
    email?: string;
    position: string;
  };
}

// Add new interface for media library images
interface MediaImage {
  id: string;
  url: string;
  filename: string;
  uploadedAt: string;
}

interface DashboardCard {
  title: string;
  icon: React.ReactNode;
  href: string;
  color: string;
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
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [stats, setStats] = useState({
    properties: 0,
    localities: 0,
    categories: 0
  });
  const [recentProperties, setRecentProperties] = useState<any[]>([]);
  const [recentLocalities, setRecentLocalities] = useState<any[]>([]);
  const [recentCategories, setRecentCategories] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<string>('recent');
  const [sortedProperties, setSortedProperties] = useState<Property[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

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
    status: 'Available',
    createdAt: Date.now(),
    host: {
      name: '',
      phone: '',
      email: '',
      position: '',
    },
  });

  const [newAmenity, setNewAmenity] = useState('');
  const [newPrivilege, setNewPrivilege] = useState({ title: '', description: '', icon: 'star' });

  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [mediaImages, setMediaImages] = useState<MediaImage[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  // Add new state for upload handling
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProperties = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'properties'));
      const propertiesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];
      setProperties(propertiesList);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchLocalities = async () => {
      try {
        const localitiesRef = collection(db, 'localities');
        const snapshot = await getDocs(localitiesRef);
        const localitiesList = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setLocalities(localitiesList);
      } catch (error) {
        console.error('Error fetching localities:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const snapshot = await getDocs(categoriesRef);
        const categoriesList = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCategories(categoriesList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchLocalities();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch counts
      const propertiesSnapshot = await getDocs(collection(db, 'properties'));
      const localitiesSnapshot = await getDocs(collection(db, 'localities'));
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));

      setStats({
        properties: propertiesSnapshot.size,
        localities: localitiesSnapshot.size,
        categories: categoriesSnapshot.size
      });

      // Fetch recent items
      const recentPropertiesQuery = query(
        collection(db, 'properties'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const recentLocalitiesQuery = query(
        collection(db, 'localities'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const recentCategoriesQuery = query(
        collection(db, 'categories'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );

      const [recentPropsSnapshot, recentLocsSnapshot, recentCatsSnapshot] = await Promise.all([
        getDocs(recentPropertiesQuery),
        getDocs(recentLocalitiesQuery),
        getDocs(recentCategoriesQuery)
      ]);

      setRecentProperties(recentPropsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setRecentLocalities(recentLocsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setRecentCategories(recentCatsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

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

  // Check for inactivity
  useEffect(() => {
    const inactivityTimeout = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    
    // Set up event listeners for user activity
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    
    activityEvents.forEach(event => {
      window.addEventListener(event, updateActivity);
    });

    // Check for inactivity every minute
    const interval = setInterval(() => {
      const inactiveTime = Date.now() - lastActivity;
      if (inactiveTime > 30 * 60 * 1000) { // 30 minutes
        handleLogout();
      }
    }, 60000);

    // Initialize last activity
    updateActivity();

    return () => {
      // Cleanup
      activityEvents.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
      clearInterval(interval);
    };
  }, [lastActivity, handleLogout]);

  const handleSort = useCallback((properties: any[]) => {
    if (sortBy === 'price-low-high') {
      return [...properties].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      return [...properties].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      return [...properties].sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
    } else if (sortBy === 'oldest') {
      return [...properties].sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds);
    }
    return properties;
  }, [sortBy]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        handleLogout();
      }
    });

    return () => unsubscribe();
  }, [handleLogout]);

  useEffect(() => {
    const sorted = handleSort(properties);
    setSortedProperties(sorted);
  }, [properties, handleSort]);

  // Update handleSubmit to include status and createdAt
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanFormData = {
        ...formData,
        privileges: formData.privileges.filter(p => p.title && p.description),
        status: formData.status || 'Available',
        createdAt: editingProperty?.createdAt || Date.now(),
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
        status: 'Available',
        createdAt: Date.now(),
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

    // Get random locality and category from the actual data
    const randomLocality = localities.length > 0 ? getRandomItem(localities).name : '';
    const randomCategory = categories.length > 0 ? getRandomItem(categories).name : '';

    const autofillData: Property = {
      name: getRandomItem(TEST_DATA.names),
      location: randomLocality,
      category: randomCategory,
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
      status: 'Available',
      createdAt: Date.now(),
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
    }
  ];

  // Add bulk actions handler
  const handleBulkAction = async (action: 'delete' | 'available' | 'sold' | 'archived') => {
    if (selectedProperties.length === 0) return;
    
    try {
      if (action === 'delete') {
        if (!confirm(`Are you sure you want to delete ${selectedProperties.length} properties?`)) return;
        await Promise.all(selectedProperties.map(id => deleteDoc(doc(db, 'properties', id))));
      } else {
        await Promise.all(selectedProperties.map(id => 
          updateDoc(doc(db, 'properties', id), { status: action.charAt(0).toUpperCase() + action.slice(1) })
        ));
      }
      fetchProperties();
      setSelectedProperties([]);
    } catch (error) {
      console.error('Error performing bulk action:', error);
    }
  };

  // Add upload handling functions
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    await handleUpload(files);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await handleUpload(files);
    }
  };

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const data = await response.json();
        setMediaImages(prev => [{
          id: data.filename,
          url: data.url,
          filename: file.name,
          uploadedAt: data.uploadedAt,
        }, ...prev]);
        
        setUploadProgress(100);
        await new Promise(resolve => setTimeout(resolve, 500)); // Show 100% briefly
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Add function to handle media image selection
  const handleMediaImageSelect = (image: MediaImage) => {
    setFormData({
      ...formData,
      images: [...formData.images, image.url]
    });
    setShowMediaLibrary(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-secondary pb-16">
        <div className="max-w-7xl mx-auto px-4 p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">Property Manager</h1>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={() => {
                  setIsAddingProperty(true);
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
                    status: 'Available',
                    createdAt: Date.now(),
                    host: {
                      name: '',
                      phone: '',
                      email: '',
                      position: '',
                    },
                  });
                }}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Property
              </button>
            </div>
          </div>

          {isAddingProperty && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAutofill}
                    className="px-4 py-2 text-sm font-medium text-primary bg-primary/5 rounded-lg hover:bg-primary/10"
                  >
                    Autofill Test Data
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingProperty(false);
                      setEditingProperty(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="2BHK Flat Fully Furnished"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    >
                      <option value="">Select Location</option>
                      {localities.map((locality) => (
                        <option key={locality.id} value={locality.name}>
                          {locality.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Room Type <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="i.e., 2BHK, 3BHK, Studio, Single Room, etc."
                      required
                    />
                  </div>
                </div>

                {/* Prices */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prices</label>
                  {formData.prices.map((price, index) => (
                    <div key={index} className="flex gap-4 mb-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Studio / Single Room / Double Room"
                          value={price.type}
                          onChange={(e) => {
                            const newPrices = [...formData.prices];
                            newPrices[index].type = e.target.value;
                            setFormData({ ...formData, prices: newPrices });
                          }}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Price (₹)"
                          value={price.price}
                          onChange={(e) => {
                            const newPrices = [...formData.prices];
                            newPrices[index].price = formatPrice(e.target.value);
                            setFormData({ ...formData, prices: newPrices });
                          }}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        />
                      </div>
                      <div className="flex-1">
                        <select
                          value={price.pricePeriod}
                          onChange={(e) => {
                            const newPrices = [...formData.prices];
                            newPrices[index].pricePeriod = e.target.value as 'day' | 'monthly' | 'yearly';
                            setFormData({ ...formData, prices: newPrices });
                          }}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        >
                          {PRICE_PERIODS.map((period) => (
                            <option key={period} value={period}>
                              {period.charAt(0).toUpperCase() + period.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newPrices = formData.prices.filter((_, i) => i !== index);
                          setFormData({ ...formData, prices: newPrices });
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        prices: [...formData.prices, { type: '', price: '', pricePeriod: 'monthly' }]
                      });
                    }}
                    className="mt-2 px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg"
                  >
                    Add Price
                  </button>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs</label>
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex gap-4 mb-2">
                      <div className="flex-1">
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => {
                            const newImages = [...formData.images];
                            newImages[index] = e.target.value;
                            setFormData({ ...formData, images: newImages });
                          }}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2"
                          placeholder="Enter image URL"
                        />
                      </div>
                      {image && (
                        <div className="w-20 h-20 relative">
                          <Image
                            src={image}
                            alt="Preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = formData.images.filter((_, i) => i !== index);
                          setFormData({ ...formData, images: newImages });
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          images: [...formData.images, '']
                        });
                      }}
                      className="mt-2 px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg"
                    >
                      Add Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowMediaLibrary(true)}
                      className="mt-2 px-4 py-2 text-sm text-white bg-primary hover:bg-primary/90 rounded-lg flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Select from Media
                    </button>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/5 text-primary"
                      >
                        {amenity}
                        <button
                          type="button"
                          onClick={() => {
                            const newAmenities = formData.amenities.filter((_, i) => i !== index);
                            setFormData({ ...formData, amenities: newAmenities });
                          }}
                          className="ml-2 text-primary hover:text-primary/80"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAmenity}
                      onChange={(e) => setNewAmenity(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          const amenities = newAmenity.split(',').map(a => a.trim()).filter(Boolean);
                          if (amenities.length > 0) {
                            setFormData({
                              ...formData,
                              amenities: [...formData.amenities, ...amenities]
                            });
                            setNewAmenity('');
                          }
                        }
                      }}
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="Type amenities separated by commas or press Enter"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Experience luxury living in this fully furnished space. Perfect for young professionals and students looking for a premium living experience. Describe the key features, nearby locations, and unique selling points."
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullAddress}
                    onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="123, ABC Colony, Near XYZ Landmark, Malviya Nagar, Jaipur, Rajasthan 302017"
                    required
                  />
                </div>

                {/* Map Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Map Location URL (optional)
                    <span className="text-sm text-gray-500 ml-2">Example: https://maps.google.com/?q=...</span>
                  </label>
                  <input
                    type="url"
                    value={formData.mapLocation}
                    onChange={(e) => setFormData({ ...formData, mapLocation: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Google Maps URL"
                  />
                </div>

                {/* Privileges */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Privileges</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {DEFAULT_PRIVILEGES.map((privilege) => (
                      <div key={privilege.title} className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.privileges.some(p => p.title === privilege.title)}
                          onChange={(e) => {
                            const newPrivileges = e.target.checked
                              ? [...formData.privileges, privilege]
                              : formData.privileges.filter(p => p.title !== privilege.title);
                            setFormData({ ...formData, privileges: newPrivileges });
                          }}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium">{privilege.title}</div>
                          <div className="text-sm text-gray-500">{privilege.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Custom Privilege */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Add Custom Privilege</h4>
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={newPrivilege.title}
                        onChange={(e) => setNewPrivilege({ ...newPrivilege, title: e.target.value })}
                        className="block w-full rounded-lg border border-gray-300 px-3 py-2"
                        placeholder="Privilege Title"
                      />
                      <textarea
                        value={newPrivilege.description}
                        onChange={(e) => setNewPrivilege({ ...newPrivilege, description: e.target.value })}
                        className="block w-full rounded-lg border border-gray-300 px-3 py-2"
                        placeholder="Privilege Description"
                        rows={2}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newPrivilege.title.trim() && newPrivilege.description.trim()) {
                            setFormData({
                              ...formData,
                              privileges: [...formData.privileges, { ...newPrivilege, isCustom: true }]
                            });
                            setNewPrivilege({ title: '', description: '', icon: 'star' });
                          }
                        }}
                        className="px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg"
                      >
                        Add Custom Privilege
                      </button>
                    </div>
                  </div>
                </div>

                {/* Host Information */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Host Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Host Name *"
                        value={formData.host.name}
                        onChange={(e) => setFormData({
                          ...formData,
                          host: { ...formData.host, name: e.target.value }
                        })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Position (e.g., Property Manager, Owner) *"
                        value={formData.host.position}
                        onChange={(e) => setFormData({
                          ...formData,
                          host: { ...formData.host, position: e.target.value }
                        })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone (optional)"
                        value={formData.host.phone}
                        onChange={(e) => setFormData({
                          ...formData,
                          host: { ...formData.host, phone: e.target.value }
                        })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email (optional)"
                        value={formData.host.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          host: { ...formData.host, email: e.target.value }
                        })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
                  >
                    {editingProperty ? 'Update Property' : 'Add Property'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Add Media Library Modal */}
          {showMediaLibrary && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Media Library</h3>
                  <button
                    onClick={() => setShowMediaLibrary(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {/* Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 mb-8 text-center transition-colors ${
                      isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                      multiple
                      accept="image/*"
                    />
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Upload className="w-12 h-12 text-gray-400" />
                      <div>
                        <p className="text-xl font-medium text-gray-900">Drop your images here</p>
                        <p className="text-sm text-gray-500 mt-1">or</p>
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={isUploading}
                      >
                        Select Files
                      </button>
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Uploading...</span>
                        <span className="text-sm text-gray-500">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Images Table */}
                  <div className="rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                            Preview
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            File Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            URL
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Uploaded
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mediaImages.map((image) => (
                          <tr key={image.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <ImageIcon className="w-4 h-4 text-gray-400" />
                                </div>
                                <Image
                                  src={image.url}
                                  alt={image.filename}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">
                                {image.filename}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <div className="text-sm text-gray-500 truncate max-w-md">
                                  {image.url}
                                </div>
                                <button
                                  onClick={() => navigator.clipboard.writeText(image.url)}
                                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                  title="Copy URL"
                                >
                                  <Copy className="w-4 h-4 text-gray-500" />
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {new Date(image.uploadedAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleMediaImageSelect(image)}
                                className="text-primary hover:text-primary/80 px-3 py-1 rounded-lg hover:bg-primary/5"
                              >
                                Select
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow">
              {/* Bulk Actions */}
              {selectedProperties.length > 0 && (
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      {selectedProperties.length} properties selected
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBulkAction('available')}
                        className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
                      >
                        Mark Available
                      </button>
                      <button
                        onClick={() => handleBulkAction('sold')}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200"
                      >
                        Mark Sold
                      </button>
                      <button
                        onClick={() => handleBulkAction('archived')}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
                      >
                        Archive
                      </button>
                      <button
                        onClick={() => handleBulkAction('delete')}
                        className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Sorting Dropdown */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-end space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm min-w-[200px]"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest First</option>
                    <option disabled>──────────</option>
                    <optgroup label="By Locality">
                      {localities.map(loc => (
                        <option key={loc.id} value={`locality-${loc.name}`}>
                          {loc.name}
                        </option>
                      ))}
                    </optgroup>
                    <option disabled>──────────</option>
                    <optgroup label="By Category">
                      {categories.map(cat => (
                        <option key={cat.id} value={`category-${cat.name}`}>
                          {cat.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedProperties.length === properties.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProperties(properties.map(p => p.id!));
                          } else {
                            setSelectedProperties([]);
                          }
                        }}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Locality
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prices
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedProperties.includes(property.id!)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProperties([...selectedProperties, property.id!]);
                            } else {
                              setSelectedProperties(selectedProperties.filter(id => id !== property.id));
                            }
                          }}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{property.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{property.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{property.category}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {property.prices.map((price, index) => (
                            <span
                              key={index}
                              className="relative group cursor-help"
                              title={`${price.type} (${price.pricePeriod})`}
                            >
                              {index > 0 && ", "}
                              {price.price}
                              <span className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                                {price.type} ({price.pricePeriod})
                              </span>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {formatDate(property.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          property.status === 'Available' ? 'bg-green-100 text-green-800' :
                          property.status === 'Sold' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {property.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                        <button
                          onClick={() => handleEdit(property)}
                          className="text-primary hover:text-primary/80"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(property.id!)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}