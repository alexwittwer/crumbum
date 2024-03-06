import { useState, createContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import Landing from "./Common/Landing";
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

export const UserContext = createContext(null);
export const LoginContext = createContext(null);

export default function App() {
  const url = useLocation();
  const [user, setUser] = useState();

  useEffect(() => {
    const userstorage = localStorage.getItem("user");
    if (!userstorage) {
      return setUser(null);
    } else {
      const parsedUser = JSON.parse(userstorage);
      setUser(parsedUser);
    }
  }, []);


  return (
    <MantineProvider>
      <UserContext.Provider value={user}>
        <LoginContext.Provider value={setUser}>
          <div className="flex flex-col justify-between min-h-screen bg-base-200">
            <Header />
            {url.pathname === "/" ? <Landing /> : <Outlet />}
            <Footer />
          </div>
        </LoginContext.Provider>
      </UserContext.Provider>
    </MantineProvider>
  );
}
