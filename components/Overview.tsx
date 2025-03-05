"use client";
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Calendar, Sparkles, Star, Briefcase, Camera, Palette, Video, Megaphone, Building2, Image as ImageIcon, Trophy, BarChart, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-lg p-4", className)}>
      {children}
    </div>
  );
}

function FeatureOne() {
  return (
    <BentoCard className="flex flex-col justify-between bg-yellow-300/10 border border-yellow-500/20 min-h-[180px]">
      <div className="font-bold text-base md:text-lg text-yellow-500 mb-2 md:mb-4">Client Satisfaction</div>
      <div className="flex flex-col items-end">
        <div className="flex items-baseline">
          <div className="text-3xl md:text-4xl lg:text-6xl font-black text-yellow-500">4.8</div>
          <Star className="w-4 h-4 md:w-6 md:h-6 text-yellow-500 ml-2" />
        </div>
        <div className="text-xs md:text-sm text-yellow-500/80 mt-1 md:mt-2">Based on client reviews</div>
      </div>
    </BentoCard>
  );
}

function FeatureTwo() {
  return (
    <BentoCard className="relative flex flex-col justify-center bg-violet-500/10 border border-violet-500/20 sm:col-span-2 min-h-[180px]">
      <div className="flex items-center gap-3 md:gap-6">
        <Trophy className="w-10 h-10 md:w-14 md:h-14 text-violet-500" />
        <div>
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-violet-500">500+</div>
          <div className="text-base md:text-xl text-violet-300 mt-0.5 md:mt-1">Successful Events</div>
          <div className="text-xs md:text-sm text-violet-300/80 mt-1 md:mt-2">Creating memorable experiences since 2013</div>
        </div>
      </div>
    </BentoCard>
  );
}

function FeatureThree() {
  return (
    <BentoCard className="flex flex-col justify-between bg-orange-300/10 border border-orange-500/20 min-h-[180px]">
      <div className="relative w-full h-20 md:h-28">
        <Image
          src="https://cdn.whiteboxmedia.co.in/logo.PNG"
          alt="WhiteBox Media Logo"
          fill
          className="object-contain"
        />
      </div>
      <div className="text-orange-300 text-center mt-4 md:mt-6 text-sm md:text-base font-medium">Digital Marketing Excellence</div>
    </BentoCard>
  );
}

function FeatureFour() {
  return (
    <BentoCard className="flex flex-col bg-emerald-500/10 border border-emerald-500/20 sm:col-span-2 min-h-[200px]">
      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-5 text-emerald-500">Company Overview</h3>
      <p className="text-sm md:text-base text-emerald-300 leading-relaxed">
        White Box Media, established in 2013, is a premier digital marketing agency based in Jaipur, India. We specialize in providing comprehensive and creative solutions to help businesses thrive in the digital landscape. Our expertise spans across multiple domains, ensuring your brand's success in every aspect of digital presence.
      </p>
    </BentoCard>
  );
}

