import { graphql } from "gatsby"
import React from "react"

import Header from "../components/Header/header"
import HeroCarousel from "../components/HeroCarousel/HeroCarousel"
import Menu from "../components/Menu/menu"

class Home extends React.Component {
  constructor(props) {
    super(props)

    console.log(props)

    this.state = {
      locale: this.props.data.menuRightIndex.locale,
    }
  }

  render() {
    let {
      projects,
      menuRightIndex,
      menuLeftIndex,
      about,
      logoData,
      houseProject,
      interiorProject,
      category,
      offer,
    } = this.props.data

    const menuStyle = `menuStyleAbsolute`

    let allCollection = []

    projects.nodes.map(project => {
      if (project) {
        allCollection.push(project)
      }
      return allCollection
    })

    return (
      <>
        <Header />
        <Menu
          locale={this.props.pageContext.locale}
          dataMenu={menuRightIndex}
          dataMenuLeft={menuLeftIndex}
          dataProjects={projects}
          menuStyle={menuStyle}
          about={about}
          logoData={logoData}
          houseProject={houseProject}
          interiorProject={interiorProject}
          category={category}
          offer={offer}
        />
        <HeroCarousel
          locale={this.props.pageContext.locale}
          projects={allCollection}
          pageLocation={"homePage"}
          templateLocation={this.props.location}
        />
      </>
    )
  }
}

export default Home

export const query = graphql`
  query allProjectsDataHome($locale: String!) {
    projects: allDatoCmsProject(filter: { locales: { eq: $locale } }) {
      nodes {
        slug
        locales
        id
        position
        projectCategory
        titlePart1
        titlePart2
        readMore
        projectSlogan
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
        }
        projectDescription
        areaText
        areaValue
        gallery {
          visualizationImage {
            fluid {
              src
            }
          }
          visualizationImageText
          width
        }
      }
    }
    menuRightIndex: datoCmsMenuRight(locale: $locale) {
      adressData1
      adressData2
      phoneNumber
      emailAdress
      instagramicon {
        fixed(height: 35) {
          src
          base64
        }
      }
      instagramLink
      facebookicon {
        fixed(height: 35) {
          src
          base64
        }
      }
      facebookLink
      behanceicon {
        fixed(height: 35) {
          src
          base64
        }
      }
      behanceLink
      pinteresticon {
        fixed(height: 35) {
          src
          base64
        }
      }
      pinterestLink
    }

    menuLeftIndex: datoCmsMenuLeft(locale: $locale) {
      projectsHeader
      projectsSubfield1
      projectsSubfield2
      offerHeader
      offerSubfield
      aboutHeader
      individualCustomer
      individualSubfield1
      individualSubfield2
      contactHeader
      locales
      publicationsHeader
    }

    about: datoCmsAbout(locale: $locale) {
      aboutTitle
      aboutContent
      slug
      locales
    }

    logoData: datoCmsHeaderLogoLight {
      logoImage {
        fixed {
          base64
          src
        }
      }
    }

    houseProject: datoCmsHouseProjectForClient(locale: $locale) {
      pageName
      slug
      locales
      modularContent {
        slideNumber
        slideHeader
        slideMainText
      }
    }
    interiorProject: datoCmsInteriorProjectForClient(locale: $locale) {
      pageName
      slug
      locales
      modularContent {
        slideNumber
        slideHeader
        slideMainText
      }
    }
    category: datoCmsCategory(locale: $locale) {
      categoryFirst
      categorySecond
      locales
    }

    offer: datoCmsOffer(locale: $locale) {
      offerBackgroundImage {
        fluid {
          src
          base64
        }
      }
      offerArchitectsLogo {
        fixed {
          base64
          src
        }
      }
      offerDesignLogo {
        fixed {
          base64
          src
        }
      }
      offerInteriorsLogo {
        fixed {
          base64
          src
        }
      }
      slug
      locales
    }
  }
`
