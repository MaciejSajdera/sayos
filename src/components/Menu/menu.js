import React from 'react'
// import PropTypes from 'prop-types'


const Menu = ({ navToggled }) => {
    return (
        <div className={`menu ${navToggled ? `active` : ""}`}>
            <div className="menu-left">

            </div>

            <div className="menu-right">
                
            </div>
        </div>
    )
}

export default Menu
