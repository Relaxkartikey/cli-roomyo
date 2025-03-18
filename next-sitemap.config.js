/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://roomyo.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://roomyo.in/server-sitemap.xml',
    ],
  },
  exclude: ['/admin/*', '/api/*'],
  transform: async (config, path) => {
    // Custom transform function
    return {
      loc: path,
      changefreq: 'daily',
      priority: path === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    }
  },
} 