import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const NavLink = props => {
    if (!props.test) {
      return <Link to={props.url}>{props.text}</Link>
    } else {
      return <span>{props.text}</span>
    }
  }


const PaginatePostTemplate = ({ pageContext }) => {
    const { group, index, first, last } = pageContext
    const previousUrl = index - 1 === 1 ? '/healthy-tips' : (index - 1).toString()
    const nextUrl = (index + 1).toString()

    return (
        <Layout>

            <div className="content-wrapper blank">
                {group.map(({ node }) => (
                    <div key={node.id}>
                        <div className="content-wrapper blank">
                            <div class="content-wrapper--container">  
                                <div className="category">HEALTHY TIPS</div>
                                <h1>{node.title}</h1>
                                <div className="social-icons"></div>
                            </div>
                        </div>              
                        <div className="content-wrapper blank post">
                            <div dangerouslySetInnerHTML={{ __html: node.content }} />
                        </div> 
                    </div>  
                ))}
            </div>
                        
            <div className="content-wrapper blank post">
                <div>
                    <div className="previousLink">
                        <NavLink test={first} url={previousUrl} text="Go to Previous Page" />
                    </div>
                    <div className="nextLink">
                        <NavLink test={last} url={nextUrl} text="Go to Next Page" />
                    </div>
                </div>                
            </div>              
        </Layout>
    )
}
export default PaginatePostTemplate
