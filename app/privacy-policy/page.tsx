"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Server, Key, Database, Bell, Share2, Trash2 } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-secondary pb-16">
      {/* Hero Title Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-8 sm:py-12 mb-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Your privacy matters to us at Roomyo</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 p-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">Welcome to Roomyo!</p>
            <p className="text-gray-700">At Roomyo, we highly value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our website roomyo.in or our services. By accessing or using our platform, you automatically agree to the terms outlined in this policy. If you do not agree, please discontinue using our services.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 mb-4">We collect the following types of information to provide you with the best rental accommodation experience:</p>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800 mb-2">a. Personal Information</h3>
              <p className="text-gray-700 mb-2">When you book accommodation or contact us, we may collect personal details such as:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Full Name</li>
                <li>Phone Number</li>
                <li>Current Address</li>
                <li>Preferred Location (for rental)</li>
                <li>Identification Documents (in some cases)</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800 mb-2">b. Payment Information</h3>
              <p className="text-gray-700 mb-2">For booking or rental payments, we may collect:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Credit/Debit Card Information</li>
                <li>UPI ID</li>
                <li>Billing Address</li>
              </ul>
              <p className="text-gray-700 mt-2 italic">(Note: We do NOT store any payment information; it is securely processed through our third-party payment gateway.)</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800 mb-2">c. Communication Details</h3>
              <p className="text-gray-700 mb-2">If you contact us via call or chat, we may collect:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Communication history</li>
                <li>Inquiry details</li>
                <li>Feedback or reviews</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800 mb-2">d. Usage Information</h3>
              <p className="text-gray-700 mb-2">When you use our website or app, we automatically collect data to improve your experience:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>IP Address</li>
                <li>Browser Type</li>
                <li>Pages Visited</li>
                <li>Time Spent on the Website</li>
                <li>Device Type & Operating System</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800 mb-2">e. Newsletter Subscription</h3>
              <p className="text-gray-700 mb-2">If you subscribe to our newsletter, we may collect:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Name</li>
                <li>Email Address</li>
              </ul>
              <p className="text-gray-700 mt-2">We use Email.js for sending newsletters and updates. You can unsubscribe anytime using the link provided in our emails.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We collect your information to:</p>
            
            <div className="mb-4">
              <p className="text-gray-700 flex items-start mb-2">
                <span className="text-green-500 text-xl mr-2">✅</span>
                <span><strong>1. Provide Rental Accommodation Services</strong></span>
              </p>
              <ul className="list-disc pl-10 text-gray-700">
                <li>Process your booking requests.</li>
                <li>Connect you with landlords or Rental Spaces owners.</li>
                <li>Send booking confirmations and updates.</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 flex items-start mb-2">
                <span className="text-green-500 text-xl mr-2">✅</span>
                <span><strong>2. Improve User Experience</strong></span>
              </p>
              <ul className="list-disc pl-10 text-gray-700">
                <li>Personalize your accommodation search.</li>
                <li>Improve website performance and navigation.</li>
          </ul>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 flex items-start mb-2">
                <span className="text-green-500 text-xl mr-2">✅</span>
                <span><strong>3. Customer Support</strong></span>
              </p>
              <ul className="list-disc pl-10 text-gray-700">
                <li>Respond to your queries or complaints.</li>
                <li>Provide after-booking support.</li>
          </ul>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 flex items-start mb-2">
                <span className="text-green-500 text-xl mr-2">✅</span>
                <span><strong>4. Marketing and Promotions</strong></span>
              </p>
              <ul className="list-disc pl-10 text-gray-700">
                <li>Send promotional messages and newsletters.</li>
                <li>Update you about new accommodations or services.</li>
                <li>Offer discounts, deals, or exclusive offers.</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 flex items-start mb-2">
                <span className="text-green-500 text-xl mr-2">✅</span>
                <span><strong>5. Analytics & Insights</strong></span>
              </p>
              <p className="text-gray-700 mb-2 pl-10">We use Firebase Analytics and Vercel Analytics to understand:</p>
              <ul className="list-disc pl-10 text-gray-700">
                <li>User behavior on the website.</li>
                <li>Most visited pages.</li>
                <li>Time spent on the platform.</li>
                <li>Booking and checkout flow improvement.</li>
              </ul>
              <p className="text-gray-700 mt-2 pl-10">This helps us to continuously improve the user experience.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Sharing Your Information</h2>
            <p className="text-gray-700 mb-4">We do NOT sell or rent your personal information to third parties. However, we may share data with:</p>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800 mb-2">a. Service Providers</h3>
              <p className="text-gray-700 mb-2">We may share your information with:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Landlords or Rental Spaces hosts for bookings.</li>
                <li>Payment gateways for payment processing.</li>
                <li>Third-party communication platforms for support.</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800 mb-2">b. Legal Compliance</h3>
              <p className="text-gray-700 mb-2">We may disclose your data if required by:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Government authorities.</li>
                <li>Law enforcement agencies.</li>
                <li>Legal or regulatory obligations.</li>
          </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800 mb-2">c. Business Transfers</h3>
              <p className="text-gray-700">In case Roomyo merges, sells, or transfers its business, your data may be transferred to the new entity.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-4">We prioritize protecting your data and implement several security measures:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Data Encryption:</strong> All data transfers (personal information, payments, etc.) are encrypted.</li>
              <li><strong>Firestore Database Security:</strong> We use Google Firestore to store your data securely.</li>
              <li><strong>Restricted Access:</strong> Only authorized personnel can access your personal information.</li>
          </ul>
            <p className="text-gray-700">However, since no online platform is 100% secure, we encourage you to use strong passwords and avoid sharing sensitive information.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4">We use cookies to enhance your browsing experience and improve site performance. Cookies help us:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Save your preferences.</li>
              <li>Track website usage patterns.</li>
              <li>Analyze user behavior.</li>
            </ul>
            <p className="text-gray-700 mb-4">You can disable cookies from your browser settings, but some features may not work correctly.</p>
            <p className="text-gray-700">We also use Firebase Analytics and Vercel Analytics to monitor website traffic and performance without compromising your privacy.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Retention of Information</h2>
            <p className="text-gray-700 mb-4">We only retain your personal data as long as necessary to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Provide our services.</li>
              <li>Fulfill legal obligations.</li>
              <li>Resolve disputes.</li>
          </ul>
            <p className="text-gray-700">If you wish to delete your data, you may request to close your account, and we will erase your personal information within a reasonable time.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">8. Third-Party Links</h2>
            <p className="text-gray-700">Our website may contain links to third-party websites (such as property listings, payment gateways, or map integrations). We are not responsible for their privacy practices and recommend reviewing their privacy policies.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700">Roomyo does not offer services to individuals under 18 years of age. We do not knowingly collect data from minors. If we discover any such data, we will immediately delete it.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">10. Agreement to Privacy Policy</h2>
            <p className="text-gray-700">By using Roomyo's website, app, or services, you automatically agree to the terms and conditions of this Privacy Policy. If you do not agree, you must discontinue using our services immediately.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700">We may update our Privacy Policy from time to time to comply with new laws or improve our services. Any major changes will be notified through our platform. We encourage you to review this page periodically.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">12. Contact Us</h2>
            <p className="text-gray-700 mb-4">If you have any questions, concerns, or requests about your data or our Privacy Policy, feel free to contact us through our platform.</p>
            <div className="flex flex-col space-y-2 text-gray-700">
              <p className="flex items-center">
                <span className="mr-2">📍</span>
                <span>Address: Pearl Apartments, Jagatpura, Jaipur, Rajasthan</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">🌐</span>
                <span>Website: <a href="https://roomyo.in" className="text-primary hover:underline">roomyo.in</a></span>
              </p>
            </div>
          </section>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-gray-700 mb-4 flex items-start">
              <span className="text-green-500 text-xl mr-2">✅</span>
              <span>By using Roomyo's platform, you accept our Privacy Policy. If you do not agree, please discontinue using our platform immediately.</span>
            </p>
            <p className="text-gray-700">We appreciate your trust in Roomyo. ❤️</p>
          </div>
        </div>
      </div>
    </main>
  );
} 