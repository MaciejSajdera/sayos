import React, { useState}  from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

import Consumer from "../../../context"

const Header = () => {

  // const [navActive, setNavState] = useState(false)

  // const navProps = {
  //   navActive: navActive,
  //   setNavState: setNavState,
  // }

  const data = useStaticQuery(graphql`
  query MyHeaderQuery {
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

        <Consumer>

        {({handleNavToggle, navToggled }) => (


        <>

        <header className={`${navToggled ? "active" : ""}`}>

        {/* <div className="menu-wrapper"> */}
        <a href={`/`}>
        <div className={`logo-container`}>
            {data.allDatoCmsHeaderLogo.edges.map((file, index) => (

            <div className={`logo-top`} id={file.node.logoImage.title} key={index}>
             <img src={file.node.logoImage.url}></img>
            </div>

              ))}
        </div>
        </a>

        {/* <div className={`lang-switch`}>
          <Link to="/" onClick={() => {
            // set(data.menuRightPL)
            // langSwitch(false)
          } }>PL</Link>
         <Link to="/en" onClick={() => {
            // set(data.menuRightEN)
            // langToggle()
            // langSwitch(true)
          } }>EN</Link>
        </div> */}

        {/* <div className={`menu-container`}> */}

           {/* <div className="menu-box" onClick={() => handleNavToggle() }>

              <div className={`menu-trigger ${navToggled ? "active" : ""}`} id={`menu10`} >
                <span></span>
                <span></span>
                <span></span>
             </div>

            </div> */}

        {/* </div> */}

        {/* </div> */}

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
