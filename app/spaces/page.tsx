"use client";
import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Share2, MapPin, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, getDocs, query, where, orderBy, CollectionReference, Query, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Property } from '../types/property';
import Loader from '@/components/Loader';

// Constants
const SORT_OPTIONS = ["Low to High", "High to Low", "Recent"];

// Separate client component for search functionality
function SearchComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [localities, setLocalities] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "");

  // Fetch localities and categories from Firestore
  useEffect(() => {
    const fetchLocationsAndCategories = async () => {
      try {
        const propertiesRef = collection(db, 'properties');
        const querySnapshot = await getDocs(propertiesRef);
        
        const uniqueLocalities = new Set<string>();
        const uniqueCategories = new Set<string>();
        
        querySnapshot.docs.forEach(doc => {
          const data = doc.data();
          if (data.location) uniqueLocalities.add(data.location);
          if (data.category) uniqueCategories.add(data.category);
        });
        
        setLocalities(Array.from(uniqueLocalities).sort());
        setCategories(Array.from(uniqueCategories).sort());
      } catch (error) {
        console.error('Error fetching localities and categories:', error);
      }
    };

    fetchLocationsAndCategories();
  }, []);

  // Fetch properties from Firebase
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesRef = collection(db, 'properties') as CollectionReference<DocumentData>;
        let queryRef: Query<DocumentData> = propertiesRef;
        
        // Apply filters
        const conditions = [];
        if (selectedLocation) conditions.push(where('location', '==', selectedLocation));
        if (selectedCategory) conditions.push(where('category', '==', selectedCategory));
        
        if (conditions.length > 0) {
          queryRef = query(propertiesRef, ...conditions);
        }
        
        const querySnapshot = await getDocs(queryRef);
        let propertiesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Property[];

        // Filter out archived properties
        propertiesList = propertiesList.filter(property => property.status !== 'Archived');

        // Apply sorting
        propertiesList = propertiesList.sort((a, b) => {
          if (selectedSort === "Low to High") {
            const priceA = parseInt(a.prices[0].price.replace(/[^0-9]/g, ''));
            const priceB = parseInt(b.prices[0].price.replace(/[^0-9]/g, ''));
            return priceA - priceB;
          }
          if (selectedSort === "High to Low") {
            const priceA = parseInt(a.prices[0].price.replace(/[^0-9]/g, ''));
            const priceB = parseInt(b.prices[0].price.replace(/[^0-9]/g, ''));
            return priceB - priceA;
          }
          return 0;
        });

        setProperties(propertiesList);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [selectedLocation, selectedCategory, selectedSort]);

  // Update URL when filters change
  const updateURL = (location: string, category: string, sort: string) => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    
    const newURL = `/spaces${params.toString() ? `?${params.toString()}` : ""}`;
    router.push(newURL);
  };

  // Handle filter changes
  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    updateURL(value, selectedCategory, selectedSort);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    updateURL(selectedLocation, value, selectedSort);
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    updateURL(selectedLocation, selectedCategory, value);
  };

  // Create SEO-friendly URL for property
  const createPropertyUrl = (property: Property) => {
    const slug = `${property.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${
      property.location.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    }-${property.id}`.replace(/(^-|-$)/g, "");
    return `/spaces/${slug}`;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Locality Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Locality</label>
            <select
              value={selectedLocation}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Select Locality</option>
              {localities.map((locality) => (
                <option key={locality} value={locality}>{locality}</option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Sort By</label>
            <select
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Sort By</option>
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, idx) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 group shadow-lg hover:shadow-xl flex flex-col h-full"
          >
            {/* Property Image */}
            <Link href={createPropertyUrl(property)} className="block flex-1">
              <div className="relative h-full min-h-[12rem]">
                <Image
                  src={property.images[0]}
                  alt={property.name}
                  fill
                  className="object-cover"
                />
                <button 
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    // Share functionality here
                  }}
                >
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24" />
              </div>
            </Link>

            {/* Property Details */}
            <div className="p-6 flex flex-col">
              <Link href={createPropertyUrl(property)} className="block">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm text-gray-600">{property.location}</span>
                  </div>
                  <div className="flex gap-2">
                    {property.amenities?.slice(0, 2).map((amenity, index) => (
                      <span key={index} className="text-xs bg-primary/5 text-primary px-2 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                  {property.status === 'Sold' && (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      Sold
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{property.category}</span>
                </div>
              </Link>
              
              {/* Price Options */}
              <div className="space-y-2 mt-auto">
                {property.prices?.map((priceOption, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-primary font-semibold">{priceOption.price}</span>
                    <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {priceOption.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default function SpacesPage() {
  return (
    <main className="min-h-screen bg-secondary pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <Suspense fallback={<LoadingComponent />}>
          <SearchComponent />
        </Suspense>
      </div>
    </main>
  );
}

// Loading component
function LoadingComponent() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
} 