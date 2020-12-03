import React from 'react'
import './Classroom.css'

class ClassroomstudentSeatDisplay extends React.Component {
  render () {
    // array index
    var temp = 0
    var condition
    var myBlock = []
    var colourClasses = []
    // var setID;
    // set for each row
    console.log(this.props)
    this.props.sup().setSelectedSeat(this.props.seatSelected)
    for (var i = 0; i < this.props.rowNum; i++) {
      // want to make each row inside in a div with className 'Classroom-seat-row'

      // set for each column
      for (var j = 0; j < this.props.colNum; j++) {
        // setID = 'seat' + temp;
        myBlock.push(<div id={temp} ></div>)
        var colourClass = 'Classroom-Seat-Single Classroom-Seat-Available-Grid'
        if(this.props.seatStudent[temp] != null) {
            colourClass = 'Classroom-Seat-Single Classroom-Seat-Occupied-Grid'
        } else if(this.props.seatPreference[temp] != null) {
            if(this.props.seatPreference[temp] == 1) {
                colourClass = 'Classroom-Seat-Single Classroom-Seat-Preferred-Grid'
            } else {
                colourClass = 'Classroom-Seat-Single Classroom-Seat-Unpreferred-Grid'
            }
        }
        colourClasses[temp] = colourClass
        temp++
      }
      myBlock.push(<div id='rowEnd' />)
    }
    colourClasses[this.props.seatSelected] = 'Classroom-Seat-Single Classroom-Seat-Selected-Grid'
    console.log('!!!! this.props.seatSelected', this.props.seatSelected)
    return (
      myBlock.map(item =>
        <div key={item.id}> {item.props.id === 'rowEnd'
          ? <div className='rowEnd' />
          : <div
            key={item.props.id}
            className={colourClasses[item.props.id]}
            onClick={() => this.props.StudentchangeColor(item.props.id)}
          />}
        </div>)
    )
  }
}

export default ClassroomstudentSeatDisplay
