import React, { useEffect, useContext } from "react"
import { Link, graphql } from "gatsby"
import Menu from "../components/Menu/menu"
import Header from "../components/Header/header"
import myContext from "../../context"

const About = props => {
  console.log(props)

  let {
    about,
    menuRightProject,
    menuLeftProject,
    houseProject,
    interiorProject,
    category,
    offer,
    publications,
  } = props.data

  const context = useContext(myContext)

  useEffect(() => {
    context.navToggled ? context.handleNavToggle() : console.log("navToggled")
  }, [])

  return (
    <>
      <Header logoLight />
      <Menu
        locale={props.pageContext.locale}
        dataMenu={menuRightProject}
        dataMenuLeft={menuLeftProject}
        about={about}
        houseProject={houseProject}
        interiorProject={interiorProject}
        category={category}
        offer={offer}
        publications={publications}
      />

      <div className={`subpage about`}>
        <div
          className={`subpage-content-wrapper ${
            props.transitionStatus === `entered`
              ? `subpage-content-entered`
              : ``
          }`}
        >
          <h2
            className={`about-header ${
              props.transitionStatus === `entered` ? `about-header-entered` : ``
            }`}
          >
            {about.aboutTitle}
          </h2>
          <p
            className={`about-content text-content ${
              props.transitionStatus === `entered`
                ? `about-content-entered`
                : ``
            }`}
          >
            {about.aboutContent}
          </p>
        </div>
      </div>
    </>
  )
}

export default About

export const query = graphql`
  query aboutData($locale: String!) {
    about: datoCmsAbout(locale: $locale) {
      aboutTitle
      aboutContent
      slug
    }
    menuRightProject: datoCmsMenuRight(locale: $locale) {
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
    menuLeftProject: datoCmsMenuLeft(locale: $locale) {
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
      publicationsHeader
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
