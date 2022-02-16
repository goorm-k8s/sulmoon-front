import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from "react-router";
import { Radio, FormControl, FormControlLabel, RadioGroup, FormLabel, Button } from '@material-ui/core';

import "./QuestionForm.css"; 

export default function Survey() {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [survey, setSurvey] = useState({});
  const [answers, setAnswers] = useState({});
  
  useEffect(() => {
    (async () => {
      const response = await fetch(`http://3.35.95.59:10000/api/surveys/${id}/examples`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const res = await response.json();
      setSurvey(res);
    })();
  }, [token])

  const handleChangeAnswer = (event, value) => {
    const { name } = event.target;

    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: value
    }));
  }

  const handleSubmit = useCallback(async () => {
    const userId = localStorage.getItem('userId');
    const params = survey.questions.map(question => {
      const selectAnswerId = answers[`radio-group-${question.questionId}`];
      const answerContent = question.examples.find(example => String(example.exampleId) === selectAnswerId).exampleContent;

      return {
        'answerId': selectAnswerId,
        'questionId': question.questionId,
        'userId': userId,
        'answerContent': answerContent
      };
    })

    const response = await fetch(`http://3.35.95.59:10000/api/surveys/${id}/answers`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(params)
    });

    const res = await response.json();

    if (res) {
      window.alert('설문에 참여했습니다.')
      history.push('/');
    }
  }, [token, answers, survey]);

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
            <FormControl>
              <h1>Title: {survey.title}</h1>
              {survey.questions.map((question, index) => (
                <React.Fragment key={ question.questionId }>
                  <FormLabel id="demo-radio-buttons-group-label" style={{ fontSize: '20px' }}>Question{index + 1}: {question.questionContent}</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name={`radio-group-${question.questionId}`}
                    onChange={handleChangeAnswer}
                  >
                    {
                      question.examples.map((example, index) => (
                        <FormControlLabel
                          key={example.exampleId}
                          control={<Radio />}
                          label={`Option ${index + 1}:${example.exampleContent}`}
                          value={`${example.exampleId}`}
                        />
                      ))
                    }
                  </RadioGroup>
                </React.Fragment>
              ))}
              <div className="save_form">
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} style={{fontSize:"14px"}}>제출</Button>
              </div>
            </FormControl>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}