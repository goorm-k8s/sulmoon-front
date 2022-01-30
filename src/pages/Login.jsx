import React from 'react';
import {Button} from '@material-ui/core';
import styled from 'styled-components';

import Sulmoon5 from '../images/Sulmoon5.jpg';
import kakao from '../images/kakao.png';

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
            imgUrl={kakao}
            onClick={handleClickKakaoLogin}
          />
          <SNSButton>
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
    width: 280px;
    height: 50px;
    background-size: 'contain';
    background:url(${(props)=>props.imgUrl}); 
  }
`;

const REST_API_KEY = '5af42f065a8d4e342c4249779e84b76e';
const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
