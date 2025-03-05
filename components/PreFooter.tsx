import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

const PreFooter = () => {
  return (
    <div className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Address Section */}
          <div className="lg:col-span-4 bg-black/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl p-4">
            <h3 className="text-lg font-semibold mb-6 text-white relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-red-600">Address</h3>
            <div className="flex items-start space-x-4">
              <Image
                src="https://cdn.whiteboxmedia.co.in/logo.PNG"
                alt="WhiteBoxMedia Logo"
                width={70}
                height={70}
                className="mt-1"
              />
              <div>
                <p className="font-medium mb-2 text-white">WhiteBoxMedia Pvt Ltd</p>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  E 31, Forth floor 408 Amar Heights<br />
                  Rani Sati Nagar, Nirman Nagar<br />
                  DCM Ajmer Road, Near MG Motor<br />
                  302019
                </p>
              </div>
            </div>
          </div>

          {/* Pages Section */}
          <div className="lg:col-span-2 bg-black/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl p-4">
            <h3 className="text-lg font-semibold mb-6 text-white relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-red-600">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-300 hover:text-white transition-colors flex items-center">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-neutral-300 hover:text-white transition-colors flex items-center">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-300 hover:text-white transition-colors flex items-center">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors flex items-center">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-neutral-300 hover:text-white transition-colors flex items-center">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Website Section */}
          <div className="lg:col-span-2 bg-black/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl p-4">
            <h3 className="text-lg font-semibold mb-6 text-white relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-red-600">Website</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sitemap.xml" className="text-neutral-300 hover:text-white transition-colors flex items-center">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-neutral-300 hover:text-white transition-colors flex items-center">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-300 hover:text-white transition-colors flex items-center">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="https://kartikey.tech/?ref=whiteboxmedia" className="text-neutral-300 hover:text-white transition-colors flex items-center">
                  Developer
                </Link>
              </li>
              <li>
                <Link href="https://kartikey.tech/report" className="text-neutral-300 hover:text-white transition-colors flex items-center">
                  Report Issue
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us Section */}
          <div className="lg:col-span-4 bg-black/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl p-4">
            <h3 className="text-lg font-semibold mb-6 text-white relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-8 after:bg-red-600">Connect With Us</h3>
            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <a href="tel:+919352057269" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-3">
                  <FaPhone size={16} />
                  <span>+91 93520 57269</span>
                </a>
                <a href="https://wa.me/919351810280" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-3">
                  <FaWhatsapp size={16} />
                  <span>+91 93518 10280</span>
                </a>
              </div>
              <div className="space-y-2">
                <a href="mailto:info@whiteboxmedia.co.in" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-3">
                  <FaEnvelope size={16} />
                  <span>info@whiteboxmedia.co.in</span>
                </a>
                <a href="mailto:hr@whiteboxmedia.co.in" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-3">
                  <FaEnvelope size={16} />
                  <span>hr@whiteboxmedia.co.in</span>
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link href="https://www.instagram.com/whiteboxmedia?igsh=MWZiMXJ0ZW56MnhpaQ==" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <FaInstagram size={24} />
              </Link>
              <Link href="https://www.facebook.com/share/19iwywoQ3A/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <FaFacebookF size={24} />
              </Link>
              <Link href="mailto:info@whiteboxmedia.co.in" className="text-neutral-300 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <FaEnvelope size={24} />
              </Link>
              <Link href="https://wa.me/919351810280" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <FaWhatsapp size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;