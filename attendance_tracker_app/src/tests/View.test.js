import React from 'react'
import View from '../js/View.js'
import { render, fireEvent } from '@testing-library/react'
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";


test('renders without crashing', () => {
  const { getByText } = render(<View />);
  getByText("ATTENDANCE TRACKER");
});

test("logout", () => {
  const { getByText } = render(<View />);
   fireEvent.click(getByText("Logout"));
});

test("open window to add new course", () => {
  const { getByText } = render(<View />);
  fireEvent.click(getByText("ADD NEW COURSE"));

  //test that modal has appeared
  getByText("Add a Course");
});

test("remove course", () => {
  const { getByText } = render(<View />);
  fireEvent.click(getByText("REMOVE COURSE"));
});