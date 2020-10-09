import React from "react"
import { Link, graphql, Img } from "gatsby"
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Menu from "../components/Menu/menu"

import myContext from "../../context"

class allProjectsHouse extends React.Component  {

  constructor(props) {
    super(props);

    this.state = {
      locale: this.props.data.menuRightIndex.locale
    }
  }

  componentDidMount() {
    this.context.navToggled ? this.context.handleNavToggle() : console.log('nav open');
  }

  render() {

    let { projects, menuRightIndex, menuLeftIndex, about, logoData, houseProject, interiorProject, category, offer } = this.props.data;

    const menuStyle = `menuStyleAbsolute`;

  return (
    <>  
        <Menu dataMenu={ menuRightIndex} dataMenuLeft={ menuLeftIndex} dataProjects={projects} menuStyle={menuStyle} about={about} logoData={logoData} houseProject={ houseProject } interiorProject={interiorProject} category={category} offer={offer}/>

        
        <main className={`all-grid`}>
          <div className="all-grid-bg">
            {projects.nodes
                        .filter((node) => {
                        return node.projectCategory === category.categoryFirst;})
                        .sort(
                        (a, b) => {
                        const positionA = a.position;
                        const positionB = b.position;
                        let comparision = 0;
                          if(positionA > positionB) {
                            comparision = 1;
                          } else if (positionA < positionB) {
                            comparision = -1
                          }
                          return comparision
                        }
                      )
                      .map((element, index) => (
                          
                          <div className={`single-project-tile ${index % 5 && index > 0 ? `` : `big-project-tile`}`} key={index}>
                          <Link to={ element.locale === "pl" ? `/${element.projectCategory}/${element.slug}` : `/${element.locale}/${element.projectCategory}/${element.slug}`} key={index}>
                              {/* <Img fluid={element.thumbnail.fluid} /> */}


                              <LazyLoadImage
                              // alt={image.alt}
                              // height={image.height}
                              effect="blur"
                              src={element.fullScreenPhoto.fluid.src} // use normal <img> attributes as props
                              // width={image.width}
                              />


                              <div className={`title-container`}>
                                <h2 className={`project-title-1`}>{element.titlePart1}</h2>
                                <h2 className={`project-title-2`}>{element.titlePart2}</h2>
                              </div>

                              <div className="text-on-hover">
                                <p className="project-slogan">
                                {element.projectSlogan}
                                </p>
                                <p className="read-more">
                                {element.readMore}
                                </p>
                              </div>
                             </Link>
                          </div>

                      ))}
          </div>
      </main>
    </>
  )
  }
}

allProjectsHouse.contextType = myContext;

export default allProjectsHouse

export const query = graphql`
query allProjectsHouseData($locale: String!) {
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
      projectCategory
      titlePart1
      titlePart2
      readMore
      projectSlogan
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
  menuRightIndex: datoCmsMenuRight(locale: {eq: $locale}) {
    adressData1
    adressData2
    phoneNumber
    emailAdress
    locale
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

  menuLeftIndex: datoCmsMenuLeft(locale: {eq: $locale}) {
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
    locale
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
