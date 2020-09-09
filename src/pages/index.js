import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Home from "../templates/home"


const IndexPage = () => {


    return (
      <Layout>
        <Home />
      </Layout>
    )
}


export default IndexPage
