import React, { useEffect } from "react";
import { useContext } from "react";
import { UserAuthContext } from "./context/user";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const { authData } = useContext(UserAuthContext);
  const navigate = useNavigate();
  if (authData) {
    return children;
  } else {
    navigate("/not-logged");
  }
}

export default ProtectedRoutes;
