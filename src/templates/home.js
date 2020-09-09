import React from "react"
import { Link, graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import Main from "../components/Main/main"

class Home extends React.Component  {

  constructor(props) {
    super(props);

    this.state = {
      // languagePL: true,
      navToggled: false,

    }
  }

  // handleLanguageText = () => {
  //   this.setState(prevState => ({languagePL: !prevState.languagePL}));
  // }

  handleNavToggle = () => {
    this.setState(prevState => ({navToggled: !prevState.navToggled}));
  }

  render() {

    const { myHomeData } = this.props.pageContext;

      const commonProps = {
        handleNavToggle: this.handleNavToggle,
        navToggled: this.state.navToggled,
        handleLanguageText: this.handleLanguageText,
        languagePL: this.state.languagePL,
        handleLanguageSwitch: this.handleLanguageSwitch
      }

  return (
    <>
      <Layout {...commonProps} data={myHomeData}>
         <Main data={myHomeData}/>
      </Layout>
    </>
  )

  }
}

export default Home
