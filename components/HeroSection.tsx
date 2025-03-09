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
        const uniqueLocations = new Set<string>();
        querySnapshot.forEach((doc) => {
          const property = doc.data();
          if (property.location) {
            uniqueLocations.add(property.location);
          }
        });
        
        const locationsList = Array.from(uniqueLocations);
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
      className="relative w-full min-h-[calc(100vh-80px)] bg-secondary flex items-center pt-20 pb-12"
    >
      <div className="relative w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-sm md:text-base font-medium text-primary"
            >
              Find Your Perfect Space
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-foreground mb-6 tracking-tight leading-[1.1]">
              Your Perfect
              <br />
              Rental Is Just
              <br />
              A Click Away
            </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-xl text-base sm:text-lg md:text-xl text-muted-foreground mb-8"
          >
              Discover the perfect property or PG accommodation across all Jaipur cities. 
              Easy booking, trusted dealers, and hassle-free experience.
          </motion.p>

            {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-2xl mb-8"
            >
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-lg">
                <div className="flex-1 flex items-center gap-2 px-4 py-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-foreground appearance-none cursor-pointer"
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
                  className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-md transition-colors duration-300 flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </motion.div>

            {/* Featured Cities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {recentLocations.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedLocation(city);
                    handleSearch();
                  }}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm"
                >
                  {city}
                </button>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-4 max-w-md"
            >
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">7+</div>
                <div className="text-sm text-muted-foreground">Major Cities</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Properties</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-[200px] md:h-[300px] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60"
                    alt="Modern Apartment"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-[150px] md:h-[200px] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60"
                    alt="Luxury Home"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-[150px] md:h-[200px] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&auto=format&fit=crop&q=60"
                    alt="Modern Kitchen"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-[200px] md:h-[300px] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60"
                    alt="Cozy Bedroom"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 right-[10%] bg-white p-3 rounded-full shadow-lg hidden md:block"
            >
              <Building2 className="w-6 h-6 text-primary" />
            </motion.div>
            
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute bottom-1/4 left-[10%] bg-white p-3 rounded-full shadow-lg hidden md:block"
            >
              <Home className="w-6 h-6 text-accent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
