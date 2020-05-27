import { StaticQuery, graphql, Link } from "gatsby"
import React from "react"

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        wordpressSiteMetadata {
          name
        }
        wordpressWpApiMenusMenusItems(name: { eq: "Main Menu" }) {
          items {
            title
            object_slug
          }
        }
      }
    `}
    render={data => (
      <header>
        <h1>
          <Link to="/">
            {data.wordpressSiteMetadata.name}
          </Link>
        </h1>
        <ul class="main-navigation">
          {data.wordpressWpApiMenusMenusItems.items.map(item => (
            <li key={item.object_slug} style={{ margin: `0 10px` }}>
              <Link to={`/${item.object_slug}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </header>
    )}
  />
)
export default Header