import React from 'react';

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
        type="text"
        placeholder="password"
        value={value}
        onChange={onChange}
      />
      </p>
      <p>
        <button type="button" onClick={onClick}>
          Log In
        </button>
      </p>
      </>
  );
}