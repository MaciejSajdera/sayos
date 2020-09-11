import React from 'react'
// import PropTypes from 'prop-types'
import Consumer from "../../../context"

const MenuProject = ({ data }) => {
    return (

        <Consumer>
        {({navToggled, menuData}) => (
        <div className={`menu ${navToggled ? `active` : ""}`}>
            <div className="menu-left">
                {menuData.adressData1}
            </div>

            <div className="menu-right">
                
            </div>
        </div>
        )}
        </Consumer>
    )
}

export default MenuProject
