import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Slideshow from "../components/slideshow"
import { graphql } from 'gatsby'

const HomePage = ({ data }) => {
  // const {edges: featuredPosts} = data.allWordpressPost;
  // const {edges: featuredRecipes} = data.allWordpressWpRecipe;
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Slideshow />
      <div className="content-wrapper">
        <div class="content-wrapper--container" dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }} />         
        <div class="content-wrapper--container" dangerouslySetInnerHTML={{ __html: data.wordpressPage.acf.footer_content }} /> 
      </div>  
    </Layout>
  )
}
export default HomePage

export const query = graphql`
  query {
    wordpressPage(slug: {eq: "home"}) {
      title
      excerpt
      content
      acf {
        page_subtitle
        footer_content
      }
    }
    allWordpressPost(filter: {type: {eq: "post"}, tags: {elemMatch: {slug: {eq: "featured"}}}}) {
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
    allWordpressWpRecipe(filter: {tags: {elemMatch: {slug: {eq: "featured"}}}}) {
      edges {
        node {
          id
          slug
          status
          title
          content
          excerpt          
        }
      }
    }
  }
`