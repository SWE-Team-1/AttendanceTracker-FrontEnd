import React from 'react'
import './View.css'
import { Redirect } from 'react-router-dom'

class View extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logout : false,
      redirectOption: 'lecture',
      courses: [
        'CS3113',
        'CS2413',
        'CS3413',
        'TME4125',
        'SWE4102'
      ]
    }
  }

  render () {
    return (
      <div className='View'>
        <div classname='View-Header'>
          <div className='Header-Text'>ATTENDANCE TRACKER</div>
          <div className='Logout'> <button onClick={() => this.setState({ logout: true })}>Logout</button>
            {this.state.logout ? <Redirect to='/login' /> : null}
          </div>
        </div>

        <div className='View-Container'>
          <h5 className='View-Title-Courses'>Your Courses</h5>
          <div className='View-Total-Frame'>
            {this.state.courses.map(course =>
              <div className='View-Courses' key={course}>
                {this.state.login ? <Redirect to={'/' + course + '/' + this.state.redirectOption} /> : null}
                <h3 className='Header-Text'>{course}</h3>
                  <button onClick={() => this.setState({ redirectOption: 'lecture', login: true })}>Lecture</button>
                  <button onClick={() => this.setState({ redirectOption: 'lab', login: true })}>Lab</button>
                  <button onClick={() => this.setState({ redirectOption: 'tutorial', login: true })}>Tutorial</button>
              </div>
            )}
          </div>            
          
          <div className='View-Area-Button View-Edit-Course'>
            <a href='#' className='View-Edit-Button View-Add-Course'>ADD NEW COURSE</a>
            <a href='#' className='View-Edit-Button View-Remove-Course'>REMOVE COURSE</a>
          </div>
        </div>
        </div>
    )
  }
}

export default View
