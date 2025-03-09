"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, Wifi, Home, Users, Dumbbell, Calendar, Shield, 
  Shirt, Briefcase, Coffee, Gamepad, Phone, MapPin, Clock,
  Utensils, Smartphone, Lock, Building, CreditCard, Sparkles,
  Waves, PartyPopper, Tv, CheckCircle2, Zap, CheckCircle
} from "lucide-react";

const AMENITIES = [
  {
    icon: Home,
    title: "Fully Furnished Living",
    description: "Premium furniture, cozy bedding, and ergonomic workspaces with balconies."
  },
  {
    icon: Users,
    title: "24/7 Resident Assistance",
    description: "IHM-trained hospitality experts and dedicated managers at your service."
  },
  {
    icon: Shirt,
    title: "Doorstep Laundry",
    description: "Twice-weekly service with premium care and quality detergents."
  },
  {
    icon: Wifi,
    title: "High-Speed Wi-Fi",
    description: "Lightning-fast internet for work, streaming, and gaming."
  },
  {
    icon: Utensils,
    title: "Gourmet Meals",
    description: "Chef-curated healthy meals with local and international cuisines."
  },
  {
    icon: Shield,
    title: "3-Tier Security",
    description: "Biometric locks, CCTV surveillance, and trained security personnel."
  },
  {
    icon: Smartphone,
    title: "Smart Living App",
    description: "Manage rent, maintenance, and community events with a single tap."
  },
  {
    icon: Dumbbell,
    title: "Fitness & Recreation",
    description: "State-of-the-art gym, gaming zones, and wellness spaces."
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description: "Minutes from business hubs, universities, and entertainment zones."
  }
];

const STATS = [
  { number: "500+", label: "Happy Residents" },
  { number: "100+", label: "Social Events Yearly" },
  { number: "15+", label: "Prime Locations" }
];

const LIFESTYLE_FEATURES = [
  {
    icon: Waves,
    title: "Swimming & Wellness",
    description: "Rooftop pools and wellness spaces for relaxation"
  },
  {
    icon: PartyPopper,
    title: "Social Events",
    description: "Regular movie nights, cultural fests, and community gatherings"
  },
  {
    icon: Tv,
    title: "Entertainment Zones",
    description: "Gaming consoles, pool tables, and lounge areas"
  },
  {
    icon: Coffee,
    title: "Café & Workspaces",
    description: "Dedicated areas for work and casual meetings"
  }
];

const PRICING_BENEFITS = [
  {
    icon: CreditCard,
    title: "Zero Brokerage",
    description: "No hidden fees or charges - what you see is what you pay"
  },
  {
    icon: Sparkles,
    title: "All-Inclusive Pricing",
    description: "Rent covers all amenities, utilities, and services"
  },
  {
    icon: Zap,
    title: "Flexible Terms",
    description: "Choose from monthly, quarterly, or yearly payment plans"
  }
];

const WHY_CHOOSE = [
  "Premium locations in city hotspots",
  "Vibrant community of like-minded individuals",
  "Professional housekeeping services",
  "24/7 maintenance support",
  "High-speed internet connectivity",
  "Regular community events",
  "Zero security deposit worries",
  "Fully furnished luxury spaces"
];

export default function PrivilegesPage() {
  return (
    <main className="min-h-screen bg-secondary pb-16">
      {/* Hero Title Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-8 sm:py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Roomyo Privileges</h1>
          <p className="text-gray-600">Exclusive benefits for our valued customers</p>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 p-6">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Where Luxury Meets Convenience</h2>
            <p className="text-gray-600 mb-6">
              At Roomyo, we believe in offering more than just a place to stay. Our privileges program is designed to enhance your living experience with premium amenities and services.
            </p>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Why Choose Roomyo?</h3>
              <ul className="space-y-2">
                {WHY_CHOOSE.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              </div>
          </div>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
              alt="Luxury Living at Roomyo"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>
        </div>

        {/* Privileges Cards */}
        <h2 className="text-3xl font-bold text-center mb-12">Our Premium Privileges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AMENITIES.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <div key={amenity.title} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{amenity.title}</h3>
                <p className="text-gray-600">{amenity.description}</p>
              </div>
            );
          })}
        </div>
        </div>
    </main>
  );
} 