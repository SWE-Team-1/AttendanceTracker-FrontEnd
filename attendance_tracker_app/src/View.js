import React from 'react'
import './View.css'
import { Redirect } from 'react-router-dom'
import CreateCoursePopup from './CreateCoursePopup.js'

class View extends React.Component {
  constructor (props) {
    super(props)
    // Store local variable is state, not needed for now
    this.state = {
      logout: false,
      createCoursePopup: false,
      redirectOption: 'lecture',
      courses: [
        'CS3113',
        'CS2413',
        'CS3413',
        'TME4125',
        'SWE4102'
      ]
    }
    this.par = props.par
    this.courseArray = []
    this.type = 0
    this.userId = 0
    this.userInfo = null
    try {
        this.userInfo = props.par().userInfo
        this.userID = props.par().userInfo.userId
        this.type = props.par().userInfo.type
        this.getCourses(props.par().userInfo)
    } catch (e) {}
    this.closeCreateCoursePopup = this.closeCreateCoursePopup.bind(this)
  }

  getCourses(userInfo) {
    var xhr = new XMLHttpRequest()
    var sup = this
    var userId = userInfo.userId
    var userType = 'student'
    if(userInfo.type == 2) {
        userType = 'professor'
    }
    xhr.onreadystatechange = function() {
        try {
            if(this.status == 200 && this.readyState == 4) {
                var courses
                try {
                    courses = JSON.parse(xhr.response)
                    for(var i = 0; i < courses.length; i++) {
                        var componentTitle = '';
                        for(var j = 0; j < courses[i].components.length; j++) {
                            if(courses[i].components[j].type == 1) {
                                componentTitle = 'Lecture'
                            } else if(courses[i].components[j].type == 2) {
                                componentTitle = 'Lab'
                            } else if(courses[i].components[j].type == 3) {
                                componentTitle = 'Tutorial'
                            }
                            courses[i].components[j].componentTitle = componentTitle
                            courses[i].components[j].courseCode = courses[i].course.code
                        }
                    }
                    console.log(courses)
                } catch (jerr) {
                    console.log(jerr)
                    courses = []
                }
                sup.courseArray = courses;
                sup.forceUpdate()
            }
        } catch (err) {}
    }
    xhr.open('GET', 'http://localhost:8080/course/read/withComponents/' + userType + 'Id/' + userId)
    xhr.send()
  }

  closeCreateCoursePopup () {
    this.setState({ createCoursePopup: !this.state.createCoursePopup })
  }

  openComponent(ele, comp) {
    this.par().setSelectedComponent(comp)
    ele.setState({ redirectOption: 'lecture', login: true })
  }

  render () {
    for(var i = 0; i < this.courseArray.length; i++) {
        this.courseArray[i].sup = this
        for(var j = 0; j < this.courseArray[i].components.length; j++) {
            this.courseArray[i].components[j].sup = this
        }
    }
    return (
      <div className='View'>
        {this.state.createCoursePopup ? <CreateCoursePopup userId={this.userID} parentView={this} closeCreateCoursePopup={this.closeCreateCoursePopup} /> : null}
        <div className='View-Header'>
          <div className='Header-Text'>ATTENDANCE TRACKER </div>
          <div className='Logout'> <button onClick={() => this.setState({ logout: true })}>Logout</button>
            {this.state.logout ? <Redirect to='/login' /> : null}
          </div>
        </div>

        <div className='View-Container'>
          <h5 className='View-Title-Courses'>Your Courses</h5>
          <div className='View-Total-Frame'>
            {this.courseArray.map(courseElement =>
              <div className='View-Courses' key={courseElement.course.code}>
                {this.state.login ? <Redirect to={'/' + courseElement.course.code + '/' + this.state.redirectOption} /> : null}
                <h3 className='View-Courses-Header'>{courseElement.course.code}</h3>
                <div className='View-Courses-Popup'>
                  {courseElement.components.map(component =>
                    <div className='View-Courses-Popup-Option' onClick={() => component.sup.openComponent(this, component)}>{component.componentTitle}</div>
                  )}
                </div>
              </div>
            )}
          </div>
          {this.type == 2 ?
          <div className='View-Area-Button View-Edit-Course'>
            <div onClick={() => this.setState({ createCoursePopup: !this.state.createCoursePopup })} className='View-Edit-Button View-Add-Course'>ADD NEW COURSE</div>
            <div href='' className='View-Edit-Button View-Remove-Course'>REMOVE COURSE</div>
          </div>
          : null}
        </div>
      </div>
    )
  }
}

export default View
