import { Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from 'react'

const Header = ({ setNavState, navActive }) => {

  const data = useStaticQuery(graphql`
  query MyLogoQuery {
    allDatoCmsHeaderLogo {
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

      <Link to="/">
      <div className={`logo-container`}>

        {data.allDatoCmsHeaderLogo.edges.map((file, index) => (
        
            <div className={`logo-top`} id={file.node.logoImage.title} key={index}>
              <img src={file.node.logoImage.url}></img>
            </div>

      ))}

      </div>
      </Link>

      <div className={`menu-container`}>
        <div className="menu-box" onClick={() => { navActive ? setNavState(false) : setNavState(true)}}>


          <a href="#" className={`menu-trigger ${navActive ? "active" : ""}`} id={`menu10`} >
            <span></span>
            <span></span>
            <span></span>
          </a>

        </div>
      </div>

    </header>
  )

}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
