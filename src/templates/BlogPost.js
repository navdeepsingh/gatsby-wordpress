import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

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
                <Img fixed={data.fbIcon.childImageSharp.fixed} />
              </a>
            </li>
            <li>
              <a
                href={`https://twitter.com/intent/tweet/?text=Check this out: ${data.wordpressPost.title}&url=${currentUrl}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Img fixed={data.twIcon.childImageSharp.fixed} />
              </a>
            </li>
            <li>
              <a
                href={`http://pinterest.com/pin/create/button/?url=${currentUrl}&description=${data.wordpressPost.title}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Img fixed={data.piIcon.childImageSharp.fixed} />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${process.env.GATSBY_MAILTO}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Img fixed={data.emailIcon.childImageSharp.fixed} />
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
              <Link to={`post/${prev.slug}`} rel="prev">
                {" "}
                ← Previous{" "}
              </Link>
            )}
          </div>

          <div style={{ justifySelf: "flex-end" }}>
            {next && (
              <Link to={`post/${next.slug}`} rel="next">
                {" "}
                Next →{" "}
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
    fbIcon: file(relativePath: { eq: "fb-blue.png" }) {
      childImageSharp {
        fixed(width: 12) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    twIcon: file(relativePath: { eq: "tw-blue.png" }) {
      childImageSharp {
        fixed(width: 18) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    piIcon: file(relativePath: { eq: "pi-blue.png" }) {
      childImageSharp {
        fixed(height: 18) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    emailIcon: file(relativePath: { eq: "email-blue.png" }) {
      childImageSharp {
        fixed(width: 18) {
          ...GatsbyImageSharpFixed
        }
      }
    }
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
