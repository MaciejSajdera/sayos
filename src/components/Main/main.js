import React, { useState } from "react"

import LazyLoad from "react-lazyload"
import posed from "react-pose"

import TransitionLink from "gatsby-plugin-transition-link"
import scrollTo from "gatsby-plugin-smoothscroll"

import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, {
  Navigation,
  A11y,
  Lazy,
  Keyboard,
  Mousewheel,
  Autoplay,
} from "swiper"
SwiperCore.use([Navigation, Mousewheel, Keyboard, A11y, Lazy, Autoplay])

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mouseWheelActive: false,
      transitionLinkTarget: 1,
    }

    // this.handleTransitionLinkType = this.handleTransitionLinkType.bind(this);
  }

  handleTransitionLinkType = e => {
    if (e.currentTarget.classList.contains("swiper-slide-active")) {
      this.setState({ transitionLinkTarget: 1 })
      console.log("1szy od lewej")
    }

    if (e.currentTarget.classList.contains("swiper-slide-next")) {
      this.setState({ transitionLinkTarget: 2 })
      console.log("srodkowy")
    }

    if (
      !e.currentTarget.classList.contains("swiper-slide-active") &&
      !e.currentTarget.classList.contains("swiper-slide-next")
    ) {
      e.currentTarget.classList.add("swiper-slide-last-in-viewport")
      this.setState({ transitionLinkTarget: 3 })
      console.log("ostatni")
    }

    if (e.currentTarget.classList.contains("swiper-slide-prev")) {
      this.setState({ transitionLinkTarget: 4 })
      console.log("1szy od lewej")
    }
  }

  handleOnMouseLeave = e => {
    if (e.currentTarget.classList.contains("swiper-slide-last-in-viewport")) {
      e.currentTarget.classList.remove("swiper-slide-last-in-viewport")
    }
  }

  handleWheel = e => {
    const delta = Math.sign(e.deltaY)
    delta < 0
      ? this.setState({ mouseWheelActive: false })
      : this.setState({ mouseWheelActive: true })
  }

  componentDidMount() {
    console.log()

    const swiperButtonLeft = document.querySelector(".swiper-button-prev")
    const swiperButtonRight = document.querySelector(".swiper-button-next")

    setTimeout(() => {
      swiperButtonLeft.classList.add("arrow-entered")
      swiperButtonRight.classList.add("arrow-entered")
    }, 1500)
  }

  // handleWheel = (e) => {
  //   const allElements = document.querySelectorAll(".thumbnail-image");
  //   console.log(e.target.getBoundingClientRect())
  //   allElements.forEach(element => {
  //     // console.log(element.getBoundingClientRect())
  //     let matrixValue = `${element.getBoundingClientRect().x / 120}`
  //     element.style.transform = `matrix(1.05, 0, 0, 1.05, ${matrixValue}, 0)`
  //   });
  // }

  //https://dev.to/mattrothenberg/recreating-pentagram-com-a-deep-dive-with-gatsby-js-h75

  //https://www.gatsbyjs.com/blog/2018-12-04-per-link-gatsby-page-transitions-with-transitionlink/

  render() {
    let data = this.props.data

    const transitionLinkTarget = this.state.transitionLinkTarget

    let exitTransition

    const TRANSITION_LENGTH = 1.1

    if (transitionLinkTarget === 1) {
      exitTransition = {
        length: TRANSITION_LENGTH,
        trigger: () => {
          if (document) {
            // Preventing overflow here make the animation smoother
            document.body.style.overflow = "hidden"
          }

          // const isElementXPercentInViewport = function (el, percentVisible) {
          //   let rect = el.getBoundingClientRect(),
          //     windowHeight =
          //       window.innerHeight || document.documentElement.clientHeight

          //   return !(
          //     Math.floor(
          //       100 -
          //         ((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100
          //     ) < percentVisible ||
          //     Math.floor(
          //       100 - ((rect.bottom - windowHeight) / rect.height) * 100
          //     ) < percentVisible
          //   )
          // }

          const allSlides = document.querySelectorAll(".swiper-slide")
          const firstSlide = document.querySelector(".swiper-slide-active")
          const middleSlide = document.querySelector(".swiper-slide-next")
          const firstSlideBgImage = firstSlide.querySelector(
            ".slide-bg-fullscreen"
          )
          const allSlideTitles = document.querySelectorAll(".title-container")
          allSlideTitles.forEach(title => {
            title.style.opacity = `0`
          })

          const arrowBoxes = document.querySelectorAll(
            "div[class*='swiper-button']"
          )
          arrowBoxes.forEach(arrow => {
            arrow.style.opacity = `0`
          })

          const currentViewPort = window.innerWidth
          const firstSlideWidth = firstSlide.clientWidth
          const firstSlideDistanceFromStart = firstSlide.getBoundingClientRect()
            .x
          // const firstSlideVisiblePxs =
          //   firstSlideDistanceFromStart - currentViewPort
          // const firstSlideHiddenPxs = firstSlideVisiblePxs + firstSlideWidth

          const myMove = firstSlideDistanceFromStart

          const swiperControl = document.querySelector(".swiper-wrapper")

          // const currentSwiper3d = window.getComputedStyle(swiperControl)
          //   .transform

          const currentSwiperPosition = getStyle(swiperControl, "transform")

          const swiperPositionValuesArray = currentSwiperPosition
            .match(/\((.*)\)/)
            .pop()
            .split(",")

          const currentSwiperPositionValue = swiperPositionValuesArray[4]

          swiperControl.style.transform = `matrix(1, 0, 0, 1, ${
            currentSwiperPositionValue - myMove
          }, 0)`

          // `matrix(${-myMove}px, 0px, 0px)`

          function getStyle(el, styleProp) {
            var value,
              defaultView = (el.ownerDocument || document).defaultView
            // W3C standard way:
            if (defaultView && defaultView.getComputedStyle) {
              // sanitize property name to css notation
              // (hypen separated words eg. font-Size)
              styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase()
              return defaultView
                .getComputedStyle(el, null)
                .getPropertyValue(styleProp)
            } else if (el.currentStyle) {
              // IE
              // sanitize property name to camelCase
              styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
                return letter.toUpperCase()
              })
              value = el.currentStyle[styleProp]
              // convert other units to pixels on IE
              if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                return (function (value) {
                  var oldLeft = el.style.left,
                    oldRsLeft = el.runtimeStyle.left
                  el.runtimeStyle.left = el.currentStyle.left
                  el.style.left = value || 0
                  value = el.style.pixelLeft + "px"
                  el.style.left = oldLeft
                  el.runtimeStyle.left = oldRsLeft
                  return value
                })(value)
              }
              return value
            }
          }

          firstSlideBgImage.classList.remove("move-left")
          firstSlideBgImage.classList.remove("move-right")
          firstSlideBgImage.style.transform = `scale(1)`
          firstSlide.style.width = `100%`

          console.log(
            `We are exiting 1, target: ${firstSlideBgImage.classList}`
          )
        },
      }
    }

    if (transitionLinkTarget === 2) {
      exitTransition = {
        length: TRANSITION_LENGTH,
        trigger: () => {
          if (document) {
            // Preventing overflow here make the animation smoother IMO
            document.body.style.overflow = "hidden"
          }
          const allSlides = document.querySelectorAll(".swiper-slide")
          // const beforeFirstSlide = document.querySelector(".swiper-slide-prev")
          const firstSlide = document.querySelector(".swiper-slide-active")
          const middleSlide = document.querySelector(".swiper-slide-next")

          const middleSlideBgImage = middleSlide.querySelector(
            ".slide-bg-fullscreen"
          )
          const allSlideTitles = document.querySelectorAll(".title-container")
          allSlideTitles.forEach(title => {
            title.style.opacity = `0`
          })

          const arrowBoxes = document.querySelectorAll(
            "div[class*='swiper-button']"
          )
          arrowBoxes.forEach(arrow => {
            arrow.style.opacity = `0`
          })

          const currentViewPort = window.innerWidth
          const middleSlideWidth = middleSlide.clientWidth
          const middleSlideDistanceFromStart = middleSlide.getBoundingClientRect()
            .x
          const firstSlideDistanceFromStart = firstSlide.getBoundingClientRect()
            .x
          // const middleSlideVisiblePxs =
          //   middleSlideDistanceFromStart - currentViewPort
          // const middleSlideHiddenPxs = middleSlideVisiblePxs + middleSlideWidth

          const myMove = firstSlideDistanceFromStart

          const swiperControl = document.querySelector(".swiper-wrapper")

          // const currentSwiper3d = window.getComputedStyle(swiperControl)
          //   .transform

          const currentSwiperPosition = getStyle(swiperControl, "transform")

          const swiperPositionValuesArray = currentSwiperPosition
            .match(/\((.*)\)/)
            .pop()
            .split(",")

          const currentSwiperPositionValue = swiperPositionValuesArray[4]

          swiperControl.style.transform = `matrix(1, 0, 0, 1, ${
            currentSwiperPositionValue - myMove
          }, 0)`

          // `matrix(${-myMove}px, 0px, 0px)`

          function getStyle(el, styleProp) {
            var value,
              defaultView = (el.ownerDocument || document).defaultView
            // W3C standard way:
            if (defaultView && defaultView.getComputedStyle) {
              // sanitize property name to css notation
              // (hypen separated words eg. font-Size)
              styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase()
              return defaultView
                .getComputedStyle(el, null)
                .getPropertyValue(styleProp)
            } else if (el.currentStyle) {
              // IE
              // sanitize property name to camelCase
              styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
                return letter.toUpperCase()
              })
              value = el.currentStyle[styleProp]
              // convert other units to pixels on IE
              if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                return (function (value) {
                  var oldLeft = el.style.left,
                    oldRsLeft = el.runtimeStyle.left
                  el.runtimeStyle.left = el.currentStyle.left
                  el.style.left = value || 0
                  value = el.style.pixelLeft + "px"
                  el.style.left = oldLeft
                  el.runtimeStyle.left = oldRsLeft
                  return value
                })(value)
              }
              return value
            }
          }

          middleSlideBgImage.classList.remove("move-left")
          middleSlideBgImage.classList.remove("move-right")
          middleSlideBgImage.style.transform = `scale(1)`
          // middleSlideBgImage.style.backgroundSize = `cover`
          firstSlide.style.width = `0%`
          middleSlide.style.width = `100%`

          console.log("We are exiting 2")
        },
      }
    }

    if (transitionLinkTarget === 3) {
      exitTransition = {
        length: TRANSITION_LENGTH,
        trigger: () => {
          if (document) {
            // Preventing overflow here make the animation smoother IMO
            document.body.style.overflow = "hidden"
          }

          const allSlides = document.querySelectorAll(".swiper-slide")
          const firstSlide = document.querySelector(".swiper-slide-active")
          const middleSlide = document.querySelector(".swiper-slide-next")

          const lastSlide = document.querySelector(
            ".swiper-slide-last-in-viewport"
          )

          const lastSlideBgImage = lastSlide.querySelector(
            ".slide-bg-fullscreen"
          )
          const allSlideTitles = document.querySelectorAll(".title-container")
          allSlideTitles.forEach(title => {
            title.style.opacity = `0`
          })

          const arrowBoxes = document.querySelectorAll(
            "div[class*='swiper-button']"
          )
          arrowBoxes.forEach(arrow => {
            arrow.style.opacity = `0`
          })

          // allSlides.forEach(slide => {
          //   slide.width = `0%`
          // })

          const currentViewPort = window.innerWidth
          const lastSlideWidth = lastSlide.clientWidth
          const lastSlideDistanceFromStart = lastSlide.getBoundingClientRect().x
          const lastSlideVisiblePxs =
            lastSlideDistanceFromStart - currentViewPort
          const lastSlideHiddenPxs = lastSlideVisiblePxs + lastSlideWidth

          const myMove = lastSlideHiddenPxs

          const swiperControl = document.querySelector(".swiper-wrapper")

          // const currentSwiper3d = window.getComputedStyle(swiperControl)
          //   .transform

          const currentSwiperPosition = getStyle(swiperControl, "transform")

          const swiperPositionValuesArray = currentSwiperPosition
            .match(/\((.*)\)/)
            .pop()
            .split(",")

          const currentSwiperPositionValue = swiperPositionValuesArray[4]

          swiperControl.style.transform = `matrix(1, 0, 0, 1, ${
            currentSwiperPositionValue - myMove
          }, 0)`

          // `matrix(${-myMove}px, 0px, 0px)`

          function getStyle(el, styleProp) {
            var value,
              defaultView = (el.ownerDocument || document).defaultView
            // W3C standard way:
            if (defaultView && defaultView.getComputedStyle) {
              // sanitize property name to css notation
              // (hypen separated words eg. font-Size)
              styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase()
              return defaultView
                .getComputedStyle(el, null)
                .getPropertyValue(styleProp)
            } else if (el.currentStyle) {
              // IE
              // sanitize property name to camelCase
              styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
                return letter.toUpperCase()
              })
              value = el.currentStyle[styleProp]
              // convert other units to pixels on IE
              if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                return (function (value) {
                  var oldLeft = el.style.left,
                    oldRsLeft = el.runtimeStyle.left
                  el.runtimeStyle.left = el.currentStyle.left
                  el.style.left = value || 0
                  value = el.style.pixelLeft + "px"
                  el.style.left = oldLeft
                  el.runtimeStyle.left = oldRsLeft
                  return value
                })(value)
              }
              return value
            }
          }

          lastSlideBgImage.classList.remove("move-left")
          lastSlideBgImage.classList.remove("move-right")
          lastSlideBgImage.style.transform = `scale(1)`

          firstSlide.style.width = `0%`
          middleSlide.style.width = `0%`
          lastSlide.style.width = `100%`

          console.log("We are exiting 3")
        },
      }
    }

    if (transitionLinkTarget === 4) {
      exitTransition = {
        length: TRANSITION_LENGTH,
        trigger: () => {
          if (document) {
            // Preventing overflow here make the animation smoother
            document.body.style.overflow = "hidden"
          }

          // const isElementXPercentInViewport = function (el, percentVisible) {
          //   let rect = el.getBoundingClientRect(),
          //     windowHeight =
          //       window.innerHeight || document.documentElement.clientHeight

          //   return !(
          //     Math.floor(
          //       100 -
          //         ((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100
          //     ) < percentVisible ||
          //     Math.floor(
          //       100 - ((rect.bottom - windowHeight) / rect.height) * 100
          //     ) < percentVisible
          //   )
          // }

          const allSlides = document.querySelectorAll(".swiper-slide")
          const firstSlide = document.querySelector(".swiper-slide-active")
          const middleSlide = document.querySelector(".swiper-slide-next")
          const prevSlide = document.querySelector(".swiper-slide-prev")

          const prevSlideBgImage = prevSlide.querySelector(
            ".slide-bg-fullscreen"
          )
          const allSlideTitles = document.querySelectorAll(".title-container")
          allSlideTitles.forEach(title => {
            title.style.opacity = `0`
          })

          const arrowBoxes = document.querySelectorAll(
            "div[class*='swiper-button']"
          )
          arrowBoxes.forEach(arrow => {
            arrow.style.opacity = `0`
          })

          const currentViewPort = window.innerWidth
          const prevSlideWidth = prevSlide.clientWidth
          const prevSlideDistanceFromStart = prevSlide.getBoundingClientRect().x
          // const firstSlideVisiblePxs =
          //   firstSlideDistanceFromStart - currentViewPort
          // const firstSlideHiddenPxs = firstSlideVisiblePxs + firstSlideWidth

          const myMove = prevSlideDistanceFromStart

          const swiperControl = document.querySelector(".swiper-wrapper")

          // const currentSwiper3d = window.getComputedStyle(swiperControl)
          //   .transform

          const currentSwiperPosition = getStyle(swiperControl, "transform")

          const swiperPositionValuesArray = currentSwiperPosition
            .match(/\((.*)\)/)
            .pop()
            .split(",")

          const currentSwiperPositionValue = swiperPositionValuesArray[4]

          swiperControl.style.transform = `matrix(1, 0, 0, 1, ${
            currentSwiperPositionValue - myMove
          }, 0)`

          // `matrix(${-myMove}px, 0px, 0px)`

          function getStyle(el, styleProp) {
            var value,
              defaultView = (el.ownerDocument || document).defaultView
            // W3C standard way:
            if (defaultView && defaultView.getComputedStyle) {
              // sanitize property name to css notation
              // (hypen separated words eg. font-Size)
              styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase()
              return defaultView
                .getComputedStyle(el, null)
                .getPropertyValue(styleProp)
            } else if (el.currentStyle) {
              // IE
              // sanitize property name to camelCase
              styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
                return letter.toUpperCase()
              })
              value = el.currentStyle[styleProp]
              // convert other units to pixels on IE
              if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                return (function (value) {
                  var oldLeft = el.style.left,
                    oldRsLeft = el.runtimeStyle.left
                  el.runtimeStyle.left = el.currentStyle.left
                  el.style.left = value || 0
                  value = el.style.pixelLeft + "px"
                  el.style.left = oldLeft
                  el.runtimeStyle.left = oldRsLeft
                  return value
                })(value)
              }
              return value
            }
          }

          prevSlideBgImage.classList.remove("move-left")
          prevSlideBgImage.classList.remove("move-right")
          prevSlideBgImage.style.transform = `scale(1)`
          prevSlide.style.width = `100%`

          console.log(`We are exiting 4, target: ${prevSlideBgImage.classList}`)
        },
      }
    }

    const entryTransition = {
      delay: TRANSITION_LENGTH, // Wait 1.5 seconds before entering
      trigger: () => {
        console.log("We are entering")
        if (document && window) {
          // Ensuring we're at the top of the page when the page loads
          // prevents any additional JANK when the transition ends.
          window.scrollTo(0, 0)
          document.body.style.overflow = "visible"
        }

        console.log("ENTRY ENTRY ENTRY")
      },
    }

    return (
      <main>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          mousewheel={{
            sensitivity: 3,
          }}
          navigation
          keyboard
          a11y
          lazy={{ loadPrevNext: true, loadPrevNextAmount: 3 }}
          breakpoints={{
            // when window width is >= 640px
            992: {
              slidesPerView: 3,
              freeMode: true,
              // speed: 700,
            },
          }}
        >
          {data.nodes
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
                  onMouseOver={this.handleTransitionLinkType}
                  onMouseLeave={this.handleOnMouseLeave}
                  // onClick={e => scrollTo(`#slide-id-${index}`)}
                >
                  <div className={`single-project-container`}>
                    <TransitionLink
                      to={
                        element.locale === "pl"
                          ? `${element.projectCategory}/${element.slug}`
                          : `/${element.locale}/${element.projectCategory}/${element.slug}`
                      }
                      exit={exitTransition}
                      entry={entryTransition}
                    >
                      <LazyLoad>
                        <div
                          onWheel={this.handleWheel}
                          className={`slide-bg-fullscreen
                          ${
                            this.state.mouseWheelActive
                              ? `move-right`
                              : `move-left`
                          }
                          `}
                          css={{
                            backgroundImage: `url(
                              ${element.fullScreenPhoto.fluid.src}
                            )`,
                          }}
                        ></div>
                      </LazyLoad>

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
                    </TransitionLink>
                    {/* </Link> */}
                  </div>
                </SwiperSlide>
              )
            })}
        </Swiper>
      </main>
    )
  }
}

export default Main
