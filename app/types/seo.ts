import { Metadata } from 'next';

export interface PropertyMetadata extends Metadata {
  propertyDetails?: {
    price?: string;
    location?: string;
    type?: string;
    amenities?: string[];
  };
}

export interface BlogMetadata extends Metadata {
  blogDetails?: {
    author?: string;
    publishDate?: string;
    readTime?: string;
    tags?: string[];
  };
}

export interface SearchMetadata extends Metadata {
  searchParams?: {
    location?: string;
    type?: string;
    price?: string;
    amenities?: string[];
  };
}

export type RoomyoMetadata = PropertyMetadata | BlogMetadata | SearchMetadata; 