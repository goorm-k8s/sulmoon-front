import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";

export default function CreatedSurvey() {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [survey, setSurvey] = useState({});
  
   useEffect(() => {
    (async () => {
      const response = await fetch(`http://3.35.95.59:10000/api/surveys/${id}/answers`, {
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
        <p>{survey.title}</p>
        <p>{survey.questions[0].questionContent}</p>
        {/* {survey.questions[0].answers.answerContent} */}
      </>
      }
    </div>
  )
}