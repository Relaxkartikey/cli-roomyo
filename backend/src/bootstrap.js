'use strict';

const { sampleSpaces } = require('./seed/spaces');
const { sampleBlogs } = require('./seed/blogs');

module.exports = async ({ strapi }) => {
  // Check if we should run seeds
  const shouldSeed = process.argv.includes('--seed');
  
  if (shouldSeed) {
    try {
      // Clean existing data first
      await strapi.db.query('api::space.space').deleteMany();
      await strapi.db.query('api::blog.blog').deleteMany();
      
      console.log('Existing data cleaned successfully');

      // Seed spaces
      for (const space of sampleSpaces) {
        await strapi.entityService.create('api::space.space', {
          data: {
            ...space,
            slug: space.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            publishedAt: new Date(),
          },
        });
      }
      console.log('Spaces seeded successfully');

      // Seed blogs
      for (const blog of sampleBlogs) {
        await strapi.entityService.create('api::blog.blog', {
          data: {
            ...blog,
            slug: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            publishedAt: new Date(),
          },
        });
      }
      console.log('Blogs seeded successfully');

      console.log('All seed data created successfully');
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }
}; 