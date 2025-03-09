"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, ArrowLeft, Search, Mail, Phone, MapPin } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatDate } from '@/utils/dateUtils';
import Loader from '@/components/Loader';

// Define the Blog interface
interface Blog {
  id?: string;
  title: string;
  featuredImage: string;
  content: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  status: 'Published' | 'Draft' | 'Archived';
  createdAt: number;
  slug: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface Props {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: Props) {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [formData, setFormData] = useState<ContactFormData>({
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
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogsCollection = collection(db, 'blogs');
        const q = query(blogsCollection, where('slug', '==', params.slug), where('status', '==', 'Published'));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          notFound();
          return;
        }
        
        const blogData = querySnapshot.docs[0].data() as Blog;
        blogData.id = querySnapshot.docs[0].id;
        setBlog(blogData);
        
        // Fetch related blogs (blogs with the same tag)
        if (blogData.tags.length > 0) {
          // Get all published blogs with matching tags, without ordering
          const relatedQuery = query(
            blogsCollection,
            where('tags', 'array-contains-any', blogData.tags),
            where('status', '==', 'Published')
          );
          const relatedSnapshot = await getDocs(relatedQuery);
          
          const relatedData: Blog[] = [];
          relatedSnapshot.forEach((doc) => {
            // Don't include the current blog
            if (doc.id !== blogData.id) {
              const data = doc.data() as Blog;
              relatedData.push({
                id: doc.id,
                ...data
              });
            }
          });
          
          // Sort in memory and limit to 3
          const sortedRelated = relatedData
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 3);
          
          setRelatedBlogs(sortedRelated);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
      }
    };
    
    const fetchLocations = async () => {
      try {
        const propertiesRef = collection(db, 'properties');
        const querySnapshot = await getDocs(propertiesRef);
        
        // Get unique locations from properties
        const uniqueLocations = new Set<string>();
        querySnapshot.forEach((doc) => {
          const property = doc.data();
          if (property.location) {
            uniqueLocations.add(property.location);
          }
        });
        
        const locationsList = Array.from(uniqueLocations);
        setLocations(locationsList);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    
    fetchBlog();
    fetchLocations();
  }, [params.slug]);

  const handleSearch = () => {
    if (selectedLocation) {
      router.push(`/spaces?location=${selectedLocation}`);
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
      setFormData({ name: "", email: "", phone: "", message: "" });
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

  if (loading) {
    return <Loader />;
  }

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-secondary mt-4 pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <Link 
          href="/blogs" 
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Blogs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Blog Header */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-12">
              <div className="relative h-72 sm:h-96 md:h-[400px]">
              <Image
                  src={blog.featuredImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              </div>
              <div className="p-6 md:p-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">{blog.title}</h1>
                <div className="flex items-center gap-6 text-gray-500 mb-10">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5" />
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{blog.readTime}</span>
                  </div>
            </div>

                {/* Blog Content - Render HTML content */}
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedBlogs.map((relatedBlog) => (
                    <Link 
                      key={relatedBlog.id}
                      href={`/blogs/${relatedBlog.slug}`}
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative h-48">
                        <Image
                          src={relatedBlog.featuredImage}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {relatedBlog.tags.length > 0 && (
                          <div className="absolute top-4 right-4 bg-primary/90 text-white text-xs px-3 py-1 rounded-full">
                            {relatedBlog.tags[0]}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{relatedBlog.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                            <span>{new Date(relatedBlog.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                            <span>{relatedBlog.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
              </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-36 self-start">
            {/* Search Properties Widget */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Find Your Perfect Space</h3>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Location
                  </label>
                  <div className="relative">
                    <select
                      id="location"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="">Select a location</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
                
                <button
                  onClick={handleSearch}
                  disabled={!selectedLocation}
                  className={`w-full py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 
                    ${selectedLocation ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  <Search className="w-4 h-4" />
                  <span>Search Properties</span>
                </button>
              </div>
            </div>

            {/* Contact Widget */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Your phone"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-6 text-white rounded-lg transition-all duration-300 ${
                    isSubmitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 