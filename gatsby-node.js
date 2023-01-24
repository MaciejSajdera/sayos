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
      pl: allDatoCmsAbout {
        nodes {
          aboutTitle(locale: "pl")
          aboutContent(locale: "pl")
          slug(locale: "pl")
          locales
        }
      }
      en: allDatoCmsAbout {
        nodes {
          aboutTitle(locale: "en")
          aboutContent(locale: "en")
          slug(locale: "en")
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
        aboutData: item.aboutTitle,
        locale: "en",
      },
    })
  })

  const thankYouPageQuery = await graphql(`
    query thankYouPageQuery {
      pl: allDatoCmsThankYou {
        nodes {
          thankYouTitle(locale: "pl")
          thankYouContent(locale: "pl")
          slug(locale: "pl")
          locales
        }
      }
      en: allDatoCmsThankYou {
        nodes {
          thankYouTitle(locale: "en")
          thankYouContent(locale: "en")
          slug(locale: "en")
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
      pl: allDatoCmsOffer {
        nodes {
          slug(locale: "pl")
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
      en: allDatoCmsOffer {
        nodes {
          slug(locale: "en")
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
      pl: allDatoCmsHouseProjectForClient {
        nodes {
          pageName(locale: "pl")
          slug(locale: "pl")
          locales
        }
      }
      en: allDatoCmsHouseProjectForClient {
        nodes {
          pageName(locale: "en")
          slug(locale: "en")
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
        test: "test",
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
      pl: allDatoCmsInteriorProjectForClient {
        nodes {
          pageName(locale: "pl")
          slug(locale: "pl")
          locales
        }
      }
      en: allDatoCmsInteriorProjectForClient {
        nodes {
          pageName(locale: "en")
          slug(locale: "en")
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
      pl: allDatoCmsDesignProjectForClient {
        nodes {
          pageName(locale: "pl")
          slug(locale: "pl")
          locales
        }
      }
      en: allDatoCmsDesignProjectForClient {
        nodes {
          pageName(locale: "en")
          slug(locale: "en")
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
      pl: allDatoCmsProject {
        nodes {
          slug(locale: "pl")
          locales
          id
          position
          projectCategory(locale: "pl")
          title(locale: "pl")
          titlePart1(locale: "pl")
          titlePart2(locale: "pl")
          readMore(locale: "pl")
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

      en: allDatoCmsProject {
        nodes {
          slug(locale: "en")
          locales
          id
          position
          projectCategory(locale: "en")
          title(locale: "en")
          titlePart1(locale: "en")
          titlePart2(locale: "en")
          readMore(locale: "en")
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
          projectDescription(locale: "en")
          areaText(locale: "en")
          areaValue(locale: "en")

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
      pl: allDatoCmsCategory {
        nodes {
          categoryFirst(locale: "pl")
          locales
        }
      }
      en: allDatoCmsCategory {
        nodes {
          categoryFirst(locale: "en")
          locales
        }
      }
    }
  `)

  const categoriesSecondQuery = await graphql(`
    query interiorProject {
      pl: allDatoCmsCategory {
        nodes {
          categorySecond(locale: "pl")
          locales
        }
      }
      en: allDatoCmsCategory {
        nodes {
          categorySecond(locale: "en")
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
        thisProjectData: item,
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
        thisProjectData: item,
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
      pl: allDatoCmsPublication {
        nodes {
          slug(locale: "pl")
          locales
          id
          position
          projectCategory(locale: "pl")
          titlePart1(locale: "pl")
          readMore(locale: "pl")
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
          projectDescription(locale: "pl")
          linkToPublication(locale: "pl")
        }
      }

      en: allDatoCmsPublication {
        nodes {
          slug(locale: "en")
          locales
          id
          position
          projectCategory(locale: "en")
          titlePart1(locale: "en")
          readMore(locale: "en")
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
          projectDescription(locale: "en")
          linkToPublication(locale: "en")
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
