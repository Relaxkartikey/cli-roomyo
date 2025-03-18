"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { ChevronDown } from "lucide-react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Privileges", href: "/privileges" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Locality", href: "#", dropdown: true }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [localities, setLocalities] = useState<string[]>([]);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchLocalities = async () => {
      try {
        const propertiesRef = collection(db, 'properties');
        const querySnapshot = await getDocs(propertiesRef);
        
        // Get unique localities from properties
        const uniqueLocalities = new Set<string>();
        querySnapshot.forEach((doc) => {
          const property = doc.data();
          if (property.location) {
            uniqueLocalities.add(property.location);
          }
        });
        
        setLocalities(Array.from(uniqueLocalities));
      } catch (error) {
        console.error('Error fetching localities:', error);
      }
    };

    fetchLocalities();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <header className={`hidden md:block fixed w-full top-0 z-50 transition-all duration-300 ${
        hasScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}>
        {/* Top Marketing Bar */}
        <div className="bg-primary/5 border-b border-primary/10">
          <div className="max-w-[2000px] mx-auto px-4 py-2.5">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center divide-x divide-gray-300">
                <span className="pr-4">Premium Living Spaces</span>
                <span className="px-4">18+ Areas</span>
                <div className="flex items-center px-4">
                  <span className="text-primary">★★★★★</span>
                  <span className="ml-1">Experience</span>
                </div>
              </div>
              <div className="flex items-center divide-x divide-gray-300">
                <span className="px-4">24/7 Support</span>
                <span className="pl-4">Verified Properties</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-[2000px] mx-auto px-4 py-5">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">Roomyo</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <div key={item.href} className="relative group" ref={item.dropdown ? dropdownRef : null}>
                  {item.dropdown ? (
                    <button
                      onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-gray-700 hover:text-primary transition-colors ${
                        pathname === item.href ? "font-medium text-primary" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                  
                  {/* Localities Mega Menu Dropdown */}
                  {item.dropdown && isCityDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-lg shadow-lg py-4 z-50 grid grid-cols-3 gap-2">
                      {localities.map((locality) => (
                        <Link
                          key={locality}
                          href={`/spaces?location=${locality}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                          onClick={() => setIsCityDropdownOpen(false)}
                        >
                          {locality}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Connect Button and Browse Spaces */}
            <div className="flex items-center space-x-4">
              <Link
                href="/spaces"
                className="bg-primary/10 text-primary px-6 py-3 rounded-md hover:bg-primary/20 transition-colors"
              >
                Browse Spaces
              </Link>
              <div className="relative">
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full leading-none">
                  Free
                </div>
                <Link
                  href="/list-property"
                  className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
                >
                  List Your Property
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Components */}
      <MobileHeader />
      <MobileBottomNav />
    </>
  );
}
