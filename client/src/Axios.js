import axios from "axios";

const Axios = axios.create({
  baseURL: "0/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
  withCredentials: true,
});

export default Axios;
