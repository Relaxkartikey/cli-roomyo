export default {
  routes: [
    // Default routes
    {
      method: 'GET',
      path: '/spaces',
      handler: 'space.find',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/spaces/:id',
      handler: 'space.findOne',
      config: {
        auth: false
      }
    },
    // Custom routes
    {
      method: 'GET',
      path: '/spaces/slug/:slug',
      handler: 'space.findBySlug',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/spaces/:id/related',
      handler: 'space.findRelated',
      config: {
        auth: false
      }
    }
  ]
}; 