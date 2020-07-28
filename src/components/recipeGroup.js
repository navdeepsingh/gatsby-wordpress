import React from "react"
import { Link } from "gatsby"

const RecipeGroup = ({ recipes }) => {
  return (
    <>
      {recipes.map(recipe => (
        <div className="recipes-listing--item" key={recipe.node.wordpress_id}>
          <div className="recipes-listing--item__image">
            <Link to={`/recipe/${recipe.node.slug}`}>
              <img src={recipe.node.acf.main_image.source_url} alt="" />
            </Link>
          </div>
          <div className="recipes-listing--item__text">
            <h2 className="title">
              <Link to={`/recipe/${recipe.node.slug}`}>
                <span dangerouslySetInnerHTML={{ __html: recipe.node.title }} />
              </Link>
            </h2>
            <div
              className="author"
              dangerouslySetInnerHTML={{
                __html: recipe.node.acf.contributed_by,
              }}
            />
          </div>
        </div>
      ))}
    </>
  )
}

export default RecipeGroup
