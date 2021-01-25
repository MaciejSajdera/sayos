import React from "react"
import { Link, graphql, navigate } from "gatsby"

import Main from "../components/Main/main"
import Filler from "../components/Filler/filler"
import Menu from "../components/Menu/menu"
import Header from "../components/Header/header"

import Consumer from "../../context"

import TransitionLink from "gatsby-plugin-transition-link"

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

    return (
      <>
        {/* <Header /> */}
        {/* <Menu
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
        /> */}
        <Filler dataMenu={menuRightIndex} />
        {/* <Main data={projects} /> */}
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
        fullScreenPhotoTwo {
          fluid {
            src
            base64
            srcSet
          }
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
