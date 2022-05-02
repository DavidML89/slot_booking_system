import React, { Component } from "react";

class Slot extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="slot">
        from {this.props.startDate} to {this.props.endDate}
      </div>
    )
  }
}

export default Slot;
