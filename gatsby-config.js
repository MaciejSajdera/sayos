module.exports = {
  siteMetadata: {
    title: `Sayos Architects`,
    description: `Sayos Architects`,
    author: `Maciek Sajdera`,
    siteURL: "https://sayos.eu",
    keywords: [`sayos`, `architecture`, `houses`, `apartments`, `sayos.eu`],
    logo: `src/images/short-logo.png`,
  },
  plugins: [
    // `gatsby-plugin-glamor`,
    `gatsby-plugin-root-import`,
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    // `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-sass",
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Mulish\:200,300,400,700`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },
    // {
    //   resolve: "gatsby-plugin-web-font-loader",
    //   options: {
    //     fonts: {
    //       google: [
    //         {
    //           family: "Mulish",
    //           variants: [
    //             "300",
    //             "600",
    //             "700",
    //           ],
    //         },
    //       ],
    //     },
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sayos Architects`,
        short_name: `Sayos Architects`,
        start_url: `/`,
        background_color: `#0c0c0c`,
        theme_color: `#0c0c0c`,
        display: `minimal-ui`,
        icon: `src/images/manifest-logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        // You can find your read-only API token under the Settings > API tokens
        // section of your administrative area:
        apiToken: `b5021fc973eef94f7a89248c9e3758`,
        // If you are working on development/staging environment, you might want to
        // preview the latest version of records instead of the published one:
        previewMode: false,

        // Disable automatic reloading of content when some change occurs on DatoCMS:
        disableLiveReload: false,

        // Custom API base URL (most don't need this)
        // apiUrl: 'https://site-api.datocms.com',

        // Setup locale fallbacks
        // In this example, if some field value is missing in Italian, fall back to English
        // localeFallbacks: {
        //   it: ['en'],
        // },
      },
    },
  ],
}
