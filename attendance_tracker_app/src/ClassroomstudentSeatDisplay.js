import React from 'react'
import './Classroom.css'

class ClassroomstudentSeatDisplay extends React.Component {

  render () {
    // array index
    var temp = 0
    var condition
    var myBlock = []
    var colourClasses = []
    var sup = this.props.sup();
    var par = this

    // var setID;
    // set for each row
    for (var i = 0; i < this.props.rowNum; i++) {
      // want to make each row inside in a div with className 'Classroom-seat-row'

      // set for each column
      for (var j = 0; j < this.props.colNum; j++) {
        // setID = 'seat' + temp;
        var studentName = ''
        if(this.props.seatStudent[temp] != null) {
            studentName = this.props.seatStudent[temp].name
        }
        myBlock.push(<div id={temp} student={studentName} ></div>)
        var colourClass = 'Classroom-Seat-Single Classroom-Seat-Available-Grid'
        if(this.props.seatStudent[temp] != null) {
            colourClass = 'Classroom-Seat-Single Classroom-Seat-Assigned-Grid'
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
    var selectedSeats = sup.getSelectedSeats()
    console.log('Selected seats')
    console.log(this.props.rowNum * this.props.colNum)
    console.log(selectedSeats)
    for(var i = 0; i < this.props.rowNum * this.props.colNum; i++) {
        if(selectedSeats[i] == true) {
            colourClasses[i] = 'Classroom-Seat-Single Classroom-Seat-Selected-Grid'
        }
    }
    colourClasses[this.props.seatSelected] = 'Classroom-Seat-Single Classroom-Seat-Selected-Grid'
    console.log('!!!! this.props.seatSelected', this.props.seatSelected)
    return (
      myBlock.map(item =>
        <div key={item.id}> {item.props.id === 'rowEnd'
          ? <div className='rowEnd' data-toggle='tooltip' title={item.props.student}/>
          : <div
            key={item.props.id}
            className={colourClasses[item.props.id]}
            onClick={() => sup.setSelectedSeat(item.props.id, par)}
            data-toggle='tooltip' title={item.props.student}/>}
        </div>)
    )
  }
}

export default ClassroomstudentSeatDisplay
