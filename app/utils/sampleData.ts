export interface Property {
  id: number;
  name: string;
  location: string;
  category: string;
  prices: Array<{
    type: string;
    price: string;
    priceNumeric: number;
  }>;
  amenities: string[];
  images: string[];  // Multiple images
  description: string;
  privileges: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  fullAddress: string;
  roomType: string;
  mapLocation: {
    lat: number;
    lng: number;
  };
  host: {
    name: string;
    image: string;
    phone: string;
    email: string;
    rating: number;
    responseTime: string;
  };
}

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 1,
    name: "Luxury Rental Spaces in Powai",
    location: "Mumbai",
    category: "Roomyo Spaces",
    prices: [
      { type: "Single Sharing", price: "₹15,000/month", priceNumeric: 15000 },
      { type: "Double Sharing", price: "₹10,000/month", priceNumeric: 10000 },
      { type: "Triple Sharing", price: "₹8,000/month", priceNumeric: 8000 }
    ],
    amenities: ["AC", "Wifi", "Furnished", "Food"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
    ],
    description: "Experience luxury living in the heart of Powai. This fully furnished Rental Spaces offers modern amenities, spacious rooms, and a vibrant community. Perfect for young professionals and students looking for a premium living experience.",
    privileges: [
      {
        icon: "wifi",
        title: "High-Speed Internet",
        description: "24/7 unlimited high-speed wifi access"
      },
      {
        icon: "utensils",
        title: "Meals Included",
        description: "Breakfast, lunch, and dinner provided"
      },
      {
        icon: "shield",
        title: "Security",
        description: "24/7 security with CCTV surveillance"
      },
      {
        icon: "broom",
        title: "Housekeeping",
        description: "Daily room cleaning service"
      }
    ],
    fullAddress: "123 Hiranandani Gardens, Powai, Mumbai, Maharashtra 400076",
    roomType: "Single Occupancy",
    mapLocation: {
      lat: 19.1190,
      lng: 72.9023
    },
    host: {
      name: "Rahul Sharma",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3",
      phone: "+91 98765 43210",
      email: "rahul@roomyo.com",
      rating: 4.8,
      responseTime: "Usually responds in 1 hour"
    }
  },
  {
    id: 2,
    name: "Modern Apartment in HSR",
    location: "Bangalore",
    category: "Rent Roomyo",
    prices: [
      { type: "1BHK", price: "₹25,000/month", priceNumeric: 25000 },
      { type: "2BHK", price: "₹35,000/month", priceNumeric: 35000 },
      { type: "3BHK", price: "₹45,000/month", priceNumeric: 45000 }
    ],
    amenities: ["Parking", "Gym", "Security", "Pool"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
    ],
    description: "Luxurious 2BHK apartment in prime HSR Layout. Features modern amenities, spacious balcony, and premium fittings. Part of a gated community with excellent facilities including gym and swimming pool.",
    privileges: [
      {
        icon: "car",
        title: "Reserved Parking",
        description: "Dedicated covered parking spot"
      },
      {
        icon: "dumbbell",
        title: "Fitness Center",
        description: "Modern gym with latest equipment"
      },
      {
        icon: "swimming",
        title: "Swimming Pool",
        description: "Temperature controlled pool"
      },
      {
        icon: "park",
        title: "Garden Access",
        description: "Beautiful landscaped gardens"
      }
    ],
    fullAddress: "42 HSR Layout Sector 2, Bangalore, Karnataka 560102",
    roomType: "2BHK Apartment",
    mapLocation: {
      lat: 12.9141,
      lng: 77.6466
    },
    host: {
      name: "Priya Patel",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
      phone: "+91 98765 12345",
      email: "priya@roomyo.com",
      rating: 4.9,
      responseTime: "Usually responds in 30 minutes"
    }
  },
  {
    id: 3,
    name: "Cozy Studio in Koramangala",
    location: "Bangalore",
    category: "Roomyo Spaces",
    prices: [
      { type: "Studio", price: "₹18,000/month", priceNumeric: 18000 }
    ],
    amenities: ["Furnished", "Security", "Wifi", "Laundry"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
    ],
    description: "Modern studio apartment in the heart of Koramangala. Fully furnished with contemporary design and all essential amenities. Perfect for young professionals seeking a convenient and comfortable living space.",
    privileges: [
      {
        icon: "furniture",
        title: "Fully Furnished",
        description: "Modern furniture and appliances"
      },
      {
        icon: "wifi",
        title: "High-Speed Internet",
        description: "Fiber-optic internet connection"
      },
      {
        icon: "washer",
        title: "Laundry Service",
        description: "In-house laundry facilities"
      },
      {
        icon: "shield",
        title: "24/7 Security",
        description: "Gated community with security"
      }
    ],
    fullAddress: "78 Koramangala 4th Block, Bangalore, Karnataka 560034",
    roomType: "Studio Apartment",
    mapLocation: {
      lat: 12.9279,
      lng: 77.6271
    },
    host: {
      name: "Arun Kumar",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
      phone: "+91 98765 98765",
      email: "arun@roomyo.com",
      rating: 4.7,
      responseTime: "Usually responds in 2 hours"
    }
  },
  {
    id: 4,
    name: "Premium Rental Spaces in Andheri",
    location: "Mumbai",
    category: "Roomyo Spaces",
    prices: [
      { type: "Single Room", price: "₹17,000/month", priceNumeric: 17000 },
      { type: "Double Sharing", price: "₹12,000/month", priceNumeric: 12000 }
    ],
    amenities: ["AC", "Gym", "Food", "Wifi"],
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
    ],
    description: "Luxurious Rental Spaces accommodation in the heart of Andheri. Features modern amenities, spacious rooms, and a vibrant community. Perfect for working professionals seeking comfort and convenience.",
    privileges: [
      {
        icon: "dumbbell",
        title: "Modern Gym",
        description: "Fully equipped gym with trainers"
      },
      {
        icon: "utensils",
        title: "Gourmet Meals",
        description: "Three nutritious meals daily"
      },
      {
        icon: "wifi",
        title: "High-Speed Internet",
        description: "Unlimited 100Mbps connection"
      },
      {
        icon: "couch",
        title: "Common Area",
        description: "Spacious lounge and recreation area"
      }
    ],
    fullAddress: "45 Lokhandwala Complex, Andheri West, Mumbai, Maharashtra 400053",
    roomType: "Double Occupancy",
    mapLocation: {
      lat: 19.1367,
      lng: 72.8296
    },
    host: {
      name: "Amit Shah",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3",
      phone: "+91 98765 87654",
      email: "amit@roomyo.com",
      rating: 4.7,
      responseTime: "Usually responds in 3 hours"
    }
  },
  {
    id: 5,
    name: "Deluxe Apartment in Indiranagar",
    location: "Bangalore",
    category: "Rent Roomyo",
    prices: [
      { type: "2BHK", price: "₹35,000/month", priceNumeric: 35000 },
      { type: "3BHK", price: "₹48,000/month", priceNumeric: 48000 }
    ],
    amenities: ["Modular Kitchen", "Parking", "Security", "Garden"],
    images: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
    ],
    description: "Elegant 3BHK apartment in upscale Indiranagar. Features premium finishes, modern kitchen, and spacious balconies. Located close to metro station and shopping districts.",
    privileges: [
      {
        icon: "kitchen",
        title: "Modular Kitchen",
        description: "Fully equipped modern kitchen"
      },
      {
        icon: "car",
        title: "Covered Parking",
        description: "Two dedicated parking spots"
      },
      {
        icon: "tree",
        title: "Garden Access",
        description: "Private garden and sitting area"
      },
      {
        icon: "shield",
        title: "24/7 Security",
        description: "CCTV and guard service"
      }
    ],
    fullAddress: "123 Indiranagar 100ft Road, Bangalore, Karnataka 560038",
    roomType: "3BHK Apartment",
    mapLocation: {
      lat: 12.9784,
      lng: 77.6408
    },
    host: {
      name: "Maya Reddy",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
      phone: "+91 98765 65432",
      email: "maya@roomyo.com",
      rating: 4.9,
      responseTime: "Usually responds in 1 hour"
    }
  },
  {
    id: 6,
    name: "Student Rental Spaces in Viman Nagar",
    location: "Pune",
    category: "Roomyo Spaces",
    prices: [
      { type: "Single Room", price: "₹12,000/month", priceNumeric: 12000 }
    ],
    amenities: ["Study Room", "Wifi", "Food", "Library"],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
    ],
    description: "Student-friendly Rental Spaces with dedicated study areas and high-speed internet. Features a well-stocked library and comfortable rooms. Perfect for students and young learners.",
    privileges: [
      {
        icon: "book",
        title: "Study Room",
        description: "24/7 access to study areas"
      },
      {
        icon: "wifi",
        title: "Fast Internet",
        description: "Dedicated connection for studies"
      },
      {
        icon: "utensils",
        title: "Healthy Meals",
        description: "Nutritious vegetarian food"
      },
      {
        icon: "books",
        title: "Library",
        description: "Well-stocked reading room"
      }
    ],
    fullAddress: "78 Viman Nagar Road, Pune, Maharashtra 411014",
    roomType: "Triple Sharing",
    mapLocation: {
      lat: 18.5679,
      lng: 73.9143
    },
    host: {
      name: "Suresh Patel",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3",
      phone: "+91 98765 23456",
      email: "suresh@roomyo.com",
      rating: 4.6,
      responseTime: "Usually responds in 2 hours"
    }
  }
]; 