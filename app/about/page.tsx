"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Building, MapPin, Mail, Globe, Phone, CheckCircle2, 
  Users, Target, Shield, Coffee, Clock, Zap,
  ChefHat, Smartphone, Lock, Home, ArrowRight
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
    <main className="min-h-screen bg-white">
        {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"
            alt="Roomyo Living Space"
            fill
            className="object-cover brightness-[0.85]"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to Roomyo – Where Comfort Meets Convenience
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              At Roomyo, we redefine rental living by offering premium accommodations tailored for students and working professionals in Jaipur. Discover living spaces designed for comfort, community, and convenience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/spaces"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                Explore Properties
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                Contact Us
                <Phone className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
          </div>
        </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
              <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
              >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Comfort, Our Priority
                  <div className="w-20 h-1 bg-primary mt-4"></div>
                </h2>
              <p className="text-gray-600 mb-6">
                Roomyo was founded with a single mission — to provide a hassle-free, premium living experience for students and working professionals. We understand the struggles of finding a perfect place to stay, especially in a bustling city like Jaipur. That's where Roomyo steps in.
              </p>
              <ul className="space-y-4">
                {[
                  "Fully-furnished living spaces",
                  "Daily housekeeping and maintenance",
                  "Professional management with zero landlord interference",
                  "Transparent pricing and zero brokerage"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-lg font-medium text-primary">
                We're not just a PG — we're your home away from home.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                  alt="Roomyo Living Space"
                  fill
                  className="object-cover"
                />
            </div>
              </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                alt="Anand - Founder of Roomyo"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                A Note from Our Founder – Anand
                <div className="w-20 h-1 bg-primary mt-4"></div>
              </h2>
              <p className="text-gray-600 mb-6 italic">
                "I've seen how difficult it is for students and working professionals to find a decent, well-maintained accommodation in Jaipur. Most PGs lack quality services, professionalism, and transparent pricing. This is why I created Roomyo — to change the rental experience completely."
              </p>
              <h3 className="text-xl font-semibold mb-4">At Roomyo, our core focus is:</h3>
              <ul className="space-y-4">
                {[
                  "Providing clean, comfortable, and secure living spaces",
                  "Eliminating landlord struggles",
                  "Making rental stays easy, seamless, and enjoyable"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-lg font-medium text-primary">
                Welcome to Roomyo – A place you can proudly call home.
              </p>
            </div>
          </motion.div>
          </div>
        </section>

      <div className="max-w-7xl mx-auto px-4 p-6">
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

        {/* Location Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Locations in Jaipur
                <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We operate in prime locations of Jaipur ensuring easy access to colleges, offices, and urban amenities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-4">We ensure:</h3>
                  <ul className="space-y-3">
                    {[
                      "Close proximity to colleges, offices, and commercial hubs",
                      "Easy access to public transport",
                      "Nearby restaurants, malls, and medical facilities"
                    ].map((point, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Our major locations:</h3>
                  <ul className="space-y-3">
                    {[
                      "Jagatpura (Near JECRC, Poornima University)",
                      "Malviya Nagar",
                      "Mansarovar",
                      "Gopalpura",
                      "Vaishali Nagar"
                    ].map((location, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-gray-600">{location}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
                  alt="Roomyo Locations Map"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">Expanding Fast</h3>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Premium Locations Across Jaipur
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Trusted by 500+ Residents
                <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Over the last 2 years, we've served 500+ happy residents and built a strong Roomyo community
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Aman",
                  role: "Student",
                  text: "Roomyo made my college life easier. No hassle, no landlord drama — just peaceful living."
                },
                {
                  name: "Priya",
                  role: "Working Professional",
                  text: "The best PG experience I've had in Jaipur. Amazing staff and excellent management."
                },
                {
                  name: "Rahul",
                  role: "Student",
                  text: "Roomyo feels like home. Clean, organized, and premium. Highly recommended!"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                  </div>
                  <p className="text-gray-600">{testimonial.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Got Questions?
                    <div className="w-20 h-1 bg-primary mt-4"></div>
                  </h2>
                  <p className="text-gray-600">
                    We're here to help. Reach out to us through any of these channels.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                      <p className="text-gray-600">Pearl Apartments, Jagatpura</p>
                      <p className="text-gray-600">Jaipur, Rajasthan</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                      <p className="text-gray-600">contact@roomyo.in</p>
                      <p className="text-gray-600">support@roomyo.in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                      <div className="flex gap-4">
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
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <form className="bg-white rounded-xl p-8 shadow-lg space-y-6">
                  <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-primary/20 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-primary/20 transition-colors"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-primary/20 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Stay?</h2>
              <p className="text-gray-600 mb-8">
                Discover affordable, premium accommodations designed exclusively for students and working professionals in Jaipur
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/spaces"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg flex items-center gap-2 transition-colors"
                >
                  Explore Properties
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg flex items-center gap-2 transition-colors border border-gray-200"
                >
                  Contact Us
                  <Phone className="w-5 h-5" />
                </Link>
              </div>
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-8">
                {[
                  "No Brokerage",
                  "Professional Management",
                  "Fully-Furnished Rooms",
                  "Daily Housekeeping"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-6">*Terms and conditions applied</p>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
} 