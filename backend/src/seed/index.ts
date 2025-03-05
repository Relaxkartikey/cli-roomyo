import { seedSpaces } from './spaces';
import { seedBlogs } from './blogs';

export default {
  async seed({ strapi }) {
    if (process.env.NODE_ENV === 'development') {
      // Run all seed functions
      await seedSpaces(strapi);
      await seedBlogs(strapi);
      
      console.log('All seed data has been created successfully');
    }
  },
}; 