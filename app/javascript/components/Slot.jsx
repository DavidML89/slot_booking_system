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
    let classes = '';
    if (this.props.available) {
      classes = 'slot'
    } else {
      classes = 'slot hidden'
    }
    return(
      <button className={classes} onClick={this.handleSelect}>
        from {this.props.start_datetime}
        to {this.props.end_datetime}
        available: {this.props.available ? 'true' : 'false'}
      </button>
    )
  }
}

export default Slot;
