import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import '../sass/faq.scss';

const FaqPage = ({ data }) => {
    const {edges: faqs} = data.allWordpressWpFaqs;
    return (
        <Layout>
            <SEO title="FAQ" />
            <div className="content-wrapper">
                <div class="content-wrapper--container">
                    <h1 className="text-center">FAQ</h1>
                    <Accordion preExpanded={[0]}>
                    {
                        faqs.map(faq => 
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        {faq.node.title}
                                    </AccordionItemButton>
                                </AccordionItemHeading> 
                                <AccordionItemPanel dangerouslySetInnerHTML={{ __html: faq.node.content }} />
                            </AccordionItem>
                        )
                    }
                    </Accordion>
                </div>                
            </div>    
        </Layout>
    )
}

export default FaqPage

export const query = graphql`
  query {
    allWordpressWpFaqs(sort: {fields : wordpress_id}) {
        edges {
          node {
            title
            content        
          }
        }
      }
  }
`
