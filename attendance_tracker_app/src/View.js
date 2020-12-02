import React from 'react'
import './View.css'
import { Redirect, useLocation } from 'react-router-dom'
import CreateCoursePopup from './CreateCoursePopup.js'
import ErrorPopup from './ErrorPopup.js'

class View extends React.Component {
  constructor (props) {
    super(props)
    // Store local variable is state, not needed for now
    this.state = {
      logout: false,
      createCoursePopup: false,
      errorPopup: false,
      redirectOption: 'lecture',
      courses: [
        'CS3113',
        'CS2413',
        'CS3413',
        'TME4125',
        'SWE4102'
      ]
    }
    this.closeCreateCoursePopup = this.closeCreateCoursePopup.bind(this)
    this.exitCreateCoursePopup = this.exitCreateCoursePopup.bind(this)
    this.exitErrorPopUp = this.exitErrorPopup.bind(this)
  }

  exitCreateCoursePopup(){

    this.setState({ createCoursePopup: !this.state.createCoursePopup })
  }

  closeCreateCoursePopup(){

    var xhr = new XMLHttpRequest()

    var profId = useLocation().split('/')[-1]
    var courseName = document.getElementById('courseName').value
    var courseCode = document.getElementById('courseCode').value

    xhr.addEventListener('load', () => {

      var output = JSON.parse(xhr.responseText)

      if(output.professorId){
        this.setState({ createCoursePopup: !this.state.createCoursePopup }) 
      }else{
        this.setState({ errorPopup: !this.state.errorPopup })
      }
    })

    xhr.open('POST', 'http://localhost:8080/course/create/professorId/'+ profId + '/courseName/' + courseName + '/courseCode/' + courseCode)
    xhr.send()

  }

  exitErrorPopup(){

    this.setState({ errorPopup: !this.state.errorPopup })
  }

  render () {
    return (
      <div className='View'>
        {this.state.createCoursePopup ? <CreateCoursePopup exitCreateCoursePopup={this.exitCreateCoursePopup} /> : null}
        {this.state.errorPopup ? <ErrorPopup exitErrorPopup={this.exitErrorPopup} /> : null}
        <div className='View-Header'>
          <div className='Header-Text'>ATTENDANCE TRACKER </div>
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
                <h3 className='View-Courses-Header'>{course}</h3>
                <div className='View-Courses-Popup'>
                  <div className='View-Courses-Popup-Option' onClick={() => this.setState({ redirectOption: 'lecture', login: true })}>Lecture</div>
                  <div className='View-Courses-Popup-Option' onClick={() => this.setState({ redirectOption: 'lab', login: true })}>Lab</div>
                  <div className='View-Courses-Popup-Option' onClick={() => this.setState({ redirectOption: 'tutorial', login: true })}>Tutorial</div>
                </div>
              </div>
            )}
          </div>
          <div className='View-Area-Button View-Edit-Course'>
            <div onClick={() => this.setState({ createCoursePopup: !this.state.createCoursePopup })} className='View-Edit-Button View-Add-Course'>ADD NEW COURSE</div>
            <div href='' className='View-Edit-Button View-Remove-Course'>REMOVE COURSE</div>
          </div>
        </div>
      </div>
    )
  }
}

export default View
