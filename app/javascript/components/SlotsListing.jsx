import React, { Component } from "react";
import Slot from "./Slot";


class SlotsListing extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <Slot />
      </div>
    )
  }
}

export default SlotsListing;
