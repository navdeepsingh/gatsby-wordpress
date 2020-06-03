import { StaticQuery, graphql, Link } from "gatsby"
import React from "react"

const Footer = () => (
    <StaticQuery
        query={graphql`
            query {
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
                        <div className="col">Subscribe to our newsletter &amp; stay updated.</div>
                        <div className="col">
                            <input type="email" name="email" id="email" placeholder="Email Address" />
                            <button type="submit">Subscribe</button>
                        </div>
                    </div>
                    <div class="row">
                        <div className="col">
                            <img src="" alt="" />
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
