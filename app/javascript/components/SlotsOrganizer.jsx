import React, { Component } from "react";
import NewBookingForm from "./NewBookingForm";
import Slot from "./Slot";
import moment from 'moment';

class SlotsOrganizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slots: []
    }
    this.createSlot = this.createSlot.bind(this)
  }

  createSlot(slot) {
    const startDate = new moment(`${slot.date}T00:00:00.000Z`);
    let beginningSlot = moment('00:00', 'HH:mm');
    const lastSlot = moment('23:45', 'HH:mm');
    const duration = moment.duration(slot.duration, 'HH:Mm');
    console.log(duration)
    let arr = []
    while ( beginningSlot <= lastSlot ) {
      let beginning = new moment(beginningSlot).format('HH:mm')
      let endSlot = beginningSlot.add(duration)
      let end = new moment(endSlot).format('HH:mm')
      slot = { beginning, end }
      arr.push(slot);
      beginningSlot.add(15, 'minutes')
    }
    console.log(arr)
    console.log('Done')
  }

  render() {
    const slots = this.state.slots.map(slot => (
      <Slot
        key={slot.id}
        id={slot.id}
        startDate={slot.startDate}
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
