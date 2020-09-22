import React from "react"

import Menu from "../components/Menu/menu"

const Thanks = (props) => {

  let { thanks } = props.data;

  return (
    <>
        {/* <Menu dataMenu={menuRightProject} dataMenuLeft={ menuLeftProject } about={about}/> */}

      <div className={`subpage`}>
      <div className="subpage-content-wrapper">
        <h1>{thanks.thankYouTitle}</h1>
        <p className={`text-content`}>{thanks.thankYouContent}</p>
      </div>

      </div>
    </>
  )}
  
export default Thanks

export const query = graphql`
query thanksData($locale: String!) {
  thanks: datoCmsThankYou(locale: {eq: $locale}) {
        thankYouTitle
        thankYouContent
        slug
        locale
  }
  menuRightProject: datoCmsMenuRight(locale: {eq: $locale}) {
    adressData1
    adressData2
    phoneNumber
    emailAdress
    instagramicon {
      fixed(height: 35) {
        src
        tracedSVG
        base64
      }
    }
    facebookicon {
      fixed(height: 35) {
        src
        tracedSVG
        base64
      }
    }
  }
  menuLeftProject: datoCmsMenuLeft(locale: {eq: $locale}) {
    projectsHeader
    projectsSubfield1
    projectsSubfield2
    offerHeader
    aboutHeader
    individualCustomer
    individualSubfield1
    individualSubfield2
    contactHeader
  }
}
`;

