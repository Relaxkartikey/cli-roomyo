"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { format } from 'date-fns';
import { FileText, Plus, Search, Tag, Trash2, Edit, ArrowLeft, Calendar, Clock, Save, X, Image as ImageIcon, ExternalLink, Upload, Copy } from 'lucide-react';
import dynamic from 'next/dynamic';
import { onAuthStateChanged } from 'firebase/auth';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';
import BlogEditor from '@/components/BlogEditor';
import Loader from '@/components/Loader';
import ProtectedRoute from '@/components/ProtectedRoute';
import 'easymde/dist/easymde.min.css';

// Dynamically import SimpleMDE with SSR disabled
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
);

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

interface DashboardCard {
  title: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

interface StatsCard {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

interface UploadedImage {
  id: string;
  url: string;
  filename: string;
  uploadedAt: string;
}

// Add a helper function for safe date formatting
const formatDate = (timestamp: number | undefined) => {
  if (!timestamp || isNaN(timestamp)) return 'N/A';
  try {
    return format(timestamp, 'MMM d, yyyy');
  } catch (error) {
    return 'Invalid Date';
  }
};

// Function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')
    .slice(0, 60) + '-' + Date.now().toString().slice(-6);
};

// Function to estimate read time
const calculateReadTime = (content: string): string => {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, '');
  
  // Calculate words
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return minutes <= 1 ? '1 min read' : `${minutes} min read`;
};

// Function to generate excerpt
const generateExcerpt = (content: string, length: number = 150): string => {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, '');
  
  // Trim and get excerpt
  let excerpt = text.trim();
  
  if (excerpt.length <= length) {
    return excerpt;
  }
  
  // Cut to specified length
  excerpt = excerpt.substring(0, length).trim();
  
  // Don't cut in the middle of a word
  const lastSpaceIndex = excerpt.lastIndexOf(' ');
  if (lastSpaceIndex > 0) {
    excerpt = excerpt.substring(0, lastSpaceIndex);
  }
  
  return excerpt + '...';
};

