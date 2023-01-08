import React from "react"
import { Link, graphql, Img } from "gatsby"
import { LazyLoadImage } from "react-lazy-load-image-component"

import Menu from "../components/Menu/menu"
import Header from "../components/Header/header"
import PublicationsCarousel from "../components/PublicationsCarousel/PublicationsCarousel"

import myContext from "../../context"

class allPublications extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      locale: this.props.data.menuRightIndex.locale,
      bgcolor: "",
    }
  }

  componentDidMount() {
    this.context.navToggled
      ? this.context.handleNavToggle()
      : console.log("navToggled")
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

        <PublicationsCarousel
          projects={allCollection}
          pageLocation={"allPublications"}
          templateLocation={this.props.location}
          locale={this.props.pageContext.locale}
        />
      </>
    )
  }
}

allPublications.contextType = myContext

export default allPublications

export const query = graphql`
  query allPublicationsData($locale: String!) {
    projects: allDatoCmsPublication(filter: { locales: { eq: $locale } }) {
      nodes {
        slug
        locales
        id
        position
        projectCategory
        titlePart1
        readMore
        projectSlogan
        fullScreenPhoto {
          fluid {
            src
            base64
            srcSet
          }
        }
        projectDescription
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
      locales
      slug
    }
  }
`
