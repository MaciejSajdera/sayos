import React from 'react'
// import PropTypes from 'prop-types'
import Consumer from "../../../context"

const MenuProject = ({ data }) => {
    return (

        <Consumer>
        {({navToggled, menuData}) => (
        <div className={`menu ${navToggled ? `active` : ""}`}>
            <div className="menu-left">
                
            </div>

            <div className="menu-right">
                {menuData.adressData1}
            </div>
        </div>
        )}
        </Consumer>
    )
}

export default MenuProject
