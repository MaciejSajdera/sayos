import React, { useEffect, useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';

import Menu from "../components/Menu/menu"

import myContext from "../../context"

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

const ClientDesignProject = (props) => {

  let { interiorProject, houseProject, designProject, menuRightProject, menuLeftProject, about, category, offer } = props.data;

  const context = useContext(myContext)

  useEffect(() => {
    context.navToggled ? context.handleNavToggle() : console.log('nav open');
  }, [])

  return (
    <>
        <Menu dataMenu={menuRightProject} dataMenuLeft={ menuLeftProject } about={ about } houseProject = {houseProject} interiorProject={interiorProject} category={category} offer={offer}/>

      <div className={`subpage`}>
      <div className="subpage-content-wrapper">
      <h1 className="subpage-title">{designProject.pageName}</h1>
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

        {designProject.modularContent.map((node, index) => (

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
  
export default ClientDesignProject

export const query = graphql`
query DesignProjectData($locale: String!) {
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
  designProject: datoCmsDesignProjectForClient(locale: {eq: $locale}) {
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
    offerSubfield
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

  
  offer: datoCmsOffer(locale: {eq: $locale}) {
    offerArchitectsLogo {
      fixed {
        base64
        src
      }
    }
    offerDesignLogo {
      fixed {
        base64
        src
      }
    }
    offerInteriorsLogo {
      fixed {
        base64
        src
      }
    }
    locale
    slug
  }
}
`;

