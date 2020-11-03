import React from 'react'
import './Classroom.css'
import { Redirect } from 'react-router-dom'

class Classroom extends React.Component {
  constructor (props) {
    super(props)
    // Store local variable is state, not needed for now
    this.state = {
      logout: false
    }
  }

  render () {
    return (
      <div className='Classroom'>
          <div className='Classroom-Banner'>
              <button>&lt;</button>
              <h1>
                  SWE 4103
              </h1>
              <h2 className='Classroom-Time'>Tuesday Sep 12, 2017</h2>
          </div>
          <div ClassName='Classroom-Seat'>
              <div class='Classroom-seat-place'>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
                  <div ClassName='Classroom-Seat-Single'></div>
              </div>
              <div ClassName='Classroom-Seat-Choice'>
                  <div ClassName='Classroom-Seat-Choice-Selected'>
                      <span class='Classroom-Seat-Grid Classroom-Seat-Selected-Grid'></span>
                      <h4>Selected Seat</h4>
                  </div>
                  <div ClassName='Classroom-Seat-Choice-Available'>
                      <span class='Classroom-Seat-Grid Classroom-Seat-Available-Grid'></span>
                      <h4>Available</h4>
                  </div>
                  <div ClassName='Classroom-Seat-Choice-Occupied'>
                      <span class='Classroom-Seat-Grid Classroom-Seat-Occupied-Grid'></span>
                      <h4>Occupied</h4>
                  </div>
              </div>
          </div>
          <div ClassName='Classroom-Button clearfix'>
              <h4 ClassName='Classroom-location'>GC112</h4>
              <a href='#' className='Classroom-Edit-Button Classroom-Submit-Button'>SUBMIT</a>
              <a href='#' className='Classroom-Edit-Button Classroom-Options-Button'>OPTIONS</a>
          </div>
      </div>
    )
  }
}

export default Classroom
