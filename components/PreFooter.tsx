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

          {/* Column 2: pages (moved from Column 3) */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-primary">
              Pages
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privileges" className="text-muted-foreground hover:text-primary transition-colors">
                  Privileges
                </Link>
              </li>
              <li>
                <Link href="/Blogs" className="text-muted-foreground hover:text-primary transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/spaces" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Spaces
                </Link>
              </li>
              <li>
                <Link href="/About" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (moved Company out) */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-primary">
              Website
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/Privacy-Policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="https://kartikey.tech" className="text-muted-foreground hover:text-primary transition-colors">
                  Developer
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-muted-foreground hover:text-primary transition-colors">
                  Report
                </Link>
              </li>
            </ul>
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