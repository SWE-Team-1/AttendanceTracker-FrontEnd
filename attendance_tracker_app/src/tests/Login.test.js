import React from 'react'
import Login from '../js/Login.js'
import { render, fireEvent } from '@testing-library/react'


test('renders without crashing', () => {
  const { getByText } = render(<Login />);
  getByText("Account Login");
});

// test('login button', () => {
//   const { getByText } = render(<Login />);

//   fireEvent.click(getByText("Login"))
// });

