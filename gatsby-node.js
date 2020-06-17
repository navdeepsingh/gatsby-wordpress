/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const BlogPostTemplate = path.resolve("./src/templates/BlogPost.js")
  const PageTemplate = path.resolve("./src/templates/Page.js")
  const RecipeTemplate = path.resolve("./src/templates/Recipe.js")
  const result = await graphql(`
    {
      allWordpressPost {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
      allWordpressPage(filter: {status: {eq: "publish"}}) {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
      allWordpressWpRecipe {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  const BlogPosts = result.data.allWordpressPost.edges
  BlogPosts.forEach(post => {
    createPage({
      path: `/post/${post.node.slug}`,
      component: BlogPostTemplate,
      context: {
        id: post.node.wordpress_id,
        slug: post.node.slug,
      },
    })
  })
  const Pages = result.data.allWordpressPage.edges
  Pages.forEach(page => {
    createPage({
      path: `/${page.node.slug}`,
      component: PageTemplate,
      context: {
        id: page.node.wordpress_id,
        slug: page.node.slug,
      },
    })
  })
  const Recipes = result.data.allWordpressWpRecipe.edges
  Recipes.forEach(recipe => {
    createPage({
      path: `/recipe/${recipe.node.slug}`,
      component: RecipeTemplate,
      context: {
        id: recipe.node.wordpress_id,
        slug: recipe.node.slug,
      },
    })
  })
}