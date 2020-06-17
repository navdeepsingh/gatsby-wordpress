import React from "react"


const HeroBanner = ({banner, title, additionalClass }) => {
    const bannerDesktopImage = banner.feat_img && banner.feat_img.source_url ? banner.feat_img.source_url : "https://d3njy17jeluiri.cloudfront.net/wp-benezol/wp-content/uploads/2020/06/08043547/slide1.jpg";
    const bannerMobileImage = banner.mobile_featured_image && banner.mobile_featured_image.source_url ? banner.mobile_featured_image.source_url : "https://d3njy17jeluiri.cloudfront.net/wp-benezol/wp-content/uploads/2020/06/11061325/bencol-bottles-mobile.jpg";
    
    return (
    <div className={["banner", banner.theme, additionalClass].join(" ")}>                   
        <div className="banner__image">
            <picture>
                <source media="(max-width: 989px)" srcset={bannerMobileImage} />
                <img src={bannerDesktopImage} alt="" />
            </picture>
        </div>
        <div className="banner__text">
            <div className="banner__text-wrapper">
                {
                    banner.page_subtitle
                    ? <h1 dangerouslySetInnerHTML={{ __html: banner.page_subtitle }} />
                    : <h1 dangerouslySetInnerHTML={{ __html: title}} />
                }                
                <p dangerouslySetInnerHTML={{ __html: banner.page_sub_txt }} />
                {
                    banner.link 
                    ? <div>
                        <a href={banner.link_url} dangerouslySetInnerHTML={{ __html: banner.link_label }} />
                    </div>                
                    : null
                }
            </div>
        </div>

    </div>
    )
}
export default HeroBanner