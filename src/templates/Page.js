import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import SEO from "../components/seo"
import HeroBanner from "../components/heroBanner"
import "../sass/style.scss"

const PageTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wordpressPage.title}
      description={data.wordpressPage.excerpt}
    />
    <HeroBanner banner={data.wordpressPage.acf} title={data.wordpressPage.title} />
    <div className="content-wrapper">      
      <div className="content-wrapper--container" dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }} />
    </div>
  </Layout>
)
export default PageTemplate

export const query = graphql`
  query($id: Int!) {
    wordpressPage(wordpress_id: { eq: $id }) {
      title
      excerpt
      content
      acf {
        page_subtitle
        page_sub_txt
        feat_img {
          source_url
        }
        mobile_featured_image {
          source_url
        }
        link
        link_label
        link_url
        theme
      }
    }
  }
`