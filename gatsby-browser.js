/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "./src/styles/styles.scss"

export const onInitialClientRender = () => {
    setTimeout(function() {

        document.getElementById("___loader").style.opacity = 0
    }, 1000)

    setTimeout(function() {
        document.getElementById("___loader").style.display = "none"
    }, 1400)

}