import React from 'react'
import { Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const Main = ({ data }) => {

    return (
      <main>
            {data.sort(
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
                          
                        <Link to={`/${element.locale}/${element.slug}`}>
                          <div className={`single-project-container`} key={index}>
                              <Img fluid={element.thumbnail.fluid} />
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

