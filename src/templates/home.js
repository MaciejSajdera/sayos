import React from "react"
import { graphql } from "gatsby"

import Menu from "../components/Menu/menu"
import Header from "../components/Header/header"
import HeroCarousel from "../components/HeroCarousel/HeroCarousel"

class Home extends React.Component {
  constructor(props) {
    super(props)

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
        <HeroCarousel projects={allCollection} pageLocation={"homePage"} />
      </>
    )
  }
}

export default Home

export const query = graphql`
  query allProjectsDataHome($locale: String!) {
    projects: allDatoCmsProject(filter: { locale: { eq: $locale } }) {
      nodes {
        slug
        locale
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
    menuRightIndex: datoCmsMenuRight(locale: { eq: $locale }) {
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
    }

    menuLeftIndex: datoCmsMenuLeft(locale: { eq: $locale }) {
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
      locale
    }

    about: datoCmsAbout(locale: { eq: $locale }) {
      aboutTitle
      aboutContent
      slug
      locale
    }

    logoData: datoCmsHeaderLogoLight {
      logoImage {
        fixed {
          base64
          src
        }
      }
    }

    houseProject: datoCmsHouseProjectForClient(locale: { eq: $locale }) {
      pageName
      slug
      locale
      modularContent {
        slideNumber
        slideHeader
        slideMainText
      }
    }
    interiorProject: datoCmsInteriorProjectForClient(locale: { eq: $locale }) {
      pageName
      slug
      locale
      modularContent {
        slideNumber
        slideHeader
        slideMainText
      }
    }
    category: datoCmsCategory(locale: { eq: $locale }) {
      categoryFirst
      categorySecond
      locale
    }

    offer: datoCmsOffer(locale: { eq: $locale }) {
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
      locale
      slug
    }
  }
`
