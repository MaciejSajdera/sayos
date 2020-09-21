import React from "react"


// const defaultContextValue = {
//   data: {
//     // set your initial data shape here
//     navToggled: false,
//   },
//   set: () => {},
// }

const { Provider, Consumer } = React.createContext()

class ContextProviderComponent extends React.Component {
  constructor(props) {
    super(props)

    this.setData = this.setData.bind(this)
    this.state = {
      set: this.setData,
      setLocale: this.setLocale,
      langChosen: '',
      langToggle: this.langToggle,
      handleNavToggle: this.handleNavToggle,
    }
  }

  setData(newData) {
    this.setState({
      menuData: {
        newData,
      },
    })
  }

  setLocale(myLocale) {
    this.setState(state => ({
      data: {
        myLocale,
      },
    }))
  }

  handleNavToggle = () => {
    this.setState(prevState => ({navToggled: !prevState.navToggled}));
  }

  langToggle = () => {
    this.setState(prevState => ({langChosen: !prevState.langChosen}));
  }

  render() {

    return <Provider value={this.state}> {this.props.children} {console.log(this.state)}</Provider>
  }
}

export { Consumer as default, ContextProviderComponent }
