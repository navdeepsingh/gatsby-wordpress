/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
//const createPaginatedPages = require('gatsby-paginate')
const { paginate } = require('gatsby-awesome-pagination')
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const BlogPostTemplate = path.resolve("./src/templates/BlogPost.js")
  //const PaginatePostTemplate = path.resolve("./src/templates/PaginatePost.js")
  const PaginatePostTemplate = path.resolve("./src/templates/ArchivePost.js")
  const PageTemplate = path.resolve("./src/templates/Page.js")
  const RecipeTemplate = path.resolve("./src/templates/Recipe.js")
  const result = await graphql(`
    {
      allWordpressPost(sort: {fields: date, order: ASC}, filter: {type:{eq: "post"} }) {
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
  paginate({
    createPage,
    items: BlogPosts,
    itemsPerPage: 1,
    pathPrefix: '/healthy-tips/post',
    component: PaginatePostTemplate
  });
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