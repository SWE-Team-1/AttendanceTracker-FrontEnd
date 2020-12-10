import React from 'react'
import Options from '../js/Options.js'
import { render, fireEvent } from '@testing-library/react'


test('renders without crashing', () => {
  const { getByText } = render(<Options />);
  getByText("Options");
});

// test('change automated alert frequency', async () => {
//   const { getByText, getAllByText } = render(<Options />);

//   fireEvent.click(getAllByText("3"));
//   fireEvent.click(getByText("2"));



// });