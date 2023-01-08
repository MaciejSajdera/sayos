import React from "react"
import { Link, graphql, Img } from "gatsby"
import { LazyLoadImage } from "react-lazy-load-image-component"

import Menu from "../components/Menu/menu"
import Header from "../components/Header/header"
import HeroCarousel from "../components/HeroCarousel/HeroCarousel"

import myContext from "../../context"

class allProjects extends React.Component {
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

    let allCollection = [...projects.nodes]

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
          pageLocation={"allProjects"}
          templateLocation={this.props.location}
        />

        {/* <main className={`all-grid`}>
          <div className="all-grid-bg">
            {projects.nodes
              .sort((a, b) => {
                const positionA = a.position
                const positionB = b.position
                let comparision = 0
                if (positionA > positionB) {
                  comparision = 1
                } else if (positionA < positionB) {
                  comparision = -1
                }
                return comparision
              })
              .map((element, index) => (





                <div
                  className={`single-project-tile ${
                    index % 5 && index > 0 ? `` : `big-project-tile`
                  }`}
                  key={index}
                >
                  <Link
                    to={
                      element.locales === "pl"
                        ? `/${element.projectCategory}/${element.slug}`
                        : `/${element.locales}/${element.projectCategory}/${element.slug}`
                    }
                    key={index}
                  >
                    <LazyLoadImage
                      // alt={image.alt}
                      // height={image.height}
                      effect="blur"
                      src={element.fullScreenPhoto.fluid.src} // use normal <img> attributes as props
                      // width={image.width}
                      style={{
                        transitionDelay: `${0 + index / 9}s`,
                      }}
                    />

                    <div className={`title-container`}>
                      <h2 className={`project-title-1`}>
                        {element.titlePart1}
                      </h2>
                      <h2 className={`project-title-2`}>
                        {element.titlePart2}
                      </h2>

                      <div className="text-on-hover">
                        <p className="project-slogan">
                          {element.projectSlogan}
                        </p>
                        <p className="read-more">{element.readMore}</p>
                      </div>
                    </div>
                  </Link>
                </div>





              ))}
          </div>
        </main> */}
      </>
    )
  }
}

allProjects.contextType = myContext

export default allProjects

export const query = graphql`
  query allProjectsData($locale: String!) {
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
            width
            height
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
