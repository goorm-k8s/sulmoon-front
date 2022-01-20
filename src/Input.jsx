import React from 'react';

import Button from '@material-ui/core/Button';

export default function Input({ value, onChange, onClick }) {
  return (
    <>
    <p>
      <label htmlFor="input-task-title">
        LOG IN
      </label>
    </p>
    <p>
      <input
        id="input-task-title"
        type="text"
        placeholder="ID"
        value={value}
        onChange={onChange}
      />
    </p>
    <p>
      <input
        id="input-task-title"
        type="password"
        placeholder="password"
        value={value}
        onChange={onChange}
      />
      </p>
      <p>
       <Button variant="contained" color="success" onClick={onClick}>
         Log In
       </Button>
      </p>
      <Button variant="text" size="small" onClick={onClick}>
        회원가입
      </Button>
      </>
  );
}