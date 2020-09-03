const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const locales = ["pl", "en"];

  locales.forEach(locale => {
    const prefix = locale === "pl" ? "" : `/${locale}`;
    createPage({
      path: `${prefix}/`,
      component: path.resolve(`./src/pages/index.js`),
      context: { locale }
    });
  });

  Promise.all(
    locales.map(locale => {
      graphql(`
        {
          homePL: allDatoCmsProject(filter: {locale: {eq: "pl"}}) {
            nodes {
                id
                slug
                locale
                }
            }

          homeEN: allDatoCmsProject(filter: {locale: {eq: "en"}}) {
            nodes {
              id
              slug
              locale
              }
          }

          offer: datoCmsOffer(locale: { eq: "${locale}" }) {
            id
            locale
            slug
          }

        }
      `).then(result => {
        console.log(result);

        // const myLocale = 

        ["offer"].forEach(template => {
            let page = result.data[template];
            const postfix = locale === "pl" ? "" : `${page.locale}`;
            let slug = page.slug;
            createPage({
              path: `${slug}/${postfix}`,
              component: path.resolve(`./src/templates/${template}.js`),
              context: { locale: page.locale }
            });
          });

        result.data.homePL.nodes.forEach(item => {
          const postfix = locale === "pl" ? "" : `${locale}`;
          let url = `/${item.slug}/${postfix}`;
          createPage({
            path: url,
            component: path.resolve(`./src/templates/home.js`),
            context: {
              slug: item.slug,
              locale
            }
          });
        });

        result.data.homeEN.nodes.forEach(item => {
            const postfix = locale === "pl" ? "" : `${locale}`;
            let url = `/${item.slug}/${postfix}`;
            createPage({
              path: url,
              component: path.resolve(`./src/templates/home.js`),
              context: {
                slug: item.slug,
                locale
              }
            });
          });
      });
    })
  );
};