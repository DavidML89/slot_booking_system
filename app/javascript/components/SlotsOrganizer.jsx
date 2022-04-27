import React, { Component } from "react";
import NewBookingForm from "./NewBookingForm";
import SlotsListing from "./SlotsListing";

class SlotsOrganizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slots: []
    }
  }

  render() {
    return(
      <div>
        <NewBookingForm />
        <SlotsListing />
      </div>
    )
  }
}

export default SlotsOrganizer;
