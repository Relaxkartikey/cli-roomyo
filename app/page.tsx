// Home.tsx
import HeroSection from "@/components/HeroSection";
import RoomyoFeatures from "@/components/RoomyoFeatures";
import FeaturedRoomyos from "@/components/FeaturedRoomyos";
import BookingProcess from "@/components/Work";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <RoomyoFeatures />
      <FeaturedRoomyos />
      <BookingProcess />
      <Testimonials />
    </main>
  );
}
