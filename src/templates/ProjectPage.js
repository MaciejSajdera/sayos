import React, { Component } from 'react'
import { Link, graphql, navigate } from "gatsby"

import Menu from "../components/Menu/menu"

class ProjectPage extends Component {
  render() {

    let { projects, menuRight } = this.props.data;

    const { myProjectData } = this.props.pageContext;

    return (
      <>

      {console.log(`index.js state locale: ${myProjectData.locale}`),
      
      console.log(`this props data: ${this.props.data}`)
      }

      <Menu data={menuRight}/>

      {/* {this.props.data.menuRight.phoneNumber} */}
      <div>

      strona projektu: {myProjectData.slug}
      {/* testmenudata: {menuRight.phoneNumber} */}
      </div>
      </>
    )
  }
}

export default ProjectPage

export const query = graphql`
query myProjectData($locale: String!) {
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
