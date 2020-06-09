import { StaticQuery, graphql, Link } from "gatsby"
import React from "react"
import Img from "gatsby-image"

const Footer = () => (
    <StaticQuery
        query={graphql`
            query {
                placeholderImage: file(relativePath: { eq: "logo-small-trans.png" }) {
                    childImageSharp {
                      fixed(width: 90) {
                        ...GatsbyImageSharpFixed
                      }
                    }
                }
                fbIcon: file(relativePath: { eq: "fb.png" }) {
                    childImageSharp {
                        fixed(width: 13) {
                            ...GatsbyImageSharpFixed
                          }
                    }
                }
                yTubeIcon: file(relativePath: { eq: "ytube.png" }) {
                    childImageSharp {
                        fixed(width: 25) {
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
                <div className="wrapper">
                    <div className="row">
                        <div className="col intro">
                            <Img fixed={data.placeholderImage.childImageSharp.fixed} />         
                            <p>Benecol&reg; foods were launched in Ingmar's home country of Finland in 1995 as part as part of major public health initiative to lower the nation's cholestrol.</p>
                        </div>
                        <div className="col m-pt">
                            <ul className="footer-navigation">
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
                            <ul className="footer-navigation">
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
                <div className="wrapper wrapper--separator">                        
                    <div className="row">
                        <div className="col">&copy; {new Date().getFullYear()} Benecol Limited. All rights reserved.</div>
                        <div className="col follow">
                            <div className="follow--text">FOLLOW US</div>
                            <div className="follow--icons">
                                <a href="http://google.com">
                                    <Img fixed={data.fbIcon.childImageSharp.fixed} />
                                </a>
                                <a href="http://google.com">
                                    <Img fixed={data.yTubeIcon.childImageSharp.fixed} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>            
            </footer>
        )}
    />
)

export default Footer;
