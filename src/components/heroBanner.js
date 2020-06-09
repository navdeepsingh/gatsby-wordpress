import React from "react"


const HeroBanner = ({banner }) => {
    const bannerImage = banner.feat_img && banner.feat_img.source_url ? banner.feat_img.source_url : "https://d3njy17jeluiri.cloudfront.net/wp-benezol/wp-content/uploads/2020/06/08043547/slide1.jpg";

    return (
    <div className={["banner", banner.theme].join(" ")} style={{backgroundImage: `url(${bannerImage})`}}>                   
        <div className="banner__text">
            <div className="banner__text-wrapper">
                <h1 dangerouslySetInnerHTML={{ __html: banner.page_subtitle }} />
                <p dangerouslySetInnerHTML={{ __html: banner.page_sub_txt }} />
                {
                    banner.link 
                    ? <div>
                        <a href={banner.link_url}dangerouslySetInnerHTML={{ __html: banner.link_label }} />
                    </div>                
                    : null
                }
            </div>
        </div>

    </div>
    )
}
export default HeroBanner