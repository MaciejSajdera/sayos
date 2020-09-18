import React from 'react'
import { Link } from "gatsby"
import Img from "gatsby-image"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Main = ({ data }) => {

    return (
      <main>
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
                          
                        <Link to={ element.locale === "pl" ? `/${element.slug}` : `/${element.locale}/${element.slug}`}>
                          <div className={`single-project-container`} key={index}>

                              <LazyLoadImage
                                // alt={image.alt}
                                effect="blur"
                                src={element.thumbnail.fluid.src}/>

                              <div className={`title-container`}>
                              <h2 className={`project-title-1`}>{element.titlePart1}</h2>
                              <h2 className={`project-title-2`}>{element.titlePart2}</h2>
                              </div>
                          </div>
                        </Link>
                      ))}
      </main>
    )
}

export default Main

