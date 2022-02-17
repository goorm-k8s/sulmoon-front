import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Chart } from "chart.js";

import { Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import "src/components/QuestionForm.css";

export default function Statistics() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [survey, setSurvey] = useState({});
  const [charts, setCharts] = useState([]);

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
      
}, [token]);

  useEffect(() => {
    let labelList = [];
    let colorList = [];
    let countList = [];
    console.log(survey);
    if (Object.keys(survey).length !== 0) {
      survey.questions &&
        survey.questions.map((question) => {
          question.answers &&
            question.answers.map((answer) => {
              labelList.push(answer.answerContent);
              colorList.push(colorize());
              countList.push(answer.count);
            });
          chartOb[question.questionId] = {
            labels: labelList,
            colors: colorList,
            counts: countList,
          };
          labelList = [];
          colorList = [];
          countList = [];
        });
      setQuestions(survey.questions);
    }
  }, [survey]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  let chartOb = {};

  useEffect(() => {
    for (let key in chartOb) {
      setCharts((prev) => {
        return {
          ...prev,
          [key]: {
            labels: chartOb[key].labels,
            datasets: [
              {
                backgroundColor: chartOb[key].colors,
                data: chartOb[key].counts,
                borderColor: "#22252B",
                hoberOffset: 4,
              },
            ],
            options: {
              title: {
                display: true,
                text: "통계",
              },
            },
          },
        };
      });
    }
  }, [chartOb]);

  useEffect(() => {
    for (let key in charts) {
      if (Object.keys(charts) !== 0) {
        const config = {
          type: "doughnut",
          data: charts[key],
          options: {
            responsive: true,
            maintainAspectRatio: false, //true 하게 되면 캔버스 width,height에 따라 리사이징된다.
            legend: {
              position: "top",
              fontColor: "black",
              align: "center",
              display: true,
              fullWidth: true,
              labels: { fontColor: "rgb(0, 0, 0)" },
            },
            plugins: {
              labels: {
                //두번째 script태그를 설정하면 각 항목에다가 원하는 데이터 라벨링을 할 수 있다.
                render: "value",
                fontColor: "black",
                fontSize: 15,
                precision: 2,
              },
            },
          },
        };
        new Chart(document.getElementById("myChart-" + key), config);
      }
    }
  }, [charts]);

  function colorize() {
    var r = Math.floor(Math.random() * 200);
    var g = Math.floor(Math.random() * 200);
    var b = Math.floor(Math.random() * 200);
    var color = "rgba(" + r + ", " + g + ", " + b + ", 0.7)";
    return color;
  }

  function questionsUI() {
    return questions.map((ques, i) => (
      <div key={i}>
        <div style={{ marginBottom: "0px" }}>
          <div style={{ width: "100%", marginBottom: "0px" }}></div>
          <Accordion
            expanded={questions[i].open}
            className={questions[i].open ? "add_border" : ""}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              elevation={1}
              style={{ width: "100%" }}
            >
              {questions[i] && !questions[i].open && (
                <div className="saved_questions">
                  <Typography
                    style={{
                      fontSize: "15px",
                      fontWeight: "400",
                      letterSpacing: ".1px",
                      lineHeight: "24px",
                      paddingBottom: "8px",
                    }}
                  >
                    {i + 1}. {ques.questionContent}
                  </Typography>
                  {ques.examples &&
                    ques.examples.map((example, j) => (
                      <div key={j}>
                        <div style={{ display: "flex" }}></div>
                      </div>
                    ))}
                </div>
              )}
            </AccordionSummary>
            <div className="question_boxes">
              {!ques.answer ? (
                <AccordionDetails className="add_question">
                  <div>
                    <div className="add_question_top">
                      <canvas id={"myChart-" + ques.questionId}></canvas>
                    </div>
                  </div>
                </AccordionDetails>
              ) : (
                <AccordionDetails className="add_question">
                  <div className="top_header">Choose Correct Answer</div>
                  <div>
                    <div className="add_question_top">
                      <canvas id={"myChart-" + ques.questionId}></canvas>
                    </div>
                  </div>
                </AccordionDetails>
              )}
            </div>
          </Accordion>
        </div>
      </div>
    ));
  }

  return (
    <div>
      <div className="question_form">
        <br />
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
              <h1>{survey && survey.title}</h1>
            </div>
          </div>
          {questionsUI()}
        </div>
      </div>
    </div>
  );
}
