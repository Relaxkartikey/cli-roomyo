"use client";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 left-6 z-50 hidden md:block">
      <Link
        href="/contact"
        className="bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        aria-label="Contact Us"
      >
        <Phone className="w-6 h-6" />
      </Link>
    </div>
  );
} 