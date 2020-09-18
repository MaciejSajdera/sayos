import React, { Component, createRef } from 'react'
import { Link, graphql, navigate, Img } from "gatsby"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Consumer from "../../context"
import { HiArrowNarrowUp, HiArrowNarrowDown } from 'react-icons/hi';
import { IconContext } from "react-icons";

import Menu from "../components/Menu/menu"

class ProjectPage extends Component {

  constructor() {
    super()



  }

  render() {

    let { projects, menuRight } = this.props.data;

    const { myProjectData } = this.props.pageContext;

    const menuStyle = `menuStyleFixed`;

    this.topRef = createRef();
    this.nextSectionRef = createRef();

    // const { locale } = this.props.pageContext.locale;

    // const { fullScreenPhoto } = this.props.pageContext.fullScreenPhoto;

    const handleArrowTop = () =>
    this.topRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    const handleArrowNext = () =>
    this.nextSectionRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    return (
      <>

      {console.log(`index.js state locale: ${myProjectData.locale}`),
      
      console.log(`this props data: ${this.props.data}`)
      }

      <Menu dataMenu={menuRight} dataProjects={projects} menuStyle={menuStyle}/>

      {/* {this.props.data.menuRight.phoneNumber} */}
      {/* <div> */}

      {/* strona projektu: {myProjectData.slug} */}
      {/* testmenudata: {menuRight.phoneNumber} */}
      {/* </div> */}

      <div className="fullscreen-project-image" ref={this.topRef}>
              {/* <img src={`${myProjectData.fullScreenPhoto.fluid.src}`} /> */}
              <LazyLoadImage
                // alt={image.alt}
                // height={image.height}
                effect="blur"
                src={myProjectData.fullScreenPhoto.fluid.src} // use normal <img> attributes as props
                // width={image.width}
                 />
      </div>

      <div className="arrow-box box-bt-left" onClick={handleArrowTop}>

        <div className={`menu-trigger`}>
            <IconContext.Provider value={{ color: "white", size: "4em", height: "100" }}>
             <HiArrowNarrowUp />
            </IconContext.Provider>
        </div>

      </div>

      <div className="arrow-box box-bt-right" onClick={handleArrowNext}>

        <div className={`menu-trigger`}>
            <IconContext.Provider value={{ color: "white", size: "4em", height: "100" }}>
              <HiArrowNarrowDown />
            </IconContext.Provider>
        </div>

      </div>

      <div className="project-content" ref={this.nextSectionRef}>
        content
      </div>
    

    </>
    )
  }
}

export default ProjectPage

export const query = graphql`
query myProjectData($locale: String!) {
  projects: allDatoCmsProject(filter: {locale: {eq: $locale }}) {
    nodes {
      slug
      locale
      id
      position
      thumbnail {
        fluid {
          src
          base64
          srcSet
        }
      }
      titlePart1
      titlePart2
      readMore
      fullScreenPhoto {
        fluid {
          src
          base64
          srcSet
        }
      }
      secondaryPhoto {
        fluid {
          src
          base64
          srcSet
        }
      }
      projectDescription
      areaText
      areaValue
      fullScreenPhotoTwo {
        fluid {
          src
          base64
          srcSet
        }
      }
    }
  }
  menuRight: datoCmsMenuRight(locale: {eq: $locale}) {
    adressData1
    adressData2
    phoneNumber
    emailAdress
    locale
  }
}
`;
