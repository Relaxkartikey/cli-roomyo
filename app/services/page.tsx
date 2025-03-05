"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroTitle from "@/components/HeroTitle";
import EventWorksSection from "@/components/Work";
import RollingGallery from "@/components/RollingGallery";

const services = [
  {
    title: "Event Production",
    description: "We use elements, designs, props, lights and artists to produce a brand soaking experience. We marshal resources to create MORE out of less, turning big ideas into unforgettable experiences.",
    items: [
      "Product / Brand Launches",
      "Award / Entertainment Nights",
      "Road Shows / RWA Activities",
      "Retail Promotions / Mall Activations",
      "Incentives & Motivational Programs",
      "Conferences / Off-sites / Sales Meets",
      "Exhibitions / Displays & Fabrication",
      "AV Production"
    ]
  },
  {
    title: "Conceptual Services",
    description: "Our creative team develops unique concepts and designs that bring your vision to life.",
    items: [
      "Conceptualization and Design",
      "Event Strategy",
      "Theme Explorations",
      "Event Styling and Design",
      "Show Scripting"
    ]
  },
  {
    title: "Production & Logistics",
    description: "Comprehensive technical and logistical support for seamless event execution.",
    items: [
      "Technical Consulting",
      "Flex & Vinyl Printing & Fabrication",
      "Site / Venue Recce",
      "Venue Constructs",
      "Security & Safety Management",
      "Permissions and Licensing"
    ]
  },
  {
    title: "Talent Management",
    description: "End-to-end talent sourcing and management services.",
    items: [
      "Sourcing of appropriate talent",
      "Booking and negotiations",
      "Artist Coordination",
      "Artist Travel and Stay"
    ]
  },
  {
    title: "Hospitality Services",
    description: "Complete guest management and hospitality solutions.",
    items: [
      "Guest list and Itinerary Management",
      "Check-ins and Check-outs",
      "Delegate Reception",
      "Airport / Venue Transportation",
      "VIP hospitality Management"
    ]
  },
  {
    title: "AV Production",
    description: "Professional audio-visual production services for all your event needs.",
    items: [
      "Pre-event shoot",
      "Event Coverage",
      "Aerial (Drone) shoot",
      "Video Editing"
    ]
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroTitle 
        title="Our Services" 
        subtitle="Comprehensive Event Management & Production Solutions"
      />

      <section className="hidden md:block py-4 w-full bg-black">
        <RollingGallery autoplay={true} pauseOnHover={true} />
      </section>

      <section className="py-8 w-full bg-black">
        <div className="max-w-[2000px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-black border border-neutral-800 hover:border-red-600/50 transition-colors duration-300"
              >
                <div className="relative p-6">
                  <div className="relative z-20">
                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/80 mb-4">{service.description}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {service.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                          <p className="text-white/70">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 z-10"></div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                  <Image
                    src="/fallback.png"
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              We seamlessly blend conventional and contemporary event and marketing practices to provide a multidimensional array of services that reinforce our client&apos;s engagement with their respective stakeholders.
            </p>
          </motion.div>
        </div>
      </section>

      <EventWorksSection showAll={true} />
    </main>
  );
} 