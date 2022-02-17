import React from 'react';
import { useHistory } from 'react-router';
import { useQuestionsContext } from '../hooks/useQuestions';

import styled from 'styled-components';
import {Button} from '@material-ui/core';

export default function Home() {
  const history = useHistory();
  const { setQuestions } = useQuestionsContext();
  
  const handleClickCreatedSurveys = () => {
    history.push('/CreatedSurveys');
  };
  
  const handleClickStatistics = () => {
    history.push('/Statistics');
  };

  const fetchCreateSurvey = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const response = await fetch(`http://3.35.95.59:10000/api/surveys/users/${userId}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return await response.json();
  }
  
  const handelClickCreateSurvey = async () => {
    const response = await fetchCreateSurvey();
    if (response) {
      setQuestions(response.questions);
      history.push(`/QuestionForm/${response.surveyId}`);
    }
    console.log(response)
  };

  return (
    <div>
      <ButtonWrapper>
        <SurveyButton onClick={handelClickCreateSurvey}>
             새로운 설문 생성
        </SurveyButton>
        <SurveyButton onClick={handleClickCreatedSurveys}>
            내가 생성한 설문 보기
        </SurveyButton>
        <SurveyButton onClick={handleClickStatistics}>
             설문 통계
        </SurveyButton>
      </ButtonWrapper>
    </div>
  );
}

const SurveyButton = styled(Button)`
  && {
    width: 280px;
    height: 50px;
    background-size: 'contain';
    background-color: '#EA4335';
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
