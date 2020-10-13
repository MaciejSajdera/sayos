import React, { useState } from 'react';
import { Link } from "gatsby";
import Img from "gatsby-image";
import { IconContext } from "react-icons";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Helmet } from "react-helmet";


import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, A11y, Lazy, Keyboard, Mousewheel } from 'swiper';
SwiperCore.use([Navigation, Mousewheel, Keyboard, A11y, Lazy]);

const Main = ({ data }) => {

    // const [isMouseOver, setMousePosition] = useState(false);

    // const mouseEnterHandler = (e) => {

    //   console.log(e.target.closest('SPAN'));

    //   e.target.closest('SPAN').classList.remove('hideColor')
    //   e.target.closest('SPAN').classList.add('showColor')

    //   let flag = false;
    //   return flag;

    // }

    // const mouseLeaveHandler = (e) => {

    //   console.log(e.target.closest('SPAN'));

    //   e.target.closest('SPAN').classList.remove('showColor');
    //   e.target.closest('SPAN').classList.add('hideColor');

    //   let flag = true;
    //   return flag;
    // }

    return (
      
      <main>
          <Swiper 
          spaceBetween={0}
          slidesPerView={1}
          mousewheel={{
            thresholdTime: 1,
            sensitivity: 500,
            releaseOnEdges: true,
          }}
          navigation
          keyboard
          a11y
          lazy={{loadPrevNext: true, loadPrevNextAmount: 1}}
          breakpoints={{
            // when window width is >= 640px
            992: {
              slidesPerView: 3,
            },
          }}
        >
            {data.nodes.sort(
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
                      .map((element, index) => {

                        return (
                        <>
                        <SwiperSlide key={index}>

                          <div className={`single-project-container`}>

                          <Link to={ element.locale === "pl" ? `${element.projectCategory}/${element.slug}` : `/${element.locale}/${element.projectCategory}/${element.slug}`}>

                              {/* <LazyLoadImage
                              onMouseEnter={(e) => {
                                (e.currentTarget.src = element.thumbnail.fluid.src)
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget.src = element.thumbnailBw.fluid.src)
                              }}

                              // alt={image.alt}
                              // height={image.height}
                              effect="blur"
                              src={element.thumbnailBw.fluid.src} // use normal <img> attributes as props
                              // width={image.width}
                              /> */}
                              <div className="text-holder"  css={{
                                                                  backgroundImage: `url(${element.thumbnailBw.fluid.src})`,
                                                                  transition: `all 0.3s ease-in`,
                                                                  '@media (max-width: 992px)': {
                                                                    backgroundImage: `url(${element.thumbnail.fluid.src})`
                                                                  },
                                                                }}
                                                            
                                                        onMouseEnter={(e) => {
                                                          e.persist();
                                                          e.currentTarget.style.backgroundImage = `url(${element.thumbnail.fluid.src})`


                                                        }}
                                                        onMouseLeave={(e) => {
                                                          e.persist();
                                                          e.currentTarget.style.backgroundImage = `url(${element.thumbnailBw.fluid.src})`
                                                        }}>
                                                          

                                                        </div>
{/* 
                              <Img fluid={ element.thumbnailBw.fluid } /> */}

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
                        </SwiperSlide>
                        </>
                        )
                      })}
          </Swiper>

      </main>

    )
}

export default Main

