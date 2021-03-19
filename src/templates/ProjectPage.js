import React, { Component, createRef } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import "react-lazy-load-image-component/src/effects/blur.css"
import Consumer from "../../context"
import { CgArrowUp, CgArrowDown } from "react-icons/cg"
import { IconContext } from "react-icons"
import Header from "../components/Header/header"
import Menu from "../components/Menu/menu"

import BackgroundImage from "gatsby-background-image"

class ProjectPage extends Component {
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
    let indexOfThisPoject

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
        indexOfThisPoject = i
      }
      return
    })

    this.setState(prevState => ({
      otherProjectsInThisCategory: [...projectsInThisCategory],
    }))

    this.setState(prevState => ({
      indexOfCurrentProject: indexOfThisPoject,
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

        //if last project
        if (indexOfCurrentProject >= otherProjectsInThisCategory.length - 1) {
          let firstProjectObject
          let firstProjectLink

          firstProjectObject = otherProjectsInThisCategory[0]

          let prevProjectLink

          thisProjectData.locale === "pl"
            ? (firstProjectLink = `${firstProjectObject.projectCategory}/${firstProjectObject.slug}`)
            : (firstProjectLink = `${thisProjectData.locale}/${firstProjectObject.projectCategory}/${firstProjectObject.slug}`)

          arrowRightLinkDestination = firstProjectLink
          nextProjectPlaceholderImageSrc =
            firstProjectObject.fullScreenPhoto.fluid.src

          thisProjectData.locale === "pl"
            ? (prevProjectLink = `${prevProjectObject.projectCategory}/${prevProjectObject.slug}`)
            : (prevProjectLink = `${thisProjectData.locale}/${prevProjectObject.projectCategory}/${prevProjectObject.slug}`)

          arrowLeftLinkDestination = prevProjectLink
          prevProjectPlaceholderImageSrc =
            prevProjectObject.fullScreenPhoto.fluid.src
        } else {
          let nextProjectLink

          thisProjectData.locale === "pl"
            ? (nextProjectLink = `${nextProjectObject.projectCategory}/${nextProjectObject.slug}`)
            : (nextProjectLink = `${thisProjectData.locale}/${nextProjectObject.projectCategory}/${nextProjectObject.slug}`)

          arrowRightLinkDestination = nextProjectLink
          nextProjectPlaceholderImageSrc =
            nextProjectObject.fullScreenPhoto.fluid.src

          let prevProjectLink

          if (indexOfCurrentProject > 0) {
            thisProjectData.locale === "pl"
              ? (prevProjectLink = `${prevProjectObject.projectCategory}/${prevProjectObject.slug}`)
              : (prevProjectLink = `${thisProjectData.locale}/${prevProjectObject.projectCategory}/${prevProjectObject.slug}`)

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

          thisProjectData.locale === "pl"
            ? (lastProjectLink = `${lastProjectObject.projectCategory}/${lastProjectObject.slug}`)
            : (lastProjectLink = `${thisProjectData.locale}/${lastProjectObject.projectCategory}/${lastProjectObject.slug}`)

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
    } = this.props.data

    const { thisProjectData } = this.props.pageContext

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
        <Header isLogoBackgroundDark={this.state.isLogoBackgroundDark} />
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
              css={{
                backgroundImage: `url(
                              ${thisProjectData.fullScreenPhoto.fluid.src}
                            )`,
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
              css={{
                backgroundImage: `url(
                                      ${thisProjectData.secondaryPhoto.fluid.src}
                                    )`,
                backgroundSize: `cover`,
                backgroundPosition: `center`,
              }}
            ></div>

            <span
              id="project-content-middle-end"
              css={{
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
            css={{
              display: `flex`,
              flexWrap: `wrap`,
            }}
          >
            {thisProjectData.gallery.map((element, index) => {
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
        {/* project-page__wrapper */}
      </>
    )
  }
}

export default ProjectPage

export const query = graphql`
  query thisProjectData($locale: String!) {
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
        projectCategory
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
