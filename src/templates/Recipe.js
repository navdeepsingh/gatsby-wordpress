import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import SEO from "../components/seo"
import "../sass/style.scss"

const RecipeTemplate = ({ data }) => (
  <Layout>
    <SEO
      title="Recipes: {data.wordpressWpRecipe.title}"
      description={data.wordpressWpRecipe.excerpt}
    />
    <h1>{data.wordpressWpRecipe.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: data.wordpressWpRecipe.content }} />
  </Layout>
)
export default RecipeTemplate

export const query = graphql`
  query($id: Int!) {
    wordpressWpRecipe(wordpress_id: { eq: $id }) {
      slug
      title
      content
      excerpt
    }
  }
`