import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

// create an array of booking start date and booking end date
function createBookingArray(bookings) {
  let bookingsArray = [];
  // transform the booking object into an array
  bookings.map((booking) => {
    bookingsArray.push(Object.values(booking));
  });
  let bookingsDateArr = [];
  // take only the 2nd and 3rd value of the array which are the startdate and enddate
  bookingsArray.map((arr) => {
    bookingsDateArr.push(arr[1], arr[2]);
  });
  return bookingsDateArr;
}

// transform the booking start and end date into an array of Moment Range object
function createBookingRange(bookings) {
  // create an array of booking start date and booking end date
  let arr = createBookingArray(bookings);
  let i;
  let bookingsRange = [];
  for (i = 0; i < arr.length; i += 2) {
    let range = moment.range(arr[i], arr[i+1]);
    bookingsRange.push(range);
  }
  return bookingsRange;
}



export default createBookingRange;
