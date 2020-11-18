import React from 'react'
import './Classroom.css'


function ClassroomstudentSeatDisplay(props){

    //array index
    //console.log(props.rowNum + '    ' + props.colNum);
    var temp = 0;
    var condition;
    var myBlock = [];
    //var setID;
    //set for each row
    for (var i =0; i < props.rowNum;i++)
    {
        //want to make each row inside in a div with className 'Classroom-seat-row'
        //myBlock.push(<div className='Classroom-seat-row'>)

        //set for each column
        for (var j =0; j < props.colNum;j++)
        {
            if (props.seatConditions[temp] == 0)
            {
                //available
                condition = 'Classroom-Seat-Single Classroom-Seat-Available-Grid';
            }
            else if (props.seatConditions[temp] == 1)
            {
                //occupied
                condition = 'Classroom-Seat-Single Classroom-Seat-Occupied-Grid';
            }
            else{
                //selected
                condition = 'Classroom-Seat-Single Classroom-Seat-Selected-Grid';
            }
            //setID = 'seat' + temp;
            console.log(temp);
            myBlock.push(<div id={temp} className={condition} onClick={() => this.StudentchangeColor()}></div>);
            temp++;
        }
        //myBlock.push(</div>)
    }
    return myBlock
}

export default ClassroomstudentSeatDisplay