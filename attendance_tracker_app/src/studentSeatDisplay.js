import React from 'react'
import './Classroom.css'

function studentSeatDisplay(props){
    var totalSeat;
    for (var i =1; i < props.studentSeatAmount+1; i++)
    {
        totalSeat += "<div className='Classroom-Seat-Single Classroom-Seat-Available-Grid'></div>";
    }
    return totalSeat;
}

export default studentSeatDisplay