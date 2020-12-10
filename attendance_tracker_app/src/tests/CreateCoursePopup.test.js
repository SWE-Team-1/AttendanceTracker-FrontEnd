import React from "react";
import CreateCourse from "../js/CreateCoursePopup.js";
import { render, fireEvent } from "@testing-library/react";

test("renders without crashing", () => {
  const { getByText } = render(<CreateCourse />);
  getByText("Add a Course");
});

test("enters course information", async () => {
  const { getByText } = render(<CreateCourse />);

  // fireEvent.change(getByLabelText("Class Name: "), {
  //   target: { value: "Course123" },
  // });
  // fireEvent.change(getByLabelText("Class List: "), {
  //   target: { value: "student 1, student 2, student 3" },
  // });

  // fireEvent.click(getByText("SAVE"));
});