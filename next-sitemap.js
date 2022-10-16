
module.exports = {
    siteUrl: 'https://jetztstrom.de',
    generateRobotsTxt: true,
    priority: 0.7,
    exclude: ['/sitemap.xml'], 
    sitemapSize: 4000,
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://jetztstrom.de/sitemap.xml',
        'https://jetztstrom.de/sitemap-1.xml',
      ],
    },
  }