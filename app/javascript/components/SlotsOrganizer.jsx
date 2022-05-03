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
      selectedSlot: false
    }
    this.createSlot = this.createSlot.bind(this)
    this.handleBooking = this.handleBooking.bind(this)
  }

  componentDidMount() {
    fetch('api/v1/bookings').
    then((response) => response.json()).
    then((bookings) => this.setState( { bookings }));
  }

  dateRangeOverlaps(a_start, a_end, b_start, b_end) {
    if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
    if (a_start <= b_end   && b_end   <= a_end) return true; // b ends in a
    if (b_start <  a_start && a_end   <  b_end) return true; // a in b
    return false;
  }
  multipleDateRangeOverlaps(dates) {
    let i, j;
    console.log(dates.lenght)
    if (dates.length % 2 !== 0)
    throw new TypeError('dates length must be a multiple of 2');
    for (i = 0; i < dates.length - 2; i += 2) {
      for (j = i + 2; j < dates.length; j += 2) {
        if (
          this.dateRangeOverlaps(
            dates[i], dates[i+1],
            dates[j], dates[j+1]
            )
            ) return true;
          }
        }
        return false;
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
    const bookings = this.state.bookings;
    const bookingArr = this.createBookingArray(bookings)
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
      console.log(this.multipleDateRangeOverlaps(bookingArr))
      bookings.map(booking => {
        let startBooking = new moment.utc(booking.start_datetime);
        let endBooking = new moment.utc(booking.end_datetime);
        let rangeBooking = moment.range(startBooking, endBooking)
        console.log(rangeBooking);
        // console.log(beginning);
        // console.log(beginning.format());
        // if beginning and end of a slot is not included in a booking
        console.log(!rangeBooking.contains(beginning))
        console.log(!rangeBooking.contains(end))
        // if (!rangeBooking.contains(beginning) && !rangeBooking.contains(end)) {
        //     // return console.log('created');
        //     slot = { start_datetime: beginning, end_datetime: end, id: uuid() }
        //     slots.push(slot);
        // }
        // if (beginning > endBooking && end < startBooking ) {  //
        //   return console.log('created');
        // }
      })
      beginningSlot.subtract(duration).add(15, 'minutes')
    }
    this.setState(state => ({
      slots: slots
    }))
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
        book={() => this.handleBooking(slot.id)} />
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
