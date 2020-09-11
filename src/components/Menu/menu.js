import React from 'react'
import {Link } from 'gatsby'
import Consumer from "../../../context"

const Menu = ({ dataMenu, dataProjects, menuStyle }) => {
    return (

        <Consumer>
        {({handleNavToggle, navToggled, set}) => (

        
    <div className={`menu ${menuStyle} ${navToggled ? `active` : ""}`}>

        <div className={`menu-container`}>

            <div className="menu-box" onClick={() => handleNavToggle() }>

                    <div className={`menu-trigger ${navToggled ? "active" : ""}`} id={`menu10`} >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
            </div>

            <div className={`menu-inner`}>


                    <div className="menu-left">
                        {dataMenu.adressData1}
                        {dataMenu.locale}

                    </div>

                    <div className="menu-right">
                        <div className={`lang-switch`}>

                        {/* {dataProjects.nodes.map(node => (

                        <Link to={ node.locale === "pl" ? `/${node.slug}` : `/${node.locale}/${node.slug}`}>PL</Link>

                        ))} */}

                                            
                            <Link to="/" onClick={() => {
                                // set(data.menuRightEN)
                                // langToggle()
                                // langSwitch(true)
                            } }>PL</Link>
                            
                    
                            <Link to="/en" onClick={() => {
                                // set(data.menuRightEN)
                                // langToggle()
                                // langSwitch(true)
                            } }>EN</Link>
                        </div>
                    </div>
            </div>

        </div>

    </div>



        )}
        </Consumer>
    )
}

export default Menu
