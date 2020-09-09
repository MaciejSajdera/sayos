import React from 'react'
// import PropTypes from 'prop-types'

class Menu extends React.Component {

    render() {

        const LocaleContext = this.props.LocaleContext;

        return (
            <>

            <div className={`menu ${this.props.navToggled ? `active` : ""}`}>
                <div className="menu-left">
                <LocaleContext.Consumer>
                  {value => <p>{value.menuRight.adressData1}</p>}  
                </LocaleContext.Consumer>
                </div>
    
                <div className="menu-right">
                    test
                </div>
            </div>

            </>
        )
    }


}

export default Menu
