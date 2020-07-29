import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Slideshow from "../components/slideshow"
import FeaturedPosts from "../components/featuredPosts"
import { graphql } from "gatsby"

const HomePage = ({ data }) => {
  const { edges: featuredPosts } = data.allWordpressPost
  const { edges: featuredRecipes } = data.allWordpressWpRecipe
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Slideshow />
      <div className="content-wrapper home">
        <div
          className="content-wrapper--container"
          dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }}
        />
      </div>

      <div className="content-wrapper home-heart-happy">
        <div className="content-wrapper--container">
          <h2>Heart Happy</h2>
          <FeaturedPosts posts={featuredPosts} recipes={featuredRecipes} />
        </div>
      </div>

      <div className="content-wrapper blank">
        <div
          className="content-wrapper--container"
          dangerouslySetInnerHTML={{
            __html: data.wordpressPage.acf.footer_content,
          }}
        />
      </div>
    </Layout>
  )
}
export default HomePage

export const query = graphql`
  query {
    wordpressPage(slug: { eq: "home" }) {
      title
      excerpt
      content
      acf {
        page_subtitle
        footer_content
      }
    }
    allWordpressPost(
      limit: 2
      sort: { fields: date, order: ASC }
      filter: {
        type: { eq: "post" }
        tags: { elemMatch: { slug: { eq: "featured" } } }
      }
    ) {
      edges {
        node {
          id
          wordpress_id
          title
          excerpt
          slug
          tags {
            slug
          }
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
    allWordpressWpRecipe(
      limit: 1
      sort: { fields: date, order: ASC }
      filter: { tags: { elemMatch: { slug: { eq: "featured" } } } }
    ) {
      edges {
        node {
          id
          wordpress_id
          slug
          status
          title
          status
          tags {
            slug
          }
          acf {
            main_image {
              source_url
            }
          }
        }
      }
    }
  }
`
