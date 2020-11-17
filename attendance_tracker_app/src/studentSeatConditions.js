import React from 'react'
import './Classroom.css'
export const studentSeatConditions = (props) => {
    // available: "Classroom-Seat-Available-Grid",
    // selected: "Classroom-Seat-Selected-Grid"
    return (props == 0)? "Classroom-Seat-Single Classroom-Seat-Available-Grid" : "Classroom-Seat-Single Classroom-Seat-Selected-Grid";
  };

const studentSeatNumber = []
export const studentSeatAmount = (studentSeatAmount) => {
    for (var i =1; i < studentSeatAmount+1; i++)
    {
        //1 for selected
        studentSeatNumber[i] = 0;
    }
    return studentSeatNumber;
}