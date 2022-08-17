import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../Axios";

export const StudentAuthContext = createContext({});

export const UserAuthProvider = (props) => {
  const [authData, setAuthData] = useState(null);
  const { pathname } = useLocation();

  const checkUserLogin = async () => {
    try {
      const res = await Axios.post("/student/checkLogin");
      if (res.status === 200) {
        setAuthData(res.data.user);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const logout = async () => {
    try {
      const res = await Axios.post("/auth/logout");
      if (res.data.success) {
        setAuthData(null);
        window.location.href = "/login";
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <StudentAuthContext.Provider value={value}>
      {props.children}
    </StudentAuthContext.Provider>
  );
};
