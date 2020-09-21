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


  const data = useStaticQuery(graphql`
  query MyLogoQuery {
    dark: datoCmsHeaderLogo {
      logoImage {
        fixed {
          src
          base64
          tracedSVG
        }
      }
    }

    light: datoCmsHeaderLogoLight {
      logoImage {
        fixed {
          base64
          src
          tracedSVG
        }
      }
    }
  }
  `)

  let darkLogo = data.dark.logoImage.fixed.src;
  let lightLogo = data.light.logoImage.fixed.src;

  return (

        <Consumer>
        {({navToggled }) => (
        
        <>

        <header>

        <div className="menu-wrapper">
            <a href={`/`}>

            <div className={`logo-container`}>

                <Location>
                   {({ location }) => {
                      if ( location.pathname === "/o-nas" || location.pathname === "/about-us") {
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
        )}
      </Consumer>
        

  )
}

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header
