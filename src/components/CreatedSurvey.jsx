import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";

export default function CreatedSurvey() {
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
      {
      Object.keys(survey).length === 0 ?
      (<p>Loading</p>)
    :
      <>
            <h1>제목: {survey.title}</h1>
            {survey.questions.map((question, index) => (
              <React.Fragment key={ question.questionId }>
                <p style={{fontSize:'20px'}}>질문{ index + 1 }: {question.questionContent}</p>
                {
                  question.examples.map((example, index) => (
                    <p key={example.exampleId}>옵션 { index + 1}:{example.exampleContent}</p>
                  ))
                }
              </React.Fragment>
              ))
            }
      </>
      }
    </div>
  )
}