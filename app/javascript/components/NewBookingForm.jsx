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
    this.setState({ date: '', duration: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
        <button>Send a request</button>
      </form>
    )
  }
}

export default NewBookingForm;
