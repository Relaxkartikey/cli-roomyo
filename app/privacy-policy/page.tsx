import React from "react";
import HeroTitle from "@/components/HeroTitle";

export const metadata = {
  title: "Privacy Policy | WhiteBoxMedia",
  description: "Privacy Policy and data handling practices of WhiteBoxMedia",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <HeroTitle
        title="Privacy Policy"
        subtitle="Last updated: January 2025"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-invert prose-lg">
          <h2>Introduction</h2>
          <p>
            At WhiteBoxMedia, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information that you voluntarily provide to us when you:
          </p>
          <ul>
            <li>Contact us through our website</li>
            <li>Subscribe to our newsletter</li>
            <li>Request a quote or service</li>
            <li>Fill out any forms on our website</li>
            <li>Submit information through Google Forms</li>
            <li>Interact with our Google Maps integration</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            The information we collect is used to:
          </p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Respond to your inquiries and requests</li>
            <li>Send you marketing and promotional communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Process your service requests and transactions</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            Our website uses several third-party services to enhance functionality and user experience:
          </p>

          <h3>Google Services</h3>
          <p>
            We use various Google services on our website:
          </p>
          <ul>
            <li><strong>Google Forms:</strong> When you submit information through Google Forms, it is collected and processed according to Google&apos;s Privacy Policy. This information is stored on Google&apos;s servers and is accessible to us for business purposes.</li>
            <li><strong>Google Maps:</strong> Our website integrates Google Maps to help you locate our business. When you use the Google Maps functionality, Google may collect data about your location and usage according to their privacy policy. This may include your IP address, location data, and information about your interaction with the map.</li>
            <li><strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our website. This service collects anonymous information about your browsing behavior.</li>
          </ul>

          <h3>Cookies and Tracking</h3>
          <p>
            Our website and third-party services may use cookies and similar tracking technologies to enhance your browsing experience. These technologies collect data such as:
          </p>
          <ul>
            <li>IP addresses</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Usage patterns and preferences</li>
          </ul>

          <h2>Data Storage and Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
          </p>
          <p>
            Your data may be stored on third-party servers, including Google&apos;s infrastructure, when you interact with our forms and maps. These services maintain their own security measures and privacy policies.
          </p>

          <h2>Third-Party Privacy Policies</h2>
          <p>
            We encourage you to review the privacy policies of the third-party services we use:
          </p>
          <ul>
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400">Google Privacy Policy</a></li>
            <li><a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400">Google Terms of Service</a></li>
          </ul>

          <h2>Changes to Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or how we handle your data, please contact us at:
          </p>
          <ul>
            <li>Email: info@whiteboxmedia.co.in</li>
            <li>Phone: +91 93520 57269</li>
            <li>WhatsApp: +91 93518 10280</li>
          </ul>
        </article>
      </div>
    </main>
  );
} 