import React from "react"
// import PropTypes from 'prop-types'

const Filler = ({ dataMenu }) => {
  return (
    <>
      <div className="filler">
        <div className="filler-logo"></div>
        <p className="information">Strona jest obecnie w trakcie przebudowy</p>

        <div className="contact-data">
          <p className="invite">Zapraszamy do kontaktu:</p>
          <br />
          <div className="menu-grouped-items">
            <p>{dataMenu.adressData1}</p>
            <p>{dataMenu.adressData2}</p>
          </div>

          <div className="menu-grouped-items">
            <a href={`tel:${dataMenu.phoneNumber}`}>{dataMenu.phoneNumber}</a>
            <p>{dataMenu.emailAdress}</p>
          </div>

          <div className="icons">
            <a href={`${dataMenu.instagramLink}`} target="_blank">
              <span className="fb-logo" />
            </a>

            <a href={`${dataMenu.instagramLink}`} target="_blank">
              <span className="ig-logo" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filler
