import React from "react"
import { Link } from "gatsby"
import Slider from "react-slick"

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
}

const FeaturedPosts = ({ posts, recipes }) => {
  return (
    <div className="featured-posts">
      <Slider {...settings}>
        {posts
          ? posts.map(featuredPost => (
              <div
                className="featured-posts--item"
                key={featuredPost.node.wordpress_id}
              >
                <div className="featured-posts--item__image">
                  <img
                    src={featuredPost.node.featured_media.source_url}
                    alt={featuredPost.node.title}
                    className="img-fluid"
                  />
                </div>
                <div className="featured-posts--item__text">
                  <div className="category">HEALTHY TIPS</div>
                  <div className="title">
                    <Link to={`/post/${featuredPost.node.slug}`}>
                      <span>{featuredPost.node.title}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : null}
        {recipes
          ? recipes.map(featuredRecipe => (
              <div
                className="featured-posts--item"
                key={featuredRecipe.node.wordpress_id}
              >
                <div className="featured-posts--item__image">
                  <img
                    src={featuredRecipe.node.acf.main_image.source_url}
                    alt={featuredRecipe.node.title}
                    className="img-fluid"
                  />
                </div>
                <div className="featured-posts--item__text">
                  <div className="category recipes">RECIPES</div>
                  <div className="title">
                    <Link to={`/recipe/${featuredRecipe.node.slug}`}>
                      <span>{featuredRecipe.node.title}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : null}
      </Slider>
    </div>
  )
}

export default FeaturedPosts
