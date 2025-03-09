// Home.tsx
import HeroSection from "@/components/HeroSection";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FAQ />
      <Testimonials />
      <ContactSection />
    </main>
  );
}
