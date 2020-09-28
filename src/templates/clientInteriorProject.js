import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';

import Menu from "../components/Menu/menu"


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

const ClientInteriorProject = (props) => {

  let { interiorProject, houseProject, menuRightProject, menuLeftProject, about, category } = props.data;

  return (
    <>
        <Menu dataMenu={menuRightProject} dataMenuLeft={ menuLeftProject } about={ about } houseProject = {houseProject} interiorProject={interiorProject} category={category}/>

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

        {interiorProject.modularContent.map((node, index) => (

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
  
export default ClientInteriorProject

export const query = graphql`
query InteriorProjectData($locale: String!) {
  interiorProject: datoCmsInteriorProjectForClient(locale: {eq: $locale}) {
    pageName
    slug
    locale
    modularContent {
      slideNumber
      slideHeader
      slideMainText
    }
  }
  houseProject: datoCmsHouseProjectForClient(locale: {eq: $locale}) {
    pageName
    slug
    locale
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
        base64
      }
    }
    facebookicon {
      fixed(height: 35) {
        src
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
  category: datoCmsCategory(locale: {eq: $locale}) {
    categoryFirst
    categorySecond
    locale
  }
}
`;

