"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, MapPin, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SAMPLE_PROPERTIES } from "../utils/sampleData";

// Temporary data until we integrate Strapi
const LOCATIONS = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata"];
const CATEGORIES = ["Rent Roomyo", "Roomyo Spaces"];
const SORT_OPTIONS = ["Low to High", "High to Low", "Recent"];

export interface Property {
  id: number;
  name: string;
  location: string;
  category: string;
  price: string;
  priceNumeric: number;
  amenities: string[];
  image: string;
  images: string[];
}

export default function SpacesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "");

  // Filter and sort properties
  const filteredProperties = SAMPLE_PROPERTIES.filter(property => {
    if (selectedLocation && !property.location.includes(selectedLocation)) return false;
    if (selectedCategory && property.category !== selectedCategory) return false;
    return true;
  }).sort((a, b) => {
    if (selectedSort === "Low to High") return a.priceNumeric - b.priceNumeric;
    if (selectedSort === "High to Low") return b.priceNumeric - a.priceNumeric;
    return 0; // Recent is default
  });

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
  const createPropertyUrl = (property: typeof SAMPLE_PROPERTIES[0]) => {
    const slug = property.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `/spaces/${slug}-${property.id}`;
  };

  return (
    <main className="min-h-screen bg-secondary pt-32 pb-16">
      {/* Search Form */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Select Location</option>
                {LOCATIONS.map((location) => (
                  <option key={location} value={location}>{location}</option>
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
                {CATEGORIES.map((category) => (
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
          {filteredProperties.map((property, idx) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              {/* Property Image */}
              <div className="relative h-48">
                <Image
                  src={property.images[0]}
                  alt={property.name}
                  fill
                  className="object-cover"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24" />
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-600">{property.location}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{property.category}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-primary font-semibold">{property.price}</span>
                  <div className="flex gap-2">
                    {property.amenities.slice(0, 2).map((amenity, index) => (
                      <span key={index} className="text-xs bg-primary/5 text-primary px-2 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                <Link 
                  href={createPropertyUrl(property)}
                  className="block w-full text-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 