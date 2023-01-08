const path = require(`path`)

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const locales = ["pl", "en"]

  const homeTemplate = path.resolve(`src/templates/home.js`)

  locales.forEach(locale => {
    const prefix = locale === "pl" ? "" : `${locale}`
    createPage({
      path: `/${prefix}`,
      component: homeTemplate,
      context: { locale },
    })
  })

  const allProjectsTemplate = path.resolve(`src/templates/allProjects.js`)

  locales.forEach(locale => {
    const prefix = locale === "pl" ? `all` : `${locale}/all`
    createPage({
      path: `/${prefix}`,
      component: allProjectsTemplate,
      context: { locale },
    })
  })

  const allPublicationsTemplate = path.resolve(
    `src/templates/allPublications.js`
  )

  locales.forEach(locale => {
    const prefix = locale === "pl" ? `publikacje` : `${locale}/media`
    createPage({
      path: `/${prefix}`,
      component: allPublicationsTemplate,
      context: { locale },
    })
  })

  const aboutPageQuery = await graphql(`
    query aboutPageQuery {
      pl: allDatoCmsAbout(filter: { locales: { eq: "pl" } }) {
        nodes {
          aboutTitle
          aboutContent
          slug
          locales
        }
      }
      en: allDatoCmsAbout(filter: { locales: { eq: "en" } }) {
        nodes {
          aboutTitle
          aboutContent
          slug
          locales
        }
      }
    }
  `)

  aboutPageQuery.data.pl.nodes.forEach(item => {
    createPage({
      path: `/${item.slug}`,
      component: path.resolve(`src/templates/about.js`),
      context: {
        aboutData: item.aboutTitle,
        locale: "pl",
      },
    })
  })

  aboutPageQuery.data.en.nodes.forEach(item => {
    createPage({
      path: `/en/${item.slug}`,
      component: path.resolve(`src/templates/about.js`),
      context: {
        aboutData: item,
        aboutTitle: item.aboutTitle,
        locale: "en",
      },
    })
  })

  const thankYouPageQuery = await graphql(`
    query thankYouPageQuery {
      pl: allDatoCmsThankYou(filter: { locales: { eq: "pl" } }) {
        nodes {
          thankYouTitle
          thankYouContent
          slug
          locales
        }
      }
      en: allDatoCmsThankYou(filter: { locales: { eq: "en" } }) {
        nodes {
          thankYouTitle
          thankYouContent
          slug
          locales
        }
      }
    }
  `)

  thankYouPageQuery.data.pl.nodes.forEach(item => {
    createPage({
      path: `/${item.slug}`,
      component: path.resolve(`src/templates/thanks.js`),
      context: {
        thankYouData: item.thankYouTitle,
        locale: "pl",
      },
    })
  })

  thankYouPageQuery.data.en.nodes.forEach(item => {
    createPage({
      path: `/en/${item.slug}`,
      component: path.resolve(`src/templates/thanks.js`),
      context: {
        thankYouData: item,
        thankYouTitle: item.thankYouTitle,
        locale: "en",
      },
    })
  })

  const offerPageQuery = await graphql(`
    query thankYouPageQuery {
      pl: allDatoCmsOffer(filter: { locales: { eq: "pl" } }) {
        nodes {
          slug
          locales
          offerBackgroundImage {
            fluid {
              src
              base64
            }
          }
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
      en: allDatoCmsOffer(filter: { locales: { eq: "en" } }) {
        nodes {
          slug
          locales
          offerBackgroundImage {
            fluid {
              src
              base64
            }
          }
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
    createPage({
      path: `/${item.slug}`,
      component: path.resolve(`src/templates/offer.js`),
      context: {
        locale: "pl",
      },
    })
  })

  offerPageQuery.data.en.nodes.forEach(item => {
    createPage({
      path: `/en/${item.slug}`,
      component: path.resolve(`src/templates/offer.js`),
      context: {
        locale: "en",
      },
    })
  })

  //for getting slug to offer type pages
  const offerPageSlugNamePL = await graphql(`
    query OfferPageSlugNameQuery {
      pl: datoCmsOffer(locale: "pl") {
        slug
      }
    }
  `)

  const offerPageSlugNameEN = await graphql(`
    query OfferPageSlugNameQuery {
      en: datoCmsOffer(locale: "en") {
        slug
      }
    }
  `)

  const houseProjectQuery = await graphql(`
    query HouseProject {
      pl: allDatoCmsHouseProjectForClient(filter: { locales: { eq: "pl" } }) {
        nodes {
          pageName
          slug
          locales
        }
      }
      en: allDatoCmsHouseProjectForClient(filter: { locales: { eq: "en" } }) {
        nodes {
          pageName
          slug
          locales
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
        locale: "pl",
      },
    })
  })

  houseProjectQuery.data.en.nodes.forEach(item => {
    let url = `/en/${offerPageSlugNameEN.data.en.slug}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/clientHouseProject.js`),
      context: {
        // thankYouData: item,
        // thankYouTitle: item.thankYouTitle,
        locale: "en",
      },
    })
  })

  const interiorProjectQuery = await graphql(`
    query interiorProject {
      pl: allDatoCmsInteriorProjectForClient(
        filter: { locales: { eq: "pl" } }
      ) {
        nodes {
          pageName
          slug
          locales
        }
      }
      en: allDatoCmsInteriorProjectForClient(
        filter: { locales: { eq: "en" } }
      ) {
        nodes {
          pageName
          slug
          locales
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
        locale: "pl",
      },
    })
  })

  interiorProjectQuery.data.en.nodes.forEach(item => {
    let url = `/en/${offerPageSlugNameEN.data.en.slug}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/clientInteriorProject.js`),
      context: {
        // thankYouData: item,
        // thankYouTitle: item.thankYouTitle,
        locale: "en",
      },
    })
  })

  const designProjectQuery = await graphql(`
    query designProject {
      pl: allDatoCmsDesignProjectForClient(filter: { locales: { eq: "pl" } }) {
        nodes {
          pageName
          slug
          locales
        }
      }
      en: allDatoCmsDesignProjectForClient(filter: { locales: { eq: "en" } }) {
        nodes {
          pageName
          slug
          locales
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
        locale: "pl",
      },
    })
  })

  designProjectQuery.data.en.nodes.forEach(item => {
    let url = `/en/${offerPageSlugNameEN.data.en.slug}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/clientDesignProject.js`),
      context: {
        designProjectData: item.pageName,
        locale: "en",
      },
    })
  })

  const projectsQuery = await graphql(`
    query myData {
      pl: allDatoCmsProject(filter: { locales: { eq: "pl" } }) {
        nodes {
          slug
          locales
          id
          position
          projectCategory
          title
          titlePart1
          titlePart2
          readMore
          fullScreenPhoto {
            fluid {
              src
              base64
              srcSet
            }
            height
            width
          }
          secondaryPhoto {
            fluid {
              src
              base64
              srcSet
            }
            height
            width
          }
          projectDescription
          areaText
          areaValue
          gallery {
            visualizationImage {
              fluid {
                src
              }
              width
              height
            }
            visualizationImageText
            width
          }
        }
      }

      en: allDatoCmsProject(filter: { locales: { eq: "en" } }) {
        nodes {
          slug
          locales
          id
          position
          projectCategory
          title
          titlePart1
          titlePart2
          readMore
          fullScreenPhoto {
            fluid {
              src
              base64
              srcSet
            }
            height
            width
          }
          secondaryPhoto {
            fluid {
              src
              base64
              srcSet
            }
            height
            width
          }
          projectDescription
          areaText
          areaValue

          gallery {
            visualizationImage {
              fluid {
                src
              }
              width
              height
            }
            visualizationImageText
            width
          }
        }
      }
    }
  `)

  //with category prefix
  projectsQuery.data.pl.nodes.forEach(item => {
    let url = `${item.projectCategory}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/ProjectPage.js`),
      context: {
        thisProjectData: item,
        locale: "pl",
        fullScreenPhoto: item.fullScreenPhoto,
      },
    })
  })

  projectsQuery.data.en.nodes.forEach(item => {
    let url = `/en/${item.projectCategory}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/ProjectPage.js`),
      context: {
        thisProjectData: item,
        locale: "en",
        fullScreenPhoto: item.fullScreenPhoto,
      },
    })
  })

  //category pages

  const categoriesFirstQuery = await graphql(`
    query interiorProject {
      pl: allDatoCmsCategory(filter: { locales: { eq: "pl" } }) {
        nodes {
          categoryFirst
          locales
        }
      }
      en: allDatoCmsCategory(filter: { locales: { eq: "en" } }) {
        nodes {
          categoryFirst
          locales
        }
      }
    }
  `)

  const categoriesSecondQuery = await graphql(`
    query interiorProject {
      pl: allDatoCmsCategory(filter: { locales: { eq: "pl" } }) {
        nodes {
          categorySecond
          locales
        }
      }
      en: allDatoCmsCategory(filter: { locales: { eq: "en" } }) {
        nodes {
          categorySecond
          locales
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
        // thisProjectData: item,
        locale: "pl",
        // fullScreenPhoto: item.fullScreenPhoto
      },
    })
  })

  categoriesFirstQuery.data.en.nodes.forEach(item => {
    let url = `/en/${item.categoryFirst}`

    createPage({
      path: url,
      component: path.resolve(`src/templates/allProjectsHouse.js`),
      context: {
        // thisProjectData: item,
        locale: "en",
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
        // thisProjectData: item,
        locale: "pl",
        // fullScreenPhoto: item.fullScreenPhoto
      },
    })
  })

  categoriesSecondQuery.data.en.nodes.forEach(item => {
    let url = `/en/${item.categorySecond}`

    createPage({
      path: url,
      component: path.resolve(`src/templates/allProjectsInterior.js`),
      context: {
        // thisProjectData: item,
        locale: "en",
        // fullScreenPhoto: item.fullScreenPhoto
      },
    })
  })

  const publicationsQuery = await graphql(`
    query myData {
      pl: allDatoCmsPublication(filter: { locales: { eq: "pl" } }) {
        nodes {
          slug
          locales
          id
          position
          projectCategory
          titlePart1
          readMore
          fullScreenPhoto {
            fluid {
              src
              base64
              srcSet
            }
          }
          publicationScreenshot {
            fluid {
              src
              base64
              srcSet
            }
          }
          projectDescription
          linkToPublication
        }
      }

      en: allDatoCmsPublication(filter: { locales: { eq: "en" } }) {
        nodes {
          slug
          locales
          id
          position
          projectCategory
          titlePart1
          readMore
          fullScreenPhoto {
            fluid {
              src
              base64
              srcSet
            }
          }
          publicationScreenshot {
            fluid {
              src
              base64
              srcSet
            }
          }
          projectDescription
          linkToPublication
        }
      }
    }
  `)

  //with category prefix
  publicationsQuery.data.pl.nodes.forEach(item => {
    let url = `${item.projectCategory}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/PublicationPage.js`),
      context: {
        thisPublicationData: item,
        locale: "pl",
        fullScreenPhoto: item.fullScreenPhoto,
      },
    })
  })

  publicationsQuery.data.en.nodes.forEach(item => {
    let url = `/en/${item.projectCategory}/${item.slug}`
    createPage({
      path: url,
      component: path.resolve(`src/templates/PublicationPage.js`),
      context: {
        thisPublicationData: item,
        locale: "en",
        fullScreenPhoto: item.fullScreenPhoto,
      },
    })
  })
}
