"use client";
import React from "react";
import Image from "next/image";
import HeroTitle from "@/components/HeroTitle";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroTitle 
        title="About Us"
        subtitle="Meet the visionaries behind WhiteBoxMedia"
      />

      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-1 gap-12"
        >
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Neeraj Sharma
                <div className="w-12 h-1 bg-red-600 mx-auto mt-4"></div>
              </h2>
              <h3 className="text-xl md:text-2xl text-red-500 font-semibold">Founder & CEO</h3>
              <p className="text-neutral-400 mt-2">White Box Media</p>
            </div>

            <div className="space-y-12 text-neutral-300 max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-black/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 hover:border-red-600/50 transition-colors"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">Profile Overview</h3>
                <p className="text-lg">Neeraj Sharma is the founder and CEO of White Box Media, Jaipur-based entrepreneur.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-black/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 hover:border-red-600/50 transition-colors"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">Expertise and Skills</h3>
                <ul className="list-disc pl-6 space-y-3 text-lg">
                  <li>Founder and CEO of White Box Media, a digital marketing agency in Jaipur.</li>
                  <li>Expertise in Designing and Event strategies with experience of more than 15 years.</li>
                  <li>Strong network in Related Industries.</li>
                  <li>Graphic Designer with innovative designs and services.</li>
                  <li>Event management with strong team and professional experience.</li>
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-black/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 hover:border-red-600/50 transition-colors"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">Company Overview</h3>
                <p className="text-lg mb-6">White Box Media founded and established in 2013, is a digital marketing agency based in Jaipur, India. They offer a range of services to help businesses grow online with comprehensive and creative solutions.</p>
                
                <p className="text-lg font-semibold text-white mb-4">The agency&apos;s core areas of expertise include:</p>
                <ul className="list-disc pl-6 space-y-3 text-lg">
                  <li><span className="text-white font-semibold">Graphic Design:</span> Crafting visually appealing designs that communicate the essence of brands.</li>
                  <li><span className="text-white font-semibold">Video Production:</span> Creating impactful video content for marketing, events, and promotions.</li>
                  <li><span className="text-white font-semibold">Advertising:</span> Developing and executing strategic ad campaigns across various platforms.</li>
                  <li><span className="text-white font-semibold">Corporate Branding:</span> Helping businesses build strong, recognizable identities.</li>
                  <li><span className="text-white font-semibold">Product Shoots:</span> Capturing professional imagery for e-commerce.</li>
                  <li><span className="text-white font-semibold">Brand Promotions:</span> Designing campaigns that boost brand visibility and engagement.</li>
                  <li><span className="text-white font-semibold">Wedding and Corporate Events:</span> Providing end-to-end event management services, ensuring memorable and seamless experiences.</li>
                </ul>

                <p className="text-lg mt-6">Through White Box Media, as Founder and CEO, Neeraj continues to empower brands to stand out and create lasting impressions through impactful visual storytelling and strategic marketing. The company&apos;s work spans across multiple sectors, reflection Neeraj&apos;s commitment to excellence and his ability to deliver creative solutions that drive results.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-black/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 hover:border-red-600/50 transition-colors"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">Responsibilities</h3>
                <p className="text-lg mb-4">As the founder and CEO, Neeraj Sharma is responsible for:</p>
                <ol className="list-decimal pl-6 space-y-3 text-lg">
                  <li>Strategic Planning: Developing and implementing the company&apos;s overall strategy and vision.</li>
                  <li>Business Development: Building and maintaining relationships with clients, partners, and stakeholders.</li>
                  <li>Team Management: Leading and managing a team of Event and marketing professionals.</li>
                  <li>Innovation: Staying up-to-date with the latest trends and technologies.</li>
                </ol>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-black/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 hover:border-red-600/50 transition-colors"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">Achievements</h3>
                <p className="text-lg mb-4">Under Neeraj Sharma&apos;s leadership, White Box Media has:</p>
                <ol className="list-decimal pl-6 space-y-3 text-lg">
                  <li>Established itself as a reputable Event agency in Jaipur, India.</li>
                  <li>Worked with numerous clients across various industries, including e-commerce, healthcare, and finance.</li>
                  <li>Developed a strong team of Event and management professionals.</li>
                </ol>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-black/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 hover:border-red-600/50 transition-colors"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">Vision & Impact</h3>
                <p className="text-lg">White Box Media has worked with Government and non-government events and branding of various companies.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex justify-end mt-16"
              >
                <div className="relative w-72 h-36">
                  <Image
                    src="https://cdn.whiteboxmedia.co.in/sign.png"
                    alt="Neeraj Sharma's Signature"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage; 