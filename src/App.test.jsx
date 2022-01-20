import { fireEvent, render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  const renderApp = () => render(
    <App />,
  );

  it('input value', () => {
    const { getByLabelText } = renderApp();

    const input = getByLabelText('ID');

    fireEvent.change(input, {
      target: { value: '1234' },
    });

    expect(input).toHaveAttribute('value', '1234');
  });
});
