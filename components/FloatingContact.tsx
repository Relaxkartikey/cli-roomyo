"use client";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 hidden md:block z-50">
      <Link
        href="/contact"
        className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
      >
        <Phone className="w-6 h-6" />
      </Link>
    </div>
  );
} 