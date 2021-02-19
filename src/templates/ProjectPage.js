import React, { Component, createRef } from "react"
import { Link, graphql, navigate, Img } from "gatsby"
import { LazyLoadImage } from "react-lazy-load-image-component"
import LazyLoad from "react-lazyload"
import "react-lazy-load-image-component/src/effects/blur.css"
import Consumer from "../../context"
import {
  CgArrowUp,
  CgArrowDown,
  HiArrowNarrowLeft,
  HiArrowNarrowRight,
} from "react-icons/cg"
import { IconContext } from "react-icons"

import Header from "../components/Header/header"
import Menu from "../components/Menu/menu"

class ProjectPage extends Component {
  componentDidMount() {
    console.log()

    const arrowButtonLeft = document.querySelector(".box-bt-left")
    const arrowButtonRight = document.querySelector(".box-bt-right")

    arrowButtonRight.classList.add("arrow-entered")

    //Scroll Up Arrow
    const targetScrollUpArrow = document.querySelector(".lazyload-wrapper") //top section
    const scrollUpArrow = document.querySelector(".box-bt-left")

    function callbackScrollUpArrow(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrollUpArrow.classList.remove("arrow-entered")
        } else {
          scrollUpArrow.classList.add("arrow-entered")
        }
      })
    }

    let optionsScrollUpArrow = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "100px",
      threshold: 0.7,
    }

    let observerScrollUpArrow = new IntersectionObserver(
      callbackScrollUpArrow,
      optionsScrollUpArrow
    )

    if (targetScrollUpArrow) {
      observerScrollUpArrow.observe(targetScrollUpArrow)
    }

    //Scroll Down Arrow
    const targetScrollDownArrow = document.querySelector("#project-page-end")
    const scrollDownArrow = document.querySelector(".box-bt-right")

    function callbackScrollDownArrow(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrollDownArrow.classList.remove("arrow-entered")
        } else {
          scrollDownArrow.classList.add("arrow-entered")
        }
      })
    }

    let optionsScrollDownArrow = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "100px",
      threshold: 0.7,
    }

    let observerScrollDownArrow = new IntersectionObserver(
      callbackScrollDownArrow,
      optionsScrollDownArrow
    )

    if (targetScrollDownArrow) {
      observerScrollDownArrow.observe(targetScrollDownArrow)
    }
  }

  render() {
    let {
      projects,
      menuRightProject,
      menuLeftProject,
      about,
      logoData,
      houseProject,
      interiorProject,
      category,
      offer,
    } = this.props.data

    const { myProjectData } = this.props.pageContext

    const menuStyle = `menuStyleFixed`

    this.topRef = createRef()
    this.nextSectionRef = createRef()

    // const { locale } = this.props.pageContext.locale;

    // const { fullScreenPhoto } = this.props.pageContext.fullScreenPhoto;

    const handleArrowPrev = e => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

    // const handleArrowNext = () =>
    // this.nextSectionRef.current.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    // });

    const handleArrowNext = e => {
      let pageHeight = window.innerHeight
      window.scrollBy({
        top: pageHeight,
        behavior: "smooth",
      })
    }

    console.log(this.props.transitionStatus)

    // handleScroll = (e) => {
    //   const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    //   if (bottom) {

    //    }
    // }

    return (
      <div>
        <Header />
        <Menu
          dataMenu={menuRightProject}
          dataMenuLeft={menuLeftProject}
          dataProjects={projects}
          menuStyle={menuStyle}
          about={about}
          logoData={logoData}
          houseProject={houseProject}
          interiorProject={interiorProject}
          category={category}
          offer={offer}
        />

        {/* {this.props.data.menuRight.phoneNumber} */}
        {/* <div> */}

        {/* strona projektu: {myProjectData.slug} */}
        {/* testmenudata: {menuRight.phoneNumber} */}
        {/* </div> */}

        <div className={`arrow-box box-bt-left`} onClick={handleArrowPrev}>
          <div className={`menu-trigger`}>
            <IconContext.Provider
              value={{ color: "white", size: "4em", height: "100" }}
            >
              <CgArrowUp />
            </IconContext.Provider>
          </div>
        </div>

        <div className={`arrow-box box-bt-right`} onClick={handleArrowNext}>
          <div className={`menu-trigger`}>
            <IconContext.Provider
              value={{ color: "white", size: "4em", height: "100" }}
            >
              <CgArrowDown />
            </IconContext.Provider>
          </div>
        </div>

        {/* <div className="fullscreen-project-image" ref={this.topRef}> */}
        {/* <img src={`${myProjectData.fullScreenPhoto.fluid.src}`} /> */}
        {/* <LazyLoadImage
            // alt={image.alt}
            // height={image.height}
            effect="blur"
            placeholderSrc={myProjectData.fullScreenPhoto.fluid.src}
            // visibleByDefault
            src={myProjectData.fullScreenPhoto.fluid.src} // use normal <img> attributes as props
            // width={image.width}
          /> */}
        <LazyLoad ref={this.topRef} className={`project-content-top`}>
          <div
            className={`slide-bg-fullscreen`}
            css={{
              backgroundImage: `url(
                              ${myProjectData.fullScreenPhoto.fluid.src}
                            )`,
            }}
          ></div>
        </LazyLoad>
        {/* </div> */}

        <div className="project-content-middle" ref={this.nextSectionRef}>
          <div className="content section-left">
            <div className="content-wrapper">
              {/* <div className="scroll-marker">

              </div> */}

              <div className="text-container">
                <h2>{myProjectData.titlePart1}</h2>
                <h2>{myProjectData.titlePart2}</h2>
                <div className="project-description">
                  <p>{myProjectData.projectDescription}</p>
                  <p>
                    {myProjectData.areaText}:{" "}
                    <strong>{myProjectData.areaValue}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="content section-right"
            css={{
              backgroundImage: `url(
                                      ${myProjectData.secondaryPhoto.fluid.src}
                                    )`,
              backgroundSize: `cover`,
            }}
          ></div>
        </div>

        {/* <div
          className={`fullscreen-project-image`}
          css={{
            backgroundImage: `url(
                                          ${myProjectData.fullScreenPhotoTwo.fluid.src}
                                        )`,
            backgroundSize: `cover`,
            width: `100%`,
          }}
        ></div> */}

        {/* <div className="fullscreen-project-image" ref={this.topRef}>
            <LazyLoadImage
              // alt={image.alt}
              // height={image.height}
              // effect="blur"
              placeholderSrc={myProjectData.fullScreenPhotoTwo.fluid.src}
              src={myProjectData.fullScreenPhotoTwo.fluid.src} // use normal <img> attributes as props
              // width={image.width}
            />
          </div> */}

        <div
          className="project-page-content-bottom"
          css={{
            display: `flex`,
            flexWrap: `wrap`,
          }}
        >
          {myProjectData.gallery.map((element, index) => {
            return (
              <div
                key={index}
                className={`visualization-tile visualization-tile__width-${element.width}`}
                css={{
                  backgroundImage: `url(
                                        ${element.visualizationImage.fluid.src}
                                      )`,
                  backgroundSize: `cover`,
                  backgroundPosition: `bottom`,
                  width: `${element.width === 1 ? `100%` : ""} ${
                    element.width === 2 ? `50%` : ""
                  } ${element.width === 3 ? `33.33%` : ""}`,
                  height: `50em`,
                  display: `flex`,
                  flexFlow: `column`,
                  justifyContent: `flex-end`,
                }}
              >
                {element.visualizationImageText ? (
                  <p
                    css={{
                      minHeight: `4em`,
                      padding: `1em`,
                      display: `flex`,
                      alignSelf: `flex-end`,
                      alignItems: `center`,
                    }}
                  >
                    {element.visualizationImageText}
                  </p>
                ) : (
                  ""
                )}
              </div>
            )
          })}

          {/* <div className="fullscreen-project-image" ref={this.topRef}>
            <LazyLoadImage
              // alt={image.alt}
              // height={image.height}
              // effect="blur"
              placeholderSrc={myProjectData.fullScreenPhotoTwo.fluid.src}
              src={myProjectData.fullScreenPhotoTwo.fluid.src} // use normal <img> attributes as props
              // width={image.width}
            />
          </div> */}
        </div>
        <span
          id="project-page-end"
          css={{
            height: `1em`,
            display: `block`,
            position: `absolute`,
            bottom: `0`,
          }}
        ></span>
      </div>
    )
  }
}

export default ProjectPage

export const query = graphql`
  query myProjectData($locale: String!) {
    projects: allDatoCmsProject(filter: { locale: { eq: $locale } }) {
      nodes {
        slug
        locale
        id
        position
        titlePart1
        titlePart2
        readMore
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
      instagramLink
      facebookicon {
        fixed(height: 35) {
          src
          base64
        }
      }
      facebookLink
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
