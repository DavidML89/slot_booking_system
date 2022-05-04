import React, { Component } from "react";
import NewBookingForm from "./NewBookingForm";
import Slot from "./Slot";
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import {v4 as uuid} from "uuid";

const moment = extendMoment(Moment);

class SlotsOrganizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slots: [],
      bookings: [],
    }
    this.checkAvailability = this.checkAvailability.bind(this)
    this.handleBooking = this.handleBooking.bind(this)
  }

  componentDidMount() {
    fetch('api/v1/bookings').
    then((response) => response.json()).
    then((bookings) => this.setState( { bookings }));
  }

  createBookingRange(arr) {
    let i;
    let bookingsRange = [];
    for (i = 0; i < arr.length; i += 2) {
      let range = moment.range(arr[i], arr[i+1])
      bookingsRange.push(range);
    }
    // console.log(bookingsRange);
    return bookingsRange;
  }

  createBookingArray(bookings) {
    let i;
    let bookingsArray = [];
    // const bookingArray = Object.values(bookings);
    bookings.map((booking) => {
      bookingsArray.push(Object.values(booking))
    })
    let bookingArr = []
    bookingsArray.map((arr) => {
      bookingArr.push(arr[1], arr[2])
    })
    return bookingArr;
  }


  createSlot(slot) {
    // fetch the bookings
    // const bookings = this.state.bookings;
    // let bookingsArray = this.createBookingArray(bookings)
    // // let overlap = this.multipleDateRangeOverlaps(bookingsArray);
    // let bookingsRange = this.createBookingRange(bookingsArray);
    // console.log('bookingsRange', bookingsRange)
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
      slot = { start_datetime: beginning, end_datetime: end, id: uuid(), available: true }
      slots.push(slot);
      // map through the bookings to check if slot is available
      beginningSlot.subtract(duration).add(15, 'minutes')
    }
    console.log(slots)
    // slots.map((slot) => {
    //   let beginning = slot.start_datetime
    //   let end = slot.end_datetime
    //   bookingsRange.map((range) => {
    //     console.log('slot', slot)
    //     console.log('range', range)
    //     if (range.contains(beginning) && range.contains(end)) {
      //       this.setState({
        //         slot
        //       })
        //     }
        //   })
        // })
      // this.setState({
      //   slots: slots
      // })
    return slots;
  }

  checkAvailability(slot) {
    const slots = this.createSlot(slot)
    const bookings = this.state.bookings;
    let bookingsArray = this.createBookingArray(bookings)
    // let overlap = this.multipleDateRangeOverlaps(bookingsArray);
    let bookingsRange = this.createBookingRange(bookingsArray);
    let availableSlots = [];
    slots.map(slot => {
      let beginning = slot.start_datetime
      let end = slot.end_datetime
      let rangeSlot = moment.range(beginning, end)
      bookingsRange.map((range) => {
        if (rangeSlot.overlaps(range)) {
          console.log('slot overlaping non available', slot)
          slot = { ...slot, available: false }
        } else {
          console.log('slot not overlaping available', slot)
          return slot;
        }
      });
      availableSlots.push(slot)
    })
    this.setState({ slots: availableSlots })
  }

  handleBooking(id) {
    const slot = this.state.slots.map((slot) => {
      if (slot.id === id) {
        const start_datetime = slot.start_datetime.format()
        const end_datetime = slot.end_datetime.format()
        const selectedSlot = { id, start_datetime, end_datetime }
        fetch('/api/v1/bookings/', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedSlot),
        }).then((response) => {
          alert('Slot booked successfully')
          // location.href = '/';
        }).catch((err) => console.error("Error: " + err));
      }
    })
  }

  render() {
    const slots = this.state.slots.map(slot => (
      <Slot
        key={slot.id}
        id={slot.id}
        start_datetime={slot.start_datetime.format('HH:mm')}
        end_datetime={slot.end_datetime.format('HH:mm')}
        duration={slot.duration}
        available={slot.available}
        book={() => this.handleBooking(slot.id)}
      />
    ))

    return(
      <div className="slots_organizer">
        <NewBookingForm
          createSlot={this.checkAvailability} />
        <div className="slots">
          {slots}
        </div>
      </div>
    )
  }
}

export default SlotsOrganizer;
