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
            <Img fixed={data.placeholderImage.childImageSharp.fixed} alt={data.wordpressSiteMetadata.name} />         
          </Link>
        </h1>
        <ul className="main-navigation">          
          {data.wordpressWpApiMenusMenusItems.items.map(item => (
            <li key={item.object_slug}>  
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
        <div className="mobile-navbar">          
          <Menu right width={ '100%' }>
            <h1>
              <Link to="/">
                <Img fixed={data.placeholderImage.childImageSharp.fixed} alt={data.wordpressSiteMetadata.name} />         
              </Link>
            </h1>
            <ul className="mobile-navigation">
              {
                data.wordpressWpApiMenusMenusItems.items.map(item => (
                <li key={item.object_slug}>  
                { 
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
                }
                </li>
                ))}
            </ul>
            <div className="follow">
                <div className="follow--text">FOLLOW US</div>
                <div className="follow--icons">
                    <a href="http://google.com">
                      <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAApUlEQVRIie3SsQkCQRCF4U8zwUCswszIHixBi7ABa7AGmzmt4RIFsQETozM4I1GPW3TPDUTvwcCyy5v/7TD8mwZYYYcLChwwTtF8iBxlTS1Cpm4EYIlR4O0U0SeovefUa8wwFRc0qKIC6L1j6kQAyibeJF/7BLB1H0lVt/szJk0D1K1kXc1DDVKN6NjUmHmdPkc/1OD3t6gFtIC0gM3DOUsd5Ht1BfnVM9MF+929AAAAAElFTkSuQmCC"/>
                    </a>
                    <a href="http://google.com">
                      <img alt="" width="30" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACP0lEQVRoge3ZzW8NURjH8Y9yExKhJUWQqKRNy0bY+AcqYuOPsJHY2EosbKwl/hgWXtI/QEgjCCmCtA0qbQnqrWVx7iTT09GZ25n7QuabPMnMycx5nt+ZM895o6ampqampsamgs81MIwRHMA+7Mdu7EA/djavG813tmJbqo7P+Nm8XsKnlM3jPd5hGrN4ijcb0LSGIVzFQ/zA7y7YR0zgvNAwLXNOaMFuBP83e4SjrYg4i+UeCDzLXmEwK+jNGfe3hD7fi/QLjXw378Fjut/qefYyK/C+6H44T2kPcFjIkKuIhRzqTCylGY0L/lUhR+KCWMhQSQenhDTZbsbiglhIZmprgTs4LgxgcyXrWo/cnjOpXEZJswvXhWlJ1Znrdp6QqQqFJIziRsVCJvOEzLRBSMK48P9UIWQmT8hiG4UQZsYXsVDSz3c5M/eys9yiJP/PrxK+Vg2KcdbqFEXXQRuuo+wnzyPpWmW78LKcjzDdRiHjeFyy/sTmc3x51gYhY6pPv5kz4DQPKhTSzgHxfhz4luj+S57SAjRwAVcwUEF9WSzGBbGQtyUdnME1GZO6ipmNC2Ihz0s6uFny/aK8iAviFFZWSKdY87P/t0KeYKUzsWyYFWGYWEUsZE7Y2etlJhRctJ3AV9Xn/irsG062ovq0sKHc7cDT9kHYBW2ZQVzCPWH3vBvBLzX9X8ae9YItOp3uExb8I8JxwkHsbdqAcJyQWHKU0MD2VB3rHSssCD0gfawwhdd6P/nU1NTU1NT0Dn8AGXx2NWoKMM8AAAAASUVORK5CYII="/>
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