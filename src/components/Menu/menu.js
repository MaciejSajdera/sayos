import React, { useState } from 'react';
import { Link, useStaticQuery } from 'gatsby'
import { navigate } from 'gatsby-link'
import Consumer from "../../../context"
import ContactForm from "../ContactForm/ContactForm"
import { VscClose } from 'react-icons/vsc';

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const Menu = ({ dataMenu, dataMenuLeft, dataProjects, menuStyle, about, location }) => {

    const data = useStaticQuery(graphql`
    query MyMenuLogoQuery {
      light: datoCmsHeaderLogoLight {
        logoImage {
          fixed {
            base64
            src
            tracedSVG
          }
        }
      }
    }
    `)

    let lightLogo = data.light.logoImage.fixed.src;

    const [isOpen, setIsOpen] = useState(false);

    const [state, setState] = React.useState({})

    const handleChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.value })
    }
    
    const handleContactFormToggle = () => setIsOpen(!isOpen);

    const handleSubmit = (e) => {
      e.preventDefault()
      const form = e.target
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': form.getAttribute('name'),
          ...state,
        }),
      })
        .then(() => navigate(form.getAttribute('action')))
        .catch((error) => alert(error))
    }

    return (

      <>

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

                    <div className={`lang-switch`}>

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

                <div className="menu-wrapper">

                    <div className="menu-left">
                        
                      <div className="menu-grouped-items">
                        <h3>{dataMenuLeft.projectsHeader}</h3>
                        <p>{dataMenuLeft.projectsSubfield1}</p>
                        <p>{dataMenuLeft.projectsSubfield2}</p>
                      </div>

                        <h3>{dataMenuLeft.offerHeader}</h3>

                        <Link to={`/${about.slug}`} onClick={() => {handleNavToggle()}}>
                        <h3>{dataMenuLeft.aboutHeader}</h3>
                        </Link>


                      <div className="menu-grouped-items">
                        <h3>{dataMenuLeft.individualCustomer}</h3>
                        <p>{dataMenuLeft.individualSubfield1}</p>
                        <p>{dataMenuLeft.individualSubfield2}</p>
                      </div>

                        <div className={`contact-form-container ${isOpen ? "form-active" : ""}`}>
                            <span className="close-contact-form" onClick={() => {handleContactFormToggle()}}>
                              <VscClose />
                            </span>
                          <div className="contact-form-wrapper">
                            <h3>Napisz do nas</h3>
                            <div className="contact-form">

                                      <form
                                            name="contact"
                                            method="post"
                                            action="/thanks/"
                                            data-netlify="true"
                                            data-netlify-honeypot="bot-field"
                                            onSubmit={handleSubmit}
                                          >
                                            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                                            <input type="hidden" name="form-name" value="contact" />
                                            <p hidden>
                                              <label>
                                                Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                                              </label>
                                            </p>
                                            <p>
                                              <label>
                                                Your name:
                                                <br />
                                                <input type="text" name="name" onChange={handleChange} />
                                              </label>
                                            </p>
                                            <p>
                                              <label>
                                                Your email:
                                                <br />
                                                <input type="email" name="email" onChange={handleChange} />
                                              </label>
                                            </p>
                                            <p>
                                              <label>
                                                Message:
                                                <br />
                                                <textarea name="message" onChange={handleChange} />
                                              </label>
                                            </p>
                                            <p>
                                              <button type="submit">Send</button>
                                            </p>
                                      </form>
                            </div>
                          </div>
                        </div>

                        <h3 class="contact-form-title" onClick={() => {handleContactFormToggle()}}>
                          {dataMenuLeft.contactHeader}
                        </h3>
            
                    </div>

                    <div className="menu-right">

                            <img className={`menu-logo`} src={lightLogo} alt=""></img>

                            <div className="menu-grouped-items">
                                <p>{dataMenu.adressData1}</p>
                                <p>{dataMenu.adressData2}</p>
                            </div>

                            <div className="menu-grouped-items">
                                <p>{dataMenu.phoneNumber}</p>
                                <p>{dataMenu.emailAdress}</p>
                            </div>

                            <div className="icons">
                            <img src={dataMenu.instagramicon.fixed.src} alt="" />
                            <img src={dataMenu.facebookicon.fixed.src} alt="" />
                            </div>

                    </div>
                </div>
            </div>

        </div>

    </div>



        )}
        </Consumer>
    </>
    )
}

export default Menu
