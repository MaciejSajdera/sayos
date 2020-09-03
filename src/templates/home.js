import React from "react"
import { Link, graphql } from "gatsby"

import Main from "../components/Main/main"

class Home extends React.Component  {

  render() {

  // let { home } = this.props.data;

  return (
    <>
      <Main data={this.props.data}/>
      {/* <p>{this.props.data.slug}</p> */}
    {/* <pre>{JSON.stringify(pageContext)}</pre> */}
    </>
  )


  }
}

export default Home

