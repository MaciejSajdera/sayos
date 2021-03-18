import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Location } from "@reach/router"

import myContext from "../../../context"

const Header = ({ logoLight, isLogoBackgroundDark }) => {
  const data = useStaticQuery(graphql`
    query MyLogoQuery {
      dark: datoCmsHeaderLogo {
        logoImage {
          fixed {
            src
            base64
          }
        }
      }

      light: datoCmsHeaderLogoLight {
        logoImage {
          fixed {
            base64
            src
          }
        }
      }
    }
  `)

  let darkLogo = data.dark.logoImage.fixed.src
  let lightLogo = data.light.logoImage.fixed.src

  // const darkBackgroundElement = document.querySelector(
  //   ".project-content-middle"
  // )

  // function callback(entries, observer) {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       document.querySelector(".logo-top").classList.add("test")
  //     } else {
  //       document.querySelector(".logo-top").classList.remove("test")
  //     }
  //   })
  // }

  // let observer = new IntersectionObserver(callback)

  // if (darkBackgroundElement) {
  //   observer.observe(darkBackgroundElement)
  // }

  return (
    <>
      <myContext.Consumer>
        {({ handleNavToggle, navToggled, set }) => (
          <a className={`logo-link`} href={`/`}>
            <header>
              <div className="menu-wrapper">
                <div className={`logo-container`}>
                  <Location>
                    {({ location }) => {
                      if (navToggled) {
                        return (
                          <div className={`logo-top logo-menu-open`}>
                            <img src={lightLogo} alt="Sayos Architects Logo" />
                          </div>
                        )
                      }

                      if (logoLight) {
                        return (
                          <div className={`logo-top`}>
                            <img src={lightLogo} alt="Sayos Architects Logo" />
                          </div>
                        )
                      }
                      if (isLogoBackgroundDark) {
                        return (
                          <div
                            className={`logo-top logo-top--on-dark-background`}
                          >
                            <img src={lightLogo} alt="Sayos Architects Logo" />
                          </div>
                        )
                      } else {
                        return (
                          <div className={`logo-top`}>
                            <img src={darkLogo} alt="Sayos Architects Logo" />
                          </div>
                        )
                      }
                    }}
                  </Location>
                </div>
              </div>
            </header>
          </a>
        )}
      </myContext.Consumer>
    </>
  )
}

export default Header
