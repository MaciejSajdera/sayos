const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions: { createPage } }) => {


  const locales = ["pl", "en"];

  const componentTemplate = path.resolve(`src/templates/index.js`);

  locales.forEach(locale => {
    const prefix = locale === 'pl' ? "" : `${locale}`;
    createPage({
      path: `/${prefix}`,
      component: componentTemplate,
      context: { locale }
    });
  });


  locales.forEach(locale => {
    const prefix = `allprojects`;
    createPage({
      path: `/${prefix}`,
      component: path.resolve(`src/templates/ProjectPage.js`),
      context: { locale }
    });
  });

  const projectsQuery = await graphql(`
    query myData{

      menuRight: allDatoCmsMenuRight(filter: {locale: {eq: "pl"}}) {
        nodes {
          locale
          id
          adressData1
          adressData2
          phoneNumber
          emailAdress
        }
      }


      pl: allDatoCmsProject(filter: {locale: {eq: "pl" }}) {
        nodes {
          slug
          locale
          id
          position
          thumbnail {
            fluid {
              src
              base64
              srcSet
            }
          }
          titlePart1
          titlePart2
          readMore
          fullScreenPhoto {
            fluid {
              src
              base64
              srcSet
            }
          }
          secondaryPhoto {
            fluid {
              src
              base64
              srcSet
            }
          }
          projectDescription
          areaText
          areaValue
          fullScreenPhotoTwo {
            fluid {
              src
              base64
              srcSet
            }
          }
        }
      }
      en: allDatoCmsProject(filter: {locale: {eq: "en" }}) {
        nodes {
          slug
          locale
          id
          position
          thumbnail {
            fluid {
              src
              base64
              srcSet
            }
          }
          titlePart1
          titlePart2
          readMore
          fullScreenPhoto {
            fluid {
              src
              base64
              srcSet
            }
          }
          secondaryPhoto {
            fluid {
              src
              base64
              srcSet
            }
          }
          projectDescription
          areaText
          areaValue
          fullScreenPhotoTwo {
            fluid {
              src
              base64
              srcSet
            }
          }
        }
      }
    }
  `)

  projectsQuery.data.pl.nodes.forEach(item => {

          let url = `/${item.locale}/${item.slug}`;
          createPage({
            path: url,
            component: path.resolve(`src/templates/ProjectPage.js`),
            context: {
              myProjectData: item,
              locale: item.locale
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
              locale: item.locale
            }
          });
  });


};
