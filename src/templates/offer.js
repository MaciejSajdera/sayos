import React, { useEffect, useContext } from "react"
import { Link, graphql } from "gatsby"
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
  } = props.data

  const context = useContext(myContext)

  useEffect(() => {
    context.navToggled ? context.handleNavToggle() : console.log("nav open")
  }, [])

  return (
    <>
      <Menu
        dataMenu={menuRightProject}
        dataMenuLeft={menuLeftProject}
        about={about}
        houseProject={houseProject}
        interiorProject={interiorProject}
        category={category}
        offer={offer}
      />

      <div className={`subpage`}>
        <div className="offer-logos-wrapper">
          <Link
            to={
              about.locale === "pl"
                ? `/${offer.slug}/${houseProject.slug}`
                : `/${offer.slug}/${houseProject.locale}/${houseProject.slug}`
            }
          >
            {console.log(offer.slug)}
            <LazyLoadImage
              // alt={image.alt}
              // height={image.height}
              effect="blur"
              src={offer.offerArchitectsLogo.fixed.src} // use normal <img> attributes as props
              // width={image.width}
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
            <LazyLoadImage
              // alt={image.alt}
              // height={image.height}
              effect="blur"
              src={offer.offerInteriorsLogo.fixed.src} // use normal <img> attributes as props
              // width={image.width}
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
            <LazyLoadImage
              // alt={image.alt}
              // height={image.height}
              effect="blur"
              src={offer.offerDesignLogo.fixed.src} // use normal <img> attributes as props
              // width={image.width}
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
    about: datoCmsAbout(locale: { eq: $locale }) {
      aboutTitle
      aboutContent
      slug
      locale
    }

    menuRightProject: datoCmsMenuRight(locale: { eq: $locale }) {
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
      facebookicon {
        fixed(height: 35) {
          src
          base64
        }
      }
    }

    menuLeftProject: datoCmsMenuLeft(locale: { eq: $locale }) {
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

    designProject: datoCmsDesignProjectForClient(locale: { eq: $locale }) {
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
