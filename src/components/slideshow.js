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
            acf {
              heading
              sub_title
              link
            }
          }
        }        
      }
    `}
    render={data => (
      <Slider {...settings}>

        {data.allWordpressWpSlider.nodes.map(slide => (
          <div key={slide.id} className="slide">
            <div className="slick-slider__text">
              <h1 dangerouslySetInnerHTML={{ __html: slide.acf.heading }} />
              <h2 dangerouslySetInnerHTML={{ __html: slide.acf.sub_title }} />
              <a href={slide.acf.link}>About Benecol</a>
            </div> 
            <div className="slick-slider__image" dangerouslySetInnerHTML={{ __html: slide.content }} />                       
          </div>
        ))}

      </Slider>
    )}
  />
)
export default Slideshow