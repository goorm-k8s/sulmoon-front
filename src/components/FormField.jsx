import React, {useState} from 'react';

import styled from 'styled-components';

export default function FormField({ id, onChangeFieldData}) {
  const [fieldData, setFieldData] = useState({
    question: '',
    firstAnswer: '',
    secondAnswer: '',
    thirdAnswer: '',
    fourthAnswer: '',
  });

  const handleQuestionChange = (event) => {
    const changeValues = { ...fieldData, question: event.target.value };
    setFieldData(changeValues);
    onChangeFieldData({ ...changeValues, id });
  };
  
  const handleAnswerChangeFirst = (event) => {
    const changeValues = { ...fieldData, firstAnswer: event.target.value };
    setFieldData(changeValues );
    onChangeFieldData({ ...changeValues, id });
  };

  const handleAnswerChangeSecond = (event) => {
    const changeValues = { ...fieldData, secondAnswer: event.target.value };
    setFieldData(changeValues );
    onChangeFieldData({ ...changeValues, id });
  };

  const handleAnswerChangeThird = (event) => {
    const changeValues = { ...fieldData, thirdAnswer: event.target.value };
    setFieldData(changeValues );
    onChangeFieldData({ ...changeValues, id });
  };

  const handleAnswerChangeFourth = (event) => {
    const changeValues = { ...fieldData, fourthAnswer: event.target.value };
    setFieldData(changeValues );
    onChangeFieldData({ ...changeValues, id });
  };

  return (
      <FormFieldContainer>
        <input
          type='text'
          name='question'
          placeholder='질문을 입력하세요'
          onChange={handleQuestionChange}
          value={fieldData.question}
        />
        <br />
        <input
          type='text'
          name='firstAnswer'
          onChange={handleAnswerChangeFirst}
          value={fieldData.firstAnswer}
        />
        <br />
        <input
          type='text'
          name='secondAnswer'
          onChange={handleAnswerChangeSecond}
          value={fieldData.secondAnswer}
        />
        <br />
        <input
          type='text'
          name='thirdAnswer'
          onChange={handleAnswerChangeThird}
          value={fieldData.thirdAnswer}
        />
        <br />
        <input
          type='text'
          name='fourthAnswer'
          onChange={handleAnswerChangeFourth}
          value={fieldData.fourthAnswer}
        />
      </FormFieldContainer>
  )
}

const FormFieldContainer = styled.div`
  padding: 10px 0;
  border: 1px solid blue;
`;