function FeatureFive() {
  return (
    <BentoCard className="flex flex-col bg-zinc-900/50 border border-zinc-800 sm:col-span-2 min-h-[220px]">
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">Core Expertise</h3>
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <div className="flex items-center space-x-2 md:space-x-3">
          <Palette className="w-5 h-5 md:w-6 md:h-6 text-teal-500" />
          <div>
            <span className="text-sm md:text-base text-gray-300 block font-medium">Graphic Design</span>
            <span className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">Brand Communication</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3">
          <Video className="w-5 h-5 md:w-6 md:h-6 text-teal-500" />
          <div>
            <span className="text-sm md:text-base text-gray-300 block font-medium">Video Production</span>
            <span className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">Impactful Content</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3">
          <Megaphone className="w-5 h-5 md:w-6 md:h-6 text-teal-500" />
          <div>
            <span className="text-sm md:text-base text-gray-300 block font-medium">Advertising</span>
            <span className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">Strategic Campaigns</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3">
          <Building2 className="w-5 h-5 md:w-6 md:h-6 text-teal-500" />
          <div>
            <span className="text-sm md:text-base text-gray-300 block font-medium">Corporate Branding</span>
            <span className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">Identity Building</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

function FeatureSix() {
  return (
    <BentoCard className="flex flex-col justify-between bg-blue-500/10 border border-blue-500/20 min-h-[180px]">
      <Rocket className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
      <div className="mt-4 md:mt-6">
        <div className="text-2xl md:text-3xl font-bold text-blue-500">10+ Years</div>
        <div className="text-base md:text-lg text-blue-300 mt-1 md:mt-2">Industry Experience</div>
        <div className="text-xs md:text-sm text-blue-300/70 mt-1 md:mt-2">Trusted by Leading Brands</div>
      </div>
    </BentoCard>
  );
}

function FeatureSeven() {
  return (
    <BentoCard className="flex flex-col bg-rose-500/10 border border-rose-500/20 min-h-[180px]">
      <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-rose-500">Visual Excellence</h3>
      <div className="space-y-3 md:space-y-4">
        <div className="flex items-center space-x-2 md:space-x-3">
          <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-rose-500" />
          <div>
            <span className="text-sm md:text-base text-rose-300 block font-medium">Product Shoots</span>
            <span className="text-xs md:text-sm text-rose-300/70 mt-0.5 md:mt-1">E-commerce Optimized</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3">
          <Star className="w-5 h-5 md:w-6 md:h-6 text-rose-500" />
          <div>
            <span className="text-sm md:text-base text-rose-300 block font-medium">Brand Promotions</span>
            <span className="text-xs md:text-sm text-rose-300/70 mt-0.5 md:mt-1">Enhanced Visibility</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

function FeatureEight() {
  return (
    <BentoCard className="flex flex-col bg-teal-500/10 border border-teal-500/20 sm:col-span-2 min-h-[200px]">
      <div className="space-y-3 md:space-y-4">
        <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-teal-500">Event Management</h3>
        <div className="flex items-center space-x-2 md:space-x-3">
          <Calendar className="w-5 h-5 md:w-6 md:h-6 text-teal-500" />
          <div>
            <span className="text-sm md:text-base text-teal-300 block font-medium">Corporate Events</span>
            <span className="text-xs md:text-sm text-teal-300/70 mt-0.5 md:mt-1">End-to-end Management</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3">
          <Users className="w-5 h-5 md:w-6 md:h-6 text-teal-500" />
          <div>
            <span className="text-sm md:text-base text-teal-300 block font-medium">Wedding Planning</span>
            <span className="text-xs md:text-sm text-teal-300/70 mt-0.5 md:mt-1">Memorable Experiences</span>
          </div>
        </div>
        <p className="text-sm md:text-base text-teal-300/90 mt-3 md:mt-4 leading-relaxed">
          Providing seamless event experiences with attention to every detail
        </p>
      </div>
    </BentoCard>
  );
}

const Overview = () => {
  return (
    <section id="about" className="py-6 w-full bg-black">
      <div className="max-w-7xl mx-auto px-3">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-white font-bold text-4xl md:text-5xl mb-8">
            Who We Are
            <div className="w-12 h-1 bg-red-600 mx-auto mt-4"></div>
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            White Box Media is a digital marketing agency based in Jaipur, India.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 auto-rows-fr">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="sm:col-span-1">
            <BentoCard className="flex flex-col justify-center items-center bg-[#1a0f00] border border-orange-800">
              <div className="relative w-full h-32">
                <Image
                  src="https://cdn.whiteboxmedia.co.in/logo.PNG"
                  alt="WhiteBox Media Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </BentoCard>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="sm:col-span-5">
            <BentoCard className="flex flex-col justify-center bg-[#002115] border border-emerald-800">
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">Company Overview</h3>
              <p className="text-base text-emerald-300 leading-relaxed text-justify">
                White Box Media, established in 2013, is a premier digital marketing agency based in Jaipur, India. We specialize in providing comprehensive and creative solutions to help businesses thrive in the digital landscape. Our expertise spans across multiple domains, ensuring your brand's success in every aspect of digital presence.
              </p>
            </BentoCard>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="sm:col-span-3">
            <BentoCard className="flex flex-col justify-between bg-[#18181b] border border-zinc-800 p-5">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Digital Solutions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2.5 rounded-lg bg-[#0d2620]">
                      <Sparkles className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                      <span className="text-base text-gray-300 block font-medium">Creative Design</span>
                      <span className="text-sm text-gray-500 mt-1.5">Innovative Concepts</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2.5 rounded-lg bg-[#0d2620]">
                      <Award className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                      <span className="text-base text-gray-300 block font-medium">Brand Growth</span>
                      <span className="text-sm text-gray-500 mt-1.5">Market Leadership</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-base text-gray-300">
                Empowering businesses with comprehensive digital solutions for sustainable growth and market presence
              </div>
            </BentoCard>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="sm:col-span-3">
            <BentoCard className="flex flex-col justify-between bg-[#0c1123] border border-indigo-800 p-5">
              <h3 className="text-2xl font-bold mb-4 text-indigo-400">Core Expertise</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-lg bg-[#1a1f38]">
                    <Palette className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-base text-indigo-300 block font-medium">Graphic Design</span>
                    <span className="text-sm text-indigo-400/70 mt-1.5">Brand Communication</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-lg bg-[#1a1f38]">
                    <Video className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-base text-indigo-300 block font-medium">Video Production</span>
                    <span className="text-sm text-indigo-400/70 mt-1.5">Impactful Content</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-lg bg-[#1a1f38]">
                    <Megaphone className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-base text-indigo-300 block font-medium">Advertising</span>
                    <span className="text-sm text-indigo-400/70 mt-1.5">Strategic Campaigns</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-lg bg-[#1a1f38]">
                    <Building2 className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-base text-indigo-300 block font-medium">Corporate Branding</span>
                    <span className="text-sm text-indigo-400/70 mt-1.5">Identity Building</span>
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="hidden sm:block sm:col-span-2">
            <BentoCard className="flex flex-col justify-between bg-[#0c1b2b] border border-blue-800 p-6">
              <Rocket className="w-6 h-6 text-blue-400" />
              <div className="mt-4">
                <div className="text-2xl font-bold text-blue-400">10+ Years</div>
                <div className="text-base text-blue-300 mt-2">Industry Experience</div>
                <div className="text-sm text-blue-400/70 mt-2">Trusted by Leading Brands</div>
              </div>
            </BentoCard>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="hidden sm:block sm:col-span-2">
            <BentoCard className="flex flex-col justify-between bg-[#1f0f14] border border-rose-800 p-6">
              <h3 className="text-2xl font-bold mb-4 text-rose-400">Visual Excellence</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ImageIcon className="w-6 h-6 text-rose-400" />
                  <div>
                    <span className="text-base text-rose-300 block font-medium">Product Shoots</span>
                    <span className="text-sm text-rose-400/70 mt-1.5">E-commerce Optimized</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-6 h-6 text-rose-400" />
                  <div>
                    <span className="text-base text-rose-300 block font-medium">Brand Promotions</span>
                    <span className="text-sm text-rose-400/70 mt-1.5">Enhanced Visibility</span>
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="hidden sm:block sm:col-span-2">
            <BentoCard className="flex flex-col justify-between bg-[#0d1f1a] border border-teal-800 p-6">
              <h3 className="text-2xl font-bold mb-4 text-teal-400">Event Management</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-6 h-6 text-teal-400" />
                  <div>
                    <span className="text-base text-teal-300 block font-medium">Corporate Events</span>
                    <span className="text-sm text-teal-400/70 mt-1.5">End-to-end Management</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-teal-400" />
                  <div>
                    <span className="text-base text-teal-300 block font-medium">Wedding Planning</span>
                    <span className="text-sm text-teal-400/70 mt-1.5">Memorable Experiences</span>
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} className="sm:hidden">
            <BentoCard className="flex flex-col bg-[#1f0f14] border border-rose-800 p-5">
              <h3 className="text-2xl font-bold mb-4 text-rose-400">Visual Excellence</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-lg bg-[#2d1118]">
                    <Camera className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <span className="text-base text-rose-300 block font-medium">Product Shoots</span>
                    <span className="text-sm text-rose-400/70 mt-1.5">Professional Quality</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-lg bg-[#2d1118]">
                    <Star className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <span className="text-base text-rose-300 block font-medium">Brand Promotions</span>
                    <span className="text-sm text-rose-400/70 mt-1.5">Enhanced Visibility</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-lg bg-[#2d1118]">
                    <Calendar className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <span className="text-base text-rose-300 block font-medium">Corporate Events</span>
                    <span className="text-sm text-rose-400/70 mt-1.5">End-to-end Service</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-lg bg-[#2d1118]">
                    <Users className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <span className="text-base text-rose-300 block font-medium">Wedding Planning</span>
                    <span className="text-sm text-rose-400/70 mt-1.5">Memorable Days</span>
          </div>
          </div>
        </div>
            </BentoCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Overview;
