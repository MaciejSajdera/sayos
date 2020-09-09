import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

class ProjectPage extends React.Component {

  constructor() {
    super();

    this.state = {
      navToggled: false,

    }
  }

  handleNavToggle = () => {
    this.setState(prevState => ({navToggled: !prevState.navToggled}));
  }

  render() {

    const { myProjectData } = this.props.pageContext;

    const commonProps = {
      handleNavToggle: this.handleNavToggle,
      navToggled: this.state.navToggled,
      handleLanguageText: this.handleLanguageText,
      languagePL: this.state.languagePL,
      handleLanguageSwitch: this.handleLanguageSwitch
    }

    return (
  
      <Layout {...commonProps} data={myProjectData}>
      <div>
        strona projektu: {myProjectData.slug}
      </div>
      </Layout>
  
    )

  }

}

export default ProjectPage
