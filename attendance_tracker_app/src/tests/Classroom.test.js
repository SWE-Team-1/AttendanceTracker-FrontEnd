import React from 'react'
import Classroom from '../js/Classroom.js'
import { render, fireEvent } from '@testing-library/react'


test('renders without crashing', () => {
  const { getByText } = render(<Classroom />);
  getByText("ATTENDANCE TRACKER");
});


test("open options window", async () => {
  const { getByText } = render(<Classroom />);

  fireEvent.click(getByText("OPTIONS"));
});