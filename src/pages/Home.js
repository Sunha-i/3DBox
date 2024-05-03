import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <SideBar />
    </div>
  );
}
