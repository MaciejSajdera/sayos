import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Location } from "@reach/router"

import myContext from "../../../context"

const Header = ({ logoLight }) => {
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

  console.log("test")

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
                            <img src={lightLogo} alt="test-light-only" />
                          </div>
                        )
                      }

                      if (logoLight) {
                        return (
                          <div className={`logo-top`}>
                            <img src={lightLogo} alt="test-light-only" />
                          </div>
                        )
                      } else {
                        return (
                          <div className={`logo-top`}>
                            <img src={darkLogo} alt="test" />
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
