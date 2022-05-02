import React, { Component } from "react";

class Slot extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <button className="slot" onClick={this.props.book}>
        from {this.props.start_datetime} to {this.props.end_datetime}
      </button>
    )
  }
}

export default Slot;
