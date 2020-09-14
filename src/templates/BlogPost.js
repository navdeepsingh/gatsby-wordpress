import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faPinterestP } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const currentUrl = location.href ? location.href : ""

  const { prev, next } = pageContext
  return (
    <Layout>
      <SEO
        title={data.wordpressPost.title}
        description={data.wordpressPost.excerpt}
      />
      <div className="content-wrapper healthy-tips post">
        <div className="content-wrapper--container">
          <div className="category">HEALTHY TIPS</div>
          <h1>{data.wordpressPost.title}</h1>
          <ul className="social-icons">
            <li>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faFacebookF} size="md" />
              </a>
            </li>
            <li>
              <a
                href={`https://twitter.com/intent/tweet/?text=Check this out: ${data.wordpressPost.title}&url=${currentUrl}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faTwitter} size="md" />
              </a>
            </li>
            <li>
              <a
                href={`http://pinterest.com/pin/create/button/?url=${currentUrl}&description=${data.wordpressPost.title}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faPinterestP} size="md" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${process.env.GATSBY_MAILTO}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faEnvelope} size="md" />
              </a>
            </li>
          </ul>
        </div>
        <div className="content-wrapper blank post">
          <div
            dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }}
          />
        </div>

        <div className="content-wrapper--container pagination">
          <div>
            {prev && (
              <Link to={`post/${prev.slug}`} className="prev" rel="prev">
                Previous
              </Link>
            )}
          </div>

          <div style={{ justifySelf: "flex-end" }}>
            {next && (
              <Link to={`post/${next.slug}`} className="next" rel="next">
                Next
              </Link>
            )}
          </div>
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
      slug
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
