import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Slideshow = () => {
  const data = useStaticQuery(graphql`
    {
      allWordpressWpSlider {
        nodes {
          id
          title
          content
          acf {
            heading
            sub_title
            link
            link_label
            theme
            slider_image {
              source_url
            }
            mobile_image {
              source_url
            }
          }
        }
      }  
    }
  `)
  
  return (
    <Slider {...settings}>
    {data.allWordpressWpSlider.nodes.map(slide => {

      const sliderDesktopImage = slide.acf.slider_image && slide.acf.slider_image.source_url ? slide.acf.slider_image.source_url : "https://d3njy17jeluiri.cloudfront.net/wp-benezol/wp-content/uploads/2020/06/08043547/slide1.jpg";
      const sliderMobileImage = slide.acf.mobile_image && slide.acf.mobile_image.source_url ? slide.acf.mobile_image.source_url : "https://d3njy17jeluiri.cloudfront.net/wp-benezol/wp-content/uploads/2020/06/11061325/bencol-bottles-mobile.jpg";

      return (
        <div key={slide.id} className={['slide', slide.acf.theme].join(" ")}>
          <div className="slick-slider__image">
            <picture>
                <source media="(max-width: 989px)" srcset={sliderMobileImage} />
                <img src={sliderDesktopImage} alt="" />
            </picture>
          </div>
          <div className="slick-slider__text">
            <div className="slick-slider__text-wrapper">
              <h1 dangerouslySetInnerHTML={{ __html: slide.acf.heading }} />
              <h2 dangerouslySetInnerHTML={{ __html: slide.acf.sub_title }} />
              <div>
                <a href={slide.acf.link} dangerouslySetInnerHTML={{ __html: slide.acf.link_label }} />
              </div>                
            </div>
          </div>             
        </div>
      )      
    })}

    </Slider>
  )
}

export default Slideshow