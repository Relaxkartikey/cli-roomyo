"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { motion } from "framer-motion";
import { events } from "@/lib/data";
import { Search, Phone, ClipboardCheck, Home, Key, ThumbsUp } from "lucide-react";

interface EventWorksSectionProps {
  showAll?: boolean;
}

const EventWorksSection = ({ showAll = false }: EventWorksSectionProps) => {
  const displayEvents = showAll ? events : events.slice(0, 6);

  return (
    <section id="work" className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-white font-bold text-4xl md:text-5xl mb-8">
            Wanna See Our Work?
            <div className="w-12 h-1 bg-red-600 mx-auto mt-4"></div>
          </h2>
          <p className="text-white max-w-2xl mx-auto">
           who are passionate about creating memorable events.
          </p>
        </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayEvents.map((event, idx) => (
            <Link href="/services" key={idx} className="block">
              <CardContainer className="w-full" containerClassName="py-10">
                <CardBody className="bg-black/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl w-full h-[380px] relative group hover:border-red-600/50 transition-colors duration-300">
                  <CardItem translateZ="100" className="w-full">
                    <Image
                      src={event.image}
                      alt={event.name}
                      width={400}
                      height={300}
                      className="rounded-xl w-full h-44 object-cover"
                    />
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="px-4 py-2 mt-2"
                  >
                    <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                    <p className="text-sm text-neutral-300 text-justify mb-4">{event.description}</p>
                    <div className="flex gap-2">
                      {event.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className="text-xs text-red-500 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const PROCESS_STEPS = [
  {
    icon: Search,
    title: "Search",
    description: "Browse through our curated list of properties and PG accommodations across 7 major Indian cities.",
    details: [
      "Filter by location, budget, and amenities",
      "View high-quality images and virtual tours",
      "Compare different properties",
      "Check real-time availability"
    ]
  },
  {
    icon: Phone,
    title: "Contact",
    description: "Get in touch with our team to schedule a visit or get more information about the property.",
    details: [
      "24/7 customer support",
      "Quick response time",
      "Dedicated property manager",
      "Flexible viewing schedule"
    ]
  },
  {
    icon: ClipboardCheck,
    title: "Book",
    description: "Complete the booking process with minimal documentation and secure payment options.",
    details: [
      "Simple documentation process",
      "Transparent pricing",
      "Secure payment gateway",
      "Digital contract signing"
    ]
  },
  {
    icon: Home,
    title: "Visit",
    description: "Visit the property and inspect all amenities and facilities before making your decision.",
    details: [
      "Guided property tour",
      "Meet the resident manager",
      "Check all amenities",
      "Verify security measures"
    ]
  },
  {
    icon: Key,
    title: "Move In",
    description: "Complete the final formalities and move into your new Roomyo Space.",
    details: [
      "Quick move-in process",
      "Welcome kit provided",
      "App access setup",
      "Orientation session"
    ]
  },
  {
    icon: ThumbsUp,
    title: "Enjoy",
    description: "Start enjoying the premium Roomyo lifestyle with all amenities and services.",
    details: [
      "24/7 support available",
      "Regular maintenance",
      "Community events",
      "Hassle-free living"
    ]
  }
];

const BookingProcess = () => {
  const [activeStep, setActiveStep] = useState(0);
  const ActiveIcon = PROCESS_STEPS[activeStep].icon;

  return (
    <section id="process" className="py-12 w-full bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How to Get your Roomyo Space
            <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to find and move into your perfect Roomyo accommodation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Steps */}
          <div className="lg:col-span-4">
            <div className="space-y-2">
              {PROCESS_STEPS.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <motion.button
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeStep === index
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <StepIcon className="w-5 h-5" />
                      <span className="font-medium">{step.title}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <ActiveIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{PROCESS_STEPS[activeStep].title}</h3>
                  <p className="text-muted-foreground">{PROCESS_STEPS[activeStep].description}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {PROCESS_STEPS[activeStep].details.map((detail, index) => (
                  <motion.li
                    key={detail}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventWorksSection;
