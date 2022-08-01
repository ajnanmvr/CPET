import React from "react";
import { useContext } from "react";
import Dashboard from "../components/Dashboard";
import { UserAuthContext } from "../context/user";

function AdminHome() {
  const { authData } = useContext(UserAuthContext);
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default AdminHome;
