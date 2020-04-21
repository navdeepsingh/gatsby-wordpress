import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import * as Survey from "survey-react";
import "survey-react/survey.css";

//Define Survey JSON
//Here is the simplest Survey with one text question
const json = {
  elements: [
    { type: "text", name: "customerName", title: "What is weight and height", isRequired: true },
    { type: "text", name: "customerName", title: "What is your name?", isRequired: true },
  ]
};
const model = new Survey.Model(json);

//Define a callback methods on survey complete
const onComplete = (survey, options) => {
  //Write survey results into database
  console.log("Survey results: " + JSON.stringify(survey.data));
}

const QuestionnairePage = ({ data }) => (
  <Layout>
    <SEO title="Questionaire" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Questionaire</h1>
    <Survey.Survey model={model} onComplete={onComplete} />
  </Layout>
)
export default QuestionnairePage