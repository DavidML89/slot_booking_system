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
    this.handleBooking = this.handleBooking.bind(this)
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
        if (beginning > endBooking && end < startBooking ) {  //
          return console.log('created');
        }
      })
      slot = { start_datetime: beginning, end_datetime: end, id: uuid() }
      slots.push(slot);
      beginningSlot.subtract(duration).add(15, 'minutes')
    }
    this.setState(state => ({
      slots: slots
    }))
  }

  handleBooking(idx) {
    console.log(idx);
    // if (slot.idx === idx) {
      fetch('/api/v1/bookings', {
        method: 'post',
        body: JSON.stringify(this.state),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        alert('Slot booked successfully'),
        location.href = '/';
      });
    // }
  }

  render() {
    const slots = this.state.slots.map(slot => (
      <Slot
        key={slot.id}
        id={slot.id}
        start_datetime={slot.start_datetime.format('HH:mm')}
        end_datetime={slot.end_datetime.format('HH:mm')}
        duration={slot.duration}
        book={() => this.handleBooking(slot.idx)} />
    ))

    return(
      <div className="slots_organizer">
        <NewBookingForm
          createSlot={this.createSlot} />
        <div className="slots">
          {slots}
        </div>
      </div>
    )
  }
}

export default SlotsOrganizer;
