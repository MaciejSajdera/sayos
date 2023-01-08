import React, { useEffect, useContext } from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/Header/header"
import Menu from "../components/Menu/menu"
import myContext from "../../context"
import { LazyLoadImage } from "react-lazy-load-image-component"

const Offer = props => {
  let {
    about,
    menuRightProject,
    menuLeftProject,
    houseProject,
    interiorProject,
    designProject,
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
      <Header />
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

      <div
        className={`subpage subpage-offer ${
          props.transitionStatus === `entered` ? `subpage-content-entered` : ``
        }`}
        style={{
          backgroundImage: `url(
                                      ${offer.offerBackgroundImage.fluid.src}
                                    )`,
          backgroundSize: `cover`,
        }}
      >
        <div className="offer-logos-wrapper">
          <Link
            to={
              about.locale === "pl"
                ? `/${offer.slug}/${houseProject.slug}`
                : `/${offer.slug}/${houseProject.locale}/${houseProject.slug}`
            }
          >
            <div
              className={`offer-logos-wrapper__logo`}
              // alt={image.alt}
              // height={image.height}
              // effect="blur"
              // src={offer.offerArchitectsLogo.fixed.src} // use normal <img> attributes as props
              // width={image.width}
              style={{
                backgroundImage: `url(
                              ${offer.offerArchitectsLogo.fixed.src}
                            )`,
              }}
            />
            <div className="text-on-hover">
              <p className="project-slogan">{houseProject.pageName}</p>
              <p className="read-more">ZOBACZ WIĘCEJ</p>
            </div>
          </Link>

          <Link
            to={
              about.locale === "pl"
                ? `/${offer.slug}/${interiorProject.slug}`
                : `/${offer.slug}/${interiorProject.locale}/${interiorProject.slug}`
            }
          >
            <div
              className={`offer-logos-wrapper__logo`}
              // alt={image.alt}
              // height={image.height}
              // effect="blur"
              // src={offer.offerInteriorsLogo.fixed.src} // use normal <img> attributes as props
              // width={image.width}
              style={{
                backgroundImage: `url(
                              ${offer.offerInteriorsLogo.fixed.src}
                            )`,
              }}
            />

            <div className="text-on-hover">
              <p className="project-slogan">{interiorProject.pageName}</p>
              <p className="read-more">ZOBACZ WIĘCEJ</p>
            </div>
          </Link>

          <Link
            to={
              about.locale === "pl"
                ? `/${offer.slug}/${designProject.slug}`
                : `/${offer.slug}/${designProject.locale}/${designProject.slug}`
            }
          >
            <div
              className={`offer-logos-wrapper__logo`}
              // alt={image.alt}
              // height={image.height}
              // effect="blur"
              // src={offer.offerDesignLogo.fixed.src} // use normal <img> attributes as props
              // width={image.width}
              style={{
                backgroundImage: `url(
                              ${offer.offerDesignLogo.fixed.src}
                            )`,
              }}
            />
            <div className="text-on-hover">
              <p className="project-slogan">{designProject.pageName}</p>
              <p className="read-more">ZOBACZ WIĘCEJ</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Offer

export const query = graphql`
  query offerData($locale: String!) {
    about: datoCmsAbout(locale: $locale) {
      aboutTitle
      aboutContent
      slug
      locales
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
