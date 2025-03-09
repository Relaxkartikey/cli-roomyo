"use client";
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Locality {
  id: string;
  name: string;
}

export default function LocalitiesPage() {
  const [localities, setLocalities] = useState<Locality[]>([]);
  const [newLocality, setNewLocality] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocalities();
  }, []);

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

  const handleAddLocality = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocality.trim()) return;

    try {
      const localitiesRef = collection(db, 'localities');
      await addDoc(localitiesRef, {
        name: newLocality.trim(),
      });
      setNewLocality('');
      fetchLocalities();
    } catch (error) {
      console.error('Error adding locality:', error);
    }
  };

  const handleDeleteLocality = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this locality?')) return;

    try {
      await deleteDoc(doc(db, 'localities', id));
      fetchLocalities();
    } catch (error) {
      console.error('Error deleting locality:', error);
    }
  };

  const startEditing = (locality: Locality) => {
    setEditingId(locality.id);
    setEditingName(locality.name);
  };

  const handleUpdateLocality = async () => {
    if (!editingId || !editingName.trim()) return;

    try {
      await updateDoc(doc(db, 'localities', editingId), {
        name: editingName.trim(),
      });
      setEditingId(null);
      setEditingName('');
      fetchLocalities();
    } catch (error) {
      console.error('Error updating locality:', error);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-secondary pb-16">
        <div className="max-w-7xl mx-auto px-4 p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">Locality Manager</h1>
            <Link
              href="/admin/dashboard"
              className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>

          {/* Add New Locality Form */}
          <form onSubmit={handleAddLocality} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={newLocality}
                onChange={(e) => setNewLocality(e.target.value)}
                placeholder="Enter new locality name"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Locality
              </button>
            </div>
          </form>

          {/* Localities List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              {localities.map((locality) => (
                <div
                  key={locality.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  {editingId === locality.id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary mr-4"
                    />
                  ) : (
                    <span className="text-gray-700">{locality.name}</span>
                  )}
                  <div className="flex items-center gap-2">
                    {editingId === locality.id ? (
                      <>
                        <button
                          onClick={handleUpdateLocality}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(locality)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteLocality(locality.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {localities.length === 0 && !loading && (
                <p className="text-center text-gray-500 py-4">No localities found. Add one above.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
} 