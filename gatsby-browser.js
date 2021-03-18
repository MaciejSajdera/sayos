/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "./src/styles/styles.scss"
import smoothscroll from "smoothscroll-polyfill"

export const onClientEntry = () => {
  setTimeout(function () {
    document.getElementById("___loader").style.opacity = 0
  }, 1000)

  smoothscroll.polyfill()

  setTimeout(function () {
    document.getElementById("___loader").style.display = "none"
  }, 1400)

  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    return import(`intersection-observer`)
  }
}

export const onPreRouteUpdate = ({ location, prevLocation }) => {
  console.log("Gatsby started to change location to", location.pathname)

  console.log(
    "Gatsby started to change location from",
    prevLocation ? prevLocation.pathname : null
  )
}
