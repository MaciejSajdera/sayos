import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import React, { Component, createRef } from "react"
import { Helmet } from "react-helmet"
import { IconContext } from "react-icons"
import { CgArrowDown, CgArrowUp } from "react-icons/cg"
import "react-lazy-load-image-component/src/effects/blur.css"
import Header from "../components/Header/header"
import Menu from "../components/Menu/menu"
import bgLogo from "../images/sayos-bg-logo.png"

class PublicationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogoBackgroundDark: false,
      otherProjectsInThisCategory: [],
      indexOfCurrentProject: 0,
      arrowRightLinkDestinationState: ``,
      arrowLeftLinkDestinationState: ``,
      nextProjectObjectState: {},
      prevProjectObjectState: {},
    }
  }

  // handleArrowPrev = e => {
  //   if (
  //     !e.target.closest(".arrow-box").classList.contains("arrow-rotated-left")
  //   ) {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     })
  //   }
  // }

  // handleArrowNext = e => {
  //   let pageHeight = window.innerHeight

  //   if (
  //     !e.target.closest(".arrow-box").classList.contains("arrow-rotated-right")
  //   ) {
  //     window.scrollBy({
  //       top: pageHeight,
  //       behavior: "smooth",
  //     })
  //   }
  // }

  componentDidMount() {
    /***ARROWS */
    const arrowButtonLeft = document.querySelector(".box-bt-left")
    const arrowButtonRight = document.querySelector(".box-bt-right")

    setTimeout(() => {
      arrowButtonRight.classList.add("arrow-entered")
      arrowButtonLeft.classList.add("arrow-entered")
    }, 250)

    //Show Arrow left after scrolldown
    const targetScrollUpArrow = document.querySelector(".project-content-top") //top section
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

    /***NAVIGATION BETWEEN PROJECTS IN THE SAME CATEGORY***/
    window.scrollTop = 0
    let { publications } = this.props.data
    const { thisPublicationData } = this.props.pageContext
    let enteredFrom

    // if (typeof Storage !== "undefined") {
    //   if (sessionStorage.getItem(`projectPageNavigationStartedAt`)) {
    //     enteredFrom = sessionStorage.getItem(`projectPageNavigationStartedAt`)
    //   }
    // }

    let projectsInThisCategory = []
    let indexOfThisProject

    publications.nodes
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
      .map(project => {
        if (
          //not a specific category
          enteredFrom === `/all` ||
          enteredFrom === `/` ||
          enteredFrom === undefined ||
          enteredFrom === false
        ) {
          projectsInThisCategory.push(project)
          return
        } else {
          if (project.projectCategory === thisPublicationData.projectCategory) {
            projectsInThisCategory.push(project)
          }
        }
      })

    projectsInThisCategory.map((project, i) => {
      if (project.id === thisPublicationData.id) {
        indexOfThisProject = i
      }
      return
    })

    this.setState(prevState => ({
      otherProjectsInThisCategory: [...projectsInThisCategory],
    }))

    this.setState(prevState => ({
      indexOfCurrentProject: indexOfThisProject,
    }))

    //Arrows turned into navigation
    const endOfThePage = document.querySelector("#project-page-end")
    const scrollDownArrow = document.querySelector(".box-bt-right")

    const callbackEndOfPage = (entries, observer) => {
      entries.forEach(entry => {
        let arrowRightLinkDestination
        let arrowLeftLinkDestination

        let otherProjectsInThisCategory = this.state.otherProjectsInThisCategory
        let indexOfCurrentProject = this.state.indexOfCurrentProject

        let prevProjectObject =
          otherProjectsInThisCategory[indexOfCurrentProject - 1]
        let nextProjectObject =
          otherProjectsInThisCategory[indexOfCurrentProject + 1]

        let nextProjectPlaceholderImageSrc
        let prevProjectPlaceholderImageSrc

        //if there is only 1 project
        if (otherProjectsInThisCategory.length === 1) {
          return
        }

        //if last project
        if (indexOfCurrentProject >= otherProjectsInThisCategory.length - 1) {
          let firstProjectObject
          let firstProjectLink

          firstProjectObject = otherProjectsInThisCategory[0]

          let prevProjectLink

          thisPublicationData.locale === "pl"
            ? (firstProjectLink = `${firstProjectObject.projectCategory}/${firstProjectObject.slug}`)
            : (firstProjectLink = `en/${firstProjectObject.projectCategory}/${firstProjectObject.slug}`)

          arrowRightLinkDestination = firstProjectLink
          nextProjectPlaceholderImageSrc =
            firstProjectObject.fullScreenPhoto.fluid.src

          thisPublicationData.locale === "pl"
            ? (prevProjectLink = `${prevProjectObject.projectCategory}/${prevProjectObject.slug}`)
            : (prevProjectLink = `en/${prevProjectObject.projectCategory}/${prevProjectObject.slug}`)

          arrowLeftLinkDestination = prevProjectLink
          prevProjectPlaceholderImageSrc =
            prevProjectObject.fullScreenPhoto.fluid.src
        } else {
          let nextProjectLink

          thisPublicationData.locale === "pl"
            ? (nextProjectLink = `${nextProjectObject.projectCategory}/${nextProjectObject.slug}`)
            : (nextProjectLink = `${thisPublicationData.locale}/${nextProjectObject.projectCategory}/${nextProjectObject.slug}`)

          arrowRightLinkDestination = nextProjectLink
          nextProjectPlaceholderImageSrc =
            nextProjectObject.fullScreenPhoto.fluid.src

          let prevProjectLink

          if (indexOfCurrentProject > 0) {
            thisPublicationData.locale === "pl"
              ? (prevProjectLink = `${prevProjectObject.projectCategory}/${prevProjectObject.slug}`)
              : (prevProjectLink = `${thisPublicationData.locale}/${prevProjectObject.projectCategory}/${prevProjectObject.slug}`)

            arrowLeftLinkDestination = prevProjectLink
            prevProjectPlaceholderImageSrc =
              prevProjectObject.fullScreenPhoto.fluid.src

            // console.log(this.state)
          }
        }

        //if first project in array
        if (indexOfCurrentProject === 0) {
          let lastProjectObject
          let lastProjectLink

          lastProjectObject =
            otherProjectsInThisCategory[
              this.state.otherProjectsInThisCategory.length - 1
            ]

          thisPublicationData.locale === "pl"
            ? (lastProjectLink = `${lastProjectObject.projectCategory}/${lastProjectObject.slug}`)
            : (lastProjectLink = `${thisPublicationData.locale}/${lastProjectObject.projectCategory}/${lastProjectObject.slug}`)

          arrowLeftLinkDestination = lastProjectLink
          prevProjectPlaceholderImageSrc =
            lastProjectObject.fullScreenPhoto.fluid.src
        }

        if (entry.intersectionRatio > 0.5) {
          scrollDownArrow.classList.remove("arrow-unrotated-right")
          scrollDownArrow.classList.add("arrow-rotated-right")

          scrollUpArrow.classList.remove("arrow-unrotated-left")
          scrollUpArrow.classList.add("arrow-rotated-left")

          scrollDownArrow.querySelector(
            "#linkToTheNextProject"
          ).style.pointerEvents = `initial`

          scrollUpArrow.querySelector(
            "#linkToThePrevProject"
          ).style.pointerEvents = `initial`

          const nextPagePlaceholder = document.querySelector(
            "#next-project-page__placeholder"
          )

          const prevPagePlaceholder = document.querySelector(
            "#prev-project-page__placeholder"
          )

          nextPagePlaceholder.style.backgroundImage = `url(${nextProjectPlaceholderImageSrc})`
          prevPagePlaceholder.style.backgroundImage = `url(${prevProjectPlaceholderImageSrc})`

          this.setState(prevState => ({
            arrowRightLinkDestinationState: arrowRightLinkDestination,
          }))

          this.setState(prevState => ({
            arrowLeftLinkDestinationState: arrowLeftLinkDestination,
          }))

          this.setState(prevState => ({
            nextProjectObjectState: nextProjectObject,
          }))

          this.setState(prevState => ({
            prevProjectObjectState: prevProjectObject,
          }))
        }

        if (entry.intersectionRatio < 0.5) {
          scrollDownArrow.classList.remove("arrow-rotated-right")
          scrollDownArrow.classList.add("arrow-unrotated-right")

          scrollUpArrow.classList.remove("arrow-rotated-left")
          scrollUpArrow.classList.add("arrow-unrotated-left")

          scrollDownArrow.querySelector(
            "#linkToTheNextProject"
          ).style.pointerEvents = `none`

          scrollUpArrow.querySelector(
            "#linkToThePrevProject"
          ).style.pointerEvents = `none`
        }
      })
    }

    let optionsEndOfPage = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "50px",
      threshold: 0.7,
    }

    let observerEndOfPage = new IntersectionObserver(
      callbackEndOfPage,
      optionsEndOfPage
    )

    if (endOfThePage) {
      observerEndOfPage.observe(endOfThePage)
    }

    /***LOGO COLOR CHANGE */
    const targetLogoChange = document.querySelector(
      "#project-content-middle-end"
    )

    const callbackLogoChange = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          this.setState(prevState => ({
            isLogoBackgroundDark: true,
          }))
        } else {
          this.setState(prevState => ({
            isLogoBackgroundDark: false,
          }))
        }
      })
    }

    //only for desktop
    const mediaQueryDesktop = window.matchMedia("(min-width: 992px)")
    function handleDesktopChange(e) {
      if (e.matches) {
        console.log("Media Query Desktop Matched!")

        let optionsLogoChange = {
          root: document.querySelector("#scrollArea"),
          rootMargin: "0px",
        }

        let observerLogoChange = new IntersectionObserver(
          callbackLogoChange,
          optionsLogoChange
        )

        if (targetLogoChange) {
          observerLogoChange.observe(targetLogoChange)
        }
      }
    }

    mediaQueryDesktop.addListener(handleDesktopChange)
    handleDesktopChange(mediaQueryDesktop)
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
      publications,
    } = this.props.data

    const { thisPublicationData } = this.props.pageContext

    const menuStyle = `menuStyleFixed`

    this.topRef = createRef()
    this.nextSectionRef = createRef()

    // const hideArrowBoxes = () => {
    //   const arrowBoxes = document.querySelectorAll(".arrow-box")

    //   arrowBoxes.forEach(box => {
    //     box.classList.remove("arrow-entered")
    //   })
    // }

    // const exitToNextProject = () => {
    //   if (document) {
    //     // Preventing overflow here make the animation smoother
    //     // document.body.style.overflow = "hidden"
    //   }
    //   const currentPage = document.querySelector("#project-page__wrapper")

    //   currentPage.style.transform = `translateX(-100%)`

    //   hideArrowBoxes()

    //   const nextPagePlaceholder = document.querySelector(
    //     "#next-project-page__placeholder"
    //   )

    //   nextPagePlaceholder.style.transform = `translateX(0%)`
    // }

    // const exitToPrevProject = () => {
    //   if (document) {
    //     // Preventing overflow here make the animation smoother
    //     // document.body.style.overflow = "hidden"
    //   }
    //   const currentPage = document.querySelector("#project-page__wrapper")

    //   currentPage.style.transform = `translateX(100%)`

    //   hideArrowBoxes()

    //   const prevPagePlaceholder = document.querySelector(
    //     "#prev-project-page__placeholder"
    //   )

    //   prevPagePlaceholder.style.transform = `translateX(0%)`
    // }

    // const entryTransition = {
    //   delay: 2.2, // Wait 1.5 seconds before entering
    //   appearAfter: 0.2,
    //   // length: 1,
    //   length: 0,
    // }

    return (
      <>
        <Helmet
          meta={[
            {
              name: `description`,
              content: thisPublicationData.projectDescription,
            },
            {
              property: `og:title`,
              content: `${thisPublicationData.titlePart1} - Sayos Architects`,
            },
            {
              property: `og:description`,
              content: thisPublicationData.projectDescription,
            },
            {
              property: `og:image`,
              content: thisPublicationData.publicationScreenshot.fluid.src,
            },
            {
              name: `twitter:title`,
              content: `${thisPublicationData.titlePart1} ${thisPublicationData.titlePart2} - Sayos Architects`,
            },
            {
              name: `twitter:description`,
              content: thisPublicationData.projectDescription,
            },
          ]}
        />
        <Header isLogoBackgroundDark={true} />
        <Menu
          locale={this.props.pageContext.locale}
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
          publications={publications}
        />

        <div className={`arrow-box box-bt-left`}>
          <AniLink
            cover
            direction="right"
            duration={2.2}
            bg={`
             url(${bgLogo})
             center / cover   /* position / size */
             no-repeat        /* repeat */
             fixed            /* attachment */
             padding-box      /* origin */
             content-box      /* clip */
             black            /* color */
           `}
            id={`linkToThePrevProject`}
            to={`/${this.state.arrowLeftLinkDestinationState}`}
            state={{ prevPath: this.props.location.pathname }}
          >
            <div className={`menu-trigger`}>
              <IconContext.Provider
                value={{ color: "white", size: "4em", height: "100" }}
              >
                <CgArrowUp />
              </IconContext.Provider>
            </div>
          </AniLink>
        </div>

        <div className={`arrow-box box-bt-right`}>
          <AniLink
            // exit={{
            //   trigger: ({ exit, node }) => exitToNextProject(exit, node),
            //   length: 2.2,
            // }}
            // entry={entryTransition}
            cover
            direction="left"
            duration={2.2}
            bg={`
              url(${bgLogo})
              center / cover   /* position / size */
              no-repeat        /* repeat */
              fixed            /* attachment */
              padding-box      /* origin */
              content-box      /* clip */
              black            /* color */
            `}
            id={`linkToTheNextProject`}
            to={`/${this.state.arrowRightLinkDestinationState}`}
            state={{ prevPath: this.props.location.pathname }}
          >
            <div className={`menu-trigger`}>
              <IconContext.Provider
                value={{ color: "white", size: "4em", height: "100" }}
              >
                <CgArrowDown />
              </IconContext.Provider>
            </div>
          </AniLink>
        </div>

        <div id={`prev-project-page__placeholder`}></div>
        <div id={`next-project-page__placeholder`}></div>

        <div
          id={`project-page__wrapper`}
          className={`publication-page__wrapper ${this.props.transitionStatus}`}
        >
          <div ref={this.topRef} className={`project-content-top`}>
            <div
              className={`slide-bg-fullscreen`}
              style={{
                backgroundImage: `url(
                              ${thisPublicationData.publicationScreenshot.fluid.src}
                            )`,
              }}
            >
              <a
                href={`${thisPublicationData.linkToPublication}`}
                target="_blank"
              ></a>
            </div>

            <div className="content-wrapper">
              <div className="text-container">
                <h2>{thisPublicationData.titlePart1}</h2>
                <div className="project-description">
                  <p>{thisPublicationData.projectDescription}</p>
                  <p className={`link-holder`}>
                    <a
                      href={`${thisPublicationData.linkToPublication}`}
                      target="_blank"
                    >
                      LINK
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <span
            id="project-page-end"
            style={{
              height: `1em`,
              display: `block`,
              position: `absolute`,
              bottom: `0`,
            }}
          ></span>

          {/* <div className="project-content-middle" ref={this.nextSectionRef}>
            <div className="content section-left">
              <div className="content-wrapper">
                <div className="text-container">
                  <h2>{thisPublicationData.titlePart1}</h2>
                  <h2>{thisPublicationData.titlePart2}</h2>
                  <div className="project-description">
                    <p>{thisPublicationData.projectDescription}</p>
                    <p>
                      {thisPublicationData.areaText}:{" "}
                      <strong>{thisPublicationData.areaValue}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="content section-right"
              style={{
                backgroundImage: `url(
                                      ${thisPublicationData.secondaryPhoto.fluid.src}
                                    )`,
                backgroundSize: `cover`,
                backgroundPosition: `center`,
              }}
            ></div>

            <span
              id="project-content-middle-end"
              style={{
                height: `1em`,
                width: `100%`,
                display: `block`,
                position: `absolute`,
                bottom: `2em`,
              }}
            ></span>
          </div>

          <div
            className="project-page-content-bottom"
            style={{
              display: `flex`,
              flexWrap: `wrap`,
            }}
          >
            {thisPublicationData.gallery.map((element, index) => {
              return (
                <div
                  key={index}
                  className={`visualization-tile visualization-tile__width-${element.width}`}
                  style={{
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
                      style={{
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
          </div>
          <span
            id="project-page-end"
            style={{
              height: `1em`,
              display: `block`,
              position: `absolute`,
              bottom: `0`,
            }}
          ></span> */}
        </div>
        {/* project-page__wrapper */}
      </>
    )
  }
}

export default PublicationPage

export const query = graphql`
  query thisPublicationData($locale: String!) {
    publications: allDatoCmsPublication(locale: $locale) {
      nodes {
        slug
        locales
        id
        position
        titlePart1
        readMore
        fullScreenPhoto {
          fluid {
            src
            base64
            srcSet
          }
          height
          width
        }
        publicationScreenshot {
          fluid {
            src
            base64
            srcSet
          }
        }
        projectCategory
        projectDescription
        linkToPublication
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
