import React from "react"
import { Layout } from "./src/components/layout"

export const LocaleContext = React.createContext();

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const wrapPageElement = ({ element, props }) => (
  <Layout {...props} LocaleContext={LocaleContext}>{element}</Layout>
)

export default wrapPageElement

export const query = graphql`
query myData3($locale: String!) {
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
    socialMedia {
      myIcon {
        fixed {
          src
          srcSet
          base64
        }
      }
    }
  }
}
`;