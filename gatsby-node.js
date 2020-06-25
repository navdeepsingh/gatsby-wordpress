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
      allWordpressPost(sort: {fields: date, order: ASC}, filter: {type:{eq: "post"}}) {
        edges {
          node {
            slug
            wordpress_id
            title
            content
            excerpt
            date(formatString: "MMMM DD, YYYY")
            featured_media {
              source_url
            }
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
      allWordpressWpRecipe(filter: {status: {eq: "publish"}}) {
        edges {
          node {
            slug
            wordpress_id
            acf {
              like {
                wordpress_id
              }
            }
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
  BlogPosts.forEach((post, index) => {    
    createPage({
      path: `/post/${post.node.slug}`,
      component: BlogPostTemplate,
      context: {
        id: post.node.wordpress_id,
        slug: post.node.slug,
        prev: index === 0 ? null : BlogPosts[index - 1].node,
        next: index === (BlogPosts.length - 1) ? null : BlogPosts[index + 1].node
      },
    })
  })
  const Pages = result.data.allWordpressPage.edges
  Pages.forEach(page => {
    const pageSlug = page.node.slug;
    if (pageSlug === 'healthy-tips' || pageSlug === 'recipes') return; // Skip pages
    createPage({
      path: `/${pageSlug}`,
      component: PageTemplate,
      context: {
        id: page.node.wordpress_id,
        slug: page.node.slug,
      },
    })
  })
  const Recipes = result.data.allWordpressWpRecipe.edges
  Recipes.forEach((recipe, index) => {    
    
    let recipeLikes = recipe.node.acf.like;
    let firstRecipe, secondRecipe;

    if (recipeLikes) {
      firstRecipe = recipeLikes[0].wordpress_id;
      secondRecipe = recipeLikes[1].wordpress_id;
    }

    createPage({
      path: `/recipe/${recipe.node.slug}`,
      component: RecipeTemplate,
      context: {
        id: recipe.node.wordpress_id,
        slug: recipe.node.slug,
        prev: index === 0 ? null : Recipes[index - 1].node,
        next: index === (Recipes.length - 1) ? null : Recipes[index + 1].node,
        firstRecipe: firstRecipe ? firstRecipe : 0,
        secondRecipe: secondRecipe ? secondRecipe : 0,
      },
    })
  })
}