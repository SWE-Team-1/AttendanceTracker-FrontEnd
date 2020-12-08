import React from 'react'
import '../css/Classroom.css'
import ClassroomstudentSeatDisplay from './ClassroomstudentSeatDisplay.js'
import ShowOptions from './Options.js'
import { Redirect } from 'react-router-dom'

class Classroom extends React.Component {
  constructor (props) {
    super(props)

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

  render () {
    // check whether the login is a student or a professor   NOT YET IMPLEKMENTED

    // read and store data from database NOT YET IMPLEKMENTED

    // set up user, rowNum and colNum    GENERATING FIXED DATA FOR NOW

    // set the seat condition array first

    // Get current date to display
    const current = new Date()
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`
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
                SWE 4103
              </h1>
            </div>
            <h2 className='Classroom-Time'>{date}</h2>
          </div>
          <br />
          <div className='Classroom-Seat'>
            <div className='Classroom-seat-place'>
              {/* <div id = '1' className={studentSeatConditions} onClick={() => this.StudentchangeColor(this.id)}>1</div> */}
              {/* <div className={`Classroom-Seat-Single  ${this.state.available ? "Classroom-Seat-Available-Grid" : "Classroom-Seat-Selected-Grid "}`} onClick={this.StudentchangeColor}>2</div> */}
              <ClassroomstudentSeatDisplay
                rowNum={this.state.rowNum}
                colNum={this.state.colNum}
                seatSelected={this.state.seatSelected}
                seatConditions={this.state.seatConditions}
                StudentchangeColor={this.StudentchangeColor}
              />
              
            </div>
            <div className='Classroom-Seat-Choice'>
              <div className='Classroom-Seat-Choice-Selected'>
                <span className='Classroom-Seat-Grid Classroom-Seat-Selected-Grid' />
                <h4>Selected Seat</h4>
              </div>
              <div className='Classroom-Seat-Choice-Available'>
                <span className='Classroom-Seat-Grid Classroom-Seat-Available-Grid' />
                <h4>Available</h4>
              </div>
              <div className='Classroom-Seat-Choice-Occupied'>
                <span className='Classroom-Seat-Grid Classroom-Seat-Occupied-Grid' />
                <h4>Occupied</h4>
              </div>
            </div>
          </div>
          <div className='Classroom-Button clearfix'>
            <h4 className='Classroom-location'>GC112</h4>
            <div className='Classroom-Edit-Button Classroom-Submit-Button' onClick={() => this.setState({ back: true })}>SUBMIT</div>
            <div onClick={this.toggleOptions}>
                    <a href='#' className='Classroom-Edit-Button Classroom-Options-Button'>OPTIONS</a>
                  </div>
                    {this.state.seen ? <ShowOptions toggle={this.toggleOptions} /> : null}    
          </div>
        </div>
      </div>
    )
  }
}

export default Classroom
