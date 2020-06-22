import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import SEO from "../components/seo"
import Img from "gatsby-image"
import "../sass/style.scss"

const RecipeTemplate = ({ data, location }) => {
  const currentUrl = location.href ? location.href : '';
  return (
    <Layout>
      <SEO
        title={"Recipes: " + data.wordpressWpRecipe.title}
      />
      <div className="content-wrapper blank">
        <div class="content-wrapper--container">  
          <div className="recipe-wrapper">
            <div className="recipe-wrapper--top">
              <div className="recipe-wrapper--top__image">
                <img src={data.wordpressWpRecipe.acf.main_image.source_url} alt="" />
              </div>
              <div className="recipe-wrapper--top__text">
                <div className="cetegory">RECIPES</div>
                <h1>{data.wordpressWpRecipe.title}</h1>
                <p></p>
              </div>
            </div>
            <div className="recipe-wrapper--bottom">
              <div className="recipe-wrapper--bottom__attributes">
                <div>
                  <Img fixed={data.clockIcon.childImageSharp.fixed} />
                  <span>{data.wordpressWpRecipe.acf.passive_time}</span>
                </div>
                <div>
                  <Img fixed={data.prepIcon.childImageSharp.fixed} />
                  <span>{data.wordpressWpRecipe.acf.preparation_time}</span>
                </div>
                <div>
                  <Img fixed={data.cookingIcon.childImageSharp.fixed} />
                  <span>{data.wordpressWpRecipe.acf.cooking_time}</span>
                </div>
                <div>
                  <Img fixed={data.servingsIcon.childImageSharp.fixed} />
                  <span>{data.wordpressWpRecipe.acf.servings}</span>
                </div>
              </div>
              <div className="recipe-wrapper--bottom__social">
                <ul className="social-icons">
                  <li>
                    <a href="/" rel="noopener noreferrer" target="_blank">
                      <Img fixed={data.printIcon.childImageSharp.fixed} />
                    </a>
                  </li>
                  <li>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} rel="noopener noreferrer" target="_blank">
                      <Img fixed={data.fbIcon.childImageSharp.fixed} />
                    </a>
                  </li>
                  <li>
                    <a href={`https://twitter.com/intent/tweet/?text=Check this out: ${data.wordpressWpRecipe.title}&url=${currentUrl}`} rel="noopener noreferrer"  target="_blank">
                      <Img fixed={data.twIcon.childImageSharp.fixed} />
                    </a>
                  </li>
                  <li>
                    <a href={`http://pinterest.com/pin/create/button/?url=${currentUrl}&description=${data.wordpressWpRecipe.title}`} rel="noopener noreferrer" target="_blank">
                      <Img fixed={data.piIcon.childImageSharp.fixed} />
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${process.env.GATSBY_MAILTO}`} rel="noopener noreferrer" target="_blank">
                      <Img fixed={data.emailIcon.childImageSharp.fixed} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="recipe-detail">
            <div className="col">
              <div className="ingredients">
                <h2>Ingredients</h2>
                <div dangerouslySetInnerHTML={{ __html: data.wordpressWpRecipe.acf.ingredients }} />
              </div>
            </div>
            <div className="col">
              <div className="directions">
                <h2>Direction</h2>
                <div dangerouslySetInnerHTML={{ __html: data.wordpressWpRecipe.acf.directions }} />
              </div>              
              <div className="nutrition">
                <h2>Nutrition</h2>
                <div className="nutrition-wrapper">
                  <div className="nutrition-wrapper--label">Per Servings</div>
                  <div className="nutrition-wrapper--list" dangerouslySetInnerHTML={{ __html: data.wordpressWpRecipe.acf.nutrition }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default RecipeTemplate

export const query = graphql`
  query($id: Int!) {
    wordpressWpRecipe(wordpress_id: { eq: $id }) {
      slug
      title
      content
      acf {
        passive_time
        preparation_time
        cooking_time
        servings        
        ingredients
        directions
        nutrition
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