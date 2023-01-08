import React, { useState } from "react"

import { Link } from "gatsby"

import LazyLoad from "react-lazyload"

import TransitionLink from "gatsby-plugin-transition-link"

import AniLink from "gatsby-plugin-transition-link/AniLink"
import bgLogo from "../../images/sayos-bg-logo.png"
import { getStyle } from "../../helperFunctions/helperFunctions"

import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, {
  Navigation,
  Lazy,
  Parallax,
  Keyboard,
  Mousewheel,
} from "swiper"
SwiperCore.use([Navigation, Mousewheel, Keyboard, Lazy, Parallax])

class HeroCarousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mouseWheelActive: false,
      transitionLinkTarget: 0,
      swiperPosition: 0,
      currentLocation: this.props.pageLocation,
    }

    // this.handleTransitionLinkType = this.handleTransitionLinkType.bind(this);
  }

  // handleTransitionLinkType = e => {
  //   e.currentTarget.closest(".swiper-slide").style.zIndex = `1`

  //   let mySlide = e.currentTarget.closest(".swiper-slide")

  //   if (mySlide.classList.contains("swiper-slide-active")) {
  //     this.setState({ transitionLinkTarget: 1 })
  //     // console.log("1szy od lewej")
  //   }

  //   if (mySlide.classList.contains("swiper-slide-next")) {
  //     this.setState({ transitionLinkTarget: 2 })
  //     // console.log("srodkowy")
  //   }

  //   if (
  //     !mySlide.classList.contains("swiper-slide-active") &&
  //     !mySlide.classList.contains("swiper-slide-next")
  //   ) {
  //     mySlide.classList.add("swiper-slide-last-in-viewport")
  //     this.setState({ transitionLinkTarget: 3 })
  //     // console.log("ostatni")
  //   }

  //   if (mySlide.classList.contains("swiper-slide-prev")) {
  //     this.setState({ transitionLinkTarget: 4 })
  //     // console.log("1szy od lewej")
  //   }
  // }

  // handleOnMouseLeave = e => {
  //   let mySlide = e.currentTarget.closest(".swiper-slide")

  //   if (mySlide.classList.contains("swiper-slide-last-in-viewport")) {
  //     mySlide.classList.remove("swiper-slide-last-in-viewport")
  //   }
  // }

  // handleWheel = e => {
  //   const delta = Math.sign(e.deltaY)
  //   delta < 0
  //     ? this.setState({ mouseWheelActive: false })
  //     : this.setState({ mouseWheelActive: true })
  // }

  // console.log(`my templateLocation: ${templateLocation.pathname}`)

  // myExitTransition = () => {
  //   let exitTransition
  //   const TRANSITION_LENGTH = 1.1

  //   return (exitTransition = {
  //     length: TRANSITION_LENGTH,
  //     trigger: () => {
  //       if (document) {
  //         // Preventing overflow here make the animation smoother
  //         document.body.style.overflow = "hidden"
  //       }

  //       const firstSlide = document.querySelector(".swiper-slide-active")
  //       const middleSlide = document.querySelector(".swiper-slide-next")
  //       const prevSlide = document.querySelector(".swiper-slide-prev")
  //       const allSlideTitles = document.querySelectorAll(".title-container")

  //       allSlideTitles.forEach(title => {
  //         title.style.opacity = `0`
  //       })

  //       const arrowBoxes = document.querySelectorAll(
  //         "div[class*='swiper-button']"
  //       )
  //       arrowBoxes.forEach(arrow => {
  //         arrow.style.opacity = `0`
  //       })

  //       const currentViewPort = window.innerWidth

  //       const swiperControl = document.querySelector(".swiper-wrapper")
  //       const currentSwiperPosition = getStyle(swiperControl, "transform")

  //       const swiperPositionValuesArray = currentSwiperPosition
  //         .match(/\((.*)\)/)
  //         .pop()
  //         .split(",")

  //       const currentSwiperPositionValue = swiperPositionValuesArray[4]
  //       let myMove

  //       if (this.state.transitionLinkTarget === 1) {
  //         const firstSlideBgImage = firstSlide.querySelector(
  //           ".slide-bg-fullscreen"
  //         )

  //         const firstSlideDistanceFromStart = firstSlide.getBoundingClientRect()
  //           .x
  //         myMove = firstSlideDistanceFromStart

  //         const theDistance = Math.round(currentSwiperPositionValue - myMove)

  //         swiperControl.style.transform = `matrix(1, 0, 0, 1, ${theDistance}, 0)`

  //         // const handleExitedSwiperPosition = e => {
  //         //   sessionStorage.setItem(
  //         //     `swiperPositionFor_${this.state.currentLocation}`,
  //         //     currentSwiperPositionValue - myMove
  //         //   )
  //         // }
  //         // handleExitedSwiperPosition()

  //         // firstSlideBgImage.classList.remove("move-left", "move-right")
  //         firstSlideBgImage.classList.add("slide-clicked")
  //         // firstSlideBgImage.style.transform = `scale(1)`

  //         firstSlide.style.width = `100%`

  //         // console.log(
  //         //   `We are exiting 1, target: ${firstSlideBgImage.classList}`
  //         // )
  //       }

  //       if (this.state.transitionLinkTarget === 2) {
  //         const middleSlideBgImage = middleSlide.querySelector(
  //           ".slide-bg-fullscreen"
  //         )

  //         const firstSlideDistanceFromStart = firstSlide.getBoundingClientRect()
  //           .x

  //         myMove = firstSlideDistanceFromStart

  //         const theDistance = Math.round(currentSwiperPositionValue - myMove)

  //         swiperControl.style.transform = `matrix(1, 0, 0, 1, ${theDistance}, 0)`

  //         // middleSlideBgImage.classList.remove("move-left")
  //         // middleSlideBgImage.classList.remove("move-right")
  //         middleSlideBgImage.classList.add("slide-clicked")
  //         // middleSlideBgImage.style.transform = `scale(1)`
  //         firstSlide.style.width = `0%`
  //         middleSlide.style.width = `100%`

  //         // console.log("We are exiting 2")
  //       }

  //       if (this.state.transitionLinkTarget === 3) {
  //         const lastSlide = document.querySelector(
  //           ".swiper-slide-last-in-viewport"
  //         )

  //         const lastSlideBgImage = lastSlide
  //           ? lastSlide.querySelector(".slide-bg-fullscreen")
  //           : document.querySelector(".swiper-slide-next")

  //         const lastSlideWidth = lastSlide.clientWidth
  //         const lastSlideDistanceFromStart = lastSlide.getBoundingClientRect().x
  //         const lastSlideVisiblePxs =
  //           lastSlideDistanceFromStart - currentViewPort
  //         const lastSlideHiddenPxs = lastSlideVisiblePxs + lastSlideWidth

  //         myMove = lastSlideHiddenPxs

  //         const theDistance = Math.round(currentSwiperPositionValue - myMove)

  //         swiperControl.style.transform = `matrix(1, 0, 0, 1, ${theDistance}, 0)`

  //         // const handleExitedSwiperPosition = e => {
  //         //   sessionStorage.setItem(
  //         //     `swiperPositionFor_${this.state.currentLocation}`,
  //         //     currentSwiperPositionValue - myMove
  //         //   )
  //         // }
  //         // handleExitedSwiperPosition()

  //         // lastSlideBgImage.classList.remove("move-left")
  //         // lastSlideBgImage.classList.remove("move-right")
  //         lastSlideBgImage.classList.add("slide-clicked")
  //         // lastSlideBgImage.style.transform = `scale(1)`

  //         firstSlide.style.width = `0%`
  //         middleSlide.style.width = `0%`
  //         lastSlide.style.width = `100%`

  //         // console.log("We are exiting 3")
  //       }

  //       if (this.state.transitionLinkTarget === 4) {
  //         const prevSlideBgImage = prevSlide.querySelector(
  //           ".slide-bg-fullscreen"
  //         )

  //         const prevSlideDistanceFromStart = prevSlide.getBoundingClientRect().x
  //         myMove = prevSlideDistanceFromStart

  //         const theDistance = Math.round(currentSwiperPositionValue - myMove)

  //         swiperControl.style.transform = `matrix(1, 0, 0, 1, ${theDistance}, 0)`

  //         // prevSlideBgImage.classList.remove("move-left")
  //         // prevSlideBgImage.classList.remove("move-right")
  //         prevSlideBgImage.classList.add("slide-clicked")
  //         // prevSlideBgImage.style.transform = `scale(1)`
  //         prevSlide.style.width = `100%`

  //         // console.log(
  //         //   `We are exiting 4, target: ${prevSlideBgImage.classList}`
  //         // )
  //       }

  //       // const handleExitedSwiperPosition = e => {
  //       //   sessionStorage.setItem(
  //       //     `swiperPositionFor_${this.state.currentLocation}`,
  //       //     currentSwiperPositionValue - myMove
  //       //   )
  //       // }
  //       // handleExitedSwiperPosition()
  //     },
  //   })
  // }

  // entryTransition = {
  //   delay: 1.1, // Wait 1.5 seconds before entering
  //   trigger: () => {
  //     // console.log("We are entering")
  //     if (document && window) {
  //       // Ensuring we're at the top of the page when the page loads
  //       // prevents any additional JANK when the transition ends.
  //       window.scrollTo(0, 0)
  //       // document.body.style.overflow = "visible"
  //     }
  //   },
  // }

  componentDidMount() {
    const swiperButtonLeft = document.querySelector(".swiper-button-prev")
    const swiperButtonRight = document.querySelector(".swiper-button-next")
    const swiperControl = document.querySelector(".swiper-wrapper")

    // if (typeof Storage !== "undefined") {
    //   if (
    //     sessionStorage.getItem(
    //       `swiperPositionFor_${this.state.currentLocation}`
    //     )
    //   ) {
    //     const goToPreviousPosition = () => {
    //       const swiperExitPosition = sessionStorage.getItem(
    //         `swiperPositionFor_${this.state.currentLocation}`
    //       )

    //       swiperControl.style.transform = `translate3d(${swiperExitPosition}px, 0px, 0px)`
    //     }
    //     goToPreviousPosition()
    //   }
    // }

    setTimeout(() => {
      swiperButtonLeft.classList.add("arrow-entered")
      swiperButtonRight.classList.add("arrow-entered")
    }, 500)
  }

  //https://dev.to/mattrothenberg/recreating-pentagram-com-a-deep-dive-with-gatsby-js-h75

  //https://www.gatsbyjs.com/blog/2018-12-04-per-link-gatsby-page-transitions-with-transitionlink/

  render() {
    let { projects, templateLocation, pageLocation, locale } = this.props

    // const setZIndexForBgInTopSlider = () => {
    //   console.log("test")
    // }

    const SwiperConfigs = {
      spaceBetween: 0,
      watchSlidesProgress: true,
      navigation: true,
      lazy: false,
      parallax: true,
      speed: 700,
      touchRatio: 0.2,
      slidesPerView: 1,
      mousewheel: {
        sensitivity: 4,
      },

      // onInit: setZIndexForBgInTopSlider,
      // onSlideChangeStart: setZIndexForBgInTopSlider,

      breakpoints: {
        // when window width is >= 640px
        992: {
          slidesPerView: 2,
        },

        1100: {
          slidesPerView: 3,
          freeMode: true,
          freeModeMomentum: true,
          freeModeMomentumBounce: false,
          freeModeMomentumRatio: 0.4,
          freeModeMomentumVelocityRatio: 0.2,
          touchRatio: 0,
        },
      },
    }

    return (
      <main className={`${pageLocation}`}>
        <Swiper {...SwiperConfigs}>
          {projects
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
            .map((element, index) => {
              return (
                <SwiperSlide
                  key={index}
                  id={`slide-id-${index}`}
                  // onMouseLeave={this.handleOnMouseLeave}
                >
                  <AniLink
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
                    to={
                      locale === "pl"
                        ? `/${element.projectCategory}/${element.slug}`
                        : `/en/${element.projectCategory}/${element.slug}`
                    }
                    // exit={this.myExitTransition()}
                    // entry={this.entryTransition}
                    // onClick={this.handleTransitionLinkType}
                    state={{ prevPath: templateLocation.pathname }}
                    // onWheel={this.handleWheel}
                    className={`slide-bg-fullscreen slide-home-page`}
                    style={{
                      backgroundImage: `url(
                            ${element.fullScreenPhoto.fluid.src}
                          )`,
                    }}
                  >
                    <div className={`title-wrapper`}>
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
                    </div>
                  </AniLink>
                </SwiperSlide>
              )
            })}
        </Swiper>
      </main>
    )
  }
}

export default HeroCarousel
