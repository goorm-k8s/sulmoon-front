import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { Chart } from "chart.js";

import { Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import "./QuestionForm.css";

export default function CreatedSurvey() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const { id } = useParams();
  const [survey, setSurvey] = useState({});
  const [charts, setCharts] = useState([]);

  const history = useHistory();
  const [questions, setQuestions] = useState([]);

  const API_DOMAIN = "http://3.35.95.59:10000/api";

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_DOMAIN}/surveys/${id}/answers`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setSurvey(await response.json());
    })();
  }, [token])
  
  return (    
    <div>
      <div className="question_form">
        <br/>
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
            {
            Object.keys(survey).length === 0 ?
            (<p>Loading</p>)
          :
            <>
                  <h1>Title: {survey.title}</h1>
                  {survey.questions.map((question, index) => (
                    <React.Fragment key={ question.questionId }>
                      <p style={{fontSize:'20px'}}>Question{ index + 1 }: {question.questionContent}</p>
                      {
                        question.examples.map((example, index) => (
                          <p key={example.exampleId}>Option { index + 1}:{example.exampleContent}</p>
                        ))
                      }
                    </React.Fragment>
                    ))
                  }
            </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
