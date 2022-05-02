import { Layout } from "antd";
import React from "react";
import SlotsOrganizer from "./SlotsOrganizer";
import Hello from './Hello'

// import Header from "./Header";

const { Content, Footer } = Layout;

function Home() {
  return (
  <Layout className="layout">
    {/* <Header /> */}
    <Content style={{ padding: "0 50px" }}>
      <div className="app">
        <h1>Slot Booking system</h1>
        <Hello name="'Transport Inc.'" />
        <SlotsOrganizer />
      </div>
    </Content>
    {/* <Footer style={{ textAlign: "center" }}>Honeybadger ©2020.</Footer> */}
  </Layout>
  )
};

export default Home;
