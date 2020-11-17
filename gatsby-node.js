const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const locales = ["pl", "en"]

  const componentTemplate = path.resolve(`src/templates/home.js`)

  locales.forEach(locale => {
    const prefix = locale === "pl" ? "" : `${locale}`
    createPage({
      path: `/${prefix}`,
      component: componentTemplate,
      context: { locale },
    })
  })

  locales.forEach(locale => {
    const prefix = locale === "pl" ? `all` : `${locale}/all`
    createPage({
      path: `/${prefix}`,
      component: path.resolve(`src/templates/allProjects.js`),
      context: { locale },
    })
  })

  const aboutPageQuery = await graphql(`
    query aboutPageQuery {
      pl: allDatoCmsAbout(filter: { locale: { eq: "pl" } }) {
        nodes {
          aboutTitle
          aboutContent
          slug
          locale
        }
      }
      en: allDatoCmsAbout(filter: { locale: { eq: "en" } }) {
        nodes {
          aboutTitle
          aboutContent
          slug
          locale
        }
      }
    }
  `)

  aboutPageQuery.data.pl.nodes.forEach(item => {
    const prefix =
      item.locale === "pl" ? `${item.slug}` : `${item.locale}/${item.slug}`
    createPage({
      path: `/${prefix}`,
      component: path.resolve(`src/templates/about.js`),
      context: {
        aboutData: item.aboutTitle,
        locale: item.locale,
      },
    })
  })

  aboutPageQuery.data.en.nodes.forEach(item => {
    const prefix = `${item.locale}/${item.slug}`
    createPage({
      path: `/${prefix}`,
      component: path.resolve(`src/templates/about.js`),
      context: {
        aboutData: item,
        aboutTitle: item.aboutTitle,
        locale: item.locale,
      },
    })
  })

  const thankYouPageQuery = await graphql(`
    query thankYouPageQuery {
      pl: allDatoCmsThankYou(filter: { locale: { eq: "pl" } }) {
        nodes {
          thankYouTitle
          thankYouContent
          slug
          locale
        }
      }
      en: allDatoCmsThankYou(filter: { locale: { eq: "en" } }) {
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
    let url = `/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/thanks.js`),
      context: {
        thankYouData: item.thankYouTitle,
        locale: item.locale,
      },
    })
  })

  thankYouPageQuery.data.en.nodes.forEach(item => {
    let url = `/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/thanks.js`),
      context: {
        thankYouData: item,
        thankYouTitle: item.thankYouTitle,
        locale: item.locale,
      },
    })
  })

  const offerPageQuery = await graphql(`
    query thankYouPageQuery {
      pl: allDatoCmsOffer(filter: { locale: { eq: "pl" } }) {
        nodes {
          slug
          locale
          offerArchitectsLogo {
            fixed {
              src
              base64
            }
          }
          offerInteriorsLogo {
            fixed {
              src
              base64
            }
          }
          offerDesignLogo {
            fixed {
              src
              base64
            }
          }
        }
      }
      en: allDatoCmsOffer(filter: { locale: { eq: "en" } }) {
        nodes {
          slug
          locale
          offerArchitectsLogo {
            fixed {
              src
              base64
            }
          }
          offerInteriorsLogo {
            fixed {
              src
              base64
            }
          }
          offerDesignLogo {
            fixed {
              src
              base64
            }
          }
        }
      }
    }
  `)

  offerPageQuery.data.pl.nodes.forEach(item => {
    let url = `/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/offer.js`),
      context: {
        locale: item.locale,
      },
    })
  })

  offerPageQuery.data.en.nodes.forEach(item => {
    let url = `/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/offer.js`),
      context: {
        locale: item.locale,
      },
    })
  })

  //for getting slug to offer type pages
  const offerPageSlugNamePL = await graphql(`
    query OfferPageSlugNameQuery {
      pl: datoCmsOffer(locale: { eq: "pl" }) {
        slug
      }
    }
  `)

  const offerPageSlugNameEN = await graphql(`
    query OfferPageSlugNameQuery {
      en: datoCmsOffer(locale: { eq: "en" }) {
        slug
      }
    }
  `)

  const houseProjectQuery = await graphql(`
    query HouseProject {
      pl: allDatoCmsHouseProjectForClient(filter: { locale: { eq: "pl" } }) {
        nodes {
          pageName
          slug
          locale
        }
      }
      en: allDatoCmsHouseProjectForClient(filter: { locale: { eq: "en" } }) {
        nodes {
          pageName
          slug
          locale
        }
      }
    }
  `)

  houseProjectQuery.data.pl.nodes.forEach(item => {
    let url = `${offerPageSlugNamePL.data.pl.slug}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/clientHouseProject.js`),
      context: {
        houseProjectData: item.pageName,
        locale: item.locale,
      },
    })
  })

  houseProjectQuery.data.en.nodes.forEach(item => {
    let url = `${offerPageSlugNameEN.data.en.slug}/${item.locale}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/clientHouseProject.js`),
      context: {
        // thankYouData: item,
        // thankYouTitle: item.thankYouTitle,
        locale: item.locale,
      },
    })
  })

  const interiorProjectQuery = await graphql(`
    query interiorProject {
      pl: allDatoCmsInteriorProjectForClient(filter: { locale: { eq: "pl" } }) {
        nodes {
          pageName
          slug
          locale
        }
      }
      en: allDatoCmsInteriorProjectForClient(filter: { locale: { eq: "en" } }) {
        nodes {
          pageName
          slug
          locale
        }
      }
    }
  `)

  interiorProjectQuery.data.pl.nodes.forEach(item => {
    let url = `${offerPageSlugNamePL.data.pl.slug}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/clientInteriorProject.js`),
      context: {
        interiorProjectData: item.pageName,
        locale: item.locale,
      },
    })
  })

  interiorProjectQuery.data.en.nodes.forEach(item => {
    let url = `${offerPageSlugNameEN.data.en.slug}/${item.locale}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/clientInteriorProject.js`),
      context: {
        // thankYouData: item,
        // thankYouTitle: item.thankYouTitle,
        locale: item.locale,
      },
    })
  })

  const designProjectQuery = await graphql(`
    query designProject {
      pl: allDatoCmsDesignProjectForClient(filter: { locale: { eq: "pl" } }) {
        nodes {
          pageName
          slug
          locale
        }
      }
      en: allDatoCmsDesignProjectForClient(filter: { locale: { eq: "en" } }) {
        nodes {
          pageName
          slug
          locale
        }
      }
    }
  `)

  designProjectQuery.data.pl.nodes.forEach(item => {
    let url = `${offerPageSlugNamePL.data.pl.slug}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/clientDesignProject.js`),
      context: {
        designProjectData: item.pageName,
        locale: item.locale,
      },
    })
  })

  designProjectQuery.data.en.nodes.forEach(item => {
    let url = `${offerPageSlugNameEN.data.en.slug}/${item.locale}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/clientDesignProject.js`),
      context: {
        designProjectData: item.pageName,
        locale: item.locale,
      },
    })
  })

  const projectsQuery = await graphql(`
    query myData {
      pl: allDatoCmsProject(filter: { locale: { eq: "pl" } }) {
        nodes {
          slug
          locale
          id
          position
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

      en: allDatoCmsProject(filter: { locale: { eq: "en" } }) {
        nodes {
          slug
          locale
          id
          position
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
    let url = `${item.projectCategory}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/ProjectPage.js`),
      context: {
        myProjectData: item,
        locale: item.locale,
        fullScreenPhoto: item.fullScreenPhoto,
      },
    })
  })

  projectsQuery.data.en.nodes.forEach(item => {
    let url = `/${item.locale}/${item.projectCategory}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/ProjectPage.js`),
      context: {
        myProjectData: item,
        locale: item.locale,
        fullScreenPhoto: item.fullScreenPhoto,
      },
    })
  })

  //category pages

  const categoriesFirstQuery = await graphql(`
    query interiorProject {
      pl: allDatoCmsCategory(filter: { locale: { eq: "pl" } }) {
        nodes {
          categoryFirst
          locale
        }
      }
      en: allDatoCmsCategory(filter: { locale: { eq: "en" } }) {
        nodes {
          categoryFirst
          locale
        }
      }
    }
  `)

  const categoriesSecondQuery = await graphql(`
    query interiorProject {
      pl: allDatoCmsCategory(filter: { locale: { eq: "pl" } }) {
        nodes {
          categorySecond
          locale
        }
      }
      en: allDatoCmsCategory(filter: { locale: { eq: "en" } }) {
        nodes {
          categorySecond
          locale
        }
      }
    }
  `)

  categoriesFirstQuery.data.pl.nodes.forEach(item => {
    let url = `/${item.categoryFirst}`

    createPage({
      path: url,
      component: path.resolve(`src/templates/allProjectsHouse.js`),
      context: {
        // myProjectData: item,
        locale: item.locale,
        // fullScreenPhoto: item.fullScreenPhoto
      },
    })
  })

  categoriesFirstQuery.data.en.nodes.forEach(item => {
    let url = `/${item.locale}/${item.categoryFirst}`

    createPage({
      path: url,
      component: path.resolve(`src/templates/allProjectsHouse.js`),
      context: {
        // myProjectData: item,
        locale: item.locale,
        // fullScreenPhoto: item.fullScreenPhoto
      },
    })
  })

  categoriesSecondQuery.data.pl.nodes.forEach(item => {
    let url = `/${item.categorySecond}`

    createPage({
      path: url,
      component: path.resolve(`src/templates/allProjectsInterior.js`),
      context: {
        // myProjectData: item,
        locale: item.locale,
        // fullScreenPhoto: item.fullScreenPhoto
      },
    })
  })

  categoriesSecondQuery.data.en.nodes.forEach(item => {
    let url = `/${item.locale}/${item.categorySecond}`

    createPage({
      path: url,
      component: path.resolve(`src/templates/allProjectsInterior.js`),
      context: {
        // myProjectData: item,
        locale: item.locale,
        // fullScreenPhoto: item.fullScreenPhoto
      },
    })
  })
}
