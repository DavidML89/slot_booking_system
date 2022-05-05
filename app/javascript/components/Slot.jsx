import React, { Component } from "react";
import PropTypes from "prop-types";

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
      <button className='slot' onClick={this.handleSelect}>
        from {this.props.start_datetime}<br></br>
        to {this.props.end_datetime}
      </button>
    )
  }
}

Slot.propTypes= {
  start_datetime: PropTypes.string.isRequired,
  end_datetime: PropTypes.string.isRequired
}

export default Slot;
