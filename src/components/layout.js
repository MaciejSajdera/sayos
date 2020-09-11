/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import "./layout.css"

import Header from "./Header/header"

import { ContextProviderComponent } from "../../context"


const Layout = (props) => {

    return (
      <>
      <ContextProviderComponent>
        <Header />
        {props.children}
      </ContextProviderComponent>
      </>
    )

}

export default Layout