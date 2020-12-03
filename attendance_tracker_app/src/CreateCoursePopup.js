import React from 'react'
import './CreateCoursePopup.css'

class CreateCoursePopup extends React.Component {
  constructor (props) {
    super(props)
    // Store local variable is state, not needed for now
    this.state = {
      temp: false
    }
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
    this.getClassrooms(this)
  }

  getClassrooms(sup) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        try {
            if(this.status == 200 && this.readyState == 4) {
                sup.classrooms = JSON.parse(xhr.response)
                console.log(sup.classrooms)
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
    this.selectedClassLayoutId = roomId
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
    for(var i = 0; i < this.classLayouts; i++) {
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
    for(var i = 0; i < this.labLayouts; i++) {
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
    console.log(room)
    this.selectedTutorialLayout = room
    var roomId = 0
    for(var i = 0; i < this.tutorialLayouts; i++) {
        if(this.tutorialLayouts[i].name == room) {
            roomId = this.tutorialLayouts[i].id
        }
    }
    this.selectedTutorialLayoutId = roomId
    this.forceUpdate()
  }

  render () {
    console.log(this.classrooms)
    var sup = this
    return (
      <div>
        <div className='Popup-Container' onClick={() => this.props.closeCreateCoursePopup()} />
        <div className='Popup'>
          <div className='Popup-Header'><h3>Add a Course</h3></div>
          <div className='Popup-Options'>
            <div className='Popup-Options-Option'><p>Class Name: </p><input /></div>
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
            <p className='Popup-TextAreaHeader'>Class List: </p><textarea className='Popup-TextArea' />
          </div>
          <div className='Popup-Buttons'>
            <div onClick={() => this.props.closeCreateCoursePopup()} className='View-Edit-Button View-Add-Course'>SAVE</div>
            <div className='View-Edit-Button View-Remove-Course' onClick={() => this.props.closeCreateCoursePopup()}>Cancel</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateCoursePopup
