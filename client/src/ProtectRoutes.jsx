import React, { useEffect } from "react";
import { useContext } from "react";
import { UserAuthContext } from "./context/user";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function ProtectedRoutes({ children }) {
  const { authData } = useContext(UserAuthContext);
  const navigate = useNavigate();
  if (authData) {
    return (
      <div className="lg:ml-[250px]">
        <Sidebar />
        {children}
      </div>
    );
  } else {
    navigate("/not-logged");
  }
}

export default ProtectedRoutes;
