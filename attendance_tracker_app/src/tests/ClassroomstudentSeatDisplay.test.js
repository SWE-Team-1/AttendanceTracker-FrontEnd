import React from 'react'
import ReactDOM from 'react-dom';
import Classroom from '../js/ClassroomstudentSeatDisplay.js'
import { render, fireEvent } from '@testing-library/react'


test('renders without crashing', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Classroom />, root);
});