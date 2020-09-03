import React from "react"
import { Link, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Main from "../components/Main/main"

const Home = ({ data, pageContext }) => {

  return (
    <>
      <Main data={data}/>
    <pre>{JSON.stringify(pageContext)}</pre>
    </>
  )


  }

export default Home
