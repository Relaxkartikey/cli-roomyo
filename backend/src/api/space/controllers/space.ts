import { factories } from '@strapi/strapi';
import { Context } from 'koa';

interface SpaceFilters {
  location?: string;
  category?: string;
  price?: {
    $gte?: number;
    $lte?: number;
  };
}

interface QueryParams {
  filters?: SpaceFilters;
  location?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export default factories.createCoreController('api::space.space', ({ strapi }) => ({
  // Find spaces with filters
  async find(ctx: Context) {
    const query = ctx.query as QueryParams;
    const existingFilters = query.filters || {};
    
    // Build filters object
    if (query.location) existingFilters.location = query.location;
    if (query.category) existingFilters.category = query.category;
    if (query.minPrice) existingFilters.price = { ...existingFilters.price, $gte: query.minPrice };
    if (query.maxPrice) existingFilters.price = { ...existingFilters.price, $lte: query.maxPrice };

    // Update query filters
    query.filters = existingFilters;

    // Call the default find method
    const { data, meta } = await super.find(ctx);
    
    return { data, meta };
  },

  // Find one space by slug
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    
    const entity = await strapi.db.query('api::space.space').findOne({
      where: { slug },
      populate: ['images']
    });

    if (!entity) {
      return ctx.notFound('Space not found');
    }

    return { data: entity };
  },

  // Find related spaces
  async findRelated(ctx) {
    const { id } = ctx.params;
    const { category } = await strapi.db.query('api::space.space').findOne({
      where: { id },
      select: ['category']
    });

    const relatedSpaces = await strapi.db.query('api::space.space').findMany({
      where: {
        category,
        id: { $ne: id }
      },
      limit: 3
    });

    return { data: relatedSpaces };
  }
})); 