import React from 'react'
import { Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const Main = () => {

    const data = useStaticQuery(graphql`
    query MyQuery {
        allDatoCmsProject(filter: {locale: {eq: "pl"}}) {
          nodes {
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
      }
    `)

    return (
      <>
            {data.allDatoCmsProject.nodes.sort(
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
                          <div className={`single-project-container`} key={index}>
                              <Img fluid={element.thumbnail.fluid} />
                              <div className={`title-container`}>
                              <h2 className={`project-title-1`}>{element.titlePart1}</h2>
                              <h2 className={`project-title-2`}>{element.titlePart2}</h2>
                              </div>

                          </div>
                      ))}
      </>
    )
}

export default Main

