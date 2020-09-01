require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby & Wordpress Site`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://benecol.netlify.com/`,
  },
  plugins: [
    `gatsby-plugin-scroll-reveal`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Benecol`,
        short_name: `Benecol`,
        start_url: `/`,
        background_color: `#00afbc`,
        theme_color: `#00afbc`,
        lang: `en`,
        display: `standalone`,
        icon: `src/images/android-icon-192x192.png`, // This path is relative to the root of the site.
        icons: [
          {
            src: `/favicons/android-icon-36x36.png`,
            sizes: `36x36`,
            type: `image/png`,
            density: `0.75`,
          },
          {
            src: `/favicons/android-icon-48x48.png`,
            sizes: `48x48`,
            type: `image/png`,
            density: `1.0`,
          },
          {
            src: `/favicons/android-icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
            density: `1.5`,
          },
          {
            src: `/favicons/android-icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
            density: `2.0`,
          },
          {
            src: `/favicons/android-icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
            density: `3.0`,
          },
          {
            src: `/favicons/android-icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
            density: `4.0`,
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        // I have created a dummy site for us to use with the plugins we discussed
        baseUrl: process.env.GATSBY_API_URL,
        protocol: "http",
        hostingWPCOM: false,
        // We will be using some advanced custom fields
        useACF: true,
        acfOptionPageIds: [],
        verboseOutput: false,
        perPage: 100,
        // Set how many simultaneous requests are sent at once.
        concurrentRequests: 10,
        includedRoutes: [
          "**/categories",
          "**/posts",
          "**/slider",
          "**/faqs",
          "**/*/*/recipe",
          "**/pages",
          "**/media",
          "**/tags",
          "**/taxonomies",
          "**/users",
          "**/*/*/menus", // <== Menu api endpoint
          "**/*/*/menu-locations", // <== Menu api endpoint
        ],
        excludedRoutes: ["**/pages/home"],
        normalizer: function({ entities }) {
          return entities
        },
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
  ],
}
