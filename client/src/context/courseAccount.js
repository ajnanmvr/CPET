import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../Axios";

export const CourseAccountContext = createContext({});

export const CourseAccountProvider = (props) => {
  const [courseAccount, setCourseAccount] = useState(null);
  const { pathname } = useLocation();

  const checkCourseLogin = async () => {
    try {
      const res = await Axios.post("/course/checkLogin");
      if (res.status === 200) {
        setCourseAccount(res.data.user);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const logout = async () => {
    try {
      const res = await Axios.post("/course/logout");
      if (res.data.success) {
        setCourseAccount(null);
        window.location.href = "/student-login";
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const value = {
    checkCourseLogin,
    courseAccount,
    setCourseAccount,
    logout,
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <CourseAccountContext.Provider value={value}>
      {props.children}
    </CourseAccountContext.Provider>
  );
};
