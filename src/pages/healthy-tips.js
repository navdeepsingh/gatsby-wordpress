import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import HeroBanner from "../components/heroBanner"
import SEO from "../components/seo"

const PostsPage = ({ data }) => {
  const { edges: featuredPosts } = data.allWordpressPost
  return (
    <Layout>
      <SEO title="All Posts" />
      <HeroBanner
        banner={data.wordpressPage.acf}
        title={data.wordpressPage.title}
        additionalClass="healthy-tips"
      />
      <div className="content-wrapper healthy-tips">
        <div className="content-wrapper--container">
          <div className="featured-posts">
            {featuredPosts.map(featuredPost => {
              return (
                <div
                  className="featured-posts--item"
                  key={featuredPost.node.wordpress_id}
                >
                  <div className="featured-posts--item__image">
                    <img
                      src={featuredPost.node.featured_media.source_url}
                      alt={featuredPost.node.title}
                      className="img-fluid"
                    />
                  </div>
                  <div className="featured-posts--item__text">
                    <div className="title">
                      <Link to={`/post/${featuredPost.node.slug}`}>
                        <span>{featuredPost.node.title}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostsPage

export const query = graphql`
  query {
    wordpressPage(slug: { eq: "healthy-tips" }) {
      title
      excerpt
      content
      acf {
        page_subtitle
        page_sub_txt
        feat_img {
          source_url
        }
        mobile_featured_image {
          source_url
        }
        link
        link_label
        link_url
        theme
      }
    }
    allWordpressPost(
      sort: { fields: date, order: ASC }
      filter: { type: { eq: "post" } }
    ) {
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
