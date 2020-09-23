import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';

import Menu from "../components/Menu/menu"


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

const ClientHouseProject = (props) => {

  let { houseProject, menuRightProject, menuLeftProject, about } = props.data;

  return (
    <>
        <Menu dataMenu={menuRightProject} dataMenuLeft={ menuLeftProject } about={ about } houseProject = {houseProject}/>

      <div className={`subpage`}>
      <div className="subpage-content-wrapper">
      <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          // effect="fade"
          // scrollbar={{ draggable: true }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >

        {houseProject.modularContent.map((node, index) => (

            <SwiperSlide>
            <div className="slide-container" id={`slide-${index}`} key={index}>
            <p>{node.slideNumber}</p>
            <h2>{node.slideHeader}</h2>
            <p className={`text-content`}>{node.slideMainText}</p>
            </div>
            </SwiperSlide>

        ))}

      </Swiper>
      </div>

      </div>
    </>
  )}
  
export default ClientHouseProject

export const query = graphql`
query HouseProjectData($locale: String!) {
  houseProject: datoCmsHouseProjectForClient(locale: {eq: $locale}) {
    pageName
    slug
    modularContent {
      slideNumber
      slideHeader
      slideMainText
    }
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

  about: datoCmsAbout(locale: {eq: $locale}) {
    aboutTitle
    aboutContent
    slug
    locale
  }

  logoData: datoCmsHeaderLogoLight {
    logoImage {
      fixed {
        base64
        src
      }
    }
  }
}
`;

