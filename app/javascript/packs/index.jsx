// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import React from "react";
import { createRoot } from 'react-dom/client';
import App from "../components/App";

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import "controllers"
import "bootstrap"
// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);


// document.addEventListener("DOMContentLoaded", () => {
//   render(<App />, document.body.appendChild(document.createElement("div")));
// });

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
