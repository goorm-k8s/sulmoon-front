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
  
  const handleClickAnsweredSurveys = () => {
    history.push('/AnsweredSurveys');
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
        <SurveyButton onClick={handleClickCreatedSurveys}>
            내가 생성한 설문 보기
        </SurveyButton>
        <SurveyButton onClick={handleClickAnsweredSurveys}>
             내가 참여한 설문 보기
        </SurveyButton>
        <SurveyButton onClick={handelClickCreateSurvey}>
             새로운 설문 생성
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
