"use client";
import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const PreFooter = () => {
  return (
    <div className="w-full bg-secondary">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Address and Email */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-primary">
              Roomyo
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <p className="text-muted-foreground">
                  Pearl Apartments,<br />
                  Jagatpura, Jaipur,<br />
                  Rajasthan, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:contact@roomyo.in" className="text-muted-foreground hover:text-primary transition-colors">
                  contact@roomyo.in
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Rent Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-primary">
              Rent
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="font-medium mb-2">By Location</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/mumbai" className="text-muted-foreground hover:text-primary transition-colors">
                      Mumbai
                    </Link>
                  </li>
                  <li>
                    <Link href="/delhi" className="text-muted-foreground hover:text-primary transition-colors">
                      Delhi
                    </Link>
                  </li>
                  <li>
                    <Link href="/bangalore" className="text-muted-foreground hover:text-primary transition-colors">
                      Bangalore
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">By Budget</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/budget/under-10000" className="text-muted-foreground hover:text-primary transition-colors">
                      Under ₹10,000
                    </Link>
                  </li>
                  <li>
                    <Link href="/budget/10000-20000" className="text-muted-foreground hover:text-primary transition-colors">
                      ₹10,000 - ₹20,000
                    </Link>
                  </li>
                  <li>
                    <Link href="/budget/above-20000" className="text-muted-foreground hover:text-primary transition-colors">
                      Above ₹20,000
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: Services and Company */}
          <div>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-6 text-gray-900 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-primary">
                Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/properties" className="text-muted-foreground hover:text-primary transition-colors">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="/pg" className="text-muted-foreground hover:text-primary transition-colors">
                    Paying Guests
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    Other Services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-900 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-primary">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/developer" className="text-muted-foreground hover:text-primary transition-colors">
                    Developer
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-muted-foreground hover:text-primary transition-colors">
                    Sitemap
                  </Link>
                </li>
                <li>
                  <Link href="/report" className="text-muted-foreground hover:text-primary transition-colors">
                    Report
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Connect with Us */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-primary">
              Connect with Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaWhatsapp className="w-5 h-5 text-primary" />
                <a href="https://wa.me/919876543210" className="text-muted-foreground hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-4">Follow us on social media</p>
                <div className="flex gap-4">
                  <Link 
                    href="https://instagram.com/roomyo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <FaInstagram size={20} />
                  </Link>
                  <Link 
                    href="https://facebook.com/roomyo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <FaFacebookF size={20} />
                  </Link>
                  <Link 
                    href="https://linkedin.com/company/roomyo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <FaLinkedin size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;