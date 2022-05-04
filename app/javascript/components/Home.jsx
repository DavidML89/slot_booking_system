import { Layout } from "antd";
import React from "react";
import SlotsOrganizer from "./SlotsOrganizer";
import Hello from './Hello'

// import Header from "./Header";

const { Content, Footer } = Layout;

function Home() {
  return (
  <Layout className="">
    {/* <Content style={{ padding: "0 50px" }}> */}
      <h1>Slot Booking system</h1>
      <Hello name="'Transport Inc.'" />
      <SlotsOrganizer />
    {/* </Content> */}
  </Layout>
  )
};

export default Home;
