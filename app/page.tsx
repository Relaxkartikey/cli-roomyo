import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roomyo | Find Your Perfect Rental Spaces & Rental Properties in India',
  description: 'Discover the best Rental Spaces accommodations and rental properties across India. Find verified listings with detailed amenities, photos, and instant booking options.',
  openGraph: {
    title: 'Roomyo | Find Your Perfect Rental Spaces & Rental Properties in India',
    description: 'Discover the best Rental Spaces accommodations and rental properties across India. Find verified listings with detailed amenities, photos, and instant booking options.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://roomyo.in'
  }
};

// Home.tsx
import HeroSection from "@/components/HeroSection";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import BookingProcess from "@/components/Work";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BookingProcess />
      <FAQ />
      <Testimonials />
      <ContactSection />
    </main>
  );
}
