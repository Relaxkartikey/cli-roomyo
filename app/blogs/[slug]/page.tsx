"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, ArrowLeft, Search, Mail, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { FEATURED_BLOGS, POPULAR_BLOGS } from "../blog-data";

// This will be replaced with Strapi data
const BLOGS = [
  ...FEATURED_BLOGS,
  ...POPULAR_BLOGS
].reduce((acc, blog) => {
  const slug = blog.title.toLowerCase().split(' ').slice(0, 10).join('-') + '-' + blog.id;
  acc[slug] = blog;
  return acc;
}, {} as Record<string, typeof FEATURED_BLOGS[0]>);

interface Props {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: Props) {
  const blog = BLOGS[params.slug];

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-secondary pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <Link 
          href="/blogs" 
          className="inline-flex items-center text-gray-600 hover:text-primary mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Blogs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Featured Image */}
            <div className="relative aspect-[21/9] w-full mb-8 rounded-2xl overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Header */}
            <header className="mb-12">
              <div className="inline-block bg-primary/90 text-white text-sm px-3 py-1 rounded-full mb-4">
                {blog.category}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{blog.excerpt}</p>
              
              {/* Placeholder content - will be replaced with actual content from Strapi */}
              <h2>Introduction</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              <h2>Key Points</h2>
              <ul>
                <li>Point 1 with detailed explanation</li>
                <li>Point 2 with practical examples</li>
                <li>Point 3 with recommendations</li>
              </ul>

              <h2>Detailed Analysis</h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <h2>Conclusion</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Search Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Spaces</h3>
              <form action="/spaces" className="space-y-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="Enter city or area"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Search Available Spaces
                </button>
              </form>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book a Consultation</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="your@email.com"
                    />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Your phone number"
                    />
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
} 