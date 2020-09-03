import React, { useState}  from "react"
import { Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"


const Header = ({ handleNavToggle, navToggled, handleLanguageChange, language }) => {

  // const [navActive, setNavState] = useState(false)

  // const navProps = {
  //   navActive: navActive,
  //   setNavState: setNavState,
  // }

  const data = useStaticQuery(graphql`
  query MyLogoQuery {
    allDatoCmsHeaderLogo(filter: {locale: {eq: "pl" }}) {
      edges {
        node {
          logoImage {
            url
            title
          }
        }
      }
    }
  }
  `)

  return (
    <header>

      <div className={`logo-container`}>

        {data.allDatoCmsHeaderLogo.edges.map((file, index) => (
        
            <div className={`logo-top`} id={file.node.logoImage.title} key={index}>
              <img src={file.node.logoImage.url}></img>
            </div>

      ))}

      </div>

      <div className={`lang-switch`} onClick={() => handleLanguageChange() }>{language ? `pl` : `en`}</div>

      <div className={`menu-container`}>
        <div className="menu-box" onClick={() => handleNavToggle() }>

          <div className={`menu-trigger ${navToggled ? "active" : ""}`} id={`menu10`} >
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>
      </div>
    </header>
  )
}

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header
