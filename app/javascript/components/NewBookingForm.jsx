import { Component } from "react";
import React from 'react';


class NewBookingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booking: {
        date: '',
        duration: ''
      }
    }
  }

  render() {
    return (
      <form>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          value={this.state.booking.date}
          placeholder="choose a date"
          />
        <label htmlFor="duration">Duration</label>
        <input
          id="duration"
          name="duration"
          value={this.state.booking.duration}
          placeholder="choose a duration"
          />
        <button>Send a request</button>
      </form>
    )
  }
}

export default NewBookingForm;
