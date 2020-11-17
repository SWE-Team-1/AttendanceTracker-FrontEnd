import React from 'react'
import './Classroom.css'
import studentSeatDisplay from './studentSeatDisplay.js'
import { Redirect } from 'react-router-dom'

class Classroom extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      logout: false,
      available: true
    }
 
    this.StudentchangeColor = this.StudentchangeColor.bind(this)
  }
  StudentchangeColor(props){

  }
  
    
  //function to generate seats with rows and columns based on classroom size stored in the database and information about color

  //function to generate id for seats and change the classname for only selected seat

  //function to add hover information based on seat has been selected by others/ marked as unusable by prof (create hover for this)

  // to do list: 
  // 1. check login status if prof: show prof page; if student: show normal page (the current view is for student)
  // 2. check user name
  // 3. send information to database after the seat is selected by this user
  render () {
    return (
      <div className='Classroom'>
          <div>
              <div className='Header-Text'>ATTENDANCE TRACKER ({this.props.prof ? 'Professor' : 'Student'})</div>
              <div className='Logout'> <button onClick={() => this.setState({ logout: true })}>Logout</button>
              {this.state.logout ? <Redirect to='/login' /> : null}
              </div>
          </div>
          <div className='Classroom-Container'>
              <div className='Classroom-Banner'>
                  <button>&lt;</button>
                  <h1>
                      SWE 4103
                  </h1>
                  <h2 className='Classroom-Time'>Tuesday Sep 12, 2017</h2>
              </div>
              <br />
              <div className='Classroom-Seat'>
                  <div className='Classroom-seat-place'>
                      {/* <div id = '1' className={studentSeatConditions} onClick={() => this.StudentchangeColor(this.id)}>1</div> */}
                      <div className={`Classroom-Seat-Single  ${this.state.available ? "Classroom-Seat-Available-Grid" : "Classroom-Seat-Selected-Grid "}`} onClick={this.StudentchangeColor}>2</div>
                      <div className={`Classroom-Seat-Single  ${this.state.available ? "Classroom-Seat-Available-Grid" : "Classroom-Seat-Selected-Grid "}`} onClick={this.StudentchangeColor}>3</div>
                      <div className={`Classroom-Seat-Single  ${this.state.available ? "Classroom-Seat-Available-Grid" : "Classroom-Seat-Selected-Grid "}`} onClick={this.StudentchangeColor}>4</div>
                      <div className={`Classroom-Seat-Single  ${this.state.available ? "Classroom-Seat-Available-Grid" : "Classroom-Seat-Selected-Grid "}`} onClick={this.StudentchangeColor}>5</div>
                      <div className={`Classroom-Seat-Single  ${this.state.available ? "Classroom-Seat-Available-Grid" : "Classroom-Seat-Selected-Grid "}`} onClick={this.StudentchangeColor}>6</div>
                      <div className={`Classroom-Seat-Single  ${this.state.available ? "Classroom-Seat-Available-Grid" : "Classroom-Seat-Selected-Grid "}`} onClick={this.StudentchangeColor}>7</div>
                      <div className={`Classroom-Seat-Single  ${this.state.available ? "Classroom-Seat-Available-Grid" : "Classroom-Seat-Selected-Grid "}`} onClick={this.StudentchangeColor}>8</div>
                      <studentSeatDisplay studentSeatAmount="50" />
                  </div>
                  <div className='Classroom-Seat-Choice'>
                      <div className='Classroom-Seat-Choice-Selected'>
                          <span className='Classroom-Seat-Grid Classroom-Seat-Selected-Grid'></span>
                          <h4>Selected Seat</h4>
                      </div>
                      <div className='Classroom-Seat-Choice-Available'>
                          <span className='Classroom-Seat-Grid Classroom-Seat-Available-Grid'></span>
                          <h4>Available</h4>
                      </div>
                      <div className='Classroom-Seat-Choice-Occupied'>
                          <span className='Classroom-Seat-Grid Classroom-Seat-Occupied-Grid'></span>
                          <h4>Occupied</h4>
                      </div>
                  </div>
              </div>
              <div className='Classroom-Button clearfix'>
                  <h4 className='Classroom-location'>GC112</h4>
                  <a href='#' className='Classroom-Edit-Button Classroom-Submit-Button'>SUBMIT</a>
                  <a href='#' className='Classroom-Edit-Button Classroom-Options-Button'>OPTIONS</a>
              </div>
          </div>
      </div>
    )
  }
}

export default Classroom
