import React from "react"
import { Link, graphql, navigate } from "gatsby"

import Main from "../components/Main/main"
import Menu from "../components/Menu/menu"

import Consumer from "../../context"

class Home extends React.Component  {

  constructor(props) {
    super(props);

    this.state = {
      locale: this.props.data.menuRight.locale

    }
  }


  render() {

    let { projects, menuRight } = this.props.data;

    const menuStyle = `menuStyleAbsolute`;

  return (
    <>  {console.log(`index.js state locale: ${this.state.locale}`), console.log(`this props data: ${this.props.data}`)}
        <Menu dataMenu={menuRight} dataProjects={projects} menuStyle={menuStyle}/>

         <Main data={projects}/>
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
    locale
  }
}
`;
