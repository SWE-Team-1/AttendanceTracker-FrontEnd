import React from 'react'
import Login from '../js/Login.js'
import { render, fireEvent } from '@testing-library/react'


test('renders without crashing', () => {
  const { getByText } = render(<Login />);
  getByText("Account Login");
});

test('allows the user to login successfully', async () => {
  const { getByText, getByLabelText } = render(<Login />);

  fireEvent.change(getByLabelText("Email"), {
    target: {value: 'Teacher'},
  })
  fireEvent.change(getByLabelText("Password"), {
    target: {value: 'Password'},
  })

  fireEvent.click(getByText("Login"));
});