const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const locales = ["pl", "en"]

  const componentTemplate = path.resolve(`src/templates/home.js`)

  locales.forEach(locale => {
    const prefix = locale === "pl" ? "" : `${locale}`
    createPage({
      path: `/${prefix}`,
      component: componentTemplate,
      context: { locale },
    })
  })
}
