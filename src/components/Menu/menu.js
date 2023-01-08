import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import myContext from "../../../context"
import ContactForm from "../ContactForm/ContactForm"

const Menu = ({
  locale,
  dataMenu,
  dataMenuLeft,
  dataProjects,
  menuStyle,
  about,
  location,
  houseProject,
  interiorProject,
  category,
  offer,
}) => {
  const data = useStaticQuery(graphql`
    query MyMenuLogoQuery {
      light: datoCmsHeaderLogoLight {
        logoImage {
          fixed {
            base64
            src
          }
        }
      }
    }
  `)

  let lightLogo = data.light.logoImage.fixed.src

  const [isOpen, setIsOpen] = useState(false)

  const handleContactFormToggle = () => {
    setIsOpen(!isOpen)
    const elementsToHide = document.querySelectorAll(".will-be-hidden")
    elementsToHide.forEach(element => {
      element.classList.toggle("hidden")
    })
  }

  const rememberWhereEnteredFrom = nameOfTheEntryPoint => {
    sessionStorage.setItem(
      `projectPageNavigationStartedAt`,
      nameOfTheEntryPoint
    )
  }

  return (
    <>
      <myContext.Consumer>
        {({ handleNavToggle, navToggled, set }) => (
          <div className={`menu ${navToggled ? `active` : ""}`}>
            <div className={`menu-container`}>
              <div
                className="menu-box"
                onClick={() => handleNavToggle()}
                tabIndex="0"
                role="button"
                aria-label="Open Menu"
              >
                {/* <span id={`menu-pop-up`} className={`menu-box`}></span> */}
                <div
                  className={`menu-trigger ${navToggled ? "active" : ""}`}
                  id={`menu10`}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div className={`menu-inner`}>
                <div className={`lang-switch`}>
                  <Link
                    to="/"
                    onClick={() => {
                      // set(data.menuRightEN)
                      // langToggle()
                      // langSwitch(true)
                    }}
                  >
                    PL
                  </Link>
                  |
                  <Link
                    to="/en"
                    onClick={() => {
                      // set(data.menuRightEN)
                      // langToggle()
                      // langSwitch(true)
                    }}
                  >
                    EN
                  </Link>
                </div>

                <div className="icons icons__mobile">
                  <a href={`${dataMenu.behanceLink}`} target="_blank">
                    <img src={dataMenu.behanceicon.fixed.src} alt="" />
                  </a>

                  <a href={`${dataMenu.pinterestLink}`} target="_blank">
                    <img src={dataMenu.pinteresticon.fixed.src} alt="" />
                  </a>

                  <a href={`${dataMenu.instagramLink}`} target="_blank">
                    <img src={dataMenu.instagramicon.fixed.src} alt="" />
                  </a>

                  <a href={`${dataMenu.facebookLink}`} target="_blank">
                    <img src={dataMenu.facebookicon.fixed.src} alt="" />
                  </a>
                </div>

                <div className="menu-wrapper">
                  <div
                    className={`menu-left ${
                      navToggled ? "menu-left-part-active" : ""
                    }`}
                  >
                    <div className="menu-grouped-items will-be-hidden">
                      <Link
                        to={locale === "pl" ? `/all` : `/${locale}/all`}
                        onClick={() => {
                          rememberWhereEnteredFrom(`/all`)
                        }}
                      >
                        <h3>{dataMenuLeft.projectsHeader}</h3>
                      </Link>

                      <Link
                        to={
                          locale === "pl"
                            ? `/${category.categoryFirst}`
                            : `/${locale}/${category.categoryFirst}`
                        }
                        onClick={() => {
                          locale === "pl"
                            ? rememberWhereEnteredFrom(
                                `/${category.categoryFirst}`
                              )
                            : rememberWhereEnteredFrom(
                                `/${locale}/${category.categoryFirst}`
                              )
                        }}
                      >
                        <p className={`project-subfield`}>
                          {dataMenuLeft.projectsSubfield1}
                        </p>
                      </Link>

                      <Link
                        to={
                          locale === "pl"
                            ? `/${category.categorySecond}`
                            : `/${locale}/${category.categorySecond}`
                        }
                        onClick={() => {
                          locale === "pl"
                            ? rememberWhereEnteredFrom(
                                `/${category.categorySecond}`
                              )
                            : rememberWhereEnteredFrom(
                                `/${locale}/${category.categorySecond}`
                              )
                        }}
                      >
                        <p className={`project-subfield`}>
                          {dataMenuLeft.projectsSubfield2}
                        </p>
                      </Link>
                    </div>

                    <div className="menu-grouped-items with-subtitle will-be-hidden">
                      <Link to={`/${offer.slug}`}>
                        <h3>{dataMenuLeft.offerHeader}</h3>
                        <p className="project-subfield">
                          {dataMenuLeft.offerSubfield}
                        </p>
                      </Link>
                    </div>

                    <Link
                      className={`will-be-hidden`}
                      to={
                        locale === "pl"
                          ? `/${about.slug}`
                          : `/${locale}/${about.slug}`
                      }
                    >
                      <h3>{dataMenuLeft.aboutHeader}</h3>
                    </Link>

                    <Link
                      className={`will-be-hidden`}
                      to={locale === "pl" ? `/publikacje` : `/${locale}/media`}
                    >
                      <h3>{dataMenuLeft.publicationsHeader}</h3>
                    </Link>

                    {/* <div className="menu-grouped-items">
                          <h3>{dataMenuLeft.individualCustomer}</h3>

                          <Link to={ locale === "pl" ? `/${houseProject.slug}` : `/${houseProject.locale}/${houseProject.slug}`}>
                          <p>{dataMenuLeft.individualSubfield1}</p>
                          </Link>

                          <Link to={ locale === "pl" ? `/${interiorProject.slug}` : `/${interiorProject.locale}/${interiorProject.slug}`}>
                          <p className={`${isOpen ? "title-hidden" : ""}`}>{dataMenuLeft.individualSubfield2}</p>
                          </Link>

                        </div> */}

                    <div
                      className={`contact-form-container ${
                        isOpen ? "form-active" : ""
                      }`}
                    >
                      {/* <div className="contact-form-wrapper"> */}
                      {/* <h3>Napisz do nas</h3> */}
                      {/* </div> */}

                      <ContactForm
                        handleContactFormToggle={handleContactFormToggle}
                      />
                    </div>

                    <h3
                      className={`contact-form-title will-be-hidden ${
                        isOpen ? "title-hidden" : ""
                      }`}
                      onClick={() => {
                        handleContactFormToggle()
                      }}
                    >
                      {dataMenuLeft.contactHeader}
                    </h3>
                  </div>

                  <div
                    className={`menu-right ${
                      isOpen
                        ? "menu-right-contact-active menu-right-part-active"
                        : ""
                    }`}
                  >
                    <Link
                      to={`/`}
                      onClick={() => {
                        rememberWhereEnteredFrom(`/all`)
                      }}
                    >
                      <img className={`menu-logo`} src={lightLogo} alt=""></img>
                    </Link>

                    <div className="menu-grouped-items">
                      <p>{dataMenu.adressData1}</p>
                      <p>{dataMenu.adressData2}</p>
                    </div>

                    <div className="menu-grouped-items contact-info">
                      <a href={`tel:${dataMenu.phoneNumber}`}>
                        {dataMenu.phoneNumber}
                      </a>
                      <a href={`mailto:${dataMenu.emailAdress}`}>
                        {dataMenu.emailAdress}
                      </a>
                    </div>

                    <div className="icons icons__desktop">
                      <a href={`${dataMenu.instagramLink}`} target="_blank">
                        <img src={dataMenu.instagramicon.fixed.src} alt="" />
                      </a>

                      <a href={`${dataMenu.facebookLink}`} target="_blank">
                        <img src={dataMenu.facebookicon.fixed.src} alt="" />
                      </a>

                      <a href={`${dataMenu.behanceLink}`} target="_blank">
                        <img src={dataMenu.behanceicon.fixed.src} alt="" />
                      </a>

                      <a href={`${dataMenu.pinterestLink}`} target="_blank">
                        <img src={dataMenu.pinteresticon.fixed.src} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </myContext.Consumer>
    </>
  )
}

export default Menu
