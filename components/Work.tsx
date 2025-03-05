"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { motion } from "framer-motion";
import { events } from "@/lib/data";

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

export default EventWorksSection;
