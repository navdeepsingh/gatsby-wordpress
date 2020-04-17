import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Slideshow from "../components/slideshow"
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Slideshow />
    <h1>{data.wordpressPage.title}</h1>
    <h3>{data.wordpressPage.acf.page_subtitle}</h3>
    <div dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }} />
  </Layout>
)
export default IndexPage

export const query = graphql`
  query {
    wordpressPage(slug: {eq: "home"}) {
      title
      excerpt
      content
      acf {
        page_subtitle
      }
    }
  }
`