"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedin } from "react-icons/fa";

const PreFooter = () => {
  return (
    <div className="w-full bg-secondary">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Company Info Section */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-gray-100 shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-blue-600">About Us</h3>
            <div className="flex items-start space-x-4">
              <div className="relative w-[70px] h-[70px] mt-1 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop&q=80"
                  alt="Roomyo Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium mb-2 text-gray-900">Roomyo</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your trusted partner in finding the perfect living space. We make property and PG hunting simple, efficient, and reliable across major Indian cities.
                </p>
              </div>
            </div>
          </div>

          {/* Locations Section */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-blue-600">Locations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mumbai" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Mumbai
                </Link>
              </li>
              <li>
                <Link href="/delhi" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Delhi
                </Link>
              </li>
              <li>
                <Link href="/bangalore" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Bangalore
                </Link>
              </li>
              <li>
                <Link href="/pune" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Pune
                </Link>
              </li>
              <li>
                <Link href="/hyderabad" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Hyderabad
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-blue-600">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Property Listing
                </Link>
              </li>
              <li>
                <Link href="/pg-accommodation" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  PG Accommodation
                </Link>
              </li>
              <li>
                <Link href="/rental-services" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Rental Services
                </Link>
              </li>
              <li>
                <Link href="/privileges" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Privileges
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-gray-100 shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-blue-600">Contact Us</h3>
            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <a href="tel:+919876543210" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-3">
                  <FaPhone size={16} />
                  <span>+91 98765 43210</span>
                </a>
                <a href="https://wa.me/919876543210" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-3">
                  <FaWhatsapp size={16} />
                  <span>+91 98765 43210</span>
                </a>
              </div>
              <div className="space-y-2">
                <a href="mailto:contact@roomyo.com" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-3">
                  <FaEnvelope size={16} />
                  <span>contact@roomyo.com</span>
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link href="https://www.instagram.com/roomyo" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-110 transform duration-200">
                <FaInstagram size={24} />
              </Link>
              <Link href="https://www.facebook.com/roomyo" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-110 transform duration-200">
                <FaFacebookF size={24} />
              </Link>
              <Link href="https://www.linkedin.com/company/roomyo" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-110 transform duration-200">
                <FaLinkedin size={24} />
              </Link>
              <Link href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-110 transform duration-200">
                <FaWhatsapp size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;