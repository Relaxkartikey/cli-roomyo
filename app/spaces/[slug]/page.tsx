"use client";
import React, { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, Phone, Mail, ArrowLeft, Send, Building2 } from "lucide-react";
import Link from "next/link";
import { SAMPLE_PROPERTIES, Property } from "../../utils/sampleData";

export default function SpaceDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  // Extract the ID from the slug
  const id = parseInt(params.slug.split("-").pop() || "0");
  const property = SAMPLE_PROPERTIES.find((p: Property) => p.id === id);

  if (!property) {
    notFound();
  }

  // Verify the slug matches the property name
  const expectedSlug = property.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") + "-" + property.id;

  if (params.slug !== expectedSlug) {
    notFound();
  }

  // Get related properties (same category, different property)
  const relatedProperties = SAMPLE_PROPERTIES.filter(
    p => p.category === property.category && p.id !== property.id
  ).slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ name, email, phone, message });
  };

  return (
    <main className="min-h-screen bg-secondary pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/spaces"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Spaces
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex gap-4">
                {/* Thumbnail Column */}
                <div className="w-24 space-y-4">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-full aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${property.name} - Image ${index + 1}`}
                        width={96}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                
                {/* Main Image */}
                <div className="flex-1 aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={property.images[selectedImage]}
                    alt={property.name}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Main Details */}
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Description</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Privileges */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Privileges</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.privileges.map((privilege, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <i className={`fas fa-${privilege.icon} text-primary`}></i>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{privilege.title}</h3>
                        <p className="text-sm text-gray-600">{privilege.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Location</h2>
                <div className="space-y-2">
                  <p className="text-gray-600">{property.fullAddress}</p>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    View on Map
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Details, Host Info, and Contact Form */}
          <div className="relative">
            {/* Quick Details and Host Info - Static at top */}
            <div className="space-y-8">
              {/* Quick Details Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{property.location}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium">{property.roomType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {property.category}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="text-3xl font-bold text-primary">{property.price}</div>
                  <p className="text-sm text-gray-500 mt-1">All inclusive price</p>
                </div>
              </div>

              {/* Host Details Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
                <h2 className="text-xl font-semibold">Hosted by</h2>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={property.host.image}
                      alt={property.host.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{property.host.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{property.host.rating} Rating</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{property.host.responseTime}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    <Phone className="w-4 h-4" />
                    {property.host.phone}
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary py-2 rounded-lg hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4" />
                    {property.host.email}
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form - Starts after host details and sticks to bottom */}
            <div className="mt-8 lg:sticky lg:bottom-8">
              <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
                <h2 className="text-xl font-semibold">Contact Host</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Related Roomyos */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8">Related Roomyos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProperties.length > 0 ? (
              relatedProperties.map((relatedProperty, idx) => (
                <motion.div
                  key={relatedProperty.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  {/* Property Image */}
                  <div className="relative h-48">
                    <Image
                      src={relatedProperty.images[0]}
                      alt={relatedProperty.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24" />
                  </div>

                  {/* Property Details */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-600">{relatedProperty.location}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{relatedProperty.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{relatedProperty.category}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-primary font-semibold">{relatedProperty.price}</span>
                      <div className="flex gap-2">
                        {relatedProperty.amenities.slice(0, 2).map((amenity, index) => (
                          <span key={index} className="text-xs bg-primary/5 text-primary px-2 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link 
                      href={`/spaces/${relatedProperty.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${relatedProperty.id}`}
                      className="block w-full text-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center py-8">
                No related properties found in this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 