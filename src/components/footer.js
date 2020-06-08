import { StaticQuery, graphql, Link } from "gatsby"
import React from "react"
import Img from "gatsby-image"

const Footer = () => (
    <StaticQuery
        query={graphql`
            query {
                placeholderImage: file(relativePath: { eq: "logo-small-trans.png" }) {
                    childImageSharp {
                      fixed(width: 115) {
                        ...GatsbyImageSharpFixed
                      }
                    }
                }
                footerMenu1: wordpressWpApiMenusMenusItems(name: { eq: "Footer Menu1" }) {
                    items {
                        title
                        object_slug
                    }
                }
                footerMenu2: wordpressWpApiMenusMenusItems(name: { eq: "Footer Menu2" }) {
                    items {
                        title
                        object_slug
                    }
                }
            }
                
        `}
        render={data => (
            <footer>
                <div className="wrapper center-container">
                    <div class="row">
                        <div className="col">
                            <Img fixed={data.placeholderImage.childImageSharp.fixed} />         
                            <p>Benecol&reg; foods were launched in Ingmar's home country of Finland in 1995 as part as part of major public health initiative to lower the nation's cholestrol.</p>
                        </div>
                        <div className="col">
                            <ul>
                            {data.footerMenu1.items.map(item => (
                                <li key={item.object_slug} style={{ margin: `0 10px` }}>  
                                { 
                                    <Link to={`/${item.object_slug}`} dangerouslySetInnerHTML={{ __html: item.title }} />
                                }
                                </li>
                            ))}   
                            </ul>
                        </div>
                        <div className="col">
                            <ul>
                            {data.footerMenu2.items.map(item => (
                                <li key={item.object_slug} style={{ margin: `0 10px` }}>  
                                { 
                                    <Link to={`/${item.object_slug}`} dangerouslySetInnerHTML={{ __html: item.title }} />
                                }
                                </li>
                            ))}   
                            </ul>
                        </div>
                    </div>
                </div>            
            </footer>
        )}
    />
)

export default Footer;
