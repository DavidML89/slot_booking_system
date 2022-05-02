import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import SlotsOrganizer from './SlotsOrganizer'
import Hello from './Hello'
import Home from "./Home";

function App() {
  return (
    <div className="app">
      {/* <h1>Slot Booking system</h1>
      <Hello name="'Transport Inc.'" />
      <SlotsOrganizer /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
