import React, { Component } from "react";
import NewBookingForm from "./NewBookingForm";
import Slot from "./Slot";

class SlotsOrganizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slots: []
    }
    this.createSlot = this.createSlot.bind(this)
  }

  createSlot(slot) {
    let start_datetime = new Date(`${slot.date}T00:00:00.000Z`)
    console.log(start_datetime)
    // const min = parseInt(slot.duration.slice(3))
    // const hrs = parseInt(slot.duration.slice(0, 2))
    // const end_datetime_mill = start_datetime.setHours(start_datetime.getHours() + hrs, start_datetime.getMinutes() + min)
    // const end_datetime = new Date(end_datetime_mill)
    // console.log(end_date)
    const nextDay = new Date(start_datetime.setDate(start_datetime.getDate() + 1 ))
    console.log(nextDay)
    let arr = []
    do {
      // this.setState(state => ({
      //   slots
      // }))
      arr.push(new Date(start_datetime))
      start_datetime.setMinutes(15)

    } while ( start_datetime.getDate() <= nextDay.getDate() )
    console.log(arr)
    console.log('Done')
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
        <NewBookingForm createSlot={this.createSlot}/>
        {slots}
      </div>
    )
  }
}

export default SlotsOrganizer;
