import React, { Component } from "react";
import NewBookingForm from "./NewBookingForm";
import Slot from "./Slot";
import moment from 'moment';
import {v4 as uuid} from "uuid";

class SlotsOrganizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slots: [],
      bookings: []
    }
    this.createSlot = this.createSlot.bind(this)
  }

  componentDidMount() {
    fetch('api/v1/bookings').
    then((response) => response.json()).
    then((bookings) => this.setState( { bookings }));
  }

  createSlot(slot) {
    const startDate = new moment(`${slot.date}T00:00:00.000Z`);
    let beginningSlot = moment('00:00', 'HH:mm');
    const lastSlot = moment('23:45', 'HH:mm');
    const duration = moment.duration(slot.duration, 'HH:Mm');
    let slots = []
    while ( beginningSlot <= lastSlot ) {
      let beginning = new moment(beginningSlot).format('HH:mm')
      let endSlot = beginningSlot.add(duration)
      let end = new moment(endSlot).format('HH:mm')
      slot = { beginning, end, id: uuid(), duration: duration }
      slots.push(slot);
      beginningSlot.subtract(duration).add(15, 'minutes')
    }
    this.setState(state => ({
      slots: slots
    }))
  }

  render() {
    const slots = this.state.slots.map(slot => (
      <Slot
        key={slot.id}
        id={slot.id}
        startDate={slot.beginning}
        endDate={slot.end}
        duration={slot.duration} />
    ))
    return(
      <div>
        <NewBookingForm createSlot={this.createSlot}/>
        {slots}
      </div>
    )
  }
}

export default SlotsOrganizer;
