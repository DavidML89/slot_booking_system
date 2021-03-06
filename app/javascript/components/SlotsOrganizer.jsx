// External libraries
import React, { Component } from "react";
import Moment from 'moment';
import { extendMoment } from 'moment-range';
// Component
import NewBookingForm from "./NewBookingForm";
import Slot from "./Slot";
// Helper functions
import createBookingRange from '../helpers/create_bookings_range.js'
import createSlot from '../helpers/create_slots.js'

const moment = extendMoment(Moment);

class SlotsOrganizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: [],
      bookings: [],
    };
    this.checkAvailability = this.checkAvailability.bind(this);
    this.handleBooking = this.handleBooking.bind(this);
  }

  componentDidMount() {
    fetch('api/v1/bookings').
    then((response) => response.json()).
    then((bookings) => this.setState( { bookings }));
  }

  checkAvailability(slot) {
    // create the slots with the helpers for the requested date
    const slots = createSlot(slot);
    // fetch the bookings
    const bookings = this.state.bookings;
    // transform the bookings into range with the helpers
    let bookingsRange = createBookingRange(bookings);
    let availableSlots = [];
    // iterate through each slots to verify if it overlaps a booking
    slots.map(slot => {
      // create a range for the slot
      let beginning = slot.start_datetime;
      let end = slot.end_datetime;
      let rangeSlot = moment.range(beginning, end);
      // if doesn't overlaps return avaialble true else return avaialble false
      bookingsRange.map((range) => {
        if (rangeSlot.overlaps(range)) {
          slot = { ...slot, available: false };
        } else {
          return slot;
        }
      });
      availableSlots.push(slot)
    })
    this.setState({ slots: availableSlots });
  }

  handleBooking(id) {
    const slot = this.state.slots.map((slot) => {
      if (slot.id === id) {
        const start_datetime = slot.start_datetime.format();
        const end_datetime = slot.end_datetime.format();
        const selectedSlot = { id, start_datetime, end_datetime };
        if (window.confirm('Do you want to book this slot ?')) {
          fetch('/api/v1/bookings/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedSlot),
          }).then((response) => {
            alert(`Slot from the ${slot.start_datetime.format("dddd, MMMM Do YYYY, h:mm:ss a")} to the ${slot.end_datetime.format("dddd, MMMM Do YYYY, h:mm:ss a")} booked successfully`)
            // location.href = '/';
          }).catch((err) => console.error("Error: " + err));
        };
      }
    })
  }

  render() {
    const slots = this.state.slots.map(slot => (
      slot.available ?
      <Slot
        key={slot.id}
        id={slot.id}
        start_datetime={slot.start_datetime.format('HH:mm')}
        end_datetime={slot.end_datetime.format('HH:mm')}
        book={() => this.handleBooking(slot.id)}
      /> :
      null
    ))

    return(
      <div className="slots_organizer">
        <div className="form">
          <NewBookingForm createSlot={this.checkAvailability} />
          <p>Select a slot to book it</p>
        </div>
        <div className="slots">
          {slots}
        </div>
      </div>
    )
  }
}

export default SlotsOrganizer;
