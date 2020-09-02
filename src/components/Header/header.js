import { Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => {

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

      <div class={`logo-container`}>

        {data.allDatoCmsHeaderLogo.edges.map((file, index) => (
        
            <div class={`logo-top`} id={file.node.logoImage.title} key={index}>
              <img src={file.node.logoImage.url}></img>
            </div>

      ))}

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
