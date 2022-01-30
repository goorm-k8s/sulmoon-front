import React from 'react';

import styled from 'styled-components';
import {Button} from '@material-ui/core';

export default function Home() {
  return (
    <div>
      <ButtonWrapper>
        <SulmoonButton>
            내가 생성한 설문 보기
        </SulmoonButton>
        <SulmoonButton>
             내가 참여한 설문 보기
        </SulmoonButton>
        <SulmoonButton>
             새로운 설문 생성
        </SulmoonButton>
      </ButtonWrapper>
    </div>
  );
}

const SulmoonButton = styled(Button)`
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
