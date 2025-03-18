## BAckend of Roomyo
    - now we will work to connect the backend of strapi in backend folder by following data variables of frontend at /space and /space/[slug]


### Below is the dataset of Propety with example of sample data to be updated by the admin panel (based on firebase) and some suggestin in comment for treating data correctly.

        - also optional fields are commented with optional and few needed changes by remove or updates

```
export interface Property {
  id: number; // serial no (auto generate per property from 1 to n)
  name: string; // Text field
  location: string; // Highligh of address (Locality only) in text field
  category: string; // give single selection option b/w Roomyo Space, Rent Roomyo, other (text string)
  prices: Array<{
    type: string; // text field applied in backend to fill
    price: string; // enter pricing in numbers (min: rs 500)
    priceNumeric: number; // remove it and renamed it as priceperiod per selection like day, monthly, yearly, other (text field)
  }>;
  amenities: string[]; (give selection options lot of and other option)
  images: string[];  // Multiple images (let me also enter external src url for images to save data from DB)
  description: string; // as text editor field
  privileges: Array<{ //privileges should be fixed 6 as per marketing data and sample data and should have other option to add more (6 allowed per property)
    icon: string; //icons not showing in frontend  fix that
    title: string; //text field in backend
    description: string; //text field in backend
  }>;
  fullAddress: string; // text field to give full address
  roomType: string; // text field
  mapLocation: {  // replace it as url link to enter but not lat and lng
    lat: number;
    lng: number;
  };
  host: { 
    name: string; 
    image: string; //remove
    phone: string; //optional
    email: string; //optional
    rating: number; //remove
    responseTime: string; //remove
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
```


