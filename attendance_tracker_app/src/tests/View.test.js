import React from 'react'
import View from '../js/View.js'
import { render, fireEvent } from '@testing-library/react'


test('renders without crashing', () => {
  const { getByText } = render(<View />);
  getByText("ATTENDANCE TRACKER");
});