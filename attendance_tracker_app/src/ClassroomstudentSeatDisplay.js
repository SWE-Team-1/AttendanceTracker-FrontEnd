import React from 'react'
import './Classroom.css'

class ClassroomstudentSeatDisplay extends React.Component {
  render () {
    // array index
    var temp = 0
    var condition
    var myBlock = []
    // var setID;
    // set for each row
    for (var i = 0; i < this.props.rowNum; i++) {
      // want to make each row inside in a div with className 'Classroom-seat-row'

      // set for each column
      for (var j = 0; j < this.props.colNum; j++) {
        if (this.props.seatConditions[temp] === 0) {
          // available
          condition = 'Classroom-Seat-Single Classroom-Seat-Available-Grid'
        } else if (this.props.seatConditions[temp] === 1) {
          // occupied
          condition = 'Classroom-Seat-Single Classroom-Seat-Occupied-Grid'
        } else if(this.props.seatConditions[temp] === 2){
          //unusable
          condition = 'Classroom-Seat-Single Classroom-Seat-Unusable-Grid'
        }
        else {
          // selected
          condition = 'Classroom-Seat-Single Classroom-Seat-Selected-Grid'
        }
        // setID = 'seat' + temp;
        myBlock.push(<div id={temp} />)
        temp++
      }
      myBlock.push(<div id='rowEnd' />)
    }
    console.log('!!!! this.props.seatSelected', this.props.seatSelected)
    return (
      myBlock.map(item =>
        <div key={item.id}> {item.props.id === 'rowEnd'
          ? <div className='rowEnd' />
          : <div
            key={item.props.id}
            className={this.props.seatSelected === item.props.id
              ? 'Classroom-Seat-Single Classroom-Seat-Selected-Grid'
              : 'Classroom-Seat-Single Classroom-Seat-Available-Grid'}
            onClick={() => this.props.StudentchangeColor(item.props.id)}
          />}
        </div>)
    )
  }
}

export default ClassroomstudentSeatDisplay
