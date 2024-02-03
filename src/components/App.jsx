import { useState, createContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import Landing from "./Common/Landing";

export default function App() {
  const url = useLocation();

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      {url.pathname === "/" ? <Landing /> : <Outlet />}
      <Footer />
    </div>
  );
}
