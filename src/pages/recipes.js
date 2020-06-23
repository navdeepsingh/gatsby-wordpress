import React from "react"
import Layout from "../components/layout"
import HeroBanner from "../components/heroBanner"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"


const RecipesPage = ({ data }) => {
  const {edges: recipes} = data.allWordpressWpRecipe;
  return (
    <Layout>
      <SEO title="Recipes" keywords={[`gatsby`, `application`, `react`]} />
      <HeroBanner 
          banner={data.wordpressPage.acf} 
          title={data.wordpressPage.title}
          additionalClass="healthy-tips" />
      <div className="content-wrapper healthy-tips">
        <div class="content-wrapper--container">
          <div className="recipes-listing">
            {
            recipes.map(recipe => {
              return  <div className="recipes-listing--item" key={recipe.node.wordpress_id}>
                        <div className="recipes-listing--item__image">
                          <Link to={`/recipe/${recipe.node.slug}`}>
                            <img src={recipe.node.acf.main_image.source_url} alt="" />
                          </Link>
                        </div>
                        <div className="recipes-listing--item__text">
                          <div className="title">
                            <Link to={`/recipe/${recipe.node.slug}`}>
                              <span dangerouslySetInnerHTML={{ __html: recipe.node.title }} />
                            </Link>
                          </div>
                          <div className="author" dangerouslySetInnerHTML={{ __html: recipe.node.acf.contributed_by }} />
                        </div>
                      </div>
              })
            }
          </div>          
        </div>                
      </div>             
    </Layout>
  )
}
export default RecipesPage

export const query = graphql`
  query {
    wordpressPage(slug: {eq: "recipes"}) {
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
    allWordpressWpRecipe {
      edges {
        node {
          id
          slug
          status
          title
          content
          acf {
            contributed_by
            main_image {
              source_url
            }
          }          
        }
      }
    }
  }
`