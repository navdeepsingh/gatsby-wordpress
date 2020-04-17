import { StaticQuery, graphql } from "gatsby"
import React from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Slideshow = () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressWpSlider {
          nodes {
            id
            title
            content
          }
        }        
      }
    `}
    render={data => (
      <Slider {...settings}>

        {data.allWordpressWpSlider.nodes.map(slide => (
          <div key={slide.id} dangerouslySetInnerHTML={{ __html: slide.content }} />

        ))}

      </Slider>
    )}
  />
)
export default Slideshow