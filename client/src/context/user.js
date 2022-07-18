import { createContext, useEffect, useState } from "react";
import Axios from "../Axios";

export const UserAuthContext = createContext({});

export const UserAuthProvider = (props) => {
  const [authData, setAuthData] = useState(null);

  const checkUserLogin = async () => {
    try {
      const res = await Axios.post("/auth/checkLogin");
      if (res.status === 200) {
        setAuthData(res.data.user);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const logout = async () => {
    try {
      const res = await Axios.post("/auth/logout");
      if (res.data.success) {
        setAuthData(null);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const value = {
    checkUserLogin,
    authData,
    setAuthData,
    logout,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {props.children}
    </UserAuthContext.Provider>
  );
};
