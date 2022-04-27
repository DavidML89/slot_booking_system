import React, { Component } from "react";

class NewBookingForm extends Component {
  constructor(props) {
    super(props)
    this.state = { date: '', duration: ''}
  }

  render() {
    return (
      <form>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={this.state.date}
          placeholder="choose a date"
          />
        <label htmlFor="duration">Duration</label>
        <input
          type='time'
          min='00:15'
          step='900'
          id="duration"
          name="duration"
          value={this.state.duration}
          placeholder="choose a duration"
          />
        <button>Send a request</button>
      </form>
    )
  }
}

export default NewBookingForm;
