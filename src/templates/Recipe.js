import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout.js"
import RecipeLike from "../components/recipeLike"
import SEO from "../components/seo"
import Img from "gatsby-image"
import "../sass/style.scss"

const RecipeTemplate = ({ data, pageContext, location }) => {
  const currentUrl = location.href ? location.href : ""
  const { prev, next } = pageContext

  //console.log(data.wordpressWpRecipe.title.replace(/&.*;/g, ""))

  return (
    <Layout>
      <SEO
        title={
          "Recipes: " + data.wordpressWpRecipe.title.replace(/&[*];>/g, "")
        }
      />
      <div className="content-wrapper recipe">
        <div className="content-wrapper--container">
          <div className="recipe-wrapper">
            <div className="recipe-wrapper--image">
              <img
                src={data.wordpressWpRecipe.acf.main_image.source_url}
                alt=""
              />
            </div>
            <div className="recipe-wrapper--text">
              <div className="category recipes">RECIPES</div>
              <h1
                dangerouslySetInnerHTML={{
                  __html: data.wordpressWpRecipe.title,
                }}
              />
              <div
                className="author"
                dangerouslySetInnerHTML={{
                  __html: data.wordpressWpRecipe.acf.contributed_by,
                }}
              />
            </div>
            <div className="recipe-wrapper--attributes">
              {data.wordpressWpRecipe.acf.passive_time ? (
                <div>
                  <Img fixed={data.clockIcon.childImageSharp.fixed} />
                  <span>{data.wordpressWpRecipe.acf.passive_time}</span>
                </div>
              ) : null}
              {data.wordpressWpRecipe.acf.preparation_time ? (
                <div>
                  <Img fixed={data.prepIcon.childImageSharp.fixed} />
                  <span>{data.wordpressWpRecipe.acf.preparation_time}</span>
                </div>
              ) : null}
              {data.wordpressWpRecipe.acf.cooking_time ? (
                <div>
                  <Img fixed={data.cookingIcon.childImageSharp.fixed} />
                  <span>{data.wordpressWpRecipe.acf.cooking_time}</span>
                </div>
              ) : null}
              {data.wordpressWpRecipe.acf.portion ? (
                <div>
                  <Img fixed={data.servingsIcon.childImageSharp.fixed} />
                  <span>{data.wordpressWpRecipe.acf.portion}</span>
                </div>
              ) : null}
            </div>
            <div className="recipe-wrapper--social">
              <ul className="social-icons">
                <li>
                  <a href="/" rel="noopener noreferrer" target="_blank">
                    <Img fixed={data.printIcon.childImageSharp.fixed} />
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Img fixed={data.fbIcon.childImageSharp.fixed} />
                  </a>
                </li>
                <li>
                  <a
                    href={`https://twitter.com/intent/tweet/?text=Check this out: ${data.wordpressWpRecipe.title}&url=${currentUrl}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Img fixed={data.twIcon.childImageSharp.fixed} />
                  </a>
                </li>
                <li>
                  <a
                    href={`http://pinterest.com/pin/create/button/?url=${currentUrl}&description=${data.wordpressWpRecipe.title}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Img fixed={data.piIcon.childImageSharp.fixed} />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${process.env.GATSBY_MAILTO}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Img fixed={data.emailIcon.childImageSharp.fixed} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="recipe-detail">
            <div className="col">
              <div className="ingredients">
                <h2>Ingredients</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.wordpressWpRecipe.acf.ingredients,
                  }}
                />
              </div>
            </div>
            <div className="col">
              <div className="directions">
                <h2>Directions</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.wordpressWpRecipe.acf.directions,
                  }}
                />
              </div>
              {data.wordpressWpRecipe.acf.nutrition ? (
                <div className="nutrition">
                  <h2>Nutrition</h2>
                  <div className="nutrition-wrapper">
                    <div className="nutrition-wrapper--label">Per Serving</div>
                    <div
                      className="nutrition-wrapper--list"
                      dangerouslySetInnerHTML={{
                        __html: data.wordpressWpRecipe.acf.nutrition,
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="pagination">
            <div>
              {prev && (
                <Link to={`recipe/${prev.slug}`} rel="prev">
                  {" "}
                  ← Previous{" "}
                </Link>
              )}
            </div>

            <div style={{ justifySelf: "flex-end" }}>
              {next && (
                <Link to={`recipe/${next.slug}`} rel="next">
                  {" "}
                  Next →{" "}
                </Link>
              )}
            </div>
          </div>

          {data.firstRecipe && data.secondRecipe ? (
            <div className="recipes-likes">
              <RecipeLike
                firstRecipe={data.firstRecipe}
                secondRecipe={data.secondRecipe}
              />
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  )
}
export default RecipeTemplate

export const query = graphql`
  query($id: Int!, $firstRecipe: Int!, $secondRecipe: Int!) {
    wordpressWpRecipe(wordpress_id: { eq: $id }) {
      slug
      title
      content
      acf {
        contributed_by
        passive_time
        preparation_time
        cooking_time
        portion
        ingredients
        directions
        nutrition
        main_image {
          source_url
        }
      }
    }
    firstRecipe: wordpressWpRecipe(wordpress_id: { eq: $firstRecipe }) {
      slug
      title
      content
      acf {
        contributed_by
        main_image {
          source_url
        }
      }
    }
    secondRecipe: wordpressWpRecipe(wordpress_id: { eq: $secondRecipe }) {
      slug
      title
      content
      acf {
        contributed_by
        main_image {
          source_url
        }
      }
    }
    clockIcon: file(relativePath: { eq: "clock-icon.png" }) {
      childImageSharp {
        fixed(width: 18) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    prepIcon: file(relativePath: { eq: "prep-icon.png" }) {
      childImageSharp {
        fixed(width: 18) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    cookingIcon: file(relativePath: { eq: "cooking-icon.png" }) {
      childImageSharp {
        fixed(width: 18) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    servingsIcon: file(relativePath: { eq: "servings-icon.png" }) {
      childImageSharp {
        fixed(width: 18) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    printIcon: file(relativePath: { eq: "print-icon.png" }) {
      childImageSharp {
        fixed(width: 18) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    fbIcon: file(relativePath: { eq: "fb-blue.png" }) {
      childImageSharp {
        fixed(width: 12) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    twIcon: file(relativePath: { eq: "tw-blue.png" }) {
      childImageSharp {
        fixed(width: 18) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    piIcon: file(relativePath: { eq: "pi-blue.png" }) {
      childImageSharp {
        fixed(height: 18) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    emailIcon: file(relativePath: { eq: "email-blue.png" }) {
      childImageSharp {
        fixed(width: 18) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
