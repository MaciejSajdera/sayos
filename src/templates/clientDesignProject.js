import { graphql } from "gatsby"
import React, { useContext, useEffect } from "react"
import SwiperCore, {
  A11y,
  EffectFade,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import Header from "../components/Header/header"
import Menu from "../components/Menu/menu"

import myContext from "../../context"

SwiperCore.use([
  Navigation,
  Pagination,
  Mousewheel,
  Scrollbar,
  A11y,
  EffectFade,
])

const ClientDesignProject = props => {
  let {
    interiorProject,
    houseProject,
    designProject,
    menuRightProject,
    menuLeftProject,
    about,
    category,
    offer,
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
      />

      <div className={`subpage subpage-offer`}>
        <div className="subpage-content-wrapper offer-subpage-content-wrapper">
          {/* <h1
            className={`subpage-title ${
              props.transitionStatus === `entered`
                ? `subpage-title-entered`
                : ``
            }`}
          >
            {designProject.pageName}
          </h1> */}
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            // pagination={{ clickable: true }}
            mousewheel={{
              sensitivity: 4,
            }}
            speed={10}
            roundLengths={true}
            // effect="fade"
            // scrollbar={{ draggable: true }}
          >
            {designProject.modularContent.map((node, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`slide-container ${
                    props.transitionStatus === `entered`
                      ? `subpage-slide-container-entered`
                      : ``
                  }`}
                  id={`slide-${index}`}
                >
                  {/* <p>{node.slideNumber}</p> */}
                  <h2>{node.slideHeader}</h2>
                  <p className={`text-content`}>{node.slideMainText}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default ClientDesignProject

export const query = graphql`
  query DesignProjectData($locale: String!) {
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
    designProject: datoCmsDesignProjectForClient(locale: $locale) {
      pageName
      slug
      locales
      modularContent {
        slideNumber
        slideHeader
        slideMainText
      }
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
