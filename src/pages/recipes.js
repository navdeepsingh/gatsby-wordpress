import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"


const RecipesPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Recipes</h1>
    <ul style={{ listStyle: "none" }}>
      {data.allWordpressWpRecipe.edges.map(recipe => (
        <li style={{ padding: "20px 0", borderBottom: "1px solid #ccc" }}>
          <Link to={`/recipe/${recipe.node.slug}`} style={{ display: "flex", color: "black", textDecoration: "none" }} >
            <div style={{ width: "75%" }}>
              <h3 dangerouslySetInnerHTML={{ __html: recipe.node.title }} style={{ marginBottom: 0 }} />
              <div dangerouslySetInnerHTML={{ __html: recipe.node.excerpt }} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)
export default RecipesPage

export const query = graphql`
  query {
    allWordpressWpRecipe {
      edges {
      node {
        id
        slug
        status
        title
        content        
        excerpt
        ingredient
        course
        course
        cuisine
      }
    }
    }
  }
`