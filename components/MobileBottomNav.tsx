'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building, Plus, Menu } from 'lucide-react';
import { IoLogoWhatsapp } from 'react-icons/io';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // WhatsApp click handler
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+919004089004?text=Hi%20Roomyo,%20I%20want%20to%20know%20more%20about%20your%20properties', '_blank');
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 h-16">
          <Link 
            href="/" 
            className={`flex flex-col items-center justify-center ${
              pathname === '/' ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <button 
            onClick={handleWhatsAppClick}
            className="flex flex-col items-center justify-center text-gray-600"
          >
            <IoLogoWhatsapp className="w-5 h-5 text-green-500" />
            <span className="text-xs mt-1">WhatsApp</span>
          </button>
          
          <Link 
            href="/spaces" 
            className={`flex flex-col items-center justify-center ${
              pathname.includes('/spaces') ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <Building className="w-5 h-5" />
            <span className="text-xs mt-1">Spaces</span>
          </Link>
          
          <Link 
            href="/list-property" 
            className={`flex flex-col items-center justify-center ${
              pathname === '/list-property' ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs mt-1">List Property</span>
          </Link>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col items-center justify-center text-gray-600"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs mt-1">Menu</span>
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="md:hidden fixed bottom-16 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2 m-2"
        >
          <div className="flex flex-col">
            <Link 
              href="/about" 
              className={`px-4 py-3 hover:bg-gray-50 ${
                pathname === '/about' ? 'text-primary' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <Link 
              href="/blogs" 
              className={`px-4 py-3 hover:bg-gray-50 ${
                pathname === '/blogs' || pathname.includes('/blogs/') ? 'text-primary' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Articles
            </Link>
            
            <Link 
              href="/privileges" 
              className={`px-4 py-3 hover:bg-gray-50 ${
                pathname === '/privileges' ? 'text-primary' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Privileges
            </Link>
            
            <Link 
              href="/privacy-policy" 
              className={`px-4 py-3 hover:bg-gray-50 ${
                pathname === '/privacy-policy' ? 'text-primary' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Privacy Policy
            </Link>
            
            <Link 
              href="/terms-conditions" 
              className={`px-4 py-3 hover:bg-gray-50 ${
                pathname === '/terms-conditions' ? 'text-primary' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Terms & Conditions
            </Link>
            
            <Link
              href="https://kartikey.tech"
              className="px-4 py-3 hover:bg-gray-50 text-gray-700"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              Developer
            </Link>
          </div>
        </div>
      )}
    </>
  );
} 