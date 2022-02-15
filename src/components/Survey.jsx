import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";

import "./QuestionForm.css"; 
import { Radio, FormControl, FormControlLabel, RadioGroup, FormLabel } from '@material-ui/core';

export default function Survey() {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [survey, setSurvey] = useState({});
  
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
      console.log('res', res);
      setSurvey(res);
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
                <FormControl key={ question.questionId }>
                  <FormLabel id="demo-radio-buttons-group-label" style={{ fontSize: '20px' }}>Question{index + 1}: {question.questionContent}</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    defaultValue={question.examples[0].exampleId}
                  >
                    {
                      question.examples.map((example, index) => (
                        <FormControlLabel
                          key={example.exampleId}
                          control={<Radio />}
                          label={`Option ${index + 1}:${example.exampleContent}`}
                          value={example.exampleId}
                        />
                      ))
                    }
                  </RadioGroup>
                </FormControl>
              ))}
            </>
              }
              {/* <div className="save_form">
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{fontSize:"14px"}}>제출</Button>
          </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}