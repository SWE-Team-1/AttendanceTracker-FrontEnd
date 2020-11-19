import React, { Component } from "react";

export default class ShowOptions extends Component {
  handleClick = () => {
   this.props.toggle();
  };


  render() {
   return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          
         
        </div>
      </div>
    );
 }
}