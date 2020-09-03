/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState}  from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./Header/header"
import Menu from "./Menu/menu"
import "./layout.css"

const Layout = ({ children }) => {

  const [navActive, setNavState] = useState(false)
  const [langChosen, setLang] = useState(false)

  const commonProps = {
      setNavState: setNavState,
      navActive: navActive,
      setLang: setLang,
      langChosen: langChosen,
  }

  return (
    <>
      <Header {...commonProps}/>
      <Menu {...commonProps}/>
      <main>{children}</main>
    </>
  )
}


export default Layout
