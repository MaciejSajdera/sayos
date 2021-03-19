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

// exports.shouldUpdateScroll = ({
//   routerProps: { location },
//   getSavedScrollPosition,
// }) => {
//   const { pathname } = location
//   // list of routes for the scroll-to-top-hook
//   const scrollToTopRoutes = [`/privacy-policy`, `/page-2`]
//   // if the new route is part of the list above, scroll to top (0, 0)
//   if (scrollToTopRoutes.indexOf(pathname) !== -1) {
//     window.scrollTo(0, 0)
//   }

//   return false
// }
