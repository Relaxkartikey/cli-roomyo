"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Clock, ChevronDown, ArrowRight, Search, Tag, ArrowDownWideNarrow } from "lucide-react";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSearchParams, useRouter } from "next/navigation";
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

// Constants
const SORT_OPTIONS = ["Most Recent", "Oldest", "A-Z", "Z-A"];

// Separate client component for blogs list functionality
function BlogsListingComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleBlogs, setVisibleBlogs] = useState(9);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState(searchParams.get("tag") || "");
  const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "Most Recent");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  
  // Fetch blogs from Firestore
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const blogsCollection = collection(db, 'blogs');
        
        // Get all published blogs
        const publishedQuery = query(
          blogsCollection, 
          where('status', '==', 'Published')
        );
        const querySnapshot = await getDocs(publishedQuery);
        
        const blogsData: Blog[] = [];
        // Get all unique tags
        const tagsSet = new Set<string>();
        
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Blog;
          blogsData.push({
            id: doc.id,
            ...data
          });
          
          // Add tags to the set
          if (data.tags && data.tags.length > 0) {
            data.tags.forEach(tag => tagsSet.add(tag));
          }
        });
        
        // Sort blogs by createdAt (most recent first)
        blogsData.sort((a, b) => b.createdAt - a.createdAt);
        
        setBlogs(blogsData);
        setAllTags(Array.from(tagsSet));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...blogs];
    
    // Apply tag filter if selected
    if (selectedTag) {
      result = result.filter(blog => blog.tags && blog.tags.includes(selectedTag));
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(blog => 
        blog.title.toLowerCase().includes(query) || 
        blog.excerpt.toLowerCase().includes(query) ||
        (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    // Apply sorting
    switch (selectedSort) {
      case "Oldest":
        result.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "A-Z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default: // Most Recent
        result.sort((a, b) => b.createdAt - a.createdAt);
    }
    
    setFilteredBlogs(result);
  }, [blogs, selectedTag, selectedSort, searchQuery]);
  
  // Update URL when filters change
  const updateURL = (tag: string, sort: string, search: string) => {
    const params = new URLSearchParams();
    
    if (tag) params.set("tag", tag);
    if (sort) params.set("sort", sort);
    if (search) params.set("search", search);
    
    const newURL = `${window.location.pathname}?${params.toString()}`;
    router.push(newURL, { scroll: false });
  };
  
  const handleTagChange = (value: string) => {
    setSelectedTag(value);
    updateURL(value, selectedSort, searchQuery);
  };
  
  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    updateURL(selectedTag, value, searchQuery);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL(selectedTag, selectedSort, searchQuery);
  };
  
  // Load more blogs
  const loadMoreBlogs = () => {
    setVisibleBlogs(prev => prev + 6);
  };
  
  const hasMoreBlogs = filteredBlogs.length > visibleBlogs;
  const displayedBlogs = filteredBlogs.slice(0, visibleBlogs);
  
  // Extract featured blogs
  const featuredBlogs = blogs.slice(0, 3);
  const mainFeaturedBlog = featuredBlogs[0];
  const secondaryFeaturedBlogs = featuredBlogs.slice(1, 3);
  
  if (loading) {
    return <Loader />;
  }
  
  if (blogs.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No Blogs Found</h2>
          <p className="text-gray-600 mb-6">
            We haven't published any blogs yet. Check back soon for new content!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Featured Blogs */}
      {!selectedTag && !searchQuery && selectedSort === "Most Recent" && (
        <section className="mb-16 mt-4 sm:mb-20">
          {/* Main Featured Blog - Full width on mobile, two columns on larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Main Featured Blog */}
            {mainFeaturedBlog && (
            <Link 
                href={`/blogs/${mainFeaturedBlog.slug}`}
                className="group block rounded-2xl overflow-hidden shadow-lg h-full"
            >
                <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px]">
              <Image
                    src={mainFeaturedBlog.featuredImage}
                    alt={mainFeaturedBlog.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
                    sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                      {mainFeaturedBlog.tags && mainFeaturedBlog.tags.length > 0 && (
                        <div className="inline-block bg-primary/90 text-white text-xs px-3 py-1 rounded-full mb-3 sm:mb-4">
                          {mainFeaturedBlog.tags[0]}
                  </div>
                      )}
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {mainFeaturedBlog.title}
                  </h2>
                      <p className="text-gray-200 text-sm sm:text-base line-clamp-2 mb-3 sm:mb-4 max-w-xl">
                        {mainFeaturedBlog.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{new Date(mainFeaturedBlog.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{mainFeaturedBlog.readTime}</span>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            )}

            {/* Secondary Featured Blogs - Stack on all screens */}
            <div className="flex flex-col gap-6 h-full">
              {secondaryFeaturedBlogs.map((blog) => (
                <Link 
                  key={blog.id}
                  href={`/blogs/${blog.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex-1"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                    <div className="relative md:col-span-2">
                      <div className="h-48 md:h-full relative">
                    <Image
                          src={blog.featuredImage}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 20vw"
                    />
                        {blog.tags && blog.tags.length > 0 && (
                    <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs px-3 py-1 rounded-full">
                            {blog.tags[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col justify-center md:col-span-3">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{blog.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                      <div className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                        <span>{blog.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Filters Section */}
      <section className="mb-12">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="col-span-1 md:col-span-1">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search blogs..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/80"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
            
            {/* Tags Filter */}
            <div className="col-span-1 md:col-span-1">
              <div className="relative">
                <select
                  value={selectedTag}
                  onChange={(e) => handleTagChange(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pl-10 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">All Tags</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            {/* Sort Filter */}
            <div className="col-span-1 md:col-span-1">
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pl-10 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ArrowDownWideNarrow className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
          
          {/* Active Filters */}
          {(selectedTag || searchQuery || selectedSort !== "Most Recent") && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {selectedTag && (
                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center">
                    {selectedTag}
                    <button 
                      onClick={() => handleTagChange("")}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {searchQuery && (
                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center">
                    "{searchQuery}"
                    <button 
                      onClick={() => {
                        setSearchQuery("");
                        updateURL(selectedTag, selectedSort, "");
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {selectedSort !== "Most Recent" && (
                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center">
                    {selectedSort}
                    <button 
                      onClick={() => handleSortChange("Most Recent")}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                )}
                
                <button 
                  onClick={() => {
                    setSelectedTag("");
                    setSelectedSort("Most Recent");
                    setSearchQuery("");
                    router.push("/blogs");
                  }}
                  className="text-xs text-primary hover:text-primary/80 ml-auto"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Results Count */}
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          {selectedTag || searchQuery ? 'Search Results' : 'All Blogs'}
        </h2>
        <span className="text-sm text-gray-500">
          Showing {Math.min(displayedBlogs.length, visibleBlogs)} of {filteredBlogs.length} blogs
        </span>
      </div>
      
      {/* Blogs Grid */}
      {displayedBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedBlogs.map((blog, idx) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
              >
              <Link href={`/blogs/${blog.slug}`} className="block">
                  <div className="relative h-48">
                    <Image
                    src={blog.featuredImage}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="absolute top-4 right-4 bg-primary/90 text-white text-xs px-3 py-1 rounded-full">
                      {blog.tags[0]}
                    </div>
                  )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
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
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-md">
          <div className="text-center max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No blogs found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any blogs matching your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedTag("");
                setSelectedSort("Most Recent");
                setSearchQuery("");
                router.push("/blogs");
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

          {/* Load More Button */}
          {hasMoreBlogs && (
        <div className="text-center mt-8 mb-12">
              <button
            onClick={loadMoreBlogs}
            className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Load More
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
    </>
  );
}

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-secondary pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <Suspense fallback={<Loader />}>
          <BlogsListingComponent />
        </Suspense>
      </div>
    </main>
  );
} 