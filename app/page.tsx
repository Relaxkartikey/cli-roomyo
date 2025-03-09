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
