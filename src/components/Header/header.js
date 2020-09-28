import React, { useEffect, useState}  from "react"
import { Link, useStaticQuery, graphql, Img } from "gatsby"
import PropTypes from "prop-types"
import { Location } from '@reach/router'

import Consumer from "../../../context"

const Header = ({ location }) => {

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }
  }, []);

  console.log(offset);

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

  let darkLogo = data.dark.logoImage.fixed.src;
  let lightLogo = data.light.logoImage.fixed.src;

  return (
        
        <>

        <header>

        <div className="menu-wrapper">
            <a href={`/`}>

            <div className={`logo-container`}>

                <Location>
                   {({ location }) => {
                     console.log(location.pathname.toString())

                      if ( location.pathname === "/o-nas" || location.pathname === "/o-nas/" || location.pathname === "/en/about-us"
                      || location.pathname === "/en/about-us/"
                       || location.pathname === "/thank-you" || location.pathname === "/dziekujemy"
                       || location.pathname === "/thank-you/" || location.pathname === "/dziekujemy/"
                        ||  location.pathname === "/en/house-project/" ||  location.pathname === "/en/house-project" ||  location.pathname === "/projekt-domu"
                        ||  location.pathname === "/projekt-domu/" || location.pathname === "/projekt-wnetrza/" || location.pathname === "/projekt-wnetrza" || location.pathname === "/en/interior-project/" || location.pathname === "/en/interior-project") {
                        return (
                        <div className={`logo-top`}>
                        <img src={lightLogo} alt="test-light-only"/>
                        </div>
                        )
                      } else {
                        return (
                          <div className={`logo-top`}>
                          <img src={offset < 900 || offset > 1774 ? darkLogo : lightLogo} alt="test"/>
                          </div>
                        )
                      } 
                    }}
                </Location>

            </div>

            </a>
        </div>

        </header>
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
