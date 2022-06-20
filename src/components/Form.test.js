import { Form } from './Form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('App tests', () => {
  it('should display header title', () => {
    render(<Form />);
    const Header = screen.getByRole('heading', { name: 'Suma de valores' });

    expect(Header).toBeInTheDocument();
  });

  it('should display the result of the addition', async () => {
    render(<Form />);
    const FirstInput = screen.getByLabelText('first number');
    const SecondInput = screen.getByLabelText('second number');

    userEvent.type(FirstInput, '3');
    userEvent.type(SecondInput, '2');
    userEvent.click(screen.getByText('Add'));

    expect(await screen.findByText('5')).toBeInTheDocument();
  });

  it('should validate input numbers', () => {
    render(<Form />);
    const FirstInput = screen.getByLabelText('first number');
    const SecondInput = screen.getByLabelText('second number');

    userEvent.type(FirstInput, '3');
    userEvent.type(SecondInput, 'A');
    userEvent.click(screen.getByText('Add'));

    expect(screen.getByText('You must only use numbers')).toBeInTheDocument();
  });
});
