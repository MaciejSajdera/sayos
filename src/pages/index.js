import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Home from "../templates/home"


class IndexPage extends React.Component {
  constructor() {
    super();

    this.state = {
      language: true,
      navToggled: false,
    }
  }

  handleLanguageChange = () => {
    this.setState(prevState => ({language: !prevState.language}));
  }

  handleNavToggle = () => {
    console.log('test');
    this.setState(prevState => ({navToggled: !prevState.navToggled}));
  }

  render() {

    // let allData = this.props.data;
    const language = this.state.language;

    let allData;
    this.state.language ? allData = this.props.data.homePL : allData = this.props.data.homeEN;

      const commonProps = {
        handleNavToggle: this.handleNavToggle,
        navToggled: this.state.navToggled,
        handleLanguageChange: this.handleLanguageChange,
        language: language,
      }

    return (
      <>
      <Layout {...commonProps}>
        <Home data={allData}/>
      </Layout>
      </>
    )
  }
}


export default IndexPage

export const data = graphql`

query MyDataQuery {
    homePL: allDatoCmsProject(filter: {locale: {eq: "pl" }}) {
      nodes {
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
    homeEN: allDatoCmsProject(filter: {locale: {eq: "en" }}) {
      nodes {
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
  }
`;
