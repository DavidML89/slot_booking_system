import Moment from 'moment';
import { extendMoment } from 'moment-range';
import {v4 as uuid} from "uuid";

const moment = extendMoment(Moment);

// create an array of booking start date and booking end date
function createBookingArray(bookings) {
  let bookingsArray = [];
  bookings.map((booking) => {
    bookingsArray.push(Object.values(booking))
  })
  let bookingArr = []
  bookingsArray.map((arr) => {
    bookingArr.push(arr[1], arr[2])
  })
  return bookingArr;
}

// transform the booking start and end date into an array of Moment Range object
function createBookingRange(bookings) {
  let arr = createBookingArray(bookings)
  let i;
  let bookingsRange = [];
  for (i = 0; i < arr.length; i += 2) {
    let range = moment.range(arr[i], arr[i+1])
    bookingsRange.push(range);
  }
  return bookingsRange;
}



export default createBookingRange;
