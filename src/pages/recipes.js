import React, {useState} from "react"
import Layout from "../components/layout"
import HeroBanner from "../components/heroBanner"
import RecipeGroup from "../components/recipeGroup"
import SEO from "../components/seo"
import { graphql} from "gatsby"
import helpers from "../helpers";


const RecipesPage = ({ data }) => {

  const {edges: recipes} = data.allWordpressWpRecipe;
  const [page, setPage] = useState(1);
  const chunksPerPage = process.env.GATSBY_RECIPES_PER_PAGE;
  const [allLoaded, setAllLoaded] = useState(0);

  const RenderRecipes = () => {    
    const chunks = helpers.chunkArray(Array.from(recipes), chunksPerPage);
    let paginated = Array.from(chunks).splice(0, page)
    return paginated.map((group, index) => {
      return <RecipeGroup recipes={group} key={index} />
    })
  }

  const onLoadHandler = (e) => {
    e.preventDefault();
    setPage(page+1);
    let allAllowed = (page+1) * chunksPerPage >= recipes.length ? 1 : 0;    
    setAllLoaded(allAllowed);
  }

  return (
    <Layout>
      <SEO title="Recipes" keywords={[`gatsby`, `application`, `react`]} />
      <HeroBanner 
          banner={data.wordpressPage.acf} 
          title={data.wordpressPage.title}
          additionalClass="healthy-tips" />
      <div className="content-wrapper recipes">
        <div className="content-wrapper--container">
          <div className="recipes-listing">
            <RenderRecipes />
            <div className="load-more">              
              <button type="button" disabled={allLoaded} onClick={onLoadHandler}>{allLoaded ? 'All Recipes Loaded' : 'Load More'}</button>
            </div>
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
          wordpress_id
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