import React from 'react'
import './Classroom.css'
import ClassroomstudentSeatDisplay from './ClassroomstudentSeatDisplay.js'
import ShowOptions from './Options.js'
import { Redirect } from 'react-router-dom'

class Classroom extends React.Component {
  constructor (props) {
    super(props)
    this.userComponent = null

    this.courseCode = ''
    this.componentId = 0
    this.rowCount = 0
    this.colCount = 0
    this.roomName = ''
    this.componentTitle = ''
    this.classroomId = 0
    this.courseId = 0
    this.seats = []
    this.seatPreferences = []
    this.seatStudent = []
    this.selectedSeat = null
    this.userId = null
    this.par = props.par
    this.userInfo = null
    this.userType = 0
    this.selectedSeats = null
    var now = new Date();
    this.fullDaysSinceEpoch = Math.floor(now/8.64e7);
    this.viewDate = new Date()
    this.presentSeats = []

    console.log('This date')
    console.log(new Date())

    try {
        this.userComponent = props.par().userComponent
        this.userInfo = props.par().getUserInformation()
        this.userType = this.userInfo.type
        this.courseCode = this.userComponent.courseCode
        this.componentId = this.userComponent.id
        this.courseId = this.userComponent.courseId
        this.componentTitle = this.userComponent.componentTitle
        this.classroomId = this.userComponent.classroomId
        this.getClassroom(this.componentId)
    } catch (err) {
        this.userComponent = null
    }

    this.state = {
      logout: false,
      back: false,
      user: this.props.user,
      prof: this.props.prof,
      optionsShown: false,
      // row and column number should be fetched from database depends on the classroom
      rowNum: 4,
      colNum: 13,
      // the array contains seat condition
      seatConditions: [],
      // check if the student already selected a seat from this classroom
      isSeatSelected: false,
      // know which seat was been selected, index staring from 0
      seatSelected: null

    }

    this.StudentchangeColor = this.StudentchangeColor.bind(this)
    this.studentSeatAmount = this.studentSeatAmount.bind(this)
  }

  nextDate() {
    this.viewDate.setDate(this.viewDate.getDate() + 1)
    this.updateDate()
  }

  previousDate() {
    this.viewDate.setDate(this.viewDate.getDate() - 1)
    this.updateDate()
  }

  restoreDate() {
    this.viewDate = new Date()
    this.updateDate()
  }

  updateDate() {
    this.forceUpdate()
  }

  getClassroom(componentId) {
    var xhr = new XMLHttpRequest()
    var sup = this
    xhr.onreadystatechange = function() {
        try {
            if(this.status == 200 && this.readyState == 4) {
                var bundle = JSON.parse(xhr.responseText)
                sup.rowCount = bundle.classroom.rows
                sup.colCount = bundle.classroom.columns
                sup.roomName = bundle.classroom.name
                sup.seats = bundle.seats
            }
            sup.displaySeats()
            sup.forceUpdate()
        } catch (err) {}
    }
    xhr.open('GET', 'http://localhost:8080/classroom/read/classroomBundle/componentId/' + componentId)
    xhr.send()
  }

  displaySeats() {
    console.log(this.seats)
    for(var i = 0; i < this.seats.length; i++) {
        var preference = null
        var student = null
        if(this.seats[i].seatPreference != null) {
            preference = this.seats[i].seatPreference.flag
        }
        if(this.seats[i].student != null) {
            student = this.seats[i].student
        }
        this.seatPreferences[i] = preference
        this.seatStudent[i] = student
    }
  }

  // function to handle selecting seat
  StudentchangeColor (id) {

    if (this.state.seatSelected == id) {
      this.setState({ isSeatSelceted: false, seatSelected: null })
    } else {
      this.setState({ isSeatSelceted: true , seatSelected: id })
    } 

    console.log(id)
    console.log('this.state.isSeatSelected', this.state.isSeatSelected)
    console.log('this.state.seatSelected', this.state.seatSelected)
  }

  // function to generate seats with rows and columns based on classroom size stored in the database and information about color

  // in this function, an array contains seat condition is generated
  // 0: available
  // 1: occupied
  // 2: selected
  // Note: only one seat can be selected by each user
  // for simplicity, it is a 1d array
  studentSeatAmount (id) {
    console.log(id)
    const classroomSize = this.state.rowNum * this.state.colNum
    var classroomstudentSeatArr = []
    for (var i = 0; i < classroomSize; i++) {
      // check for the condition, now just push 0 as availble for all
      classroomstudentSeatArr.push(0)
    }
    // testing
    // console.log(classroomstudentSeatArr);
    this.setState({
      seatConditions: classroomstudentSeatArr
    })
  }

