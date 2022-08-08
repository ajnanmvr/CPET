import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../Axios";

export const SettingsContext = createContext({});

export const UserAuthProvider = (props) => {
  const [settings, setSettings] = useState([]);

  

  const value = {
    settings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {props.children}
    </SettingsContext.Provider>
  );
};
