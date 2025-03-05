export const sampleBlogs = [
  {
    title: "Top 10 PG Accommodations in Mumbai for Working Professionals",
    content: "Mumbai, the city of dreams, attracts thousands of working professionals every year. Finding the right PG accommodation can be challenging. In this guide, we'll explore the top 10 PG accommodations that offer the perfect blend of comfort, convenience, and affordability...",
    excerpt: "Discover the best PG accommodations in Mumbai that cater specifically to working professionals, offering premium amenities and convenient locations.",
    author: "Priya Singh",
    category: "Accommodation Guide",
    tags: ["Mumbai", "PG", "Working Professionals", "Accommodation"],
    seoTitle: "Best PG Accommodations in Mumbai for Professionals | Roomyo",
    seoDescription: "Find the top 10 PG accommodations in Mumbai perfect for working professionals. Compare amenities, locations, and prices to make the right choice.",
    seoKeywords: ["Mumbai PG", "Professional accommodation", "Best PG in Mumbai", "Working professional PG"],
    readTime: 8
  },
  {
    title: "How to Choose the Perfect Student Housing in Bangalore",
    content: "As India's IT hub and education center, Bangalore hosts numerous students pursuing their dreams. This comprehensive guide helps students find their ideal accommodation, considering factors like location, budget, amenities, and safety...",
    excerpt: "A complete guide to finding the best student accommodation in Bangalore, with tips on choosing the right location and managing your budget.",
    author: "Rahul Sharma",
    category: "Student Living",
    tags: ["Bangalore", "Student Housing", "Education", "Budget Living"],
    seoTitle: "Student Housing Guide Bangalore | Find Your Perfect Stay | Roomyo",
    seoDescription: "Complete guide to finding student accommodation in Bangalore. Learn about the best areas, pricing, and essential amenities for students.",
    seoKeywords: ["Bangalore student housing", "Student PG Bangalore", "College accommodation", "Student living guide"],
    readTime: 10
  },
  {
    title: "5 Tips for a Smooth Rental Experience in Pune",
    content: "Renting a property in Pune doesn't have to be stressful. From understanding rental agreements to negotiating with landlords, this article covers everything you need to know for a hassle-free rental experience...",
    excerpt: "Essential tips and tricks for renting property in Pune, including legal advice, negotiation strategies, and what to look for in a rental agreement.",
    author: "Aditya Patil",
    category: "Rental Tips",
    tags: ["Pune", "Rental Guide", "Property Tips", "Legal Advice"],
    seoTitle: "Pune Rental Guide: 5 Essential Tips for Tenants | Roomyo",
    seoDescription: "Learn how to have a smooth rental experience in Pune with these 5 essential tips. Expert advice on agreements, negotiations, and tenant rights.",
    seoKeywords: ["Pune rental tips", "Rental agreement guide", "Tenant rights Pune", "Property rental advice"],
    readTime: 6
  }
];

export const seedBlogs = async (strapi) => {
  try {
    for (const blog of sampleBlogs) {
      // Create the blog entry
      const entry = await strapi.entityService.create('api::blog.blog', {
        data: {
          ...blog,
          // Generate slug from title
          slug: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          // Set published date
          publishedAt: new Date(),
        },
      });
      
      console.log(`Created blog: ${entry.title}`);
    }
    
    console.log('Blogs seeding completed successfully');
  } catch (error) {
    console.error('Error seeding blogs:', error);
  }
}; 