  // function to generate id for seats and change the classname for only selected seat
  // done in other file classroomstudentSeatDisplay.js

  // function to add hover information based on seat has been selected by others/ marked as unusable by prof (create hover for this)

  componentDidMount () {
    this.studentSeatAmount()
  }

  toggleOptions = () => {
        this.setState({
        optionsShown: !this.state.optionsShown
   })
    }

  submitRecord(studentId, seatId, reportId) {
    try {
        var xhr = new XMLHttpRequest()
        var sup = this
        xhr.onreadystatechange = function() {
            try {
                if(this.status == 200 && this.readyState == 4) {
                    sup.getClassroom(sup.componentId)
                }
            } catch (err) {}
        }
        xhr.open('POST', 'http://localhost:8080/AttendanceRecord/create/reportId/' + reportId + '/studentId/' + studentId + '/seatId/' + seatId + '/type/0')
        xhr.send()
    } catch (err) {}
  }

  submitAttendance() {
    try {
        var xhr = new XMLHttpRequest()
        var sup = this
        var dayNum = this.fullDaysSinceEpoch
        xhr.onreadystatechange = function() {
            try {
                if(this.status == 200 && this.readyState == 4) {
                    var report = JSON.parse(xhr.response)
                    for(var i = 0; i < sup.selectedSeats.length; i++) {
                        if(sup.selectedSeats[i] == true) {
                            try {
                                var studentId = sup.seats[i].student.id
                                var seatId = sup.seats[i].seat.id
                                sup.submitRecord(studentId, seatId, report.id)
                            } catch (err2) {}
                            sup.selectedSeats[i] = false
                        }
                    }
                    sup.refreshSeats()
                    sup.getClassroom(sup.componentId)
                    alert('Submitted attendance report successfully!')
                }
            } catch (err) {}
        }
        xhr.open('POST', 'http://localhost:8080/AttendanceReport/create/dayNum/' + dayNum + '/componentId/' + this.componentId)
        xhr.send()
    } catch (err) {}
  }

  submitSelection() {
    if(this.userType == 2) {
        this.submitAttendance()
        return
    }
    try {
        var selectedSeat = -1
        for(var i = 0; i < this.selectedSeats.length; i++) {
            if(this.selectedSeats[i] == true) {
                selectedSeat = i;
            }
        }
        if(selectedSeat == -1) {
            return
        }
        var xhr = new XMLHttpRequest()
        var sup = this
        var selectedSeatId = this.seats[selectedSeat].seat.id
        xhr.onreadystatechange = function() {
            try {
                if(this.status == 200 && this.readyState == 4) {
                    sup.getClassroom(sup.componentId)
                    alert('Seat selected successfully!')
                }
            } catch (err) {}
        }
        xhr.open('POST', 'http://localhost:8080/SeatAssignment/create/seatId/' + selectedSeatId +
        '/componentId/' + this.componentId + '/userId/' + this.par().userInfo.userId)
        xhr.send()
    } catch (err) {}
  }

  setSelectedSeat(selectedSeat, view) {
    if(this.selectedSeats == null) {
        this.refreshSeats()
    }
    if(this.userType == 1) {
        var undo = this.selectedSeats[selectedSeat]
        this.refreshSeats()
        if(!undo) {
            this.selectedSeats[selectedSeat] = true;
        }
    } else if(this.userType == 2) {
        this.selectedSeats[selectedSeat] = !this.selectedSeats[selectedSeat]
    }
    view.forceUpdate()
  }

  getSelectedSeats() {
    if(this.selectedSeats == null) {
        this.refreshSeats()
    }
    return this.selectedSeats;
  }

  refreshSeats() {
    this.selectedSeats = []
    for(var i = 0; i < this.rowCount * this.colCount; i++) {
        this.selectedSeats[i] = false;
    }
  }

  addStudent() {
    var studentEmail = prompt('Please enter student email','')
    try {
        var xhr = new XMLHttpRequest()
        var sup = this
        xhr.onreadystatechange = function() {
            try {
                if(this.status == 200 && this.readyState == 4) {
                    sup.getClassroom(sup.componentId)
                    alert('Student enrolled successfully!')
                }
            } catch (err) {}
        }
        xhr.open('POST', 'http://localhost:8080/enrollment/create/studentEmail/' + studentEmail + '/courseId/' + this.courseId)
        xhr.send()
    } catch (err) {}
  }

