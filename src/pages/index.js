import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Slideshow from "../components/slideshow"
import { graphql } from 'gatsby'

const HomePage = ({ data }) => {
  const {edges: featuredPosts} = data.allWordpressPost;
  const {edges: featuredRecipes} = data.allWordpressWpRecipe;
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Slideshow />
      <div className="center-container">
        <h1>{data.wordpressPage.title}</h1>
        <h3>{data.wordpressPage.acf.page_subtitle}</h3>

        <div dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }} />
        
        <div className="featured-posts">
          {
            featuredPosts.map(({node}) => {
              return <div style={{padding:'20px'}}>
                      <h3>{node.title}</h3>
                      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                    </div>
            })
          }
          {
            featuredRecipes.map(({node}) => {
              return <div style={{padding:'20px'}}>
                      <h3>{node.title}</h3>
                      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                    </div>
            })
          }          
        </div>
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