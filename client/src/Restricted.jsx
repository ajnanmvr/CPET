import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { UserAuthContext } from "./context/user";

function ProtectedRoutes({ children, role }) {
  const { authData } = useContext(UserAuthContext);
  const navigate = useNavigate();
  if (authData?.role === role) {
    return (
      <>
        <Sidebar />
        {children}
      </>
    );
  } else {
    navigate("/not-allowed");
  }
}

export default ProtectedRoutes;
