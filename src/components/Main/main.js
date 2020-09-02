import React from 'react'
import { Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const Main = () => {

    const data = useStaticQuery(graphql`
    query MyQuery {
        allDatoCmsProject {
          nodes {
            id
            thumbnail {
              fluid {
                src
                base64
                tracedSVG
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
                tracedSVG
                srcSet
              }
            }
            secondaryPhoto {
              fluid {
                src
                base64
                tracedSVG
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
                tracedSVG
                srcSet
              }
            }
          }
        }
      }
    `)

    return (
        <main>
            {data.allDatoCmsProject.nodes.map((element, index) => (
                <div class={`single-project-container`} key={index}>
                    <Img fluid={element.thumbnail.fluid} />
                    <div class={`title-container`}>
                    <h2 class={`project-title-1`}>{element.titlePart1}</h2>
                    <h2 class={`project-title-2`}>{element.titlePart2}</h2>
                    </div>

                </div>
            ))}
        </main>
    )
}

export default Main

