import React from 'react';
import {Button} from '@material-ui/core';
import styled from 'styled-components';

import Sulmoon5 from './images/Sulmoon5.jpg';

export default function Login() {
  const handleClickKakaoLogin = () => {
    location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="Login">
      <ButtonContainer>
        <div>
          <img src={Sulmoon5} width='80' height='80' alt='profile'/>
        </div>
        <ButtonWrapper>
          <SNSButton
            buttonColor="#f9e000"
            buttonText='카카오 계정으로 로그인'
            onClick={handleClickKakaoLogin}
          />
          <SNSButton buttonColor="#2DB400" isWhiteColor>
             네이버로 로그인
          </SNSButton>
          <SNSButton buttonColor="#3B5998" isWhiteColor>
             Facebook으로 로그인
          </SNSButton>
          <SNSButton buttonColor="#EA4335" isWhiteColor>
             Google 계정으로 로그인
          </SNSButton>
        </ButtonWrapper>
      </ButtonContainer>
    </div>
  );
}

const ButtonContainer = styled.article`
  background-color: white;
  width: 300px;
  margin-left: 500px;
  margin-top: 20px;
  padding: 80px;
  box-shadow: 0px 0px 5px 5px #DCDCDC;
  border-radius: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SNSButton = styled(Button)`
  && {
    height: 30px;
    width: 200px;
    margin: 0.5em;
    justify-content: 'center';
    background-position: 'center';
    background-size: 'cover';
    background-color: ${(props) => props.buttonColor};
    font-family: 'Cafe24SsurroundAir';
    font-size: small;
    color: ${(props) => props.isWhiteColor ? 'white' : 'black'};
    font-weight: bold;
  }
`;

const REST_API_KEY = '5af42f065a8d4e342c4249779e84b76e';
const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
