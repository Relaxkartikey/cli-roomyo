// Home.tsx
import HeroSection from "@/components/HeroSection";
import Overview from "@/components/Overview";
import EventWorksSection from "@/components/Work";
import ClientLogos from "@/components/ClientLogos";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <Overview />
      <EventWorksSection />
      <ClientLogos />
      <Testimonials />
    </main>
  );
}
