import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Home from "../templates/home"


class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: 'pl',
      navToggled: false,
    }
  }

  handleLanguageChange = () => {
    this.setState({language: 'en'})
  }

  handleNavToggle = () => {
    console.log('test');
    this.setState(prevState => ({navToggled: !prevState.navToggled}));
  }

  render() {

    let data = this.props.data;

      const commonProps = {
        handleNavToggle: this.handleNavToggle,
        navToggled: this.state.navToggled,
        handleLanguageChange: this.handleLanguageChange,
        language: language,
      }

    const language = this.state.language;

    return (
      <>
      <Layout {...commonProps}>
        <Home data={data}/>
      </Layout>
      </>
    )
  }
}


export default IndexPage

export const data = graphql`

query MyDataQuery {
    allDatoCmsProject {
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
