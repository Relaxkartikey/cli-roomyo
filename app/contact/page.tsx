"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import HeroTitle from "@/components/HeroTitle";
import emailjs from '@emailjs/browser';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const templateParams = {
        to_name: "WhiteBoxMedia",
        from_name: formData.name,
        from_email: formData.email,
        phone_number: formData.phone,
        message: formData.message,
        reply_to: formData.email,
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for your message. We'll get back to you soon!",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
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
    <main className="min-h-screen bg-black">
      <HeroTitle 
        title="Contact Us" 
        subtitle="Get in Touch with White Box Media"
      />

      <section className="py-16 md:py-24 w-full bg-black">
        <div className="max-w-3xl mx-auto px-4">
          {/* Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-black/50 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaMapMarkerAlt className="text-red-500 text-xl" />
                <h3 className="text-lg font-semibold text-white">Visit Us</h3>
              </div>
              <p className="text-white/70">
                E 31, Forth floor 408 Amar Heights<br />
                Rani Sati Nagar, Nirman Nagar<br />
                DCM Ajmer Road, Near MG Motor<br />
                302019
              </p>
            </div>

            <div className="bg-black/50 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaGlobe className="text-red-500 text-xl" />
                <h3 className="text-lg font-semibold text-white">Connect with Us</h3>
              </div>
              <div className="space-y-4">
                <a href="tel:+919352057269" className="flex items-center gap-3 text-white/70 hover:text-red-500 transition-colors">
                  <FaPhone className="text-red-500/70" />
                  +91 93520 57269
                </a>
                <div className="space-y-2">
                  <a href="mailto:info@whiteboxmedia.co.in" className="flex items-center gap-3 text-white/70 hover:text-red-500 transition-colors">
                    <FaEnvelope className="text-red-500/70" />
                    info@whiteboxmedia.co.in
                  </a>
                  <a href="mailto:hr@whiteboxmedia.co.in" className="flex items-center gap-3 text-white/70 hover:text-red-500 transition-colors">
                    <FaEnvelope className="text-red-500/70" />
                    hr@whiteboxmedia.co.in
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Maps Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16 w-full bg-black/50 border border-neutral-800 rounded-xl overflow-hidden"
          >
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.0901518778!2d75.7900492!3d26.9016599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5e7e0777dff%3A0x7f485e3e7b9dbf2!2sWhite%20Box%20Media!5e0!3m2!1sen!2sin!4v1706651361402!5m2!1sen!2sin"
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

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Send Us a Message
              <div className="w-12 h-1 bg-red-600 mt-4"></div>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-neutral-800 rounded-lg focus:border-red-600/50 text-white placeholder:text-neutral-400 outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-neutral-800 rounded-lg focus:border-red-600/50 text-white placeholder:text-neutral-400 outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-neutral-800 rounded-lg focus:border-red-600/50 text-white placeholder:text-neutral-400 outline-none transition-colors"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black/50 border border-neutral-800 rounded-lg focus:border-red-600/50 text-white placeholder:text-neutral-400 outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-medium rounded-lg transition-colors"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              {submitStatus.type && (
                <p
                  className={`text-sm ${
                    submitStatus.type === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {submitStatus.message}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
