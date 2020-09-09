const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions: { createPage } }) => {

  const locales = ["pl", "en"];

  const componentTemplate = path.resolve(`./wrapPageElement.js`);

  locales.forEach(locale => {
    const prefix = locale === "pl" ? "" : `${locale}`;
    createPage({
      path: `/${prefix}`,
      component: componentTemplate,
      context: { locale }
    });

  });

  const projectsQuery = await graphql(`
    query myData{
      pl: allDatoCmsProject(filter: {locale: {eq: "pl" }}) {
        nodes {
          slug
          locale
        }
      }
      en: allDatoCmsProject(filter: {locale: {eq: "en" }}) {
        nodes {
          slug
          locale
        }
      }
    }
  `)

  // console.log(projectsQuery);

  console.log(projectsQuery.data.pl.nodes)

  projectsQuery.data.pl.nodes.forEach(item => {

          let url = `/${item.locale}/${item.slug}`;
          createPage({
            path: url,
            component: path.resolve(`src/templates/ProjectPage.js`),
            context: {
              myProjectData: item,
            }
          });
        });

        projectsQuery.data.en.nodes.forEach(item => {

          let url = `/${item.locale}/${item.slug}`;
          createPage({
            path: url,
            component: path.resolve(`src/templates/ProjectPage.js`),
            context: {
              myProjectData: item,
            }
          });
        });

};