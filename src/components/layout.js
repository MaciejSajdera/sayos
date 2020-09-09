/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import "./layout.css"

import Header from "./Header/header"
import Menu from "./Menu/menu"


// const LocaleContext = React.createContext();

class Layout extends React.Component  {

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

    const LocaleContext = this.props.LocaleContext;

      const commonProps = {
        handleNavToggle: this.handleNavToggle,
        navToggled: this.state.navToggled,
        handleLanguageText: this.handleLanguageText,
        languagePL: this.state.languagePL,
        handleLanguageSwitch: this.handleLanguageSwitch,
        LocaleContext: LocaleContext
      }

  return (
    <LocaleContext.Provider value={this.props.data}>
      {/* <p className="test">{query.locale}</p> */}
      <Header {...commonProps}/>
      <Menu {...commonProps}/>

      {/* {this.props.children} */}

    </LocaleContext.Provider>
  )
  }
}

export { Layout }