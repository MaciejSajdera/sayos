import { graphql } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import React, { createRef } from "react"
import { Helmet } from "react-helmet"
import { IconContext } from "react-icons"
import { CgArrowDown, CgArrowUp } from "react-icons/cg"
import "react-lazy-load-image-component/src/effects/blur.css"
import Header from "../components/Header/header"
import Menu from "../components/Menu/menu"

class ProjectPage extends React.Component {
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

  componentDidMount() {
    /***ARROWS */
    const arrowButtonLeft = document.querySelector(".box-bt-left")
    const arrowButtonRight = document.querySelector(".box-bt-right")

    setTimeout(() => {
      arrowButtonRight.classList.add("arrow-entered")
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
    let { projects } = this.props.data
    const { thisProjectData } = this.props.pageContext

    let enteredFrom

    if (typeof Storage !== "undefined") {
      if (sessionStorage.getItem(`projectPageNavigationStartedAt`)) {
        enteredFrom = sessionStorage.getItem(`projectPageNavigationStartedAt`)
      }
    }

    let projectsInThisCategory = []
    let indexOfThisProject

    projects.nodes
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
          if (project.projectCategory === thisProjectData.projectCategory) {
            projectsInThisCategory.push(project)
          }
        }
      })

    projectsInThisCategory.map((project, i) => {
      if (project.id === thisProjectData.id) {
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

          this.props.pageContext.locale === "pl"
            ? (firstProjectLink = `${firstProjectObject.projectCategory}/${firstProjectObject.slug}`)
            : (firstProjectLink = `${this.props.pageContext.locale}/${firstProjectObject.projectCategory}/${firstProjectObject.slug}`)

          nextProjectPlaceholderImageSrc =
            firstProjectObject.fullScreenPhoto.fluid.src

          this.props.pageContext.locale === "pl"
            ? (prevProjectLink = `${prevProjectObject.projectCategory}/${prevProjectObject.slug}`)
            : (prevProjectLink = `${this.props.pageContext.locale}/${prevProjectObject.projectCategory}/${prevProjectObject.slug}`)

          arrowLeftLinkDestination = prevProjectLink
          prevProjectPlaceholderImageSrc =
            prevProjectObject.fullScreenPhoto.fluid.src
        } else {
          let nextProjectLink

          console.log(this.props.pageContext.locale)
          console.log(nextProjectObject)

          this.props.pageContext.locale === "pl"
            ? (nextProjectLink = `${nextProjectObject.projectCategory}/${nextProjectObject.slug}`)
            : (nextProjectLink = `${this.props.pageContext.locale}/${nextProjectObject.projectCategory}/${nextProjectObject.slug}`)

          arrowRightLinkDestination = nextProjectLink
          nextProjectPlaceholderImageSrc =
            nextProjectObject.fullScreenPhoto.fluid.src

          let prevProjectLink

          if (indexOfCurrentProject > 0) {
            this.props.pageContext.locale === "pl"
              ? (prevProjectLink = `${prevProjectObject.projectCategory}/${prevProjectObject.slug}`)
              : (prevProjectLink = `${this.props.pageContext.locale}/${prevProjectObject.projectCategory}/${prevProjectObject.slug}`)

            arrowLeftLinkDestination = prevProjectLink
            prevProjectPlaceholderImageSrc =
              prevProjectObject.fullScreenPhoto.fluid.src
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

          this.props.pageContext.locale === "pl"
            ? (lastProjectLink = `${lastProjectObject.projectCategory}/${lastProjectObject.slug}`)
            : (lastProjectLink = `${this.props.pageContext.locale}/${lastProjectObject.projectCategory}/${lastProjectObject.slug}`)

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

    const thisProjectData = this.props.pageContext.thisProjectData
    const locale = this.props.pageContext.locale

    const menuStyle = `menuStyleFixed`

    this.topRef = createRef()
    this.nextSectionRef = createRef()

    const handleArrowPrev = e => {
      if (
        !e.target.closest(".arrow-box").classList.contains("arrow-rotated-left")
      ) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    }
    const handleArrowNext = e => {
      let pageHeight = window.innerHeight

      if (
        !e.target
          .closest(".arrow-box")
          .classList.contains("arrow-rotated-right")
      ) {
        window.scrollBy({
          top: pageHeight,
          behavior: "smooth",
        })
      }
    }

    const hideArrowBoxes = () => {
      const arrowBoxes = document.querySelectorAll(".arrow-box")

      arrowBoxes.forEach(box => {
        box.classList.remove("arrow-entered")
      })
    }

    const exitToNextProject = () => {
      if (document) {
        // Preventing overflow here make the animation smoother
        // document.body.style.overflow = "hidden"
      }
      const currentPage = document.querySelector("#project-page__wrapper")
      currentPage.style.transform = `translateX(-100%)`

      hideArrowBoxes()

      const nextPagePlaceholder = document.querySelector(
        "#next-project-page__placeholder"
      )

      nextPagePlaceholder.style.transform = `translateX(0%)`
    }

    const exitToPrevProject = () => {
      if (document) {
        // Preventing overflow here make the animation smoother
        // document.body.style.overflow = "hidden"
      }
      const currentPage = document.querySelector("#project-page__wrapper")

      currentPage.style.transform = `translateX(100%)`

      hideArrowBoxes()

      const prevPagePlaceholder = document.querySelector(
        "#prev-project-page__placeholder"
      )

      prevPagePlaceholder.style.transform = `translateX(0%)`
    }

    const entryTransition = {
      delay: 2.2, // Wait 1.5 seconds before entering
      appearAfter: 0.2,
      // length: 1,
      length: 0,
    }

    return (
      <>
        <Helmet
          meta={[
            {
              name: `description`,
              content: thisProjectData.projectDescription,
            },
            {
              property: `og:title`,
              content: `${thisProjectData.title} - Sayos Architects`,
            },
            {
              property: `og:description`,
              content: thisProjectData.projectDescription,
            },
            {
              property: `og:image`,
              content: thisProjectData.fullScreenPhoto.fluid.src,
            },
            {
              name: `twitter:title`,
              content: `${thisProjectData.titlePart1} ${thisProjectData.titlePart2} - Sayos Architects`,
            },
            {
              name: `twitter:description`,
              content: thisProjectData.projectDescription,
            },
          ]}
        />
        <Header isLogoBackgroundDark={this.state.isLogoBackgroundDark} />
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

        <div className={`arrow-box box-bt-left`} onClick={handleArrowPrev}>
          <TransitionLink
            exit={{
              trigger: ({ exit, node }) => exitToPrevProject(exit, node),
              length: 2.2,
            }}
            entry={entryTransition}
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
          </TransitionLink>
        </div>

        <div className={`arrow-box box-bt-right`} onClick={handleArrowNext}>
          <TransitionLink
            exit={{
              trigger: ({ exit, node }) => exitToNextProject(exit, node),
              length: 2.2,
            }}
            entry={entryTransition}
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
          </TransitionLink>
        </div>

        <div id={`prev-project-page__placeholder`}></div>
        <div id={`next-project-page__placeholder`}></div>

        <div
          id={`project-page__wrapper`}
          className={`test ${this.props.transitionStatus}`}
        >
          <div ref={this.topRef} className={`project-content-top`}>
            <div
              className={`slide-bg-fullscreen`}
              style={{
                backgroundImage: `url(
                              ${thisProjectData.fullScreenPhoto.fluid.src}
                            )`,

                "@media (maxWidth: 992px)": {
                  height: `0`,
                  backgroundSize: `contain`,
                  paddingTop: `${
                    (thisProjectData.fullScreenPhoto.height /
                      thisProjectData.fullScreenPhoto.width) *
                    100
                  }%`,
                },
              }}
            ></div>
          </div>

          <div className="project-content-middle" ref={this.nextSectionRef}>
            <div className="content section-left">
              <div className="content-wrapper">
                <div className="text-container">
                  <h2>{thisProjectData.titlePart1}</h2>
                  <h2>{thisProjectData.titlePart2}</h2>
                  <div className="project-description">
                    <p>{thisProjectData.projectDescription}</p>
                    <p>
                      {thisProjectData.areaText}:{" "}
                      <strong>{thisProjectData.areaValue}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="content section-right"
              style={{
                backgroundImage: `url(
                                      ${thisProjectData.secondaryPhoto.fluid.src}
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
            {thisProjectData.gallery.map((element, index) => {
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

                    "@media (maxWidth: 992px)": {
                      height: `0`,
                      backgroundSize: `contain`,
                      paddingTop: `${
                        (element.visualizationImage.height /
                          element.visualizationImage.width) *
                        100
                      }%`,
                    },
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
          ></span>
        </div>
        {/* project-page__wrapper */}
      </>
    )
  }
}

export default ProjectPage

export const query = graphql`
  query thisProjectData($locale: String!) {
    projects: allDatoCmsProject(locale: $locale) {
      nodes {
        slug
        locales
        id
        position
        title
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
        projectCategory
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
      slug
      locales
    }
  }
`
