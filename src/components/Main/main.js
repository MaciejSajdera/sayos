import React, { useState } from 'react';
import { Link } from "gatsby";
import Img from "gatsby-image";
import { IconContext } from "react-icons";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Helmet } from "react-helmet";

import TransitionLink from "gatsby-plugin-transition-link"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, A11y, Lazy, Keyboard, Mousewheel, Autoplay } from 'swiper';
SwiperCore.use([Navigation, Mousewheel, Keyboard, A11y, Lazy, Autoplay]);

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mouseWheelActive: false,
      aniLinkTarget: 1
    }

    // this.handleAniLink = this.handleAniLink.bind(this);
  }


    handleAniLink = (e) => {
      // const parentSlide = this.
      console.log(e.currentTarget)
      // e.currentTarget.classList.contains('swiper-slide-active') ? console.log('mamy active') : '';
      // e.currentTarget.classList.contains('swiper-slide-next') ? console.log('mamy active')
  
      if ( e.currentTarget.classList.contains('swiper-slide-active') ) {
          this.setState({aniLinkTarget: 1})
          console.log('1szy od lewej')
      }
  
      if ( e.currentTarget.classList.contains('swiper-slide-next') ) {
          this.setState({aniLinkTarget: 2})
          console.log('srodkowy')
      } 
  
      if ( !e.currentTarget.classList.contains('swiper-slide-active') && !e.currentTarget.classList.contains('swiper-slide-next')) {
        this.setState({aniLinkTarget: 3})
        console.log('ostatni')
      } 
    }

    handleWheel = (e) => {
      const delta = Math.sign(e.deltaY);
      delta < 0 ? this.setState({ mouseWheelActive: false }) : this.setState({ mouseWheelActive: true });
    }



//https://dev.to/mattrothenberg/recreating-pentagram-com-a-deep-dive-with-gatsby-js-h75

//https://www.gatsbyjs.com/blog/2018-12-04-per-link-gatsby-page-transitions-with-transitionlink/

  render() {

    let data = this.props.data



    const aniLinkTarget = this.state.aniLinkTarget;

    let direction;

      if ( aniLinkTarget === 1 ) {
        direction="right"
      }

      if ( aniLinkTarget === 2 ) {
          direction="top"
      }

      if ( aniLinkTarget === 3 ) {
        direction="left"
      }


    return (
      
      <main>
          <Swiper
          spaceBetween={0}
          slidesPerView={1}
          mousewheel={{
            sensitivity: 3,
          }}
          navigation
          keyboard
          a11y
          lazy={{loadPrevNext: true, loadPrevNextAmount: 3}}
          breakpoints={{
            // when window width is >= 640px
            992: {
              slidesPerView: 3,
              freeMode: true,
              // speed: 700,
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
                        <SwiperSlide key={index}
                                     onMouseOver={this.handleAniLink}
                        >

                          <div className={`single-project-container`}>

                              <AniLink id={index} key={index} to={ element.locale === "pl" ? `${element.projectCategory}/${element.slug}` : `/${element.locale}/${element.projectCategory}/${element.slug}`}
                                
                                cover
                                bg={`url(${element.fullScreenPhoto.fluid.src}) center / cover`}
                                direction={direction}
                                duration={3}
                                
                              > 

                              {/* <TransitionLink
                                exit={{
                                  length: length,
                                  trigger: ({ exit, node }) =>
                                    this.someCustomDefinedAnimation({ exit, node, direction: "out" }),
                                }}
                                entry={{
                                  length: 0,
                                  trigger: ({ exit, node }) =>
                                    this.someCustomDefinedAnimation({ exit, node, direction: "in" }),
                                }}
                                // {...props}
                              > */}

                              <LazyLoadImage className={this.state.mouseWheelActive ? `move-right` : `move-left`} 
                                onWheel = {this.handleWheel}
                              effect="blur"
                              src={element.thumbnail.fluid.src}

                              />


                              <div className={`title-container`}>
                                <h2 className={`project-title-1`}>{element.titlePart1}</h2>
                                <h2 className={`project-title-2`}>{element.titlePart2}</h2>

                                  <div className="text-on-hover">
                                  <p className="project-slogan">
                                  {element.projectSlogan}
                                  </p>
                                  <p className="read-more">
                                  {element.readMore}
                                  </p>
                                </div>
                              </div>


                              </AniLink>
                          </div>
                        </SwiperSlide>
                        </>
                        )
                      })}
          </Swiper>

      </main>
    )
  }
}

export default Main

