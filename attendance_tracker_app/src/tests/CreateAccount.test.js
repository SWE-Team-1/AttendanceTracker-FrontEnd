import React from 'react'
import CreateAccount from '../js/CreateAccount.js'
import { render, fireEvent } from '@testing-library/react'


test('renders without crashing', () => {
  const { getAllByText } = render(<CreateAccount />);
  getAllByText("Create Account");
});