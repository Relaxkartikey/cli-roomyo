"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, MapPin, Building2, Home, UserRound } from "lucide-react";
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

  const stats = [
    { 
      number: '50+', 
      label: 'Properties',
      description: 'Premium Spaces'
    },
    { 
      number: '1000+', 
      label: 'Residents',
      description: 'Happy Members'
    },
    { 
      number: '12+', 
      label: 'Areas',
      description: 'Prime Locations'
    },
  ];

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
    <section className="relative bg-secondary">
      <div className="max-w-[2000px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-8 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1 z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left flex flex-col max-w-2xl lg:max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-2 sm:mb-2 text-sm md:text-base font-medium text-primary"
              >
                Find Your Perfect Space
              </motion.div>

              <h1 className="text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-foreground mb-2 sm:mb-3 tracking-tight leading-[1.1]">
                <span className="block">Your Perfect</span>
                <span className="block">Rental Is Just</span>
                <span className="block">A Click Away</span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground mb-3 sm:mb-4"
              >
                Discover the perfect property spaces across {" "}
                <motion.span
                  initial={{ backgroundColor: "rgba(59, 130, 246, 0)" }}
                  animate={{ 
                    backgroundColor: ["rgba(59, 130, 246, 0)", "rgba(59, 130, 246, 0.1)", "rgba(59, 130, 246, 0)"],
                    color: "#2563eb",
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="font-semibold relative inline-block"
                >
                  <span className="relative z-10">Jaipur</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </motion.span>
                {" "}cities. 
                <span className="hidden sm:inline"> Easy booking, trusted dealers, and hassle-free experience.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative max-w-xl mb-3 sm:mb-4"
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap gap-2 sm:gap-2 mb-4 sm:mb-5"
              >
                {recentLocations.slice(0, 3).map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedLocation(city);
                      handleSearch();
                    }}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white rounded-full text-base font-medium text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm"
                  >
                    {city}
                  </button>
                ))}
                {recentLocations.length > 3 && (
                  <button
                    onClick={() => {}}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white rounded-full text-base font-medium text-gray-500 hover:bg-gray-100 transition-colors duration-300 shadow-sm hidden sm:inline-block"
                  >
                    +{recentLocations.length - 3} more
                  </button>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-auto sm:mt-4 grid grid-cols-3 gap-4 sm:gap-6 max-w-lg"
              >
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center text-center p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-colors duration-300"
                  >
                    <p className="text-primary font-bold text-xl sm:text-2xl lg:text-3xl mb-0.5">{stat.number}</p>
                    <p className="text-gray-900 font-medium text-xs sm:text-sm">{stat.label}</p>
                    <p className="text-gray-500 text-xs sm:text-xs hidden sm:block">{stat.description}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right content - Image grid - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2 hidden md:block"
          >
            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto lg:max-w-none">
              <div className="space-y-2">
                <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                  <Image
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Modern Living Room"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                  <Image
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Cozy Bedroom"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                  <Image
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Modern Kitchen"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                  <Image
                    src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Stylish Bathroom"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
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
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute top-1/4 -left-4 p-2 bg-white rounded-lg shadow-lg hidden lg:flex items-center gap-2 z-10"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium">Jaipur</span>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute bottom-1/4 -right-4 p-2 bg-white rounded-lg shadow-lg hidden lg:flex items-center gap-2 z-10"
            >
              <UserRound className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium">Verified</span>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute bottom-1/3 left-1/3 p-2 bg-white rounded-lg shadow-lg hidden lg:flex items-center gap-2 z-10"
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


