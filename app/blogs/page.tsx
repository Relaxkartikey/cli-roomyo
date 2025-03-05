"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Clock, ChevronDown, ArrowRight } from "lucide-react";
import { FEATURED_BLOGS, POPULAR_BLOGS } from "./blog-data";

function generateSlug(title: string, id: number) {
  return `/blogs/${title.toLowerCase().split(' ').slice(0, 10).join('-')}-${id}`;
}

const ALL_BLOGS = [...FEATURED_BLOGS, ...POPULAR_BLOGS].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export default function BlogsPage() {
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const hasMoreBlogs = visibleBlogs < ALL_BLOGS.length;
  const recentBlogs = ALL_BLOGS.slice(0, 3);
  const mainBlog = recentBlogs[0];
  const secondaryBlogs = recentBlogs.slice(1);

  return (
    <main className="min-h-screen bg-secondary pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section with Recent Blogs */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Main Featured Blog */}
            <Link 
              href={generateSlug(mainBlog.title, mainBlog.id)}
              className="group relative aspect-[4/3] lg:aspect-auto rounded-2xl overflow-hidden"
            >
              <Image
                src={mainBlog.image}
                alt={mainBlog.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <div className="inline-block bg-primary/90 text-white text-xs px-3 py-1 rounded-full mb-4">
                    {mainBlog.category}
                  </div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {mainBlog.title}
                  </h2>
                  <p className="text-gray-200 line-clamp-2 mb-4">{mainBlog.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      <span>{mainBlog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{mainBlog.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Secondary Featured Blogs */}
            <div className="grid gap-8">
              {secondaryBlogs.map((blog) => (
                <Link 
                  key={blog.id}
                  href={generateSlug(blog.title, blog.id)}
                  className="group grid md:grid-cols-2 gap-6 bg-white p-4 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs px-3 py-1 rounded-full">
                      {blog.category}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 mb-4">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Blogs */}
        <section id="latest-posts">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">All Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_BLOGS.slice(3, visibleBlogs).map((blog, idx) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
              >
                <Link href={generateSlug(blog.title, blog.id)} className="block">
                  <div className="relative h-48">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 text-white text-xs px-3 py-1 rounded-full">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreBlogs && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleBlogs(prev => prev + 6)}
                className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Load More
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
} 