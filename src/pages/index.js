import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Slideshow from "../components/slideshow"
import { graphql, Link } from 'gatsby'

const HomePage = ({ data }) => {
  const {edges: featuredPosts} = data.allWordpressPost;
  //const {edges: featuredRecipes} = data.allWordpressWpRecipe;
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Slideshow />
      <div className="content-wrapper home">
        <div class="content-wrapper--container" dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }} />         
      </div>
        {
          featuredPosts ?
          <div className="content-wrapper dark">
            <div class="content-wrapper--container">  
              <h2 className="text-center">Heart Happy</h2>          
              <div className="featured-posts">
                {
                featuredPosts.map(featuredPost => {
                  return  <div className="featured-posts--item" key={featuredPost.node.wordpress_id}>
                            <div className="featured-posts--item__image">
                              <img src={featuredPost.node.featured_media.source_url} alt={featuredPost.node.title} className="img-fluid" />
                            </div>
                            <div className="featured-posts--item__text">
                              <div className="category">HEALTHY TIPS</div>
                              <div className="title">
                                <Link to={`/post/${featuredPost.node.slug}`}>
                                  <span>{featuredPost.node.title}</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                  })
                }
              </div>
            </div> 
          </div>
          : null
        }    
      <div className="content-wrapper blank">
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
    allWordpressPost(sort: {fields: date, order: ASC}, filter: {type: {eq: "post"}, tags: {elemMatch: {slug: {eq: "featured"}}}}) {
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