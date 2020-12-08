import React, {Component} from 'react'
import '../css/PopUpMenu.css'

export default class PopUpMenu extends Component {
  anchor = null;
  constructor (props) {
    super(props);

    this.state = {
        //Information to be fetched from the back end
        courseName: "SWE4103",
        hasLecture: true,
        hasTutorial: true,
        hasLab: true
    }
  }

  handleClick = () => {this.props.toggle();}

    render () {
      let lectButton;
      let tutButton;
      let labButton;
      //Add page references to buttons
      if (this.state.hasLecture) {
        lectButton = <button href="#">Lecture</button>
      } else {lectButton = null}

      if (this.state.hasTutorial) {
        tutButton = <button href="#">Tutorial</button>
      } else {tutButton = null}

      if (this.state.hasLab) {
        labButton = <button href="#">Lab</button>
      } else {labButton = null}

      return (
        <div className="modal">
          <div className="modal_content">
            <p className="closeWindow" onClick={this.handleClick}>&times;</p>
            <p>{this.state.courseName}</p>
            {lectButton}
            {tutButton}
            {labButton}
          </div>
        </div>
      )
    }
}