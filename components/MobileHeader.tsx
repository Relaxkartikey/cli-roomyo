'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MobileHeader() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`md:hidden fixed w-full top-0 z-50 transition-all duration-300 font-raleway ${
      hasScrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'
    }`}>
      <div className="flex justify-center items-center h-[64px] px-4 border-b border-gray-100">
        <Link href="/" className="text-2xl font-bold text-primary">
          Roomyo
        </Link>
      </div>
    </header>
  );
} 