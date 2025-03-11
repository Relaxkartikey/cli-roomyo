"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, Trash2, Copy, ExternalLink, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Loader from '@/components/Loader';

interface UploadedImage {
  id: string;
  url: string;
  filename: string;
  uploadedAt: string;
}

export default function MediaPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      console.log('Fetching images...');
      const response = await fetch('/api/upload');
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Fetched data:', JSON.stringify(data, null, 2));

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch images');
      }

      if (!Array.isArray(data.images)) {
        console.error('Invalid images data:', data);
        throw new Error('Invalid response format');
      }

      // Log each image URL
      data.images.forEach((img: UploadedImage) => {
        console.log('Image data:', {
          id: img.id,
          url: img.url,
          filename: img.filename
        });
      });

      console.log('Setting images:', data.images.length);
      setImages(data.images);
    } catch (error) {
      console.error('Fetch images error:', error);
      setError(error instanceof Error ? error.message : 'Failed to load images');
    } finally {
      setLoading(false);
    }
  };

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
    setError(null);

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

        setImages(prev => [newImage, ...prev]);
        setUploadProgress(100);
        await new Promise(resolve => setTimeout(resolve, 500)); // Show 100% briefly
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // TODO: Add toast notification
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/upload?filename=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      setImages(prev => prev.filter(img => img.id !== id));
      if (selectedImage?.id === id) {
        setSelectedImage(null);
      }
    } catch (error) {
      console.error('Delete error:', error);
      // TODO: Add error toast notification
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <Link
            href="/admin/dashboard"
            className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
        <p className="text-gray-600 mt-2">Upload and manage your images</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

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

      {/* Table View */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
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
            {images.map((image) => (
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
                      onError={(e) => {
                        console.error('Image load error:', image.url);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
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
                      onClick={() => handleCopyUrl(image.url)}
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
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => setSelectedImage(image)}
                      className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors"
                      title="View Details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete Image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image View Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{selectedImage.filename}</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Close"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="relative h-[50px] w-full overflow-hidden rounded-lg bg-gray-100 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </div>
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.filename}
                  fill
                  className="object-contain"
                  unoptimized
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 75vw, 800px"
                  priority
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-gray-500">File Name</span>
                  <span className="text-sm text-gray-900">{selectedImage.filename}</span>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-gray-500">Upload Date</span>
                  <span className="text-sm text-gray-900">
                    {new Date(selectedImage.uploadedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-gray-500">URL</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900 truncate max-w-xl">{selectedImage.url}</span>
                    <button
                      onClick={() => handleCopyUrl(selectedImage.url)}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => handleCopyUrl(selectedImage.url)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy URL
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedImage.id);
                  setSelectedImage(null);
                }}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 