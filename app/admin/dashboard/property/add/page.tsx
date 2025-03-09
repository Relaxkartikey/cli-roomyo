"use client";
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Property } from '@/app/types/property';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const initialFormData: Property = {
  name: '',
  description: '',
  location: '',
  fullAddress: '',
  mapLocation: '',
  category: '',
  roomType: '',
  images: [],
  amenities: [],
  prices: [],
  host: {
    name: '',
    position: '',
    phone: '',
    email: '',
  },
  privileges: [],
  status: 'Available',
  createdAt: Date.now()
};

export default function AddPropertyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Property>(initialFormData);
  const [localities, setLocalities] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocalities = async () => {
      try {
        const localitiesRef = collection(db, 'localities');
        const snapshot = await getDocs(localitiesRef);
        const localitiesList = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setLocalities(localitiesList);
      } catch (error) {
        console.error('Error fetching localities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocalities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'properties'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      router.push('/admin/dashboard/property');
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-secondary pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Add New Property</h1>
          <Link
            href="/admin/dashboard/property"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Properties
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Property Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              >
                <option value="">Select Location</option>
                {localities.map((locality) => (
                  <option key={locality.id} value={locality.name}>
                    {locality.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Add other form fields as needed */}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 