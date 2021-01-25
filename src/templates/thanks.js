// import React from "react"
// import Header from "../components/Header/header"

// const Thanks = props => {
//   let { thanks } = props.data

//   console.log(props.transitionStatus)

//   return (
//     <>
//       <Header logoLight />
//       <div className={`subpage`}>
//         <div className="subpage-content-wrapper">
//           <h1
//             className={`thank-you-title ${
//               props.transitionStatus === `entered`
//                 ? `thank-you-title-entered`
//                 : ``
//             }`}
//           >
//             {thanks.thankYouTitle}
//           </h1>
//           <p
//             className={`text-content thank-you-title ${
//               props.transitionStatus === `entered`
//                 ? `thank-you-content-entered`
//                 : ``
//             }`}
//           >
//             {thanks.thankYouContent}
//           </p>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Thanks

// export const query = graphql`
//   query thanksData($locale: String!) {
//     thanks: datoCmsThankYou(locale: { eq: $locale }) {
//       thankYouTitle
//       thankYouContent
//       slug
//       locale
//     }
//     menuRightProject: datoCmsMenuRight(locale: { eq: $locale }) {
//       adressData1
//       adressData2
//       phoneNumber
//       emailAdress
//       instagramicon {
//         fixed(height: 35) {
//           src
//           base64
//         }
//       }
//       instagramLink
//       facebookicon {
//         fixed(height: 35) {
//           src
//           base64
//         }
//       }
//       facebookLink
//     }
//     menuLeftProject: datoCmsMenuLeft(locale: { eq: $locale }) {
//       projectsHeader
//       projectsSubfield1
//       projectsSubfield2
//       offerHeader
//       aboutHeader
//       individualCustomer
//       individualSubfield1
//       individualSubfield2
//       contactHeader
//     }
//   }
// `
