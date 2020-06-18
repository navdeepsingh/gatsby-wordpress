import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
const BlogPostTemplate = ({ data, pageContext }) => {

  const { prev, next } = pageContext;
  return (
    <Layout>
      <SEO title={data.wordpressPost.title} description={data.wordpressPost.excerpt} />
      <div className="content-wrapper blank">
        <div class="content-wrapper--container">  
          <div className="category">HEALTHY TIPS</div>
          <h1>{data.wordpressPost.title}</h1>
          <div className="social-icons"></div>
        </div>
      </div>              
      <div className="content-wrapper blank post">
        <div dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }} />
      </div>

      <div className="pagination">
          <div>
            {prev && <Link to={`post/${prev.slug}`} rel="prev"> ← Last </Link>}
          </div>

          <div style={{ justifySelf: 'flex-end' }}>
            {next && <Link to={`post/${next.slug}`} rel="next"> Next → </Link>}
          </div>
        </div>              
    </Layout>
  )
}
export default BlogPostTemplate
export const query = graphql`
  query($id: Int!) {
    wordpressPost(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
      author {
        name
      }
      featured_media {
        source_url
      }      
    }
  }
`