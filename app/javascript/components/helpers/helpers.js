import Moment from 'moment';
import { extendMoment } from 'moment-range';
import {v4 as uuid} from "uuid";

const moment = extendMoment(Moment);

// create an array of booking start date and booking end date
function createBookingArray(bookings) {
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

// transform the booking start and end date into an array of Range object
function createBookingRange(bookings) {
  let arr = createBookingArray(bookings)
  let i;
  let bookingsRange = [];
  for (i = 0; i < arr.length; i += 2) {
    let range = moment.range(arr[i], arr[i+1])
    bookingsRange.push(range);
  }
  // console.log(bookingsRange);
  return bookingsRange;
}

// Create a slot every 15min for the requested day
function createSlot(slot) {
  // initialise the beginning and last time for the user input date
  let beginningSlot = new moment.utc(`${slot.date}T00:00:00.000Z`);
  const lastSlot = new moment.utc(`${slot.date}T23:45:00.000Z`);
  const duration = moment.duration(slot.duration, 'HH:Mm');
  // initialise the array to welcome the slots
  let slots = []
  // Looping to create a slot every 15min for this specific day
  while ( beginningSlot <= lastSlot ) {
    // initiliase the date to the correct format to be comparable
    let beginning = new moment.utc(beginningSlot)
    let endSlot = beginningSlot.add(duration)
    let end = new moment.utc(endSlot)
    // create the slot object
    slot = { start_datetime: beginning, end_datetime: end, id: uuid(), available: true }
    // add the slot object into the slots array
    slots.push(slot);
    beginningSlot.subtract(duration).add(15, 'minutes')
  }
  return slots;
}

export { createBookingRange, createSlot };
