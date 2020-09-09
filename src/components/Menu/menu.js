import React from 'react'
// import PropTypes from 'prop-types'


const Menu = ({ navToggled, data }) => {
    return (
        <div className={`menu ${navToggled ? `active` : ""}`}>
            <div className="menu-left">
                {/* {data.map((element, index) => (
                    <div key={index}>
                        {element.locale}
                    </div>
                ))} */}
            </div>

            <div className="menu-right">
                
            </div>
        </div>
    )
}

export default Menu
