import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Pagination from "../components/pagination"

const BlogPostTemplate = ({ data, pageContext }) => {
    const {edges: featuredPosts} = data.allWordpressPost;
    return (
        <Layout>
            {featuredPosts.map(({ node }) => (
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
            <Pagination pageContext={pageContext} />           
        </Layout>
    )
}
export default BlogPostTemplate

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allWordpressPost(skip: $skip, limit: $limit, sort: {fields: date, order: ASC}, filter: {type:{eq: "post"} }) {
        edges {
          node {
            slug
            wordpress_id
            title
            content
            excerpt
            date(formatString: "MMMM DD, YYYY")
            featured_media {
              source_url
            }
          }
        }
      }
  }
`