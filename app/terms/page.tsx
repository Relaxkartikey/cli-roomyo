import React from "react";
import HeroTitle from "@/components/HeroTitle";

export const metadata = {
  title: "Terms & Conditions | WhiteBoxMedia",
  description: "Terms and conditions for using WhiteBoxMedia services",
};

export default function Terms() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <HeroTitle
        title="Terms & Conditions"
        subtitle="Last updated: January 2025"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-invert prose-lg">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using WhiteBoxMedia&apos;s services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
          </p>

          <h2>Services</h2>
          <p>
            WhiteBoxMedia provides digital marketing, web development, and media production services. We reserve the right to withdraw or amend our services without notice. We will not be liable if for any reason our services are unavailable at any time or period.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The content on our website and services, including but not limited to text, graphics, logos, images, and software, is the property of WhiteBoxMedia and is protected by copyright and other intellectual property laws.
          </p>

          <h2>User Responsibilities</h2>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the confidentiality of any account information</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Use our services in compliance with all applicable laws</li>
          </ul>

          <h2>Payment Terms</h2>
          <p>
            Payment terms will be specified in individual service agreements. All fees are non-refundable unless otherwise specified in writing. We reserve the right to modify our pricing with reasonable notice.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            WhiteBoxMedia shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms and Conditions on this page.
          </p>

          <h2>Contact Information</h2>
          <p>
            For any questions about these Terms and Conditions, please contact us at:
          </p>
          <ul>
            <li>Email: info@whiteboxmedia.co.in</li>
            <li>Phone: +91 93520 57269</li>
          </ul>
        </article>
      </div>
    </main>
  );
} 