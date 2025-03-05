"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Share2 } from "lucide-react";

const featuredProperties = [
  {
    id: 1,
    title: "Luxury PG in Powai",
    location: "Powai, Mumbai",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60",
    price: "₹15,000/month",
    type: "PG Accommodation"
  },
  {
    id: 2,
    title: "Modern Apartment in HSR",
    location: "HSR Layout, Bangalore",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60",
    price: "₹25,000/month",
    type: "Rental Property"
  },
  {
    id: 3,
    title: "Premium PG in Koramangala",
    location: "Koramangala, Bangalore",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&auto=format&fit=crop&q=60",
    price: "₹18,000/month",
    type: "PG Accommodation"
  }
];

const FeaturedRoomyos = () => {
  return (
    <section className="py-12 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-gray-900 font-bold text-4xl md:text-5xl mb-8">
            Featured Roomyos
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-4"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties and PG accommodations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property, idx) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <div className="relative h-48">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">{property.location}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-semibold">{property.price}</span>
                  <span className="text-sm text-gray-500">{property.type}</span>
                </div>
                <Link 
                  href={`/properties/${property.id}`}
                  className="mt-4 block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/properties"
            className="inline-block py-3 px-8 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            View All Properties
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedRoomyos; 