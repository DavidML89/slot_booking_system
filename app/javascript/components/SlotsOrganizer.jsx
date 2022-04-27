import React, { Component } from "react";
import NewBookingForm from "./NewBookingForm";
import Slot from "./Slot";

class SlotsOrganizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slots: []
    }
  }

  createSlot(slot) {
    const end_datetime = this.state.start_datetime + this.state.duration
    const newSlot = { ...this.state, start_datetime: this.state.date, end_datetime: end_datetime }
    this.setState(state => ({
      slots
    }))
  }

  render() {
    const slots = this.state.slots.map(slot => (
      <Slot
        key={slot.id}
        id={slot.id}
        start_datetime={slot.start_datetime}
        end_datetime={slot.end_datetime}
        duration={slot.duration} />
    ))
    return(
      <div>
        <NewBookingForm />
        {slots}
      </div>
    )
  }
}

export default SlotsOrganizer;
