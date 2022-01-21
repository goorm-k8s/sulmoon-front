import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  const renderApp = () => render(
    <App />,
  );

  it('input value', () => {
    renderApp();
    const input = screen.getByLabelText('ID');

    fireEvent.change(input, {
      target: { value: '1234' },
    });

    expect(input).toHaveAttribute('value', '1234');
  });
});
