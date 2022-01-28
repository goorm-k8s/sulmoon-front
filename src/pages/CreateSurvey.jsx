import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormField from 'src/components/FormField';

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export default function CreateSurvey() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(''); 
  const [fields, setFields] = useState([]);

  const [formData, setFormData] = useState([]);
  const [fixFieldData, setFixFieldData] = useState({});

  useEffect(() => {
    if (!isEmptyObject(fixFieldData)) {
      formData[fixFieldData.id] = fixFieldData;
    }
  }, [formData, fixFieldData]);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };
  
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  }

  const handleSubmit = (event) => {
    console.log('result:', formData);
    event.preventDefault();
  }

  const handleClickAddField = () => {
    setFormData([...formData, {
      id: formData.length,
      question: '',
      answer: '',
    }]);

    setFields([
      ...fields,
      <FormField
        key={fields.length}
        id={fields.length}
        onChangeFieldData={setFixFieldData}
      />
    ])
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          name='name'
          placeholder='제목을 입력하세요.'
          onChange={handleChange}
          value={title}
        />
        <br/>
        <input
          type='text'
          name='question'
          placeholder='질문을 입력하세요'
          onChange={handleQuestionChange}
          value={question}
        />
        <br />
        <input
          type='text'
          name='answer'
          onChange={handleAnswerChange}
          value={answer}
        />
        <br />
        <input
          type='text'
          name='answer'
          onChange={handleAnswerChange}
          value={answer}
        />
        <br />
      </div>

      {fields.map(field => (
        field
      ))}

      <input type='submit' value='submit' />
      <input type='reset' value='reset' />
      <IconButton onClick={handleClickAddField}>
        <AddCircleOutlineIcon />
      </IconButton>
    </form>
  );
}
