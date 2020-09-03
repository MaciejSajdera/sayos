/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import "./layout.css"

import Header from "../components/Header/header"
import Menu from "../components/Menu/menu"

const Layout = ({handleNavToggle, navToggled, handleLanguageChange, language, children }) => {

  return (
    <>
      <Header handleNavToggle={handleNavToggle} navToggled={navToggled} handleLanguageChange={handleLanguageChange} language={language}/>
      <Menu navToggled={navToggled} />
      <main>{children}</main>
    </>
  )
}


export default Layout
