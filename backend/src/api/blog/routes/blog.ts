export default {
  routes: [
    // Default routes
    {
      method: 'GET',
      path: '/blogs',
      handler: 'blog.find',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/blogs/:id',
      handler: 'blog.findOne',
      config: {
        auth: false
      }
    },
    // Custom routes
    {
      method: 'GET',
      path: '/blogs/slug/:slug',
      handler: 'blog.findBySlug',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/blogs/:id/related',
      handler: 'blog.findRelated',
      config: {
        auth: false
      }
    }
  ]
}; 