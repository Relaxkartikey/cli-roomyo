"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  locality: string;
  category: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    locality: "",
    category: ""
  });
  const [localities, setLocalities] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    const fetchLocationsAndCategories = async () => {
      try {
        const propertiesRef = collection(db, 'properties');
        const querySnapshot = await getDocs(propertiesRef);
        
        const uniqueLocalities = new Set<string>();
        const uniqueCategories = new Set<string>();
        
        querySnapshot.docs.forEach(doc => {
          const data = doc.data();
          if (data.location) uniqueLocalities.add(data.location);
          if (data.category) uniqueCategories.add(data.category);
        });
        
        setLocalities(Array.from(uniqueLocalities).sort());
        setCategories(Array.from(uniqueCategories).sort());
      } catch (error) {
        console.error('Error fetching localities and categories:', error);
      }
    };

    fetchLocationsAndCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus({
        type: "success",
        message: "Thank you for your message. We'll get back to you soon!",
      });
      setFormData({ name: "", email: "", phone: "", message: "", locality: "", category: "" });
    } catch (error) {
      console.error("Form Error:", error);
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-background pt-32 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Get in Touch
              <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Have questions about our properties or services? We're here to help you find your perfect living space.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-12 bg-secondary/50">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-xl p-6 shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Visit Us</h3>
                    <p className="mt-2 text-muted-foreground">
                      Pearl Apartments,<br />
                      Jagatpura, Jaipur,<br />
                      Rajasthan, India
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-background rounded-xl p-6 shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Email Us</h3>
                    <div className="mt-2 space-y-1">
                      <a href="mailto:contact@roomyo.in" className="block text-muted-foreground hover:text-primary transition-colors">
                        contact@roomyo.in
                      </a>
                      <a href="mailto:support@roomyo.in" className="block text-muted-foreground hover:text-primary transition-colors">
                        support@roomyo.in
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-background rounded-xl p-6 shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Call Us</h3>
                    <div className="mt-2 space-y-1">
                      <a href="tel:+919876543210" className="block text-muted-foreground hover:text-primary transition-colors">
                        +91 98765 43210
                      </a>
                      <a href="https://wa.me/919876543210" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <FaWhatsapp className="w-4 h-4" />
                        <span>WhatsApp Support</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl overflow-hidden shadow-md"
            >
              <div className="aspect-[21/9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.9749481910113!2d75.8663553!3d26.8462184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5f33e40c1fb%3A0x1ee06f9e585c0d7e!2sJagatpura%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1706651361402!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 bg-secondary/50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-background rounded-xl p-8 shadow-md"
            >
              <h2 className="text-2xl font-bold">
                Send Us a Message
                <div className="w-12 h-1 bg-primary mt-4"></div>
              </h2>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <select
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  >
                    <option value="">Select Locality</option>
                    {localities.map((locality) => (
                      <option key={locality} value={locality}>{locality}</option>
                    ))}
                  </select>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  required
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 disabled:bg-primary/70 transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {submitStatus.type && (
                  <p
                    className={`text-sm ${
                      submitStatus.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {submitStatus.message}
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
