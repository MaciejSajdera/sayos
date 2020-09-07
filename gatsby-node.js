const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions: { createPage } }) => {


  const result = await graphql(`
    query myData{
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

  // console.log(result);

  const locales = result.data;

  const componentTemplate = path.resolve(`src/templates/home.js`);

  // console.log(locales);

  Object.entries(locales).forEach(([locale, nodes]) => {

    const urlBase = `${locale}`;

    Object.entries(nodes).forEach((node) => {
      
      node.forEach((item) => {

      createPage({
      path: `/${urlBase}/`,
      component: componentTemplate,
      context: {
         myHomeData: item
         }
    });


      })
    })

  });

  console.log(result.data.pl.nodes)

        result.data.pl.nodes.forEach(item => {

          let url = `/${item.slug}/${item.locale}`;
          createPage({
            path: url,
            component: path.resolve(`src/pages/ProjectPage.js`),
            context: {
              myProjectData: item,
            }
          });
        });

        result.data.en.nodes.forEach(item => {

          let url = `/${item.slug}/${item.locale}`;
          createPage({
            path: url,
            component: path.resolve(`src/pages/ProjectPage.js`),
            context: {
              myProjectData: item,
            }
          });
        });

};