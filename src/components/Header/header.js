import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Location } from "@reach/router"

import myContext from "../../../context"

const Header = ({ location }) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }
  }, [])

  console.log(offset)

  // let myLocation = location.pathname

  // console.log(location.pathname)

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
                      console.log(location.pathname.toString())

                      if (
                        navToggled ||
                        location.pathname === "/o-nas" ||
                        location.pathname === "/o-nas/" ||
                        location.pathname === "/en/about-us" ||
                        location.pathname === "/en/about-us/" ||
                        location.pathname === "/thank-you" ||
                        location.pathname === "/dziekujemy" ||
                        location.pathname === "/thank-you/" ||
                        location.pathname === "/dziekujemy/" ||
                        location.pathname === "/en/house-project/" ||
                        location.pathname === "/en/house-project" ||
                        location.pathname === "/projekt-domu" ||
                        location.pathname === "/projekt-domu/" ||
                        location.pathname === "/projekt-wnetrza/" ||
                        location.pathname === "/projekt-wnetrza" ||
                        location.pathname === "/en/interior-project/" ||
                        location.pathname === "/en/interior-project" ||
                        location.pathname === "/oferta/" ||
                        location.pathname === "/offer/" ||
                        location.pathname === "/oferta" ||
                        location.pathname === "/offer"
                      ) {
                        return (
                          <div className={`logo-top`}>
                            <img src={lightLogo} alt="test-light-only" />
                          </div>
                        )
                      } else {
                        return (
                          <div className={`logo-top`}>
                            <img src={darkLogo} alt="test" />
                            {/* <img src={offset < 900 || offset > 1774 ? darkLogo : lightLogo} alt="test"/> */}
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

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header
