import React from 'react'
import CreateAccount from '../js/CreateAccount.js'
import { render, fireEvent } from '@testing-library/react'


test('renders without crashing', () => {
  const { getAllByText } = render(<CreateAccount />);
  getAllByText("Create Account");
});

test('allows the user to create an account successfully', async () => {
  const { getByText, getByLabelText } = render(<CreateAccount />);

fireEvent.change(getByLabelText("Name"), {
    target: {value: 'Name'},
  })

  fireEvent.change(getByLabelText("Email"), {
    target: {value: 'Teacher@email.com'},
  })
  fireEvent.change(getByLabelText("Password"), {
    target: {value: 'Password123!'},
  })

  fireEvent.click(getByText("Submit"));
});