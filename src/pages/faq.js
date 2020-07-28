import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "../sass/faq.scss"

const FaqPage = ({ data }) => {
  const { edges: faqs } = data.allWordpressWpFaqs

  function toggleAccordion(e) {
    e.preventDefault()
    console.log(e.currentTarget.nextElementSibling)
    if (e.currentTarget.getAttribute("aria-expanded") === "true") {
      e.currentTarget.nextElementSibling.classList.add("hide")
      e.currentTarget.setAttribute("aria-expanded", "false")
    } else {
      e.currentTarget.nextElementSibling.classList.remove("hide")
      e.currentTarget.setAttribute("aria-expanded", "true")
    }
  }

  return (
    <Layout>
      <SEO title="FAQ" />
      <div className="content-wrapper faq">
        <div className="content-wrapper--container">
          <h1 className="text-center">FAQ</h1>
          <ul className="faq-accordion">
            {faqs.map((faq, index) => {
              const ariaExpanded = index === 0 ? true : false
              const contentHideClass = index !== 0 ? " hide" : ""
              return (
                <li key={index}>
                  <button
                    id={`faq-heading-${index}`}
                    aria-expanded={ariaExpanded}
                    onClick={toggleAccordion}
                  >
                    <div dangerouslySetInnerHTML={{ __html: faq.node.title }} />
                  </button>
                  <div
                    className={`content${contentHideClass}`}
                    aria-labelledby={`faq-heading-${index}`}
                    dangerouslySetInnerHTML={{ __html: faq.node.content }}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default FaqPage

export const query = graphql`
  query {
    allWordpressWpFaqs(sort: { fields: wordpress_id }) {
      edges {
        node {
          title
          content
        }
      }
    }
  }
`
