import { Agenda } from './Agenda';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Agenda tests', () => {
  it('should add a contact to the list', async () => {
    /*In here we should add a test to check when the form is properly filled then the add button is clickled 
    the contact should display in the table below*/
    render(<Agenda />);
    const NameInput = screen.getByLabelText('First name');
    const PhoneInput = screen.getByLabelText('Phone number');

    userEvent.type(NameInput, 'Jorge');
    userEvent.type(PhoneInput, '3322523212');
    userEvent.click(screen.getByText('Add contact'));

    const tableResults = await screen.findByRole('table');
    expect(within(tableResults).getByText('Jorge')).toBeInTheDocument();
  });
  it('should display an error message when the form is empty', async () => {
    /*In here we should test when the user tryes to add an empty field then an error message should display */
    render(<Agenda />);
    userEvent.click(screen.getByText('Add contact'));

    expect(await screen.findByText('You must fill all the values')).toBeInTheDocument();
  });
  it('should delete the selected contact', async () => {
    /*In here we should test when the user deletes a contact to validate that its properly removed from the table */
    render(<Agenda />);
    const NameInput = screen.getByLabelText('First name');
    const PhoneInput = screen.getByLabelText('Phone number');

    userEvent.type(NameInput, 'Jorge');
    userEvent.type(PhoneInput, '3322523212');
    userEvent.click(screen.getByText('Add contact'));

    const ContactCheckbox = await screen.findByLabelText('Jorge checkbox');
    userEvent.click(ContactCheckbox);

    const DeleteButton = await screen.findByText('Delete');
    userEvent.click(DeleteButton);

    expect(screen.queryByText('Jorge')).not.toBeInTheDocument();
  });
  it('should delete all the contacts', async () => {
    /*Here we should validate that the delete all check it works properly and removes all the fields of the list */
    render(<Agenda />);
    const NameInput = screen.getByLabelText('First name');
    const PhoneInput = screen.getByLabelText('Phone number');

    userEvent.type(NameInput, 'Jorge');
    userEvent.type(PhoneInput, '3322523212');
    userEvent.click(screen.getByText('Add contact'));

    const ContactCheckbox = await screen.findByLabelText('Select all checkbox');
    userEvent.click(ContactCheckbox);

    const DeleteButton = await screen.findByText('Delete');
    userEvent.click(DeleteButton);

    expect(screen.queryByText('Jorge')).not.toBeInTheDocument();
  });
});
