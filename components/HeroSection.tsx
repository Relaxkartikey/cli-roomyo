"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, MapPin, Building2, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Import locations from spaces data
const LOCATIONS = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata"];

const HeroSection = () => {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [recentLocations, setRecentLocations] = useState<string[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const propertiesRef = collection(db, 'properties');
        const querySnapshot = await getDocs(propertiesRef);
        
        // Get unique locations from properties
        const uniqueLocalities = new Set<string>();
        querySnapshot.forEach((doc) => {
          const property = doc.data();
          if (property.location) {
            uniqueLocalities.add(property.location);
          }
        });
        
        const locationsList = Array.from(uniqueLocalities);
        setLocations(locationsList);
        
        // Get recent 4 locations
        const recentQuery = query(propertiesRef, orderBy('createdAt', 'desc'), limit(4));
        const recentSnapshot = await getDocs(recentQuery);
        const recentLocationsList = new Set<string>();
        recentSnapshot.forEach((doc) => {
          const property = doc.data();
          if (property.location) {
            recentLocationsList.add(property.location);
          }
        });
        setRecentLocations(Array.from(recentLocationsList));
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = () => {
    if (selectedLocation) {
      router.push(`/spaces?location=${selectedLocation}`);
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[calc(75vh-80px)] pt-[80px] pb-4 sm:pt-[90px] flex flex-col justify-center overflow-hidden bg-secondary"
    >
      <div className="relative w-full max-w-[1800px] mx-auto px-3 sm:px-4 lg:px-6 flex-1 flex items-center py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-8 items-center w-full">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left order-2 lg:order-1 flex flex-col max-w-md lg:max-w-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-2 sm:mb-2 text-sm md:text-sm font-medium text-primary"
            >
              Find Your Perfect Space
            </motion.div>

            <h1 className="text-3xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground mb-2 sm:mb-3 tracking-tight leading-[1.1]">
              <span className="block">Your Perfect</span>
              <span className="block">Rental Is Just</span>
              <span className="block">A Click Away</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-lg text-sm sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4"
            >
              Discover the perfect property or PG accommodation across all Jaipur cities. 
              <span className="hidden sm:inline"> Easy booking, trusted dealers, and hassle-free experience.</span>
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-md mb-3 sm:mb-4"
            >
              <div className="flex items-center gap-2 sm:gap-2 p-2 bg-white rounded-lg shadow-md">
                <div className="flex-1 flex items-center gap-2 px-2 py-1.5">
                  <MapPin className="w-4 h-4 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-foreground appearance-none cursor-pointer text-sm sm:text-sm"
                  >
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <button 
                  onClick={handleSearch}
                  className="bg-accent hover:bg-accent-dark text-white px-3 sm:px-4 py-2 sm:py-2 rounded-md transition-colors duration-300 flex items-center gap-1 text-sm sm:text-sm whitespace-nowrap"
                >
                  <Search className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span>Search</span>
                </button>
              </div>
            </motion.div>

            {/* Featured Cities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-2 sm:gap-1.5 mb-3 sm:mb-4"
            >
              {recentLocations.slice(0, 3).map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedLocation(city);
                    handleSearch();
                  }}
                  className="px-3 sm:px-3 py-1.5 sm:py-1.5 bg-white rounded-full text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm"
                >
                  {city}
                </button>
              ))}
              {recentLocations.length > 3 && (
                <button
                  onClick={() => {}}
                  className="px-3 sm:px-3 py-1.5 sm:py-1.5 bg-white rounded-full text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors duration-300 shadow-sm hidden sm:inline-block"
                >
                  +{recentLocations.length - 3} more
                </button>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-auto sm:mt-3 grid grid-cols-3 gap-2 sm:gap-2 max-w-xs"
            >
              <div>
                <div className="text-lg sm:text-lg md:text-xl lg:text-2xl font-bold text-primary">7+</div>
                <div className="text-xs sm:text-xs text-muted-foreground">Major Cities</div>
              </div>
              <div>
                <div className="text-lg sm:text-lg md:text-xl lg:text-2xl font-bold text-primary">1000+</div>
                <div className="text-xs sm:text-xs text-muted-foreground">Properties</div>
              </div>
              <div>
                <div className="text-lg sm:text-lg md:text-xl lg:text-2xl font-bold text-primary">24/7</div>
                <div className="text-xs sm:text-xs text-muted-foreground">Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Grid - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2 hidden md:block"
          >
            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto lg:max-w-none">
              <div className="space-y-2">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60"
                    alt="Modern Apartment"
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60"
                    alt="Luxury Home"
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-2 pt-3">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&auto=format&fit=crop&q=60"
                    alt="Modern Kitchen"
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60"
                    alt="Cozy Bedroom"
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Floating Elements - Only visible on tablet and above */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 right-[10%] bg-white p-1.5 rounded-full shadow-md hidden sm:block"
            >
              <Building2 className="w-4 h-4 text-primary" />
            </motion.div>
            
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute bottom-1/4 left-[10%] bg-white p-1.5 rounded-full shadow-md hidden sm:block"
            >
              <Home className="w-4 h-4 text-accent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


