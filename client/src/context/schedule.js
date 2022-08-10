import { createContext, useEffect, useState } from "react";
import Axios from "../Axios";

export const ScheduleContext = createContext({});

export const ScheduleProvider = (props) => {
  const [schedule, setSchedule] = useState([]);

  const getSchedule = async (name) => {
    try {
      let { data } = await Axios.get(`/schedule?name=${name}`);
      setSchedule(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    schedule,
    getSchedule
  };

  return (
    <ScheduleContext.Provider value={value}>
      {props.children}
    </ScheduleContext.Provider>
  );
};
