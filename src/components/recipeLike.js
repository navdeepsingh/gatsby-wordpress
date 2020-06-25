import React from "react"
import { Link } from "gatsby"

const RecipeLike = ({firstRecipe, secondRecipe}) => {
    return (
            <>
                <h3>You May Also Like</h3>
                <div className="recipes-listing">
                    <div className="recipes-listing--item">
                        <div className="recipes-listing--item__image">
                            <Link to={`/recipe/${firstRecipe.slug}`}>
                                <img src={firstRecipe.acf.main_image.source_url} alt="" />
                            </Link>
                        </div>
                        <div className="recipes-listing--item__text">
                            <div className="title">
                                <Link to={`/recipe/${firstRecipe.slug}`}>
                                <span dangerouslySetInnerHTML={{ __html: firstRecipe.title }} />
                                </Link>
                            </div>
                            <div className="author" dangerouslySetInnerHTML={{ __html: firstRecipe.acf.contributed_by }} />
                        </div>
                    </div>
                    <div className="recipes-listing--item">
                        <div className="recipes-listing--item__image">
                            <Link to={`/recipe/${secondRecipe.slug}`}>
                                <img src={secondRecipe.acf.main_image.source_url} alt="" />
                            </Link>
                        </div>
                        <div className="recipes-listing--item__text">
                            <div className="title">
                                <Link to={`/recipe/${secondRecipe.slug}`}>
                                <span dangerouslySetInnerHTML={{ __html: secondRecipe.title }} />
                                </Link>
                            </div>
                            <div className="author" dangerouslySetInnerHTML={{ __html: secondRecipe.acf.contributed_by }} />
                        </div>
                    </div>
                </div>  
            </>
    )
}

export default RecipeLike