  render () {
    // check whether the login is a student or a professor   NOT YET IMPLEKMENTED

    // read and store data from database NOT YET IMPLEKMENTED

    // set up user, rowNum and colNum    GENERATING FIXED DATA FOR NOW

    // set the seat condition array first

    // Get current date to display
    var date = this.viewDate
    var month = date.getUTCMonth() + 1
    var day = date.getUTCDate()
    var year = date.getUTCFullYear()
    var dateString = day + '/' + month + '/' + year
    const sup = this
    return (
      <div className='Classroom'>
        {this.state.optionsShown ? <ShowOptions closeOptions={this.toggleOptions} /> : null}
        <div>
          <div className='Header-Text'>ATTENDANCE TRACKER</div>
          <div className='Logout'> <button onClick={() => this.setState({ logout: true })}>Logout</button>
            {this.state.logout ? <Redirect to='/login' /> : null}
          </div>
        </div>
        <div className='Classroom-Container'>
          <div className='Classroom-Banner'>
            {this.state.back ? <Redirect to='/' /> : null}
            <div className='Classroom-Banner-Return' onClick={() => this.setState({ back: true })}>
              <button>&lt;</button>
              <h1>
                {this.courseCode + ' - ' + this.componentTitle}
              </h1>
            </div>
            {this.userType == 2 ?
                <h2 className="Classroom-Time-Plus" onClick={() => this.nextDate()}>+</h2>
            : null}
            <h2 className='Classroom-Time'>{dateString}</h2>
            {this.userType == 2 ?
                <h2 className="Classroom-Time-Minus" onClick={() => this.previousDate()}>-</h2>
            : null}
          </div>
          <br />
          <div className='Classroom-Seat'>
            <div className='Classroom-seat-place'>
              {/* <div id = '1' className={studentSeatConditions} onClick={() => this.StudentchangeColor(this.id)}>1</div> */}
              {/* <div className={`Classroom-Seat-Single  ${this.state.available ? "Classroom-Seat-Available-Grid" : "Classroom-Seat-Selected-Grid "}`} onClick={this.StudentchangeColor}>2</div> */}
              <ClassroomstudentSeatDisplay
                rowNum={this.rowCount}
                colNum={this.colCount}
                seatSelected={this.state.seatSelected}
                seatConditions={this.state.seatConditions}
                StudentchangeColor={this.StudentchangeColor}
                seatStudent={this.seatStudent}
                seatPreference={this.seatPreferences}
                sup={() => this}
              />
              
            </div>
            {this.userType == 1 ?
                <div className='Classroom-Seat-Choice'>
                  <div className='Classroom-Seat-Choice-Selected'>
                    <span className='Classroom-Seat-Grid Classroom-Seat-Selected-Grid' />
                    <h4>Selected Seat</h4>
                  </div>
                  <div className='Classroom-Seat-Choice-Available'>
                    <span className='Classroom-Seat-Grid Classroom-Seat-Available-Grid' />
                    <h4>Available</h4>
                  </div>
                  <div className='Classroom-Seat-Choice-Assigned'>
                    <span className='Classroom-Seat-Grid Classroom-Seat-Assigned-Grid' />
                    <h4>Assigned</h4>
                  </div>
                  <div className='Classroom-Seat-Preferred'>
                    <span className='Classroom-Seat-Grid Classroom-Seat-Preferred-Grid' />
                    <h4>Preferred</h4>
                  </div>
                  <div className='Classroom-Seat-Unpreferred'>
                    <span className='Classroom-Seat-Grid Classroom-Seat-Unpreferred-Grid' />
                    <h4>Unpreferred</h4>
                  </div>
                </div> :
                <div className='Classroom-Seat-Choice'>
                  <div className='Classroom-Seat-Choice-Occupied'>
                    <span className='Classroom-Seat-Grid Classroom-Seat-Occupied-Grid' />
                    <h4>Present</h4>
                  </div>
                  <div className='Classroom-Seat-Choice-Assigned'>
                    <span className='Classroom-Seat-Grid Classroom-Seat-Assigned-Grid' />
                    <h4>Assigned</h4>
                  </div>
                  <div className='Classroom-Seat-Preferred'>
                    <span className='Classroom-Seat-Grid Classroom-Seat-Preferred-Grid' />
                    <h4>Preferred</h4>
                  </div>
                  <div className='Classroom-Seat-Unpreferred'>
                    <span className='Classroom-Seat-Grid Classroom-Seat-Unpreferred-Grid' />
                    <h4>Unpreferred</h4>
                  </div>
                </div>
          }
          </div>
          <div className='Classroom-Button clearfix'>
            <h4 className='Classroom-location'>{this.roomName}</h4>
            <div className='Classroom-Edit-Button Classroom-Submit-Button' onClick={() => sup.submitSelection()}>SUBMIT</div>
            {this.userType == 2 ?
                <div className='Classroom-Edit-Button Classroom-Classlist-Button' onClick={() => sup.addStudent()}>ADD STUDENT</div> : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Classroom
