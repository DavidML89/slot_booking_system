import React, { Component } from "react";

class Slot extends Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect() {
    this.props.book(this.props.id)
  }

  render() {
    return(
      <button className="slot" onClick={this.handleSelect}>
        from {this.props.start_datetime} to {this.props.end_datetime}
      </button>
    )
  }
}

export default Slot;
