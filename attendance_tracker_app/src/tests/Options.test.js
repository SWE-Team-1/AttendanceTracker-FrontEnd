import React from 'react'
import Options from '../js/Options.js'
import { render, fireEvent } from '@testing-library/react'


test('renders without crashing', () => {
  const { getByText } = render(<Options />);
  getByText("Options");
});