import React from "react"
import { Link, graphql, navigate } from "gatsby"

import Filler from "../components/Filler/filler"
// import Main from "../components/Main/main"
// import Menu from "../components/Menu/menu"
// import Header from "../components/Header/header"

// import Consumer from "../../context"

// import TransitionLink from "gatsby-plugin-transition-link"

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      locale: this.props.data.menuRightIndex.locale,
    }
  }

  render() {
    let {
      // projects,
      menuRightIndex,
      // menuLeftIndex,
      // about,
      // logoData,
      // houseProject,
      // interiorProject,
      // category,
      // offer,
    } = this.props.data

    // const menuStyle = `menuStyleAbsolute`

    return (
      <>
        {/* <Header />
        <Menu
          dataMenu={menuRightIndex}
          dataMenuLeft={menuLeftIndex}
          dataProjects={projects}
          menuStyle={menuStyle}
          about={about}
          logoData={logoData}
          houseProject={houseProject}
          interiorProject={interiorProject}
          category={category}
          offer={offer}
        />
        <Main data={projects} /> */}
        <Filler dataMenu={menuRightIndex} />
      </>
    )
  }
}

export default Home

export const query = graphql`
  query allProjectsDataHome($locale: String!) {
    menuRightIndex: datoCmsMenuRight(locale: { eq: $locale }) {
      adressData1
      adressData2
      phoneNumber
      emailAdress
      instagramLink
      facebookLink
    }
  }
`