export default function BlogsDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('newest');
  const [stats, setStats] = useState({
    blogs: 0,
    published: 0,
    drafts: 0
  });

  // Form state
  const [formData, setFormData] = useState<Blog>({
    title: '',
    featuredImage: '',
    content: '',
    excerpt: '',
    tags: [],
    readTime: '5 min read',
    status: 'Draft',
    createdAt: Date.now(),
    slug: ''
  });

  // New tag input state
  const [newTag, setNewTag] = useState('');
  
  // Selected items for bulk actions
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [mediaImages, setMediaImages] = useState<UploadedImage[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch blogs data
  const fetchBlogs = async () => {
    try {
      const blogsCollection = collection(db, 'blogs');
      const q = query(blogsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const blogsData: Blog[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        blogsData.push({
          id: doc.id,
          title: data.title,
          featuredImage: data.featuredImage,
          content: data.content,
          excerpt: data.excerpt,
          tags: data.tags || [],
          readTime: data.readTime,
          status: data.status,
          createdAt: data.createdAt,
          slug: data.slug
        });
      });
      
      setBlogs(blogsData);
      setStats({
        blogs: blogsData.length,
        published: blogsData.filter(b => b.status === 'Published').length,
        drafts: blogsData.filter(b => b.status === 'Draft').length
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
      setLoading(false);
    }
  };

  // Initial auth check and data fetch
  useEffect(() => {
    console.log("Checking authentication...");
    
    // Debug current auth state
    if (auth.currentUser) {
      console.log("Firebase auth current user:", auth.currentUser.uid);
    } else {
      console.log("No Firebase auth current user");
    }
    
    // Debug cookie state
    const userCookie = Cookies.get('user');
    if (userCookie) {
      console.log("User cookie exists");
    } else {
      console.log("No user cookie found");
    }
    
    // Prioritize checking Firebase auth state
    const authStateCheck = () => {
      if (auth.currentUser) {
        console.log("Auth state confirmed via Firebase auth");
        setUserId(auth.currentUser.uid);
        fetchBlogs();
        return true;
      }
      
      // Check cookies as fallback
      try {
        const userCookie = Cookies.get('user');
        if (userCookie) {
          const user = JSON.parse(userCookie);
          console.log("Auth state confirmed via cookie");
          setUserId(user.uid);
          fetchBlogs();
          return true;
        }
      } catch (error) {
        console.error("Error reading user cookie:", error);
      }
      
      return false;
    };
    
    // Immediately check auth state
    if (authStateCheck()) {
      return;
    }
    
    // Set up auth state change listener if needed
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user ? "logged in" : "not logged in");
      if (user) {
        // Ensure cookie is set for page transitions
        Cookies.set('user', JSON.stringify({
          uid: user.uid,
          email: user.email
        }));
        
        setUserId(user.uid);
        fetchBlogs();
      } else {
        setLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Update activity timestamp - modified to avoid document reference on server
  const updateActivity = () => {
    setLastActivity(Date.now());
  };

  // Handle user logout
  const handleLogout = useCallback(async () => {
    try {
      await auth.signOut();
      Cookies.remove('user');
      router.push('/admin');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  }, [router]);

  // Check for inactivity and logout if necessary
  useEffect(() => {
    const interval = setInterval(() => {
      const inactiveTime = Date.now() - lastActivity;
      if (inactiveTime > 30 * 60 * 1000) { // 30 minutes
        handleLogout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [lastActivity, handleLogout]);

  // Add event listeners for activity tracking only on client side
  useEffect(() => {
    // Only add event listeners on the client side
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', updateActivity);
      window.addEventListener('keydown', updateActivity);
      window.addEventListener('click', updateActivity);

      return () => {
        window.removeEventListener('mousemove', updateActivity);
        window.removeEventListener('keydown', updateActivity);
        window.removeEventListener('click', updateActivity);
      };
    }
  }, []);

  // Handle sort change
  const handleSort = (type: string) => {
    setSortOption(type);
    
    let sortedBlogs = [...blogs];
    
    if (type === 'newest') {
      sortedBlogs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else if (type === 'oldest') {
      sortedBlogs.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    } else if (type === 'alphabetical') {
      sortedBlogs.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setBlogs(sortedBlogs);
  };

  // Filter blogs based on search and tags
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.every(tag => blog.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  // Get all unique tags from blogs
  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];

  // Handle form submit for adding/editing blog
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Generate derived fields if they're empty
      const updatedFormData = {
        ...formData,
        excerpt: formData.excerpt || generateExcerpt(formData.content),
        readTime: formData.readTime || calculateReadTime(formData.content),
        slug: formData.slug || generateSlug(formData.title),
      };
      
      if (editingBlog && editingBlog.id) {
        // Update existing blog
        const blogRef = doc(db, 'blogs', editingBlog.id);
        await updateDoc(blogRef, {
          ...updatedFormData,
          updatedAt: Date.now()
        });
        toast.success('Blog updated successfully');
      } else {
        // Add new blog
        await addDoc(collection(db, 'blogs'), {
          ...updatedFormData,
          createdAt: Date.now()
        });
        toast.success('Blog added successfully');
      }
      
      // Reset form and state
      setFormData({
        title: '',
        featuredImage: '',
        content: '',
        excerpt: '',
        tags: [],
        readTime: '5 min read',
        status: 'Draft',
        createdAt: Date.now(),
        slug: ''
      });
      
      setIsAddingBlog(false);
      setEditingBlog(null);
      
      // Refresh blog list
      await fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a blog
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'blogs', id));
        toast.success('Blog deleted successfully');
        await fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
        toast.error('Failed to delete blog');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle editing a blog
  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData(blog);
    setIsAddingBlog(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        handleLogout();
      }
    });

    return () => unsubscribe();
  }, [handleLogout]);

  // Handle adding a new tag
  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag]
      });
      setNewTag('');
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Handle filtering by tag
  const handleTagFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Handle bulk selections
  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredBlogs.map(blog => blog.id as string));
    }
    setSelectAll(!selectAll);
  };

  // Handle bulk actions
  const handleBulkAction = async (action: 'delete' | 'publish' | 'draft' | 'archive') => {
    if (selectedItems.length === 0) return;
    
    const confirmMessage = action === 'delete' 
      ? `Are you sure you want to delete ${selectedItems.length} blog(s)?`
      : `Are you sure you want to mark ${selectedItems.length} blog(s) as ${action}?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        setLoading(true);
        
        for (const id of selectedItems) {
          if (action === 'delete') {
            await deleteDoc(doc(db, 'blogs', id));
          } else {
            const status = action === 'publish' ? 'Published' : action === 'draft' ? 'Draft' : 'Archived';
            await updateDoc(doc(db, 'blogs', id), { status });
          }
        }
        
        toast.success(`${selectedItems.length} blog(s) ${action === 'delete' ? 'deleted' : 'updated'} successfully`);
        setSelectedItems([]);
        setSelectAll(false);
        await fetchBlogs();
      } catch (error) {
        console.error(`Error performing bulk ${action}:`, error);
        toast.error(`Failed to ${action} blogs`);
      } finally {
        setLoading(false);
      }
    }
  };

  // Add autofill functionality
  const handleAutofill = () => {
    try {
      // First set all simple fields
      const simpleFields: Partial<Blog> = {
        title: 'Top 10 PG Accommodations in Bangalore for Students',
        featuredImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
        excerpt: 'Discover the top 10 PG accommodations in Bangalore that offer the perfect balance of comfort, convenience, and affordability for students.',
        tags: ['Accommodation', 'Bangalore', 'Students', 'Budget Living', 'PG'],
        readTime: '6 min read',
        status: 'Draft' as const,
        createdAt: Date.now(),
        slug: 'top-10-pg-accommodations-bangalore-students-' + Date.now().toString().slice(-6)
      };
      
      // Set simple fields first
      setFormData(prev => ({
        ...prev,
        ...simpleFields
      }));
      
      // Then set complex content field separately with a slight delay to avoid editor freeze
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          content: `<h1>Top 10 PG Accommodations in Bangalore for Students</h1>

<h2>Introduction</h2>
<p>Finding the perfect PG accommodation in Bangalore can be challenging for students. This guide helps you discover the best options that offer comfort, convenience, and affordability.</p>

<h2>What to Look For</h2>
<ul>
  <li><strong>Location:</strong> Proximity to your college or workplace</li>
  <li><strong>Amenities:</strong> Wi-Fi, laundry, meals, and security</li>
  <li><strong>Budget:</strong> Balance between cost and comfort</li>
  <li><strong>Community:</strong> Fellow students and professionals</li>
</ul>

<h2>Top Recommendations</h2>
<ol>
  <li><strong>Urban Nest</strong> - Located near Koramangala, offering modern facilities and great food</li>
  <li><strong>Student Haven</strong> - Budget-friendly option in BTM Layout with excellent transport connectivity</li>
  <li><strong>Campus Corner</strong> - Walking distance from major educational institutions</li>
  <li><strong>Metro Living</strong> - Modern accommodations with metro access</li>
  <li><strong>Tech Park Stay</strong> - Perfect for IT professionals and interns</li>
</ol>

<h2>Budget Considerations</h2>
<p>Prices range from ₹8,000 to ₹15,000 depending on location, room type, and facilities included.</p>

<h2>Booking Process</h2>
<p>Most PGs require a security deposit equivalent to 1-2 months' rent and advance payment for the first month.</p>

<h2>Conclusion</h2>
<p>With these options, finding your ideal PG accommodation in Bangalore becomes much easier. Book early to secure the best deals!</p>`
        }));
        
        toast.success('Form autofilled with sample data');
      }, 50);
    } catch (error) {
      console.error("Error in autofill:", error);
      toast.error('Failed to autofill form data');
    }
  };

  // Add fetchMediaImages function
  const fetchMediaImages = async () => {
    try {
      setLoadingMedia(true);
      const response = await fetch('/api/upload');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch images');
      }

      if (!Array.isArray(data.images)) {
        throw new Error('Invalid response format');
      }

      setMediaImages(data.images);
    } catch (error) {
      toast.error('Failed to load media images');
    } finally {
      setLoadingMedia(false);
    }
  };

  // Add media upload handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    await handleUpload(files);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await handleUpload(files);
    }
  };

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const data = await response.json();
        const newImage: UploadedImage = {
          id: data.filename,
          url: data.url,
          filename: file.name,
          uploadedAt: data.uploadedAt,
        };

        setMediaImages(prev => [newImage, ...prev]);
        setUploadProgress(100);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleMediaImageSelect = (image: UploadedImage) => {
    setFormData(prev => ({
      ...prev,
      featuredImage: image.url
    }));
    setShowMediaLibrary(false);
  };

  // Stats cards for the dashboard
  const statsCards: StatsCard[] = [
    {
      title: 'Total Blogs',
      count: stats.blogs,
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Published',
      count: stats.published,
      icon: <ExternalLink className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Drafts',
      count: stats.drafts,
      icon: <Edit className="w-6 h-6" />,
      color: 'bg-orange-500'
    }
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-secondary pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold">Blog Manager</h1>
            <Link
              href="/admin/dashboard"
              className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors w-full sm:w-auto text-center"
            >
              Back to Dashboard
            </Link>
          </div>

          {/* Stats cards - Made responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
            {statsCards.map((card, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-lg shadow p-4 sm:p-6 flex items-center space-x-4"
              >
                <div className={`${card.color} p-2 sm:p-3 rounded-full text-white`}>
                  {card.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-sm sm:text-base">{card.title}</p>
                  <h3 className="text-xl sm:text-2xl font-bold">{card.count}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Header with Back button and Add button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold">Blog Manager</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={() => {
                  setIsAddingBlog(!isAddingBlog);
                  if (!isAddingBlog) {
                    setEditingBlog(null);
                    setFormData({
                      title: '',
                      featuredImage: '',
                      content: '',
                      excerpt: '',
                      tags: [],
                      readTime: '5 min read',
                      status: 'Draft',
                      createdAt: Date.now(),
                      slug: ''
                    });
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                {isAddingBlog ? 'Cancel' : 'Add Blog'}
              </button>
            </div>
          </div>

          {/* Add/Edit Blog Form */}
          {isAddingBlog && (
            <div className="bg-white rounded-lg shadow p-6 mb-6 relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {editingBlog ? 'Edit Blog' : 'Add New Blog'}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAutofill}
                    className="px-4 py-2 text-sm font-medium text-primary bg-primary/5 rounded-lg hover:bg-primary/10"
                  >
                    Autofill Test Data
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingBlog(false);
                      setEditingBlog(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 overflow-visible">
                {/* Blog Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Blog Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter blog title"
                    required
                  />
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Blog['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                {/* Featured Image */}
                <div>
                  <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-1">
                    Featured Image <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          id="featuredImage"
                          value={formData.featuredImage}
                          onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter image URL"
                          required
                        />
                      </div>
                      {formData.featuredImage && (
                        <div className="w-20 h-20 relative">
                          <Image
                            src={formData.featuredImage}
                            alt="Preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowMediaLibrary(true);
                        fetchMediaImages();
                      }}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center justify-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Select from Media Library
                    </button>
                  </div>
                </div>

                {/* Media Library Modal */}
                {showMediaLibrary && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col">
                      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">Media Library</h3>
                        <button
                          onClick={() => setShowMediaLibrary(false)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-6">
                        {/* Upload Area */}
                        <div
                          className={`border-2 border-dashed rounded-xl p-8 mb-8 text-center transition-colors ${
                            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            className="hidden"
                            multiple
                            accept="image/*"
                          />
                          <div className="flex flex-col items-center justify-center space-y-4">
                            <Upload className="w-12 h-12 text-gray-400" />
                            <div>
                              <p className="text-xl font-medium text-gray-900">Drop your images here</p>
                              <p className="text-sm text-gray-500 mt-1">or</p>
                            </div>
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              disabled={isUploading}
                            >
                              Select Files
                            </button>
                          </div>
                        </div>

                        {/* Upload Progress */}
                        {isUploading && (
                          <div className="mb-8">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Uploading...</span>
                              <span className="text-sm text-gray-500">{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Images Table */}
                        <div className="rounded-lg border border-gray-200">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                  Preview
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  File Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  URL
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Uploaded
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {mediaImages.map((image) => (
                                <tr key={image.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <ImageIcon className="w-4 h-4 text-gray-400" />
                                      </div>
                                      <Image
                                        src={image.url}
                                        alt={image.filename}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                      />
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {image.filename}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                      <div className="text-sm text-gray-500 truncate max-w-md">
                                        {image.url}
                                      </div>
                                      <button
                                        onClick={() => navigator.clipboard.writeText(image.url)}
                                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                        title="Copy URL"
                                      >
                                        <Copy className="w-4 h-4 text-gray-500" />
                                      </button>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                      {new Date(image.uploadedAt).toLocaleDateString()}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                      onClick={() => handleMediaImageSelect(image)}
                                      className="text-primary hover:text-primary/80 px-3 py-1 rounded-lg hover:bg-primary/5"
                                    >
                                      Select
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <BlogEditor
                    content={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter a brief summary of the blog"
                    rows={3}
                  />
                  <p className="mt-1 text-xs text-gray-500">Will be generated from content if left empty</p>
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/5 text-primary"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-primary hover:text-primary/80"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="tags"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end pt-6 space-x-3 border-t">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
                    disabled={loading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingBlog ? 'Update' : 'Save'} Blog
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Blogs Management Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Filter and Search Header - Made responsive */}
            <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex flex-col gap-4">
                {/* Search */}
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                
                {/* Tag Filters - Scrollable on mobile */}
                <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
                  {allTags.slice(0, 5).map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTagFilter(tag)}
                      className={`px-3 py-1 rounded-full text-sm flex items-center flex-shrink-0 ${
                        selectedTags.includes(tag)
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </button>
                  ))}
                  {allTags.length > 5 && (
                    <button className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 flex-shrink-0">
                      +{allTags.length - 5} more
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bulk Actions - Made responsive */}
            {selectedItems.length > 0 && (
              <div className="px-4 sm:px-6 py-2 bg-gray-50 border-b border-gray-200 overflow-x-auto">
                <div className="flex items-center gap-2 min-w-max">
                  <span className="text-sm text-gray-600">{selectedItems.length} selected</span>
                  <button
                    onClick={() => handleBulkAction('publish')}
                    className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 whitespace-nowrap"
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => handleBulkAction('draft')}
                    className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 whitespace-nowrap"
                  >
                    Draft
                  </button>
                  <button
                    onClick={() => handleBulkAction('archive')}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 whitespace-nowrap"
                  >
                    Archive
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200 whitespace-nowrap"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
            
            {/* Sorting Dropdown - Made responsive */}
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-end">
                <select
                  value={sortOption}
                  onChange={(e) => handleSort(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm w-full sm:w-auto"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Blogs Table - Made scrollable on mobile */}
            <div className="overflow-x-auto">
              {filteredBlogs.length === 0 ? (
                <div className="text-center py-12 bg-gray-50">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No Blogs Found</h3>
                  <p className="text-gray-500 mt-1">{searchTerm ? 'Try a different search term' : 'Add your first blog'}</p>
                  {!isAddingBlog && (
                    <button
                      onClick={() => {
                        setIsAddingBlog(true);
                        setEditingBlog(null);
                      }}
                      className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 inline-flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Blog
                    </button>
                  )}
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Blog
                      </th>
                      <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tags
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBlogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(blog.id as string)}
                            onChange={() => handleSelectItem(blog.id as string)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 relative rounded overflow-hidden">
                              {blog.featuredImage ? (
                                <Image
                                  src={blog.featuredImage}
                                  alt={blog.title}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                                  <ImageIcon className="w-6 h-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 truncate max-w-[150px] sm:max-w-xs">
                                {blog.title}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {blog.readTime}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {blog.tags.slice(0, 3).map((tag, idx) => (
                              <span 
                                key={idx}
                                className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {blog.tags.length > 3 && (
                              <span className="inline-block text-xs text-gray-500">
                                +{blog.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span 
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              blog.status === 'Published' 
                                ? 'bg-green-100 text-green-800' 
                                : blog.status === 'Draft' 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {blog.status}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-500">
                          {formatDate(blog.createdAt)}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(blog)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(blog.id as string)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            {blog.status === 'Published' && (
                              <Link
                                href={`/blogs/${blog.slug}`}
                                target="_blank"
                                className="text-gray-600 hover:text-gray-900"
                                title="View"
                              >
                                <ExternalLink className="w-5 h-5" />
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}