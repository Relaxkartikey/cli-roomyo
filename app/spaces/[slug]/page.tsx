"use client";
import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, Phone, Mail, ArrowLeft, Send, Building2, User } from "lucide-react";
import Link from "next/link";
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Property } from '@/app/types/property';
import Loader from '@/components/Loader';
import ContactForm from '@/components/ContactForm';

export default function SpaceDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [property, setProperty] = useState<Property | null>(null);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [relatedType, setRelatedType] = useState<'locality' | 'recent'>('locality');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // Extract ID from the slug (last part after the last hyphen)
        const id = params.slug.split("-").slice(-1)[0];
        if (!id) throw new Error('Invalid property ID');

        // Query the property by ID
        const propertiesRef = collection(db, 'properties');
        const q = query(propertiesRef, where('__name__', '==', id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const propertyData = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data()
          } as Property;

          // Redirect to 404 if property is archived
          if (propertyData.status === 'Archived') {
            notFound();
          }

          setProperty(propertyData);

          // First try to fetch properties from the same locality
          const localityQuery = query(
            propertiesRef,
            where('location', '==', propertyData.location),
            where('__name__', '!=', id),
            where('status', '!=', 'Archived')
          );
          const localitySnapshot = await getDocs(localityQuery);
          let relatedData = localitySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Property[];

          // If no properties found in same locality, fetch recent properties
          if (relatedData.length === 0) {
            setRelatedType('recent');
            const recentQuery = query(
              propertiesRef,
              where('status', '!=', 'Archived'),
              where('__name__', '!=', id),
              orderBy('createdAt', 'desc'),
              limit(3)
            );
            const recentSnapshot = await getDocs(recentQuery);
            relatedData = recentSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as Property[];
          } else {
            setRelatedType('locality');
          }

          setRelatedProperties(relatedData.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.slug]);

  if (loading) {
    return <Loader />;
  }

  if (!property) {
    notFound();
  }

  // Verify the slug matches the property name
  const expectedSlug = `${property.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${
    property.location.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  }-${property.id}`.replace(/(^-|-$)/g, "");

  if (params.slug !== expectedSlug) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-secondary pt-12 pb-16">
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
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
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

            {/* Main Details Section */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow-lg space-y-6">
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

              {/* Location with Map Icon */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Location</h2>
                <div className="flex items-start justify-between">
                  <p className="text-gray-600 flex-grow">{property.fullAddress}</p>
                  <button 
                    onClick={() => window.open(property.mapLocation, '_blank')}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors ml-4"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Map</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Details and Contact Form */}
          <div className="lg:col-span-1 space-y-8">
            {/* Quick Details Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
                {property.status === 'Sold' && (
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                    Sold
                  </span>
                )}
              </div>
              
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

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <h3 className="font-medium text-gray-900">Available Options</h3>
                <div className="space-y-2">
                  {property.prices.map((priceOption, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-primary">{priceOption.price}</div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {priceOption.type}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">All inclusive price</p>
              </div>

              {/* Host Details */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <h2 className="font-semibold">Hosted by</h2>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{property.host.name}</h3>
                    <p className="text-sm text-gray-600">{property.host.position}</p>
                  </div>
                </div>
                {property.host.phone && (
                  <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    <Phone className="w-4 h-4" />
                    {property.host.phone}
                  </button>
                )}
                {property.host.email && (
                  <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    <Mail className="w-4 h-4" />
                    {property.host.email}
                  </button>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm 
              title="Book Your Space" 
              subtitle={`Interested in ${property?.name}? Reach out to book your space!`}
              className="shadow-lg"
            />
          </div>
        </div>

        {/* Related Roomyos */}
        <div className="col-span-full mt-16">
          <h2 className="text-2xl font-semibold mb-8">
            {relatedType === 'locality' 
              ? `More Properties in ${property?.location}`
              : 'Recently Added Properties'}
          </h2>
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
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{relatedProperty.name}</h3>
                      {relatedProperty.status === 'Sold' && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Sold
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{relatedProperty.category}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-primary font-semibold">{relatedProperty.prices[0].price}</span>
                        <span className="text-sm text-gray-500 ml-2">{relatedProperty.prices[0].type}</span>
                      </div>
                      <div className="flex gap-2">
                        {relatedProperty.amenities.slice(0, 2).map((amenity, index) => (
                          <span key={index} className="text-xs bg-primary/5 text-primary px-2 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link 
                      href={`/spaces/${relatedProperty.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${
                        relatedProperty.location.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                      }-${relatedProperty.id?.slice(0, 5)}`.replace(/(^-|-$)/g, "")}
                      className="block w-full text-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center py-8">
                {relatedType === 'locality' 
                  ? `No other properties available in ${property?.location}.`
                  : 'No other properties available at the moment.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 