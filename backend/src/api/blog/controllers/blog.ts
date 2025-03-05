import { factories } from '@strapi/strapi';
import { Context } from 'koa';

interface BlogFilters {
  category?: string;
  tags?: {
    $contains?: string;
  };
}

interface QueryParams {
  filters?: BlogFilters;
  category?: string;
  tag?: string;
}

export default factories.createCoreController('api::blog.blog', ({ strapi }) => ({
  // Find blogs with filters
  async find(ctx: Context) {
    const query = ctx.query as QueryParams;
    const existingFilters = query.filters || {};
    
    // Build filters object
    if (query.category) existingFilters.category = query.category;
    if (query.tag) existingFilters.tags = { $contains: query.tag };

    // Update query filters
    query.filters = existingFilters;

    // Call the default find method
    const { data, meta } = await super.find(ctx);
    
    return { data, meta };
  },

  // Find one blog by slug
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    
    const entity = await strapi.db.query('api::blog.blog').findOne({
      where: { slug },
      populate: ['coverImage']
    });

    if (!entity) {
      return ctx.notFound('Blog not found');
    }

    return { data: entity };
  },

  // Find related blogs
  async findRelated(ctx) {
    const { id } = ctx.params;
    const { category, tags } = await strapi.db.query('api::blog.blog').findOne({
      where: { id },
      select: ['category', 'tags']
    });

    const relatedBlogs = await strapi.db.query('api::blog.blog').findMany({
      where: {
        $or: [
          { category },
          { tags: { $containsAny: tags } }
        ],
        id: { $ne: id }
      },
      limit: 3,
      orderBy: { publishedAt: 'desc' }
    });

    return { data: relatedBlogs };
  }
})); 