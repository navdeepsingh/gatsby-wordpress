import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PostsPage = ({ data }) => (
  <Layout>
    <SEO title="All Posts" />
    <ul style={{ listStyle: "none" }}>
      {data.allWordpressPost.edges.map(post => (
        <li style={{ padding: "20px 0", borderBottom: "1px solid #ccc" }} key={post.node.wordpress_id}>
          <Link to={`/post/${post.node.slug}`} style={{ display: "flex", color: "black", textDecoration: "none" }} >
            {
              post.node.featured_media !== null ?
                <img src={post.node.featured_media.source_url} alt={post.node.title} style={{ width: "25%", marginRight: 20 }} />
                : ''
            }
            <div style={{ width: "75%" }}>
              <h3 dangerouslySetInnerHTML={{ __html: post.node.title }} style={{ marginBottom: 0 }} />
              <p style={{ margin: 0, color: "grey" }}>
                Written by {post.node.author.name} on {post.node.date}
              </p>
              <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default PostsPage

export const query = graphql`
  query {
    allWordpressPost(filter: {type:{eq: "post"} }) {
      edges {
        node {
          id
          wordpress_id
          title
          excerpt
          slug
          author {
            name
          }
          date(formatString: "MMMM DD, YYYY")
          featured_media {
            source_url
          }
        }
      }
    }    
  }
`
