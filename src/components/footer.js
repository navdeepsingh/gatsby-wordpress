import React from "react"

const Footer = () => {
    return (
        <footer>
            © {new Date().getFullYear()}, Built with Love
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
    )
}

export default Footer;
