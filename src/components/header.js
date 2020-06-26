import { StaticQuery, graphql, Link } from "gatsby"
import React from "react"
import Img from "gatsby-image"
import { slide as Menu } from "react-burger-menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faYoutube } from "@fortawesome/free-brands-svg-icons"

const handleClick = e => {
  e.preventDefault()
  const dropDown = e.target.nextElementSibling
  if (dropDown.classList.contains("show")) {
    dropDown.classList.remove("show")
    dropDown.setAttribute("aria-hidden", true)
    e.target.classList.remove("show")
    e.target.setAttribute("aria-expanded", false)
  } else {
    dropDown.classList.add("show")
    dropDown.setAttribute("aria-hidden", false)
    e.target.classList.add("show")
    e.target.setAttribute("aria-expanded", true)
  }
}

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        wordpressSiteMetadata {
          name
        }
        logoImage: file(relativePath: { eq: "logo.jpg" }) {
          childImageSharp {
            fixed(width: 150, quality: 100) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
        wordpressWpApiMenusMenusItems(name: { eq: "Main Menu" }) {
          items {
            title
            object_slug
            wordpress_children {
              title
              object_slug
            }
          }
        }
      }
    `}
    render={data => (
      <header>
        <h1>
          <Link to="/">
            <Img
              fixed={data.logoImage.childImageSharp.fixed}
              alt={data.wordpressSiteMetadata.name}
            />
          </Link>
        </h1>
        <ul className="main-navigation">
          {data.wordpressWpApiMenusMenusItems.items.map(item => (
            <li key={item.object_slug}>
              {item.wordpress_children ? (
                <>
                  <Link
                    to={`/`}
                    onClick={handleClick}
                    className="has-child"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {item.title}
                  </Link>
                  <ul className="dropdown" aria-hidden="true">
                    {item.wordpress_children.map(childItem => (
                      <li key={childItem.object_slug}>
                        <Link to={`/${childItem.object_slug}`}>
                          {childItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link to={`/${item.object_slug}`}>{item.title}</Link>
              )}
            </li>
          ))}
        </ul>
        <div className="mobile-navbar">
          <Menu right width={"100%"}>
            <h1>
              <Link to="/">
                <Img
                  fixed={data.logoImage.childImageSharp.fixed}
                  alt={data.wordpressSiteMetadata.name}
                />
              </Link>
            </h1>
            <ul className="mobile-navigation">
              {data.wordpressWpApiMenusMenusItems.items.map(item => (
                <li key={item.object_slug}>
                  {item.wordpress_children ? (
                    <>
                      <Link
                        to={`/`}
                        onClick={handleClick}
                        className="has-child"
                      >
                        {item.title}
                      </Link>
                      <ul className="dropdown" aria-hidden="false">
                        {item.wordpress_children.map(childItem => (
                          <li key={childItem.object_slug}>
                            <Link to={`/${childItem.object_slug}`}>
                              {childItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link to={`/${item.object_slug}`}>{item.title}</Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="follow">
              <div className="follow--text">FOLLOW US</div>
              <div className="follow--icons">
                <a href="http://google.com">
                  <FontAwesomeIcon icon={faFacebookF} size="lg" />
                </a>
                <a href="http://google.com">
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                </a>
              </div>
            </div>
          </Menu>
        </div>
      </header>
    )}
  />
)
export default Header
