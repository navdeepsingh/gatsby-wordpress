import { StaticQuery, graphql, Link } from "gatsby"
import React from "react"
import Img from "gatsby-image"
import { slide as Menu } from 'react-burger-menu'

const handleClick = (e) => {
    e.preventDefault();    
    const dropDown = e.target.nextElementSibling;    
    if (dropDown.classList.contains('show')) {
      dropDown.classList.remove('show');
      dropDown.setAttribute('aria-hidden', false);
      e.target.classList.remove('show');
    } else {
      dropDown.classList.add('show');
      dropDown.setAttribute('aria-hidden', true);
      e.target.classList.add('show');
    }
    
}

const Header = () => (
  
  <StaticQuery
    query={graphql`
      query {
        wordpressSiteMetadata {
          name
        }
        placeholderImage: file(relativePath: { eq: "logo.jpg" }) {
          childImageSharp {
            fixed(width: 150) {
              ...GatsbyImageSharpFixed
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
            <Img fixed={data.placeholderImage.childImageSharp.fixed} alt={data.wordpressSiteMetadata.name} />         
          </Link>
        </h1>
        <ul className="main-navigation">          
          {data.wordpressWpApiMenusMenusItems.items.map(item => (
            <li key={item.object_slug} style={{ margin: `0 10px` }}>  
              { 
                item.wordpress_children
                ? <>
                    <Link to={`/`}>
                      {item.title}
                    </Link>
                    <ul>
                    { 
                      item.wordpress_children.map(childItem => (
                        <li key={childItem.object_slug} >
                          <Link to={`/${childItem.object_slug}`}>
                            {childItem.title}
                          </Link>
                        </li>
                      )) 
                    }
                    </ul>
                  </>
                : <Link to={`/${item.object_slug}`}>
                    {item.title}
                  </Link>
              }
            </li>
          ))}
        </ul>
        <Menu right width={ '100%' } className="mobile-menu">
        {
          data.wordpressWpApiMenusMenusItems.items.map(item => (
          item.wordpress_children
          ? <>
              <Link to={`/`} onClick={handleClick} className="has-child">
                {item.title}
              </Link>
              <ul className="dropdown" aria-hidden="false">
              { 
                item.wordpress_children.map(childItem => (
                  <li key={childItem.object_slug} >
                    <Link to={`/${childItem.object_slug}`}>
                      {childItem.title}
                    </Link>
                  </li>
                )) 
              }
              </ul>
            </>
          : <Link to={`/${item.object_slug}`}>
              {item.title}
            </Link>
          )
        )}
        </Menu>
      </header>
    )}
  />
)
export default Header