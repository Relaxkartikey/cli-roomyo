export const sampleSpaces = [
  {
    title: "Luxury PG in Andheri West",
    description: "Modern fully furnished PG accommodation with all amenities. Perfect for working professionals and students. Located in prime area with easy access to metro and local stations.",
    location: "Mumbai",
    address: "Near Metro Station, Andheri West, Mumbai, Maharashtra - 400053",
    category: "Roomyo Spaces",
    price: 18000,
    priceNumeric: 18000,
    roomType: "Single Occupancy",
    hostName: "Amit Shah",
    hostRating: 4.8,
    hostResponseTime: "2 hours",
    hostEmail: "amit.shah@roomyo.com",
    hostPhone: "+91 9876543210",
    amenities: {
      wifi: true,
      ac: true,
      food: true,
      laundry: true,
      cleaning: true,
      parking: true,
      gym: true,
      study_room: true,
      power_backup: true,
      security: true,
      cctv: true,
      lift: true,
      other_amenities: "Recreation room, Terrace garden"
    },
    privileges: {
      no_security_deposit: false,
      flexible_payment: true,
      all_inclusive_price: true,
      maintenance_included: true,
      utility_included: true,
      flexible_move_in: true,
      flexible_move_out: true,
      short_term_allowed: false,
      couples_allowed: false,
      pets_allowed: false,
      visitors_allowed: true,
      cooking_allowed: false,
      other_privileges: "24/7 guest entry allowed"
    }
  },
  {
    title: "3BHK Apartment in Indiranagar",
    description: "Spacious 3BHK apartment in the heart of Indiranagar. Fully furnished with modern amenities. Perfect for families or working professionals looking for a premium living experience.",
    location: "Bangalore",
    address: "100 Feet Road, Indiranagar, Bangalore, Karnataka - 560038",
    category: "Rent Roomyo",
    price: 45000,
    priceNumeric: 45000,
    roomType: "3BHK",
    hostName: "Maya Reddy",
    hostRating: 4.9,
    hostResponseTime: "1 hour",
    hostEmail: "maya.reddy@roomyo.com",
    hostPhone: "+91 9876543211",
    amenities: {
      wifi: true,
      ac: true,
      food: false,
      laundry: false,
      cleaning: true,
      parking: true,
      gym: true,
      study_room: false,
      power_backup: true,
      security: true,
      cctv: true,
      lift: true,
      other_amenities: "Swimming pool, Club house"
    },
    privileges: {
      no_security_deposit: false,
      flexible_payment: true,
      all_inclusive_price: false,
      maintenance_included: true,
      utility_included: false,
      flexible_move_in: true,
      flexible_move_out: false,
      short_term_allowed: false,
      couples_allowed: true,
      pets_allowed: true,
      visitors_allowed: true,
      cooking_allowed: true,
      other_privileges: "Society club membership included"
    }
  },
  {
    title: "Student PG in Viman Nagar",
    description: "Comfortable PG accommodation specially designed for students. Located near major educational institutions with dedicated study areas and high-speed internet.",
    location: "Pune",
    address: "Near Phoenix Mall, Viman Nagar, Pune, Maharashtra - 411014",
    category: "Roomyo Spaces",
    price: 12000,
    priceNumeric: 12000,
    roomType: "Double Sharing",
    hostName: "Suresh Patel",
    hostRating: 4.6,
    hostResponseTime: "3 hours",
    hostEmail: "suresh.patel@roomyo.com",
    hostPhone: "+91 9876543212",
    amenities: {
      wifi: true,
      ac: true,
      food: true,
      laundry: true,
      cleaning: true,
      parking: false,
      gym: false,
      study_room: true,
      power_backup: true,
      security: true,
      cctv: true,
      lift: true,
      other_amenities: "Library, Reading room"
    },
    privileges: {
      no_security_deposit: true,
      flexible_payment: true,
      all_inclusive_price: true,
      maintenance_included: true,
      utility_included: true,
      flexible_move_in: true,
      flexible_move_out: true,
      short_term_allowed: true,
      couples_allowed: false,
      pets_allowed: false,
      visitors_allowed: true,
      cooking_allowed: false,
      other_privileges: "Educational counseling available"
    }
  }
];

export const seedSpaces = async (strapi) => {
  try {
    for (const space of sampleSpaces) {
      // Create the space entry
      const entry = await strapi.entityService.create('api::space.space', {
        data: {
          ...space,
          // Generate slug from title
          slug: space.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          // Set as published
          publishedAt: new Date(),
        },
      });
      
      console.log(`Created space: ${entry.title}`);
    }
    
    console.log('Spaces seeding completed successfully');
  } catch (error) {
    console.error('Error seeding spaces:', error);
  }
}; 