import React from 'react'
import { Link } from "gatsby"
import Img from "gatsby-image"
import { IconContext } from "react-icons";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';


import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade, Lazy } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade, Lazy]);

const Main = ({ data }) => {

    return (
      <main>
          <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation
          lazy={{loadPrevNext: true, loadPrevNextAmount: 3}}
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
                      .map((element, index) => (
                        <SwiperSlide key={index}>
                          
                          <div className={`single-project-container`} key={index}>
                          <Link to={ element.locale === "pl" ? `${element.projectCategory}/${element.slug}` : `/${element.locale}/${element.projectCategory}/${element.slug}`} key={index}>
                              <Img fluid={element.thumbnail.fluid} />

                            
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
                      ))}
          </Swiper>

      </main>

    )
}

export default Main

