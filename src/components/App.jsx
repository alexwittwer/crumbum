import { useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Common/Header";
import Footer from "./Common/Footer";

export default function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
