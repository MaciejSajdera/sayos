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

  const menuPagesQuery = await graphql(`
  query MyMenuPagesQuery {
    pl: allDatoCmsAbout(filter: {locale: {eq: "pl"}}) {
      nodes {
        aboutTitle
        aboutContent
        slug
        locale
      }
    }
    en: allDatoCmsAbout(filter: {locale: {eq: "en"}}) {
      nodes {
        aboutTitle
        aboutContent
        slug
        locale
      }
    }
  }
  `)

  menuPagesQuery.data.pl.nodes.forEach(item => {
    const prefix = item.locale === 'pl' ? `${item.slug}` : `${item.locale}/${item.slug}`;
    createPage({
      path: `/${prefix}`,
      component: path.resolve(`src/templates/about.js`),
      context: {
        aboutData: item.aboutTitle,
        locale: item.locale,
      }
    });
});


menuPagesQuery.data.en.nodes.forEach(item => {
  const prefix = `${item.locale}/${item.slug}`;
  createPage({
    path: `/${prefix}`,
    component: path.resolve(`src/templates/about.js`),
    context: {
      aboutData: item,
      aboutTitle: item.aboutTitle,
      locale: item.locale,
    }
  });
});

  const thankYouPageQuery = await graphql(`
  query thankYouPageQuery {
    pl: allDatoCmsThankYou(filter: {locale: {eq: "pl"}}) {
      nodes {
        thankYouTitle
        thankYouContent
        slug
        locale
      }
    }
    en: allDatoCmsThankYou(filter: {locale: {eq: "en"}}) {
      nodes {
        thankYouTitle
        thankYouContent
        slug
        locale
      }
    }
  }
  `)

  thankYouPageQuery.data.pl.nodes.forEach(item => {
    let url = `/${item.slug}`;
    createPage({
      path: url,
      component: path.resolve(`src/templates/thanks.js`),
      context: {
        thankYouData: item.thankYouTitle,
        locale: item.locale,
      }
    });
  });


  thankYouPageQuery.data.en.nodes.forEach(item => {
  let url = `/${item.slug}`;
  createPage({
    path: url,
    component: path.resolve(`src/templates/thanks.js`),
    context: {
      thankYouData: item,
      thankYouTitle: item.thankYouTitle,
      locale: item.locale,
    }
  });
  });


  const houseProjectQuery = await graphql(`
  query HouseProject {
    pl: allDatoCmsHouseProjectForClient(filter: {locale: {eq: "pl"}}) {
      nodes {
        pageName
        slug
        locale
      }
    }
    en: allDatoCmsHouseProjectForClient(filter: {locale: {eq: "en"}}) {
      nodes {
        pageName
        slug
        locale
      }
    }
  }
  `)

  houseProjectQuery.data.pl.nodes.forEach(item => {
    let url = `/${item.slug}`;
    createPage({
      path: url,
      component: path.resolve(`src/templates/client-house-project.js`),
      context: {
        houseProjectData: item.pageName,
        locale: item.locale,
      }
    });
  });


  houseProjectQuery.data.en.nodes.forEach(item => {
  let url = `${item.locale}/${item.slug}`;
  createPage({
    path: url,
    component: path.resolve(`src/templates/client-house-project.js`),
    context: {
      // thankYouData: item,
      // thankYouTitle: item.thankYouTitle,
      locale: item.locale,
    }
  });
  });



  const projectsQuery = await graphql(`
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
          projectCategory
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
          projectCategory
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

          let url = `${item.projectCategory}/${item.slug}`;
          createPage({
            path: url,
            component: path.resolve(`src/templates/ProjectPage.js`),
            context: {
              myProjectData: item,
              locale: item.locale,
              fullScreenPhoto: item.fullScreenPhoto
            }
          });
  });

  projectsQuery.data.en.nodes.forEach(item => {

          let url = `/${item.locale}/${item.projectCategory}/${item.slug}`;
          createPage({
            path: url,
            component: path.resolve(`src/templates/ProjectPage.js`),
            context: {
              myProjectData: item,
              locale: item.locale,
              fullScreenPhoto: item.fullScreenPhoto
            }
          });
  });


};
