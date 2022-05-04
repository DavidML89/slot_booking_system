import React, { Component } from "react";

class NewBookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = { date: '', start_datetime: '', end_datetime: '', duration: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createSlot(this.state);
    // this.setState({ date: '', duration: '' });
  }

  render() {
    // let messageResult;
    // if (!this.state.date == '') {
    //   console.log('Test')
    //   let messageResult = `The ${this.state.duration} for the ${this.state.date}`
    //   return messageResult;
    // }
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='new_booking_form'>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={this.state.date}
            placeholder="choose a date"
            onChange={this.handleChange}
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
            onChange={this.handleChange}
            />
          <button>Find a slot</button>
        </form>
        {/* { messageResult } */}
      </div>
    )
  }
}

export default NewBookingForm;
