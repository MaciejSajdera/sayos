import React from "react"
import { Link, graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import Main from "../components/Main/main"

class Home extends React.Component  {

  constructor(props) {
    super(props);

    this.state = {
      navToggled: false,

    }
  }

  handleNavToggle = () => {
    this.setState(prevState => ({navToggled: !prevState.navToggled}));
  }

  render() {

    let { projects, menuRight } = this.props.data;

      const commonProps = {
        handleNavToggle: this.handleNavToggle,
        navToggled: this.state.navToggled,
        handleLanguageText: this.handleLanguageText,
        languagePL: this.state.languagePL,
        handleLanguageSwitch: this.handleLanguageSwitch
      }

  return (
    <>
      <Layout {...commonProps} data={menuRight}>
         <Main data={projects}/>
      </Layout>
    </>
  )

  }
}

export default Home

export const query = graphql`
query myData($locale: String!) {
  projects: allDatoCmsProject(filter: {locale: {eq: $locale }}) {
    nodes {
      slug
      locale
      id
      position
      thumbnail {
        fluid {
          src
          base64
          srcSet
        }
      }
      titlePart1
      titlePart2
      readMore
      fullScreenPhoto {
        fluid {
          src
          base64
          srcSet
        }
      }
      secondaryPhoto {
        fluid {
          src
          base64
          srcSet
        }
      }
      projectDescription
      areaText
      areaValue
      fullScreenPhotoTwo {
        fluid {
          src
          base64
          srcSet
        }
      }
    }
  }
  menuRight: datoCmsMenuRight(locale: {eq: $locale}) {
    adressData1
    adressData2
    phoneNumber
    emailAdress
    socialMedia {
      myIcon {
        fixed {
          src
          srcSet
          base64
        }
      }
    }
  }
}
`;
