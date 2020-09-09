import React from 'react'
// import PropTypes from 'prop-types'


const Menu = ({ navToggled, data }) => {
    return (
        <div className={`menu ${navToggled ? `active` : ""}`}>
            <div className="menu-left">
                {data.adressData1}
            </div>

            <div className="menu-right">
                
            </div>
        </div>
    )
}

export default Menu
