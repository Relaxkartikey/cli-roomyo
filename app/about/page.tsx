"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Building, MapPin, Mail, Globe, Phone, CheckCircle2, 
  Users, Target, Shield, Coffee, Clock, Zap,
  ChefHat, Smartphone, Lock, Home
} from "lucide-react";

const MISSION_POINTS = [
  "Premium, fully-furnished accommodations with high-end amenities",
  "A seamless rental experience with no brokerage or hidden charges",
  "A vibrant, like-minded community where residents can network",
  "Top-notch hospitality services including housekeeping and gourmet meals"
];

const KEY_FEATURES = [
  {
    icon: Home,
    title: "Move-in Ready",
    description: "Fully furnished spaces with modern interiors and work-friendly setups"
  },
  {
    icon: Shield,
    title: "Zero Brokerage",
    description: "No middlemen, no extra costs – straightforward and transparent pricing"
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "IHM-trained managers ensuring a hotel-like experience"
  },
  {
    icon: ChefHat,
    title: "Healthy Gourmet Meals",
    description: "Tasty, nutritious food included in your stay"
  },
  {
    icon: Smartphone,
    title: "Tech-Enabled Living",
    description: "Pay rent, request maintenance, and manage services with just a tap"
  },
  {
    icon: Lock,
    title: "Unmatched Security",
    description: "3-tier safety with biometric locks, CCTV surveillance, and security"
  }
];

const TEAM_MEMBERS = [
  {
    name: "Anand",
    role: "Founder",
    image: "/team/founder.jpg",
    description: "The visionary behind Roomyo, set out to create more than just a rental service—he wanted to build a community-driven living experience that brings comfort, luxury, and convenience under one roof."
  },
  {
    name: "Kartikey Sharma",
    role: "Tech Lead",
    image: "/team/tech-lead.jpg",
    description: "The brain behind Roomyo's seamless digital experience. With expertise in software development and automation, he ensures that Roomyo stays ahead in the PropTech industry."
  },
  {
    name: "Varun Chahar",
    role: "Marketing Lead",
    image: "/team/marketing-lead.jpg",
    description: "The driving force behind Roomyo's outreach. From strategic branding to targeted campaigns, he ensures that Roomyo reaches the right audience."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-secondary pb-16">
      {/* Hero Title Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-8 sm:py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">About Us</h1>
          <p className="text-gray-600">Learn more about Roomyo's mission and team</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 p-6">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"
            alt="Roomyo Office"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Who We Are
              <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200"
            >
              Jaipur's premier rental accommodation provider designed exclusively for students and working professionals
            </motion.p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold mb-6">
                  Welcome to Roomyo
                  <div className="w-20 h-1 bg-primary mt-4"></div>
                </h2>
                <p className="text-xl text-muted-foreground mb-6">
                  We believe in redefining co-living by combining comfort, convenience, and community into one seamless experience.
                </p>
                <p className="text-xl text-muted-foreground">
                  At Roomyo, we don't just offer a place to stay; we offer a lifestyle. Whether you're moving to Jaipur for work or studies, we ensure that your stay is hassle-free, luxurious, and truly enriching.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                  alt="Roomyo Living Space"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Mission
                <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                To provide modern, well-equipped, and vibrant living spaces that make life easier and more fulfilling
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {MISSION_POINTS.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-lg text-muted-foreground">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose Roomyo?
                <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Finding the perfect place to live can be stressful. Roomyo removes the hassle by offering an all-inclusive rental solution
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {KEY_FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-secondary/50 rounded-xl p-6 hover:bg-secondary transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                  alt="Anand - Founder of Roomyo"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -left-8 top-0 w-1 h-full bg-primary/20" />
                <h2 className="text-4xl font-bold mb-6">
                  Meet Our Founder
                  <div className="w-20 h-1 bg-primary mt-4"></div>
                </h2>
                <h3 className="text-2xl font-semibold text-primary mb-4">Anand</h3>
                <p className="text-xl text-muted-foreground mb-6">
                  The visionary behind Roomyo, set out to create more than just a rental service—he wanted to build a community-driven living experience that brings comfort, luxury, and convenience under one roof.
                </p>
                <p className="text-xl text-muted-foreground">
                  His passion for revolutionizing rental accommodations led to the creation of Roomyo, where every resident feels at home the moment they step in.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Meet Our Team
                <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The passionate individuals behind Roomyo's success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEAM_MEMBERS.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="relative h-64">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-muted-foreground">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Visit Our Office
                <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Located in the heart of Jaipur, we're easily accessible and always ready to welcome you
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary rounded-2xl p-8"
              >
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Office Address</h3>
                      <p className="text-muted-foreground">Pearl Apartments,</p>
                      <p className="text-muted-foreground">Jagatpura, Jaipur,</p>
                      <p className="text-muted-foreground">Rajasthan, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                      <p className="text-muted-foreground">contact@roomyo.in</p>
                      <p className="text-muted-foreground">support@roomyo.in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Connect Online</h3>
                      <p className="text-muted-foreground">www.roomyo.in</p>
                      <div className="flex gap-4 mt-2">
                        <Link href="#" className="text-primary hover:text-primary/80">Instagram</Link>
                        <Link href="#" className="text-primary hover:text-primary/80">LinkedIn</Link>
                        <Link href="#" className="text-primary hover:text-primary/80">Twitter</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
                  alt="Roomyo Office Location"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">Jagatpura Office</h3>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Jaipur, Rajasthan
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 bg-secondary">
          <div className="max-w-3xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">
                Get in Touch
                <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
              </h2>
              <p className="text-xl text-muted-foreground">
                Have questions? We'd love to hear from you
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 transition-colors"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
} 