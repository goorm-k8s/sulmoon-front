import React, {useState} from 'react';

import styled from 'styled-components';

export default function FormField({ id, onChangeFieldData}) {
  const [fieldData, setFieldData] = useState({
    question: '',
    answer: '',
  });

  const handleQuestionChange = (event) => {
    const changeValues = { ...fieldData, question: event.target.value };
    setFieldData(changeValues);
    onChangeFieldData({ ...changeValues, id });
  };
  
  const handleAnswerChange = (event) => {
    const changeValues = { ...fieldData, answer: event.target.value };
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
          name='answer'
          onChange={handleAnswerChange}
          value={fieldData.answer}
        />
        <br />
        {/* TODO: answers */}
      </FormFieldContainer>
  )
}

const FormFieldContainer = styled.div`
  padding: 10px 0;
  border: 1px solid blue;
`;
