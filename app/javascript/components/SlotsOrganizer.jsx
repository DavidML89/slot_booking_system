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
    // fetch the bookings
    const bookings = this.state.bookings;
    // initialise the beginning and last time for the user input date
    let beginningSlot = new moment.utc(`${slot.date}T00:00:00.000Z`);
    const lastSlot = new moment.utc(`${slot.date}T23:45:00.000Z`);
    const duration = moment.duration(slot.duration, 'HH:Mm');
    // initialise the array to welcome the slots
    let slots = []
    // Looping to create a slot every 15min for this specific day
    // if beginning and end of a slot is not included in a booking
    while ( beginningSlot <= lastSlot ) {
      // initiliase the date to the correct format to be comparable
      let beginning = new moment.utc(beginningSlot)
      let endSlot = beginningSlot.add(duration)
      let end = new moment.utc(endSlot)
      // map through the bookings to check if slot is available
      bookings.map(booking => {
        let endBooking = new moment.utc(booking.end_datetime);
        // console.log(end_datetime);
        // console.log(beginning);
        let startBooking = new moment.utc(booking.start_datetime);
        // console.log(beginning.format());
        // if beginning and end of a slot is not included in a booking
        if (beginning > endBooking && end < startBooking) {
          return console.log('created');
        }
      })
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
        startDate={slot.beginning.format()}
        endDate={slot.end.format()}
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
