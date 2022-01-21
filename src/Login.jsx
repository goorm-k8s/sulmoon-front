import React from 'react';
import {Button} from '@material-ui/core';
import styled from 'styled-components';

import Sulmoon5 from './images/Sulmoon5.jpg';

export default function Login({value, onChange}) {
  return (
    <ButtonContainer>
      <div>
        <img src={Sulmoon5} width='80' height='80' alt='profile'/>
      </div>
      <div>
        <input
          id="input-task-title"
          type="text"
          placeholder="ID"
          value={value}
          onChange={onChange}
        />
      </div>
      <div>
        <input
          id="input-task-title"
          type="password"
          placeholder="PASSWORD"
          value={value}
          onChange={onChange}
        />
      </div>
      <LoginButton buttonColor="#fff">
            Log In
      </LoginButton>
      <ButtonWrapper>
        <SNSButton buttonColor="#f9e000">
             카카오 계정으로 로그인
        </SNSButton>
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
  );
}

const ButtonContainer = styled.article`
  background-color: white;
  width: 300px;
  margin: 0 auto;
  padding: 0 auto;
  box-shadow: 0px 0px 5px 5px #DCDCDC;
  border-radius: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginButton = styled(Button)`
  && {
    height: 50px;
    width: 80px;
    background-color: ${(props) => props.buttonColor};
    font-family: 'Cafe24SsurroundAir';
    font-size: small;
  }
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
