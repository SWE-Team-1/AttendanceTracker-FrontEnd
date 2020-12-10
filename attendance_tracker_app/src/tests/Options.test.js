import React from 'react'
import Options from '../js/Options.js'
import Classroom from "../js/Classroom.js";
import { render, fireEvent } from '@testing-library/react'


test('renders without crashing', () => {
  const { getByText } = render(<Options />);
  getByText("Options");
});

test('open options window', async () => {
  const { getByText} = render(<Classroom />)

  fireEvent.click(getByText("OPTIONS"));
});