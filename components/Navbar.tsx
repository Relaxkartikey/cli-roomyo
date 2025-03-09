"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { ChevronDown } from "lucide-react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Privileges", href: "/privileges" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Locality", href: "#", dropdown: true }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [localities, setLocalities] = useState<string[]>([]);
  const pathname = usePathname();

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
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 font-raleway ${
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
            <div className="hidden md:flex items-center divide-x divide-gray-300">
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
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="relative group">
                {item.dropdown ? (
                  <button
                    onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4" />
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
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/spaces"
              className="bg-primary/10 text-primary px-6 py-3 rounded-md hover:bg-primary/20 transition-colors"
            >
              Browse Spaces
            </Link>
            <Link
              href="/contact"
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              Connect with Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-[120px] left-0 w-full bg-white border-t border-gray-200 py-4 shadow-lg">
            <div className="flex flex-col space-y-4 px-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.href}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                        className="flex items-center justify-between w-full text-gray-700"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {isCityDropdownOpen && (
                        <div className="mt-2 pl-4 space-y-2">
                          {localities.map((locality) => (
                            <Link
                              key={locality}
                              href={`/spaces?location=${locality}`}
                              className="block text-gray-600 hover:text-primary transition-colors"
                              onClick={() => {
                                setIsCityDropdownOpen(false);
                                setIsMenuOpen(false);
                              }}
                            >
                              {locality}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block text-gray-700 hover:text-primary transition-colors ${
                        pathname === item.href ? "font-medium text-primary" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className="block w-full text-center bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Connect with Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
