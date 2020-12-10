import React from 'react'
import './CreateCoursePopup.css'

class CreateCoursePopup extends React.Component {
  constructor (props) {
    super(props)
    // Store local variable is state, not needed for now
    this.state = {
      temp: false
    }
    this.parentView = props.parentView
    this.classrooms = []
    this.selectedClassLocation = 'none'
    this.selectedClassLocationId = 0
    this.selectedClassLayout = 'Default'
    this.selectedClassLayoutId = 0
    this.classLayouts = []
    this.selectedLabLocation = 'none'
    this.selectedLabLocationId = 0
    this.selectedLabLayout = 'Default'
    this.selectedLabLayoutId = 0;
    this.labLayouts = []
    this.selectedTutorialLocation = 'none'
    this.selectedTutorialLocationId = 0
    this.selectedTutorialLayout = 'Default'
    this.selectedTutorialLayoutId = 0
    this.tutorialLayouts = []
    this.userID = props.userId
    this.getClassrooms(this)
  }

  getClassrooms(sup) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        try {
            if(this.status == 200 && this.readyState == 4) {
                sup.classrooms = JSON.parse(xhr.response)
                sup.forceUpdate()
            }
        } catch (err) {}
    }
    xhr.open('GET', 'http://localhost:8080/classrooms/all')
    xhr.send()
  }

  selectLecture(room) {
    this.selectedClassLocation = room
    var roomId = 0
    for(var i = 0; i < this.classrooms.length; i++) {
        if(this.classrooms[i].name == room) {
            roomId = this.classrooms[i].id
        }
    }
    this.selectedClassLocationId = roomId
    var xhr = new XMLHttpRequest()
    var sup = this
    xhr.onreadystatechange = function() {
        sup.classLayouts = []
        try {
            if(this.status == 200 && this.readyState == 4) {
                sup.classLayouts = JSON.parse(xhr.response)
            }
        } catch (err) {}
        sup.forceUpdate()
    }
    xhr.open('GET', 'http://localhost:8080/classroomLayout/read/classroomId/' + roomId)
    xhr.send()
  }

  selectLectureLayout(room) {
    console.log(room)
    this.selectedClassLayout = room
    var roomId = 0
    for(var i = 0; i < this.classLayouts.length; i++) {
        if(this.classLayouts[i].name == room) {
            roomId = this.classLayouts[i].id
        }
    }
    this.selectedClassLayoutId = roomId
    this.forceUpdate()
  }

  selectLab(room) {
    this.selectedLabLocation = room
    var roomId = 0
    for(var i = 0; i < this.classrooms.length; i++) {
        if(this.classrooms[i].name == room) {
            roomId = this.classrooms[i].id
        }
    }
    this.selectedLabLocationId = roomId
    var xhr = new XMLHttpRequest()
    var sup = this
    xhr.onreadystatechange = function() {
        sup.labLayouts = []
        try {
            if(this.status == 200 && this.readyState == 4) {
                sup.labLayouts = JSON.parse(xhr.response)
            }
        } catch (err) {}
        sup.forceUpdate()
    }
    xhr.open('GET', 'http://localhost:8080/classroomLayout/read/classroomId/' + roomId)
    xhr.send()
  }

  selectLabLayout(room) {
    console.log(room)
    this.selectedLabLayout = room
    var roomId = 0
    for(var i = 0; i < this.labLayouts.length; i++) {
        if(this.labLayouts[i].name == room) {
            roomId = this.labLayouts[i].id
        }
    }
    this.selectedLabLayoutId = roomId
    this.forceUpdate()
  }

  selectTutorial(room) {
    this.selectedTutorialLocation = room
    var roomId = 0
    for(var i = 0; i < this.classrooms.length; i++) {
        if(this.classrooms[i].name == room) {
            roomId = this.classrooms[i].id
        }
    }
    this.selectedTutorialLocationId = roomId
    var xhr = new XMLHttpRequest()
    var sup = this
    xhr.onreadystatechange = function() {
        sup.tutorialLayouts = []
        try {
            if(this.status == 200 && this.readyState == 4) {
                sup.tutorialLayouts = JSON.parse(xhr.response)
            }
        } catch (err) {}
        sup.forceUpdate()
    }
    xhr.open('GET', 'http://localhost:8080/classroomLayout/read/classroomId/' + roomId)
    xhr.send()
  }

  selectTutorialLayout(room) {
    this.selectedTutorialLayout = room
    var roomId = 0
    console.log('Tutorial layouts:')
    for(var i = 0; i < this.tutorialLayouts.length; i++) {
        console.log('Room:')
        console.log(room)
        console.log('Name:')
        console.log(this.tutorialLayouts[i].name)
        if(this.tutorialLayouts[i].name == room) {
            roomId = this.tutorialLayouts[i].id
        }
    }
    this.selectedTutorialLayoutId = roomId
    console.log(this.selectedTutorialLayoutId)
    this.forceUpdate()
  }

  submitCourse() {
    console.log(this)
    var xhr = new XMLHttpRequest()
    var professorId = this.userID
    var courseName = document.getElementById('classNameInput').value;
    var courseCode = document.getElementById('classNameInput').value;
    var courseId = 0
    var students = document.getElementById('classListInput').value
    console.log(students)
    var sup = this
    xhr.onreadystatechange = function() {
        try {
            if(this.status == 200 && this.readyState == 4) {
                courseId = JSON.parse(xhr.response).id
                if(sup.selectedClassLocationId != 0) {
                    sup.insertComponent(courseId, 1, sup.selectedClassLocationId, sup.selectedClassLayoutId)
                }
                if(sup.selectedLabLocationId != 0) {
                    sup.insertComponent(courseId, 2, sup.selectedLabLocationId, sup.selectedLabLayoutId)
                }
                if(sup.selectedTutorialLocationId != 0) {
                    sup.insertComponent(courseId, 3, sup.selectedTutorialLocationId, sup.selectedTutorialLayoutId)
                }
                var studentArr = students.split(',')
                for(var i = 0; i < studentArr.length; i++) {
                    sup.enrollAll(studentArr[i], courseId)
                    sup.props.closeCreateCoursePopup()
                    sup.parentView.getCourses(sup.parentView.userInfo)
                    alert("Created course successfully!")
                }
            }
        } catch (err) {}
    }
    xhr.open('POST', 'http://localhost:8080/course/create/professorId/' + professorId + '/courseName/' + courseName + '/courseCode/' + courseCode)
    xhr.send()
  }

  enrollAll(student, courseId) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:8080/enrollment/create/studentEmail/' + student + '/courseId/' + courseId)
    xhr.send()
  }

  insertComponent(courseId, type, location, layout) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:8080/component/create/courseId/' + courseId + '/type/' + type + '/classroomId/' + location + '/classroomLayoutId/' + layout)
    xhr.send()
  }

  render () {
    var sup = this
    return (
      <div>
        <div className='Popup-Container' onClick={() => this.props.closeCreateCoursePopup()} />
        <div className='Popup'>
          <div className='Popup-Header'><h3>Add a Course</h3></div>
          <div className='Popup-Options'>
            <div className='Popup-Options-Option'><p>Class Name: </p><input id='classNameInput'/></div>
            <br/>
            <div className='Popup-Options-Option'><p>Class Location: </p>
              <select className='Popup-Options-Option-Select' value={this.selectedClassLocation}>
                <option value='none' onClick={() => sup.selectLecture('none')}>No Lecture</option>
                {this.classrooms.map(classroom =>
                    <option value={classroom.name} onClick={() => sup.selectLecture(classroom.name)}>{classroom.name}</option>
                )}
              </select>
            </div>
            <div className='Popup-Options-Option'><p>Class Layout: </p>
              <select className='Popup-Options-Option-Select' value={this.selectedClassLayout}>
                {this.classLayouts.map(classroom =>
                    <option value={classroom.name} onClick={() => sup.selectLectureLayout(classroom.name)}>{classroom.name}</option>
                )}
              </select>
            </div>
            <br/>
            <div className='Popup-Options-Option'><p>Lab Location: </p>
              <select className='Popup-Options-Option-Select'  value={this.selectedLabLocation}>
                <option value='none' onClick={() => sup.selectLab('none')}>No Lab</option>
                {this.classrooms.map(classroom =>
                    <option value={classroom.name} onClick={() => sup.selectLab(classroom.name)}>{classroom.name}</option>
                )}
              </select>
            </div>
            <div className='Popup-Options-Option'><p>Lab Layout: </p>
              <select className='Popup-Options-Option-Select' value={this.selectedLabLayout}>
                {this.labLayouts.map(classroom =>
                    <option value={classroom.name} onClick={() => sup.selectLabLayout(classroom.name)}>{classroom.name}</option>
                )}
              </select>
            </div>
            <br/>
            <div className='Popup-Options-Option'><p>Tutorial Location: </p>
              <select className='Popup-Options-Option-Select'  value={this.selectedTutorialLocation}>
                <option value='none' onClick={() => sup.selectTutorial('none')}>No Tutorial</option>
                {this.classrooms.map(classroom =>
                    <option value={classroom.name} onClick={() => sup.selectTutorial(classroom.name)}>{classroom.name}</option>
                )}
              </select>
            </div>
            <div className='Popup-Options-Option'><p>Tutorial Layout: </p>
              <select className='Popup-Options-Option-Select' value={this.selectedTutorialLayout}>
                {this.tutorialLayouts.map(classroom =>
                    <option value={classroom.name} onClick={() => sup.selectTutorialLayout(classroom.name)}>{classroom.name}</option>
                )}
              </select>
            </div>
            <br/>
          </div>
          <div>
            <p className='Popup-TextAreaHeader'>Class List: </p><textarea id='classListInput' className='Popup-TextArea' />
          </div>
          <div className='Popup-Buttons'>
            <div onClick={() => this.submitCourse()} className='View-Edit-Button View-Add-Course'>SAVE</div>
            <div className='View-Edit-Button View-Remove-Course' onClick={() => this.props.closeCreateCoursePopup()}>Cancel</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateCoursePopup
