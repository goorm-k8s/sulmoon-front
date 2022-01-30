import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Login';

test('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { getByDisplayValue, getByLabelText, getByText } = render((
    <Input
      value="ID"
      onchange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(getByDisplayValue('ID')).not.toBeNull();

  fireEvent.change(getByLabelText('id'), {
    target: { value: '1234' },
  });

  expect(handleChange).toBeCalled();

  fireEvent.click(screen.getByText('Log In'));

  expect(handleClick).toBeCalled();
})