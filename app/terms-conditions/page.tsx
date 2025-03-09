'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen bg-secondary pb-16">
      {/* Hero Title Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-8 sm:py-12 mb-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
          <p className="text-gray-600">Agreement between you and Roomyo</p>
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
          <p className="text-gray-700 mb-6 italic">
            By accessing or using the Roomyo website (roomyo.in) or any related services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use immediately.
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2"><strong>Agreement:</strong> Your use of Roomyo's services constitutes acceptance of these Terms and Conditions in full.</li>
              <li><strong>Eligibility:</strong> You must be at least 18 years of age and have the legal capacity to enter into these terms.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">2. Description of Services</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2"><strong>Platform Purpose:</strong> Roomyo is an online platform offering rental accommodation solutions exclusively for students and working professionals in Jaipur. We provide listings, facilitate connections between tenants and property owners, and support a hassle-free booking process.</li>
              <li><strong>Service Limitations:</strong> Roomyo acts solely as an intermediary. We do not own or manage the properties listed and are not responsible for the actual rental agreements between tenants and property owners.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">3. User Obligations</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2"><strong>Accurate Information:</strong> When using our services, you agree to provide accurate, complete, and current information.</li>
              <li className="mb-2"><strong>Account Responsibility:</strong> If you create an account, you are responsible for maintaining its confidentiality and for all activities that occur under your account.</li>
              <li><strong>Lawful Use:</strong> You agree to use our platform only for lawful purposes and in accordance with these Terms.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Booking and Payment</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2"><strong>Booking Process:</strong> All booking requests made through Roomyo are subject to confirmation by the respective property owner or PG host. Roomyo facilitates the connection but does not guarantee availability.</li>
              <li className="mb-2"><strong>Payment:</strong> Payment for bookings is processed securely via third-party payment gateways. Roomyo does not store sensitive payment details.</li>
              <li><strong>Security:</strong> You agree to follow secure payment practices and are responsible for maintaining the confidentiality of your payment credentials.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">5. Cancellation and Refunds</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2"><strong>Cancellation Policy:</strong> Cancellation or modification of bookings is subject to the terms provided during the booking process. Specific cancellation policies will be communicated at the time of booking.</li>
              <li><strong>Refunds:</strong> Any refunds, if applicable, will be processed according to the cancellation policy of the property owner or PG host. Roomyo is not liable for delays or discrepancies in refund processing.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Disclaimers and Limitation of Liability</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2"><strong>"As Is" Basis:</strong> All services and content provided by Roomyo are offered on an "as is" basis without warranties of any kind, whether express or implied.</li>
              <li className="mb-2"><strong>Listing Accuracy:</strong> While we strive for accuracy, Roomyo does not guarantee that property listings, descriptions, or pricing are error-free or up-to-date.</li>
              <li><strong>Limitation of Liability:</strong> In no event shall Roomyo be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our platform or inability to use it.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Intellectual Property</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2"><strong>Ownership:</strong> All content, logos, graphics, and data on Roomyo are the property of Roomyo or its licensors and are protected by intellectual property laws.</li>
              <li><strong>Restrictions:</strong> You may not reproduce, distribute, modify, or create derivative works from any content on our platform without prior written consent.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">8. Governing Law and Dispute Resolution</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2"><strong>Governing Law:</strong> These Terms and Conditions shall be governed by and construed in accordance with the laws of India.</li>
              <li><strong>Dispute Resolution:</strong> Any disputes arising from these terms or your use of Roomyo's services shall be resolved through amicable negotiations. Failing which, disputes will be subject to the exclusive jurisdiction of the appropriate courts in Jaipur.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">9. Modifications to the Terms</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2"><strong>Right to Amend:</strong> Roomyo reserves the right to modify or update these Terms and Conditions at any time without prior notice.</li>
              <li><strong>Continued Use:</strong> Your continued use of our website or services after any changes constitutes your acceptance of the updated terms.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">10. Contact Information</h2>
            <p className="text-gray-700">
              For any questions or concerns regarding these Terms and Conditions, please contact us through the contact form available on our website.
            </p>
          </section>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-gray-700 mb-4">
              By using Roomyo's platform, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 